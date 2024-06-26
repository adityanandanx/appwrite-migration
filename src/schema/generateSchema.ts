import { AppwriteSchema } from "@/types/index";
import { AppwriteMigrationClient } from "@/client";

/**
 * @abstract This method collects the data from the provided Appwrite account instance and returns the json to store it into the file.
 * @param {AppwriteMigrationClient} client 
 * @returns json data
 */
const generateSchema = async (client: AppwriteMigrationClient) => {
  const schema: AppwriteSchema = {
    databases: [],
    collections: [],
    buckets: [],
  };

  schema.databases = (await client.databases.list()).databases;
  schema.buckets = (await client.storage.listBuckets()).buckets;

  for (const db of schema.databases) {
    const dbCollections = (await client.databases.listCollections(db.$id))
      .collections;
    schema.collections.push(...dbCollections);
  }

  return schema;
};

export default generateSchema;
