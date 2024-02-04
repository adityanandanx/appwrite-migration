# Appwrite Migration

<div align="center">

![GitHub contributors](https://img.shields.io/github/contributors/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![license MIT](https://img.shields.io/github/license/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![Stargazers](https://img.shields.io/github/stars/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub Open issues](https://img.shields.io/github/issues/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub Closed issues](https://img.shields.io/github/issues-closed/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub PR Open](https://img.shields.io/github/issues-pr/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub PR closed](https://img.shields.io/github/issues-pr-closed/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/iMADi-ARCH/appwrite-migration?style=for-the-badge)
![GitHub Release](https://img.shields.io/github/v/release/iMADi-ARCH/appwrite-migration?style=for-the-badge)

</div>

## Introduction

**Appwrite Migration** is a comprehensive utility designed to streamline database migrations within the Appwrite Ecosystem. This library facilitates seamless schema and data transitions, enhancing the ease and predictability of managing different environments.

_We strongly recommend reading through the entire [README](README.md), paying close attention to Setting-up and Recommendations sections!_

## Installation Guide

To install the package, simply follow the below commands:

```bash
# using npm
npm install appwrite-migration

# using yarn
yarn add appwrite migration
```

## Getting Started

_Before getting started with the documentation you must have a basic knowledge of what Appwrite is and how to integrate in your project. You can have a quick look by clicking on the [link here](https://appwrite.io/docs/)._

### Initialization

After the installation, extract the function `createAppwriteMigrationClient` from `appwrite-migration`

```ts
import { createAppwriteMigrationClient } from "appwrite-migration";

const appwriteObject = createAppwriteMigrationClient(
  endPoint,
  projectID,
  apiKey
);
```

The `createAppwriteMigrationClient()` function accepts 3 parameters:-

1. Endpoint: it the endpoint of your appwrite server
2. ProjectID: it is the ID of the project instance that you create in which you want the migration functionality
3. APIKey: it is a unique private key which is generated a the appwrite instance.

The Appwrite Object helps you to access 4 functions so that you can migrate your collections, buckets. The 4 methods are:

- generateSchema()
- prepareSchema()
- generateData()
- prepareData()

**Note:** support for function migration is coming soon.

### Generate Schema Method

`generateSchema()` method collects the data from the provided Appwrite account instance and returns the json to store it into the file. Below is the example on how to collect it:

```ts
const schema = await appwriteObject.generateSchema();
```

To save the json into a file, you can follow the below code snippet:

```ts
import { writeFileSync } from "fs";

const generateSchemaFile = async () => {
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), {
    encoding: "utf-8",
  });
};
```

### Prepare Schema Method

`prepareSchema()` method prepares the schema of collection and bucket into the appwrite instance that is provided. It accepts parsed json as input that is generated using the help of `generateSchema()` method.

**Note:** it generates a fresh schema so note to take backup of your data as it will delete the previous data.

To use this function follow the below command to read the .json file from your local machine

```ts
import { readFileSync } from "fs";

export const prepareSchemaFile = () => {
  const fileContent = readFileSync("schema.json", { encoding: "utf-8" });
  const schema = JSON.parse(fileContent);
  return schema;
};
```

To load the schema file into the function, follow the below command:

```ts
let schemaFile = prepareSchemaFile();

await appwriteObject.prepareSchema(schemaFile);
```

### Generate Data Method

`generateData()` method collects the data from the provided schema file which is generated using `generateSchema()` method. This method accepts schema as a parameter and return the documents in the form .json file which can be written in a file.

```ts
const schema = await appwriteObject.generateSchema();

const generatedData = await appwriteObject.generateData(schema);
```

To save the json into a file, you can follow the below code snippet:

```ts
import { writeFileSync } from "fs";

const generateDataFile = async () => {
  writeFileSync("data.json", JSON.stringify(generatedData, null, 2), {
    encoding: "utf-8",
  });
};
```

### Prepare Data Method

`prepareData()` method prepares the data of collection and bucket from .json file to migrate to the server. It accepts parsed json as input that is generated using the help of `generateData()` method.

**Note:** this method will help you to migrate the code into a new appwrite instance.

To use this function follow the below command to read the .json file from your local machine

```ts
import { readFileSync } from "fs";

export const prepareDataFile = () => {
  const fileContents = readFileSync("data.json", { encoding: "utf-8" });
  const data: Data = JSON.parse(fileContents);
  return data;
};
```

To load the data file into the function, follow the below command:

```ts
let schemaFile = prepareDataFile();

await appwriteObject.prepareSchema(schemaFile);
```

## 🛡️ License

apwrite-migration is licensed under the MIT License - see the [LICENSE](Licence) file for details.

## 🙏🏽 Support

This package needs a star️ from you. Don't forget to leave a star 🌟
