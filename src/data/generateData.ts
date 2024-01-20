import { Databases, Storage } from "node-appwrite";
import { databases, storage } from "@/config/appwrite.config";
import { AppwriteSchema, AppwriteData } from "@/types/index";
import { readFileSync, writeFileSync } from "fs";
import { getSchemaFromFile } from "@/utils/utils";

const getData = async (schema: AppwriteSchema) => {
  const data: AppwriteData = { documents: [], files: [] };

  for (const db of schema.databases) {
    for (const collection of schema.collections) {
      data.documents = (
        await databases.listDocuments(db.$id, collection.$id)
      ).documents;
    }
  }

  for (const bucket of schema.buckets) {
    data.files = (await storage.listFiles(bucket.$id)).files;
  }

  return data;
};

const writeDataToFile = async () => {
  const schema: AppwriteSchema = getSchemaFromFile();
  const data = await getData(schema);

  writeFileSync("data.json", JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
};

writeDataToFile();
