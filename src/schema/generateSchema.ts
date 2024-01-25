import { AppwriteSchema } from "@/types/index";
import { writeFileSync } from "fs";
import { AppwriteMigrationClient } from "@/client";

const getSchema = async (client: AppwriteMigrationClient) => {
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

const generateSchema = async (client: AppwriteMigrationClient) => {
  const schema = await getSchema(client);
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), {
    encoding: "utf-8",
  });
};

export default generateSchema;
