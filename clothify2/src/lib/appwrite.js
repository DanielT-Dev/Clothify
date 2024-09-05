import { Client, Databases, Account, Query, ID } from "appwrite";

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

export const updateDocument = async (databaseId, collectionId, documentId, updateData) => {
    try {
        const response = await databases.updateDocument(databaseId, collectionId, documentId, updateData);
        return response;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error; // Rethrow error to be handled by the caller
    }
};

export const createDocument = async (databaseId, collectionId, data) => {
    try {
        const response = await databases.updateDocument(databaseId, collectionId, ID.unique(), data);
        return response;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error; 
    }
}