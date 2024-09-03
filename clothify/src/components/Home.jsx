import React from 'react'
import Header from './Header'

import { useIdeas } from "../lib/ideas";

import styles from "../styles/Home.module.css";

const Home = () => {
//
  const ideas = useIdeas();

  return (
    
    <div>
        <Header/>
        <div className={styles.body}>
        {
          ideas.current.map((idea) => (
            <div 
              key={idea.$id}
              className={styles.box}
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
        </div>
    </div>
  )
}

export default Home