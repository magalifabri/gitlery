import React, {useEffect} from 'react';
import {motion} from "framer-motion";
import '../styling/InfoModal.scss';


const InfoModal = ({setModalVisible}) => {

    useEffect(() => {
        const closeModalOnEcs = ({key}) => {
            if (key === 'Escape') {
                setModalVisible(false);
            }
        };

        window.addEventListener('keydown', closeModalOnEcs);

        return () => {
            window.removeEventListener('keydown', closeModalOnEcs);
        }
    }, []);


    const closeModalOnClick = (event) => {
        if (event.target.classList.contains('info-modal')) {
            setModalVisible(false);
        }
    }


    return (
        <motion.div className="info-modal"
                    onClick={closeModalOnClick}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: .2}}
                    exit={{
                        opacity: 0,
                        transition: {duration: .1}
                    }}
        >
            <div className="info-modal__window">
                <p className="info-modal__line big-text">How It Works</p>
                <p className="info-modal__line">Gitlery checks the repositories for the given username and looks for a screenshot in each readme.</p>
                <p>With the found screenshots it creates an image gallery.</p>
                <p className="info-modal__line">The following rules are followed in the search:</p>
                <ul>
                    <li>the repository is public</li>
                    <li>the readme file is called <em>'README.md'</em> or <em>'readme.md'</em></li>
                    <li>the screenshot is included in the readme as an html <code>image</code> element</li>
                    <li>the <code>src</code> attribute of the <code>image</code> element contains the word <em>'screenshot'</em></li>
                    <li>the first screenshot found is taken</li>
                </ul>

                <hr className="info-modal__hr"/>

                <p className="info-modal__line text-center">Made by <a className="info-modal__link" href="https://github.com/magalifabri">Magali
                    Fabri</a>
                </p>

                <p className="info-modal__line text-center">View source code on <a className="info-modal__link" href="https://github.com/magalifabri/gitlery">GitHub</a></p>
            </div>
        </motion.div>
    );
};

export default InfoModal;
