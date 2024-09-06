import React, { useEffect, useState } from 'react'
import Header from './Header'

import { useIdeas } from "../lib/ideas";

import { useNavigate } from 'react-router-dom';

import styles from "../styles/Home.module.css";

import Modal from 'react-modal';
import PriceSlider from './PriceSlider';
import Brands from './Brands';
import Notification from './Notification';
import Footer from './Footer';

Modal.setAppElement('#root');

const Home = () => {

  const navigate = useNavigate();

  const ideas = useIdeas();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [searchFilter, setSearchFilter] = useState(localStorage.getItem('searchFilter'));

  const [grid, setGrid] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Automatically close after 3 seconds
  };

  const [selectedBrands, setSelectedBrands] = useState({
    nike: false,
    adidas: false,
    puma: false,
    reebok: false,
    underArmour: false,
    newBalance: false,
    fila: false,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const [trueSelectedBrands, setTrueSelectedBrands] = useState([]);

  useEffect(() => {
    const t = Object.entries(selectedBrands);
    const filtered_t = t.filter(([key, value]) => value === true);
    setTrueSelectedBrands(filtered_t);
  }, [selectedBrands])

  useEffect(() => {

  }, [grid]);

  return (
    
    <div>
        <Header setSearchFilter={setSearchFilter}/>
        <div className={styles.body}>
          {
            searchFilter != "" && 
            <h1 style={{fontSize: "2.25vh", marginLeft: "7.5vw"}}>
              Showing results for: "{searchFilter}"
            </h1>
          }
        <div style={{display: "flex", flexDirection: "row"}}>
          <button className={styles.filter} style={{display: "flex", flexDirection: "row"}}  onClick={() => setShowFilterModal(true)}>
            <img src="/filter1.png"/>
            <p>
              Filter items
            </p>
          </button>
          <button className={styles.filter} style={{display: "flex", flexDirection: "row"}} onClick={() => setGrid(!grid)}>
            {
              !grid &&
              <>
                <img src="/grid1.png" style={{scale: "0.75"}}/>
                <p>
                  Grid View
                </p>
              </>
            }
             {
              grid &&
              <>
                <img src="/list1.png" style={{scale: "0.75"}}/>
                <p>
                  List View
                </p>
              </>
            }
          </button>
        </div>
        
        <div className={`${grid ? styles.grid_container : ''}`}>
        {
          trueSelectedBrands.length === 0 ?
          ideas.current.filter((idea) => searchFilter == "" || idea.title.toLowerCase().includes(searchFilter.toLocaleLowerCase())).map((idea) => (
            <>{
              parseFloat(idea.price.replace(/[^0-9.-]+/g, '')) >= priceRange[0] && parseFloat(idea.price.replace(/[^0-9.-]+/g, '')) <= priceRange[1] &&
            <div 
              key={idea.$id}
              className={styles.box}
              onClick={() => {
                localStorage.setItem("current_item", JSON.stringify(idea));
                navigate('/item');
              }}
            >
              <div style={{display: 'flex', flexDirection: "row"}}>
                <div className={styles.sale} style={{visibility: idea.sale[0] != "0" ? "visible" : "hidden"}}>
                  <p>
                    {idea.sale}
                  </p>
                </div>
                <div className={styles.sale} style={{marginLeft: grid ? "33%" : "65%", backgroundColor: "transparent", display: 'flex', flexDirection: "row", marginTop: "-1vh"}}>
                <p>
                  {idea.price}
                </p>
                {idea.sale[0] != "0" && <p style={{textDecoration: 'line-through', textDecorationStyle: "double", marginLeft: "2vw"}}>
                    ${(parseFloat(idea.price.replace('$', ''))/(1-parseFloat(idea.sale.replace('%', ''))/100))}
                  </p>
                }
                </div>
              </div>
              <img src={idea.image_url}/>
              <h1 className={styles.overflow_dots}>{idea.title}</h1>
            </div>
            }</>
          ))
          :
          ideas.current.filter((idea) => searchFilter == "" || idea.title.toLowerCase().includes(searchFilter.toLocaleLowerCase())).filter((idea) => trueSelectedBrands.map(([key, value]) => key.toLowerCase()).includes(idea.brand.toLowerCase())).map((idea) => (
            <>{
              parseFloat(idea.price.replace(/[^0-9.-]+/g, '')) >= priceRange[0] && parseFloat(idea.price.replace(/[^0-9.-]+/g, '')) <= priceRange[1] &&
            <div 
              key={idea.$id}
              className={styles.box}
              onClick={() => {
                localStorage.setItem("current_item", JSON.stringify(idea));
                navigate('/item');
              }}
            >
              <div style={{display: 'flex', flexDirection: "row"}}>
                <div className={styles.sale} style={{visibility: idea.sale[0] != "0" ? "visible" : "hidden"}}>
                  <p>
                    {idea.sale}
                  </p>
                </div>
                <div className={styles.sale} style={{marginLeft: grid ? "33%" : "65%", backgroundColor: "transparent", display: 'flex', flexDirection: "row", marginTop: "-1vh"}}>
                <p>
                  {idea.price}
                </p>
                {idea.sale[0] != "0" && <p style={{textDecoration: 'line-through', textDecorationStyle: "double", marginLeft: "2vw"}}>
                    ${(parseFloat(idea.price.replace('$', ''))/(1-parseFloat(idea.sale.replace('%', ''))/100))}
                  </p>
                }
                </div>
              </div>
              <img src={idea.image_url}/>
              <h1 className={styles.overflow_dots}>{idea.title}</h1>
            </div>
            }</>
          ))
        }
        </div>
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
                  <PriceSlider
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                  <Brands 
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                  />
                  <button onClick={() => {setShowFilterModal(false); handleShowNotification();}}>
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
        <Footer/>
    </div>
  )
}

export default Home