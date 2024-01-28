import { AppwriteSchema, AppwriteData } from "@/types/index";
import { AppwriteMigrationClient } from "@/client";

const generateData = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  const data: AppwriteData = { documents: [], files: [] };

  for (const db of schema.databases) {
    for (const collection of schema.collections) {
      const docs = (
        await client.databases.listDocuments(db.$id, collection.$id)
      ).documents;
      data.documents.push(...docs);
    }
  }

  for (const bucket of schema.buckets) {
    data.files = (await client.storage.listFiles(bucket.$id)).files;
  }

  return data;
};

export default generateData;
