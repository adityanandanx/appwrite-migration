import { AppwriteSchema, AppwriteData } from "@/types/index";
import { writeFileSync } from "fs";
import { getSchemaFromFile } from "@/utils/utils";
import { AppwriteMigrationClient } from "@/client";

const getData = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  const data: AppwriteData = { documents: [], files: [] };

  for (const db of schema.databases) {
    for (const collection of schema.collections) {
      data.documents = (
        await client.databases.listDocuments(db.$id, collection.$id)
      ).documents;
    }
  }

  for (const bucket of schema.buckets) {
    data.files = (await client.storage.listFiles(bucket.$id)).files;
  }

  return data;
};

const generateData = async (client: AppwriteMigrationClient) => {
  const schema: AppwriteSchema = getSchemaFromFile();
  const data = await getData(client, schema);

  writeFileSync("data.json", JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
};

export default generateData;
