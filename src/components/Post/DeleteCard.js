import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {
const dispatch = useDispatch();

const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <div onClick={() => {
            if (window.confirm('Tu es sûr de toi????')) {
                deleteQuote();
            }
        }}>
            <img src="./img/icons/eraser.png" alt="trash" id="eraser"/>
        </div>
    );
};

export default DeleteCard;