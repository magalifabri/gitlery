import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { MdSearch } from 'react-icons/md';
import '../styling/Intro.scss';


const Intro = ({
                   reposLoaded,
                   repos,
                   setRepos,
                   handleInputKeyDown,
                   loading,
                   usernameInputError,
                   usernameInputRef
               }) => {
    return (
        <>
            {/*// REPOS ARE LOADED: VIEWING ...*/}
            <AnimatePresence>
                {
                    reposLoaded &&
                    <motion.section className="intro intro--repos-loaded"
                                    key={'viewing'}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .25, duration: .25}}
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
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .25, duration: .25}}
                                    exit={{
                                        opacity: 0,
                                        transition: {delay: 0}
                                    }}
                    >
                        <p>Enter a GitHub username to create a gitlery (GitHub
                            gallery) for that user</p>

                        <div className="intro__search-bar">
                            <input className="intro__username-input"
                                   onKeyDown={handleInputKeyDown}
                                   ref={usernameInputRef}
                                   type="text"
                            />

                            <MdSearch className="intro__icon"
                                onClick={handleInputKeyDown}
                            />
                        </div>

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
                                    layout // required to not jump down just before exit
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: .25, duration: .25}}
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
