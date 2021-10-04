import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Uploadimg from './Uploadimg';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import FriendsHint from "./FriendsHint";
import FollowHandler from './FollowHandler';
import { uploadPicture } from "../../actions/user.actions";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const error = useSelector((state) => state.errorReducer.userError)
    const [bio, setBio]= useState(''); 
    const [updateForm, setUpdateForm]= useState(false); 
    const dispatch= useDispatch();
    const [file, setFile] = useState();
    
   


    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    };

    const handlePicture = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", userData.pseudo);
      data.append("userId", userData._id);
      data.append("file", file);

      dispatch(uploadPicture(data, userData._id));
    };

  

    return (
      <div className="profil-container">
        <h2>Voilà ton profil, </h2>
        <h1>{userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Ta Tête</h3>
            <img
              src={userData.picture}
              alt="photo_profil"
              className="user-pic"
            />
            <Uploadimg
              label="Change de tête"
              setFile={setFile}
              handlePicture={handlePicture}
            />
            <p>{error.maxSize}</p>
            <p>{error.format}</p>
          </div>
          <div className="center-part">
            {!updateForm ? (
              <div className="bio-update">
                <h3>Ta description</h3>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button
                  className="update-bio-btn"
                  onClick={() => setUpdateForm(!updateForm)}
                >
                  Modifier
                </button>
                <Link to="/">
                  <button id="back-home">Retour à l'accueil</button>
                </Link>
              </div>
            ) : (
              <div className="bio-update">
                <h3>Raconte ta vie mais fais court stp</h3>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button className="update-bio-btn" onClick={handleUpdate}>
                  Valider
                </button>
                <Link to="/">
                  <button id="back-home">Retour à l'accueil</button>
                </Link>
              </div>
            )}
          </div>
          <div className="right-part">
            <h4 className="since">
              Pilote dans notre écurie depuis le{" "}
              {dateParser(userData.createdAt)}
            </h4>

            <div className="followers-count">
              <div className="follow-titles">
                <span>
                  Abonné
                  {userData.followers && userData.followers.length > 1
                    ? "s"
                    : null}{" "}
                  :{" "}
                </span>
                <span>
                  {userData.followers ? userData.followers.length : ""}
                </span>
              </div>
              <div className="followers-list-profil">
                <div className="list-follo">
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <dix className="follo" key={user._id}>
                            <img
                              src={user.picture}
                              alt="user-pic"
                              className="user-profil-pic"
                            />
                            <img
                              src="./img/cadre_brush.png"
                              alt="cadre"
                              className="cadre"
                            />
                            <h4 className="pseudo-follow">{user.pseudo}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                idToFollow={user._id}
                                type={"card"}
                              />
                            </div>
                          </dix>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="follow-count">
              <div className="follow-titles">
                <span>
                  Abonnement
                  {userData.following && userData.following.length > 1
                    ? "s"
                    : null}{" "}
                  :{" "}
                </span>{" "}
                <span>
                  {userData.following ? userData.following.length : ""}
                </span>
              </div>
              <div className="followings-list-profil">
                <div className="list-follo">
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.following.length; i++) {
                      if (user._id === userData.following[i]) {
                        return (
                          <div className="follo" key={user._id}>
                            <img
                              src={user.picture}
                              alt="user-pic"
                              className="user-profil-pic"
                            />
                            <img
                              src="./img/cadre_brush_orange.png"
                              alt="cadre"
                              className="cadre"
                            />
                            <h4 className="pseudo-follow">{user.pseudo}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                idToFollow={user._id}
                                type={"card"}
                              />
                            </div>
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        {/* {followingPopUp && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Qui tu suis</h3>
              <span className="cross" onClick={(e) => setFollowingPopUp(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={user._id}
                              type={"suggestion"}
                            />
                          </div>
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
        {followersPopUp && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Tes abonnés</h3>
              <span className="cross" onClick={(e) => setFollowersPopUp(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={user._id}
                              type={"suggestion"}
                            />
                          </div>
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )} */}
      </div>
    );
};

export default UpdateProfil;