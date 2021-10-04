import React, {useContext, useEffect, useState} from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfil from '../components/Profil/UpdateProfil';
import HeadStains from '../components/Stains/HeadStains';
import Footer from '../components/Footer';
import FriendsHint from '../components/Profil/FriendsHint';



const Profil = () => {
  
    const uid = useContext(UidContext);
  const [actualWidth, setActualWidth] = useState(window.innerWidth);

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
       

    return (
      <>
        <div className="profil-complete">
          <HeadStains />
          <div className="profil-page">
            {uid ? (
              <UpdateProfil />
            ) : (
              <div className="log-container">
                <Log signin={true} signup={false} />
              </div>
            )}
          </div>
          <div className="hint-section">
            {uid && actualWidth < 721 && actualWidth < 480 ? (
              <FriendsHint />
            ) : null}
          </div>
        </div>
      </>
    );
};

export default Profil;