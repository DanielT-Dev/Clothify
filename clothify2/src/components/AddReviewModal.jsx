import React, { useState } from 'react';
import styles from '../styles/AddReviewModal.module.css';

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      rating,
      title,
      review,
      recommend,
      date: new Date().toLocaleDateString(),
    };
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
