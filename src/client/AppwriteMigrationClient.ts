import { generateSchema, prepareSchema } from "@/schema";
import { generateData, prepareData } from "@/data";
import { Client, Databases, Storage } from "node-appwrite";

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

  public generateSchema() {
    return generateSchema(this);
  }
  public prepareSchema() {
    return prepareSchema(this);
  }
  public generateData() {
    return generateData(this);
  }
  public prepareData() {
    return prepareData(this);
  }
}
