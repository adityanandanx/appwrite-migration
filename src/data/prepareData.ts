import { AppwriteMigrationClient } from "@/client";
import { AppwriteData } from "@/types/index";

const createDocuments = async (
  client: AppwriteMigrationClient,
  data: AppwriteData
) => {
  for (const document of data.documents) {
    try {
      await client.databases.deleteDocument(
        document.$databaseId,
        document.$collectionId,
        document.$id
      );
      console.log(`Deleted and recreating document ${document.$id}...`);
    } catch {
      console.log(`Creating document ${document.$id}`);
    }
    const data: { [k: string]: any } = {};

    for (const key of Object.keys(document)) {
      if (key.charAt(0) != "$") {
        data[key] = { ...document }[key];
      }
    }

    await client.databases.createDocument(
      document.$databaseId,
      document.$collectionId,
      document.$id,
      { ...data },
      document.$permissions
    );
  }
};

/**
 * @abstract This method prepares the data of collection and bucket from .json file to migrate to the server. It accepts parsed json as input that is generated
 * @param client
 * @param data
 */
const prepareData = async (
  client: AppwriteMigrationClient,
  data: AppwriteData
) => {
  await createDocuments(client, data);
};

export default prepareData;
