import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  SeekerProfile: a
    .model({
      // Basic profile fields
      id: a.id(),
      email: a.string(),
      name: a.string(),
      industry: a.string(),
      // Add more fields as needed
    })
    .authorization((allow) => [
      // Only SEEKERS can create and update their own profile
      allow.owner().to(["create", "update", "delete"]),
      // RECRUITERS can read seeker profiles
      allow.groups(["RECRUITER"]).to(["read"]),
      // SEEKERS can read other seeker profiles
      allow.groups(["SEEKER"]).to(["read"]),
      // Allow non-authenticated users to read seeker profiles
      allow.guest().to(["read"]),
    ]),

  RecruiterProfile: a
    .model({
      // Basic profile fields
      id: a.id(),
      email: a.string(),
      industry: a.string(),
      // Add more fields as needed
    })
    .authorization((allow) => [
      // Only RECRUITERS can create and update their own profile
      allow.owner().to(["create", "update", "delete"]),
      // SEEKERS can read recruiter profiles
      allow.groups(["SEEKER"]).to(["read"]),
      // RECRUITERS can read other recruiter profiles
      allow.groups(["RECRUITER"]).to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});
