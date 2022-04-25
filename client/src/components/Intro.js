import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import '../styling/Intro.scss';


const Intro = ({
                   reposLoaded,
                   repos,
                   setRepos,
                   handleInputKeyDown,
                   loading,
                   usernameInputError
               }) => {
    return (
        <>
            {/*// REPOS ARE LOADED: VIEWING ...*/}
            <AnimatePresence>
                {
                    reposLoaded &&
                    <motion.section className="intro intro--repos-loaded"
                                    key={'viewing'}
                                    layout
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .5, duration: .5}}
                                    exit={{
                                        opacity: 0,
                                        transition: {delay: 0}
                                    }}
                    >
                        <p>viewing gitlery for {repos[0].username}</p>

                        {/*<button>save link</button>*/}

                        <button className="intro__btn"
                                onClick={() => setRepos([])}
                        >new gitlery
                        </button>
                    </motion.section>
                }
            </AnimatePresence>

            {/*// REPOS ARE NOT LOADED OR LOADING: INPUT FIELD*/}
            <AnimatePresence>
                {
                    !reposLoaded && !loading &&
                    <motion.section className="intro intro--repos-not-loaded"
                                    key={'input'}
                                    layout
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .5, duration: .5}}
                                    exit={{
                                        opacity: 0,
                                        transition: {delay: 0}
                                    }}
                    >
                        <p>Enter a GitHub username to create a gitlery (GitHub
                            gallery) for that user</p>

                        <input className="intro__username-input"
                               onKeyDown={handleInputKeyDown}
                               type="text"
                        />

                        {
                            usernameInputError ?
                                <p>{usernameInputError}</p>
                                : null
                        }
                    </motion.section>
                }
            </AnimatePresence>

            {/*// REPOS ARE LOADING: LOADING ANIMATION*/}
            <AnimatePresence>
                {
                    !reposLoaded && loading &&
                    <motion.section className="intro intro--repos-loading"
                                    key={'loading'}
                                    layout
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .5, duration: .5}}
                                    exit={{
                                        opacity: 0,
                                        transition: {delay: 0}
                                    }}
                    >
                        <p>loading...</p>

                        <div className="intro__loading-animation-container">
                            <div className="intro__loading-animation"></div>
                        </div>
                    </motion.section>
                }
            </AnimatePresence>
        </>
    );
};

export default Intro;
