import Card from '../components/Post/Card';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext';
import { isEmpty } from '../components/Utils';
import FriendsHint from '../components/Profil/FriendsHint';
import HeadStains from '../components/Stains/HeadStains';
import FootStains from '../components/Stains/FootStains';
import { Link } from 'react-router-dom';

const Trending = () => {
    const uid = useContext(UidContext);
    const trendList =useSelector((state) => state.trendingReducer);

    return (
      <>
        <HeadStains />
        <div className="trending-page">
          <div className="trending-main">
            <ul>
              {!isEmpty(trendList[0]) &&
                trendList.map((post) => <Card post={post} key={post._id} />)}
            </ul>
          </div>
          <div className="trending-right-part">
            <div className="right-part-container">
              {uid && <FriendsHint />}
              <Link to="/">
                <button id="back-home">Retour à l'accueil</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
};

export default Trending;