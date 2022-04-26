import React, {useEffect} from 'react';
import {motion} from "framer-motion";
import '../styling/ModalContainer.scss';


const ModalContainer = (props) => {

    useEffect(() => {
        const closeModalOnEcs = ({key}) => {
            if (key === 'Escape') {
                props.setModalVisible(false);
            }
        };

        window.addEventListener('keydown', closeModalOnEcs);

        return () => {
            window.removeEventListener('keydown', closeModalOnEcs);
        }
    }, []);


    const closeModalOnClick = (event) => {
        if (event.target.classList.contains('modal-container')) {
            props.setModalVisible(false);
        }
    }


    return (
        <motion.div className="modal-container"
                    onClick={closeModalOnClick}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: .2}}
                    exit={{
                        opacity: 0,
                        transition: {duration: .1}
                    }}
        >
            <div className="modal-container__window">

                {props.children}

            </div>
        </motion.div>
    );
};

export default ModalContainer;
