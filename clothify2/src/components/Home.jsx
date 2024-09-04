import React, { useState } from 'react'
import Header from './Header'

import { useIdeas } from "../lib/ideas";

import { useNavigate } from 'react-router-dom';

import styles from "../styles/Home.module.css";

import Modal from 'react-modal';
import PriceSlider from './PriceSlider';
import Brands from './Brands';
import Notification from './Notification';

Modal.setAppElement('#root');

const Home = () => {

  const navigate = useNavigate();

  const ideas = useIdeas();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Automatically close after 3 seconds
  };

  return (
    
    <div>
        <Header/>
        <div className={styles.body}>
        <button className={styles.filter} style={{display: "flex", flexDirection: "row"}}  onClick={() => setShowFilterModal(true)}>
          <img src="/filter1.png"/>
          <p>
            Filter items
          </p>
        </button>
        {
          ideas.current.map((idea) => (
            <div 
              key={idea.$id}
              className={styles.box}
              onClick={() => {
                localStorage.setItem("current_item", JSON.stringify(idea));
                navigate('/item');
              }}
            >
              <div style={{display: 'flex', flexDirection: "row"}}>
                <div className={styles.sale}>
                  <p>
                    {idea.sale}
                  </p>
                </div>
                <div className={styles.sale} style={{marginLeft: "73%", backgroundColor: "transparent"}}>
                  {idea.price}
                </div>
              </div>
              <img src={idea.image_url}/>
              <h1>{idea.title}</h1>
            </div>
          ))
        }
        <Modal
                isOpen={showFilterModal}
                onRequestClose={() => setShowFilterModal(false)}
                style={{
                    content: {
                        width: '70vw',
                        height: "73vh",
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: '10px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
              <div className={styles.filter_modal}>
                <h1>
                  Filter Items
                </h1>
                  <PriceSlider/>
                  <Brands/>
                  <button onClick={() => {setShowFilterModal(false); handleShowNotification()}}>
                    Save
                  </button>
              </div>
          </Modal>

          {showNotification && (
            <Notification 
              message="Filter settings updated." 
              onClose={() => setShowNotification(false)} 
            />
          )}
        </div>
    </div>
  )
}

export default Home