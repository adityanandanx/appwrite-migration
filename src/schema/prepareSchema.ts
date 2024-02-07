import { Models } from "node-appwrite";
import { AppwriteSchema } from "@/types/index";
import { AppwriteMigrationClient } from "@/client";

const createDatabases = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  for (const db of schema.databases) {
    try {
      await client.databases.delete(db.$id);
      console.log(
        `Deleted and recreating database ${db.name} with ID ${db.$id}...`
      );
    } catch {
      console.log(`Creating Database "${db.name}"...`);
    }
    await client.databases.create(db.$id, db.name, db.enabled);
  }
};

const createCollections = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  for (const collection of schema.collections) {
    try {
      await client.databases.deleteCollection(
        collection.databaseId,
        collection.$id
      );
      console.log(
        `Deleted and recreating collection ${collection.name} with ID ${collection.$id}...`
      );
    } catch {
      console.log(`Creating Collection "${collection.name}"...`);
    }

    await client.databases.createCollection(
      collection.databaseId,
      collection.$id,
      collection.name,
      collection.$permissions,
      collection.documentSecurity,
      collection.enabled
    );
    await createAttributesOfCollection(client, collection);

    await createIndexes(client, collection);
  }
};

const createIndexes = async (
  client: AppwriteMigrationClient,
  collection: Models.Collection
) => {
  console.log(`Creating indexes of ${collection.name}`);
  for (const index of collection.indexes) {
    await client.databases.createIndex(
      collection.databaseId,
      collection.$id,
      index.key,
      index.type,
      index.attributes,
      index.orders
    );
  }
};

const createAttributesOfCollection = async (
  // TODO: write typesafe attributes,
  client: AppwriteMigrationClient,
  collection: Omit<Models.Collection, "attributes"> & { attributes: any }
) => {
  console.log(`Creating Attributes of "${collection.name}"...`);
  for (const attr of collection.attributes) {
    switch (attr.type) {
      case "string":
        switch (attr.format) {
          case "email":
            await client.databases.createEmailAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array
            );
            break;
          case "ip":
            await client.databases.createIpAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array
            );
            break;
          case "url":
            await client.databases.createUrlAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array
            );
            break;
          case "enum":
            await client.databases.createEnumAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.elements,
              attr.required,
              attr.default,
              attr.array
            );
            break;
          default:
            await client.databases.createStringAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.size,
              attr.required,
              attr.default,
              attr.array
            );
        }
        break;
      case "integer":
        await client.databases.createIntegerAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.min,
          attr.max,
          attr.default,
          attr.array
        );
        break;
      case "double":
        await client.databases.createFloatAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.min,
          attr.max,
          attr.default,
          attr.array
        );
        break;
      case "boolean":
        await client.databases.createBooleanAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.default,
          attr.array
        );
        break;
      case "datettime":
        await client.databases.createDatetimeAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.default,
          attr.array
        );
        break;
      case "relationship":
        await client.databases.createRelationshipAttribute(
          collection.databaseId,
          collection.$id,
          attr.relatedCollection,
          attr.relationType,
          attr.twoWay,
          attr.key,
          attr.twoWayKey,
          attr.onDelete
        );
        break;
    }
  }
};

const createBuckets = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  for (const bucket of schema.buckets) {
    try {
      await client.storage.deleteBucket(bucket.$id);
      console.log(`Deleted and recreating Bucket ${bucket.name}...`);
    } catch {
      console.log(`Creating Bucket ${bucket.name}...`);
    }
    await client.storage.createBucket(
      bucket.$id,
      bucket.name,
      bucket.$permissions,
      bucket.fileSecurity,
      bucket.enabled,
      bucket.maximumFileSize,
      bucket.allowedFileExtensions,
      bucket.compression,
      bucket.encryption,
      bucket.antivirus
    );
  }
};

/**
 * @abstract This method prepares the schema of collection and bucket into the appwrite instance that is provided. It accepts parsed json as input that is generated
 * @param client
 * @param schema
 */
const prepareSchema = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  await createDatabases(client, schema);
  await createCollections(client, schema);
  await createBuckets(client, schema);
};

export default prepareSchema;
