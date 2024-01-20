import { Models } from "node-appwrite";

export type AppwriteSchema = {
  databases: Models.Database[];
  collections: Models.Collection[];
  buckets: Models.Bucket[];
};

export type AppwriteData = {
  documents: Models.Document[];
  files: Models.File[];
};