import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import validator from "email-validator";
import deepEmailValidator from "deep-email-validator";
import { cookies } from "next/headers";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const SESSION_LIMIT = 20; // max emails per session
const SESSION_COOKIE = "oppi_email_count";

async function getSessionCount(): Promise<number> {
  const cookieStore = await cookies();
  const count = cookieStore.get(SESSION_COOKIE)?.value;
  return count ? parseInt(count) : 0;
}

function incrementSessionCount(
  response: NextResponse,
  currentCount: number
): NextResponse {
  const newCount = currentCount + 1;

  // Set cookie to expire in 24 hours
  response.cookies.set(SESSION_COOKIE, newCount.toString(), {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}

async function validateEmail(
  email: string
): Promise<{ valid: boolean; message?: string }> {
  // Basic format validation
  if (!validator.validate(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  try {
    // Deep validation including MX record check
    const result = await deepEmailValidator({
      email,
      validateRegex: true,
      validateMx: true,
      validateDisposable: false, // Disable disposable check since it's not reliable
      validateSMTP: false,
    });

    // Check each validator result
    if (!result.valid) {
      // Check specific validation failures
      if (result.validators.regex?.valid === false) {
        return { valid: false, message: "Invalid email format" };
      }
      if (result.validators.mx?.valid === false) {
        return { valid: false, message: "Email domain does not exist" };
      }
      // If any other validation failed
      return { valid: false, message: "Invalid email address" };
    }

    // Only return valid if ALL validators passed
    const allValidatorsPassed = Object.values(result.validators).every(
      (validator) => validator.valid === true
    );

    if (!allValidatorsPassed) {
      return { valid: false, message: "Email validation failed" };
    }

    return { valid: true };
  } catch (error) {
    // Don't fall back to basic validation on error - fail closed
    console.error("Email validation error:", error);
    return { valid: false, message: "Email validation failed" };
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check session limit
    const currentCount = await getSessionCount();
    if (currentCount >= SESSION_LIMIT) {
      return NextResponse.json(
        { message: "Session limit reached. Please try again later." },
        { status: 429 }
      );
    }

    const { email, type } = await req.json();

    // Validate email format and existence
    const emailValidation = await validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { message: emailValidation.message || "Invalid email address" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    if (
      !type ||
      typeof type !== "string" ||
      (type !== "seeker" && type !== "recruiter")
    ) {
      return NextResponse.json(
        { message: "type must be either 'seeker' or 'recruiter'" },
        { status: 400 }
      );
    }

    // Check if email + type combination already exists
    const getCommand = new GetCommand({
      TableName: "oppi-emails",
      Key: {
        email,
        type,
      },
    });
    const getResult = await ddbDocClient.send(getCommand);
    if (getResult.Item) {
      return NextResponse.json(
        { message: "This email is already registered as this type." },
        { status: 409 }
      );
    }

    const command = new PutCommand({
      TableName: "oppi-emails",
      Item: { email, type },
    });
    await ddbDocClient.send(command);

    // Create response and increment session count
    const response = NextResponse.json(
      { message: "Email saved successfully" },
      { status: 200 }
    );

    return incrementSessionCount(response, currentCount);
  } catch (error: any) {
    console.error("Error in POST /api/oppi-emails:", error);
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
