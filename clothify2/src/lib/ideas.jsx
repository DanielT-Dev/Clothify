import React, { createContext, useContext, useEffect, useState } from "react";
import { databases } from "./appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // Ensure this is correctly set
export const IDEAS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Ensure this is correctly set

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function add(idea) {
    try {
      const response = await databases.createDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea
      );
      setIdeas((prevIdeas) => [response, ...prevIdeas].slice(0, 10));
    } catch (err) {
      setError('Error adding idea: ' + err.message);
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.$id !== id));
      await init(); // Refetch ideas to ensure we have the latest
    } catch (err) {
      setError('Error removing idea: ' + err.message);
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (err) {
      setError('Error fetching ideas: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove, loading, error }}>
      {children}
    </IdeasContext.Provider>
  );
}
