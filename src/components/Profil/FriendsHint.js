import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { isEmpty } from '../Utils';
import FollowHandler from './FollowHandler';

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    

    useEffect(() => {
        const notFriendsList = () => {
          let array = [];
          usersData.map((user) => {
            if (
              user._id !== userData._id &&
              !user.followers.includes(userData._id)
            )
              return array.push(user._id);
          });
          array.sort(() => 0.5 - Math.random());
          if (window.innerHeight > 780) {
            array.length = 5;
          } else if (window.innerHeight > 720) {
            array.length = 4;
          } else if (window.innerHeight > 615) {
            array.length = 2;
          } else if (window.innerHeight > 540) {
            array.length = 1;
          } else {
              array.length = 0;
          }
          setFriendsHint(array);
        };

        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendsList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [usersData, userData, playOnce])

    return (
        <div className="get-friends-container">
            <h4 className="newfriend-title">Suggestions</h4>
            {isLoading ? (
                    <Loader />
                ) : (
                    <ul>
                        {friendHint && friendHint.map((user, index) => {
                            for (let i = 0; i < usersData.length; i ++) {
                                if (user === usersData[i]._id) {
                                    return (
                                      <li className="user-hint" key={index}>
                                        <img
                                          src={usersData[i].picture}
                                          alt="user-pic"
                                          className="user-pic"
                                        />
                                        <img
                                          src="./img/cadre_brush_orange.png"
                                          alt="cadre"
                                          className="border-hint"
                                        />
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowHandler
                                          idToFollow={usersData[i]._id}
                                          type={"suggestion"}
                                        />
                                      </li>
                                    );
                                 }
                            }
                        } 
                        )} 
                    </ul>
                      )}
        </div>
  
    );
};

export default FriendsHint;