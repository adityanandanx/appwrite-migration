import AppwriteMigrationClient from "./AppwriteMigrationClient";

const createAppwriteMigrationClient = (
  endpoint: string,
  projectId: string,
  projectAPIKey: string
) => {
  const appwriteMigrationClient = AppwriteMigrationClient.getInstance();
  appwriteMigrationClient
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(projectAPIKey);
  return appwriteMigrationClient;
};

export { createAppwriteMigrationClient, AppwriteMigrationClient };
