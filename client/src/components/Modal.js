import React from 'react';
import '../styling/Modal.scss';


const Modal = ({repo, setSelectedRepo}) => {

    const removeModal = (event) => {
        if (event.target.classList.contains('modal')) {
            setSelectedRepo('');
        }
    }


    return (
        <div className="modal"
        onClick={removeModal}
        >
            <img className="modal__image" src={repo.screenshotUrl} alt=""/>
        </div>
    );
};

export default Modal;
