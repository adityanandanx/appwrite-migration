import { generateSchema, prepareSchema } from "@/schema";
import { generateData, prepareData } from "@/data";
import { Client, Databases, Storage } from "node-appwrite";
import { AppwriteData, AppwriteSchema } from "@/types";

/**
 * Singleton class to manage appwrite migration methods
 */
export default class AppwriteMigrationClient {
  private static instance: AppwriteMigrationClient;
  client: Client;
  databases: Databases;
  storage: Storage;

  private constructor() {
    this.client = new Client();
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  public static getInstance(): AppwriteMigrationClient {
    if (!AppwriteMigrationClient.instance) {
      AppwriteMigrationClient.instance = new AppwriteMigrationClient();
    }
    return AppwriteMigrationClient.instance;
  }

  public setEndpoint(endpoint: string) {
    this.client.setEndpoint(endpoint);
    return this.client;
  }
  public setProject(projectId: string) {
    this.client.setProject(projectId);
    return this.client;
  }
  public setKey(projectAPIKey: string) {
    this.client.setKey(projectAPIKey);
    return this.client;
  }

  /**
   * @abstract This method collects the data from the provided Appwrite account instance and returns the json to store it into the file.
   * @param client {AppwriteMigrationClient}
   * @returns json data
   */
  public generateSchema() {
    return generateSchema(this);
  }

  /**
   * @abstract This method prepares the schema of collection and bucket into the appwrite instance that is provided. It accepts parsed json as input that is generated
   * @param client
   * @param schema
   */
  public prepareSchema(schema: AppwriteSchema) {
    return prepareSchema(this, schema);
  }

  /**
   * @abstract This method method collects the data from the provided schema file which is generated using `generateSchema()` method.
   * @param client
   * @param schema
   * @returns json data
   */
  public generateData(schema: AppwriteSchema) {
    return generateData(this, schema);
  }

  /**
   * @abstract This method prepares the data of collection and bucket from .json file to migrate to the server. It accepts parsed json as input that is generated
   * @param client
   * @param data
   */
  public prepareData(data: AppwriteData) {
    return prepareData(this, data);
  }
}
