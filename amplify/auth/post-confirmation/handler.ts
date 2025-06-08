// amplify/functions/post-confirmation/handler.ts
import type { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient();

// add user to group based on custom:userType attribute
export const handler: PostConfirmationTriggerHandler = async (event) => {
  // Add detailed logging of the entire event
  console.log(
    "Post-confirmation trigger event:",
    JSON.stringify(event, null, 2)
  );
  console.log("Event type:", event.triggerSource);
  console.log(
    "User attributes:",
    JSON.stringify(event.request.userAttributes, null, 2)
  );

  const userName = event.userName;
  const userPoolId = event.userPoolId;

  // Get the custom:userType value from the event's userAttributes
  const userType = event.request.userAttributes["custom:userType"];

  console.log(`User ${userName} confirmed. Custom userType: ${userType}`);

  let groupToAssign: string | undefined;

  // IMPORTANT: Use conditional logic to determine the group name
  // This adds robustness and validation.
  if (userType === "SEEKER") {
    groupToAssign = "SEEKER";
  } else if (userType === "RECRUITER") {
    groupToAssign = "RECRUITER";
  } else {
    // Log a warning if the userType is unexpected or missing
    console.warn(
      `[WARNING] Unexpected or missing custom:userType value "${userType}" for user ${userName}. User will not be assigned to a specific group.`
    );
    // You could optionally assign a default group here, or throw an error.
  }

  // Only attempt to add to a group if a valid group name was determined
  if (groupToAssign) {
    try {
      const command = new AdminAddUserToGroupCommand({
        GroupName: groupToAssign, // Use the validated and determined group name
        Username: userName,
        UserPoolId: userPoolId,
      });
      const response = await client.send(command);
      console.log(
        `Successfully added user ${userName} to group ${groupToAssign}. RequestId: ${response.$metadata.requestId}`
      );
    } catch (error) {
      console.error(
        `[ERROR] Failed to add user ${userName} to group ${groupToAssign}:`,
        error
      );
      // Log the error, but still return the event to allow confirmation to complete.
    }
  }

  // Always return the event object for Post Confirmation triggers
  return event;
};
