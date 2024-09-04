import { Client, Databases, Account, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);

export const getDocumentByField = async (databaseId, collectionId, field, value) => {
  try {
      const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal(field, value)
      ]);

      if (response.documents.length > 0) {
          return response.documents[0];
      } else {
          return null;
      }
  } catch (error) {
      throw new Error('Error retrieving document: ' + error.message);
  }
};