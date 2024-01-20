import { readFileSync } from "fs";
import { AppwriteData, AppwriteSchema } from "@/types/index";

export const getSchemaFromFile = () => {
  const fileContent = readFileSync("schema.json", { encoding: "utf-8" });
  const schema: AppwriteSchema = JSON.parse(fileContent);
  return schema;
};

export const getDataFromFile = () => {
  const fileContents = readFileSync("data.json", { encoding: "utf-8" });
  const data: AppwriteData = JSON.parse(fileContents);
  return data;
};
