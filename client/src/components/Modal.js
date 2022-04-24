import React, {useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import '../styling/Modal.scss';


const Modal = ({repo, screenshotOrientation, setSelectedRepo}) => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const linksRef = useRef();


    useEffect(() => {
        const closeModalOnEcs = ({key}) => {
            if (key === 'Escape') {
                setSelectedRepo(null);
            }
        };

        window.addEventListener('keydown', closeModalOnEcs);

        return () => {
            window.removeEventListener('keydown', closeModalOnEcs);
        }
    }, []);


    const closeModalOnClick = (event) => {
        if (event.target.classList.contains('modal')) {
            setSelectedRepo(null);
        }
    }


    const showImage = (event) => {
        event.target.style.opacity = '1';

        nameRef.current.style.transform = 'translateY(0vh)';
        nameRef.current.style.opacity = '1';

        if (repo.description) {
            descriptionRef.current.style.transform = 'translateY(0vh)';
            descriptionRef.current.style.opacity = '1';
        }

        linksRef.current.style.transform = 'translateY(0vh)';
        linksRef.current.style.opacity = '1';
    }


    const getModalClassNames = () => {
        let classNames = 'modal';

        if (screenshotOrientation === 'repo-card--tall') {
            classNames += ' modal--tall-image';
        } else {
            classNames += ' modal--wide-image';
        }

        if (repo.description) {
            classNames += ' modal--with-description';
        }

        return classNames;
    }


    return (
        <motion.div className={getModalClassNames()}
                    onClick={closeModalOnClick}
                    key={repo.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: .2}}
                    exit={{opacity: 0,
                    transition: {duration: .1}}}
        >
            <p className="modal__name"
               ref={nameRef}
            >{repo.name}</p>

            <img className="modal__image"
                 onLoad={showImage}
                 src={repo.screenshotUrl} alt=""
            />

            {
                repo.description &&
                <p className="modal__description"
                   ref={descriptionRef}
                >{repo.description}</p>
            }

            <div className="modal__links-wrapper"
                 ref={linksRef}
            >
                <a className="modal__repo-link" href={repo.html_url}
                   target="_blank" rel="noreferrer"
                >source code</a>

                {
                    repo.homepage &&
                    <a className="modal__homepage" href={repo.homepage}
                       target="_blank" rel="noreferrer"
                    >homepage</a>
                }
            </div>
        </motion.div>
    );
};

export default Modal;
