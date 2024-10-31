import React, { useState } from 'react';
import styles from '../styles/AddReviewModal.module.css';
import { createDocument, getDocumentByField } from '../lib/appwrite';
import { Client, Databases } from 'appwrite';
import { useUser } from '@clerk/clerk-react';

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(false);

  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collection_id = import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID;

      const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // Replace with your project ID

    const databases = new Databases(client);

    const listResponse = await databases.listDocuments(
      database_id,
      collection_id,
    );

    // Step 2: Generate new ID as total documents + 1
    const newId = listResponse.total + 1;

    const userDocument = await getDocumentByField(
                          database_id,
                          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID, 
                          "email",
                          user.emailAddresses[0].emailAddress
                        );

    const newReview = {
      review_id: JSON.stringify(newId),
      author_id: userDocument.user_id,
      rating,
      title,
      content: review,
      recommend,
      date: new Date().toLocaleDateString(),
      author_name: userDocument.first_name + " " + userDocument.last_name,
      item_id: JSON.parse(localStorage.getItem("current_item")).item_id,
    };

    await createDocument(database_id, collection_id, newReview);

    onSubmit(newReview);  // Send the new review data to the parent component or server
    onClose();  // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating</label>
            <select 
              id="rating" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              required
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Review Title" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="review">Review</label>
            <textarea 
              id="review" 
              value={review} 
              onChange={(e) => setReview(e.target.value)} 
              placeholder="Write your review here" 
              rows="5" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="recommend">
              <input 
                type="checkbox" 
                id="recommend" 
                checked={recommend} 
                onChange={() => setRecommend(!recommend)} 
              /> 
              I recommend this product
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>Submit Review</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
