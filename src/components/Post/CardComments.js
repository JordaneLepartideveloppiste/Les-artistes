import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, timestampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ( { post, actualWidth } ) => {
   
    
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    

    return (
        <>
            {post.comments.map((comment) => {
                return (
                  <div
                    className={
                      comment.commenterId === userData._id
                        ? "comment-container-client"
                        : "comment-container"
                    }
                    key={comment._id}
                  >
                    <div className="comment-top">
                      {actualWidth > 480 ? (
                        <div className="left-part">
                          <img
                            src={
                              !isEmpty(usersData[0]) &&
                              usersData
                                .map((user) => {
                                  if (user._id === comment.commenterId)
                                    return user.picture;
                                  else return null;
                                })
                                .join("")
                            }
                            alt="commenter-pic"
                            className="commenter-pic"
                          />
                        </div>
                      ) : null}
                      <div className="right-part">
                        <div className="comment-header">
                          <div className="pseudo">
                            {actualWidth < 481 && (
                              <img
                                src={
                                  !isEmpty(usersData[0]) &&
                                  usersData
                                    .map((user) => {
                                      if (user._id === comment.commenterId)
                                        return user.picture;
                                      else return null;
                                    })
                                    .join("")
                                }
                                alt="commenter-pic"
                                className="commenter-pic"
                              />
                            )}
                            <h3>{comment.commenterPseudo}</h3>
                            {comment.commenterId !== userData._id && (
                              <FollowHandler
                                idToFollow={comment.commenterId}
                                type={"card"}
                              />
                            )}
                          </div>
                          <div className="date-post">
                            {timestampParser(comment.timestamp)}
                          </div>
                        </div>
                        <p className="comment">{comment.text}</p>
                      </div>
                    </div>
                    <EditDeleteComment comment={comment} postId={post._id} />
                  </div>
                );
            })}
            
        </>
    );
};

export default CardComments;