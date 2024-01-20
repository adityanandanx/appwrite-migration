import { databases } from "@/config/appwrite.config";
import { AppwriteData } from "@/types/index";
import { getDataFromFile } from "@/utils/utils";

const createDocuments = async (data: AppwriteData) => {
  for (const document of data.documents) {
    try {
      await databases.deleteDocument(
        document.$databaseId,
        document.$collectionId,
        document.$id
      );
      console.log(`Deleted and recreating document ${document.$id}...`);
    } catch {
      console.log(`Creating document ${document.$id}`);
    }
    const data: { [k: string]: any } = {};

    for (const key of Object.keys(document)) {
      if (key.charAt(0) != "$") {
        data[key] = { ...document }[key];
      }
    }

    await databases.createDocument(
      document.$databaseId,
      document.$collectionId,
      document.$id,
      { ...data },
      document.$permissions
    );
  }
};

const prepareData = async () => {
  const data = getDataFromFile();

  await createDocuments(data);
};

prepareData();
