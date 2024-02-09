import AppwriteMigrationClient from "./AppwriteMigrationClient";

/**
 * @abstract This is a connection method to the `appwrite-migration` library
 * @param endpoint
 * @param projectId
 * @param projectAPIKey
 * @returns appwriteMigrationClient object
 */
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
