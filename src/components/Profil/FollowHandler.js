import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';


const FollowHandler = ({idToFollow, type}) => {
    const userData = useSelector((state) => state.userReducer);

    const [isFollowed, setIsFollowed] = useState(false);
    const [checked, setChecked] = useState('./img/icons/checked.png')
    const [toCheck, setToCheck] = useState('./img/icons/tocheck.png')
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }
    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    }

    useEffect(() => {
        if(!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow]);

    return (
      <>
        {isFollowed && !isEmpty(userData) && (
          <span onClick={handleUnfollow} 
          onMouseEnter={() => {setChecked('./img/icons/checked_hover.png')}} 
          onMouseLeave={() => {setChecked('./img/icons/checked.png')}} 
          className="follow-unfollow-btn">
            {type === "suggestion" && (
              <button className="unfollow-btn">Ajouté</button>
            )}
            {type === "card" && (
              <img
                src={checked}
                alt="checked"
                className="check-pic"
                width={28}
                height={28}
              />
            )}
          </span>
        )}
        {isFollowed === false && !isEmpty(userData) && (
          <span onClick={handleFollow} 
          onMouseEnter={() => {setToCheck('./img/icons/tocheck_hover.png')}} 
          onMouseLeave={() => {setToCheck('./img/icons/tocheck.png')}} 
          className="follow-unfollow-btn">
            {type === "suggestion" && (
              <button className="follow-btn">Suivre</button>
            )}
            {type === "card" && (
              <img
                src={toCheck}
                alt="to-check"
                className="check-pic"
              />
            )}
          </span>
        )}
      </>
    );
};

export default FollowHandler;