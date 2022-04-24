import React from 'react';
import '../styling/Intro.scss';


const Intro = ({reposLoaded, repos, setRepos, handleInputKeyDown, loading}) => {
    return (
        <>
            {
                reposLoaded ?
                    // REPOS ARE LOADED: VIEWING ...
                    <section className="intro intro--repos-loaded">
                        <p>viewing gitlery for {repos[0].username}</p>

                        {/*<button>save link</button>*/}

                        <button className="intro__btn"
                                onClick={() => setRepos([])}
                        >new gitlery
                        </button>
                    </section>

                    :

                    // REPOS ARE NOT LOADED: INPUT FIELD OR LOADING ANIMATION
                    <section className="intro intro--repos-not-loaded">
                        <p>Enter a GitHub username to create a gitlery (GitHub
                            gallery) for that user</p>

                        {
                            !loading ?
                                // REPOS ARE NOT LOADING: INPUT FIELD
                                <input className="intro__username-input"
                                       onKeyDown={handleInputKeyDown}
                                       type="text"
                                />

                                :

                                // REPOS ARE LOADING: LOADING ANIMATION
                                <>
                                    <p>loading...</p>
                                    <div
                                        className="intro__loading-animation-container">
                                        <div
                                            className="intro__loading-animation"></div>
                                    </div>
                                </>
                        }
                    </section>
            }
        </>
    );
};

export default Intro;
