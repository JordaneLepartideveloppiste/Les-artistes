import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Log from '../components/Log';
import ModalNewPost from '../components/Modal/ModalNewPost';
import NewPostForm from '../components/Post/NewPostForm';
import FriendsHint from '../components/Profil/FriendsHint';
import HeadStains from '../components/Stains/HeadStains';
import Thread from '../components/Thread';
import Trends from '../components/Trends';

const Home = () => {
const uid = useContext(UidContext);
const [actualWidth, setActualWidth] = useState(window.innerWidth);
const [modalNewPost, setModalNewPost] = useState(false);
const [btnNewPost, setBtnNewPost] = useState(true);

useEffect(() => {
  const updateActualWidth = () => {
    let w = window;
    let width = w.innerWidth;
    setActualWidth(width);
  };
  window.addEventListener("resize", updateActualWidth);
  updateActualWidth();
  console.log(actualWidth);
}, []);

  const handleModal = () => {
                setModalNewPost(true)
                setBtnNewPost(!btnNewPost)
              }

    return (
      <>
        <div className="home-complete">
          <HeadStains />
          <div className={uid ? "home-page-in" : "home-page-out"}>
            <div className="main">
              <div className="home-header">
                {uid ? (
                  actualWidth > 480 && <NewPostForm actualWidth={actualWidth} />
                ) :  null}
              </div>
              <Thread setBtnNewPost={setBtnNewPost} actualWidth={actualWidth} />
            </div>
            <div className="right-side">
              <div className="right-side-container">
                <div className="wrapper">
                  <Trends />
                  {uid && <FriendsHint />}
                </div>
              </div>
            </div>
          </div>
          {modalNewPost && (
            <ModalNewPost
              setModalNewPost={setModalNewPost}
              actualWidth={actualWidth}
              setBtnNewPost={setBtnNewPost}
            />
          )}
          {uid && actualWidth < 481 && btnNewPost && (
            <button
              id="modal-post-480"
              onClick={handleModal}
            >
              S'exprimer
            </button>
          )}
        </div>
        
      </>
    );
};

export default Home;