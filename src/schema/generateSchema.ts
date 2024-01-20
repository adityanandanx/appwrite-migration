import { Databases, Storage } from "node-appwrite";
import { databases, storage } from "../config/appwrite.config";
import { AppwriteSchema } from "@/types/index";
import { readFileSync, writeFileSync } from "fs";

const getSchema = async () => {
  const schema: AppwriteSchema = {
    databases: [],
    collections: [],
    buckets: [],
  };

  schema.databases = (await databases.list()).databases;
  schema.buckets = (await storage.listBuckets()).buckets;

  for (const db of schema.databases) {
    const dbCollections = (await databases.listCollections(db.$id)).collections;
    schema.collections.push(...dbCollections);
  }

  return schema;
};

export const generateSchema = async () => {
  const schema = await getSchema();
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), {
    encoding: "utf-8",
  });
};
