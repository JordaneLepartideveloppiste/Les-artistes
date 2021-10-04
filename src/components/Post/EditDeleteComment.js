import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    };

    const handleDelete = () => dispatch(deleteComment(postId, comment._id));

    useEffect(() => {
        const checkAuthor = () => {
          if (uid === comment.commenterId) {
            setIsAuthor(true);
          }
        };
        checkAuthor();
    }, [uid, comment.commenterId])

    return (
      <div className="edit-comment">
        {isAuthor && edit === false && (
          <button onClick={() => setEdit(!edit)} className="edit-comment-btn">
         Modifier   
          </button>
        )}
        {isAuthor && edit && (
          <form action="" onSubmit={handleEdit} className="edit-comment-form">
            <div className="edit-area">
              <textarea
              row="20"
              className="update-comment-area"
                type="text"
                name="text"
                onChange={(e) => setText(e.target.value)}
                defaultValue={comment.text}
              ></textarea>
              <label htmlFor="text" onClick={() => setEdit(!edit)}>
                X
              </label>
            </div>
            <div className="btn">
              <button
                className="trash-comment-btn"
                onClick={() => {
                  if (window.confirm("C'est un projet sûr????")) {
                    handleDelete();
                  }
                }}
              >
                Supprime
              </button>
              <input
                type="submit"
                value="modifie"
                className="update-comment-btn"
              />
            </div>
          </form>
        )}
      </div>
    );
};

export default EditDeleteComment;