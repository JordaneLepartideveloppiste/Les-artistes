import NewPostForm from "../Post/NewPostForm"


const ModalNewPost = ({setModalNewPost, actualWidth, setBtnNewPost}) => {

    const handleCloseModal = () => {
      setModalNewPost(false)
      setBtnNewPost(true)
    };

    return (
      <div className="modal-new-post">
        <div className="close-modal" onClick={handleCloseModal}>
          X
        </div>
        <NewPostForm
          setModalNewPost={setModalNewPost}
          actualWidth={actualWidth}
        />
      </div>
    );
};

export default ModalNewPost;