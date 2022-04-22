import React from 'react';
import '../styling/Modal.scss';


const Modal = ({repo, setSelectedRepo}) => {

    const removeModal = (event) => {
        if (event.target.classList.contains('modal')) {
            setSelectedRepo('');
        }
    }


    const showImage = (event) => {
        event.target.style.opacity = '1';
    }


    return (
        <div className="modal"
             onClick={removeModal}
        >
            <img className="modal__image"
                 onLoad={showImage}
                 src={repo.screenshotUrl} alt=""
            />
        </div>
    );
};

export default Modal;
