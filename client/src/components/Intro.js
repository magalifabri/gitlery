import React from 'react';
import '../styling/Intro.scss';


const Intro = ({reposLoaded, repos, setRepos, handleInputKeyDown, loading}) => {
    return (
        <>
            {
                reposLoaded ?
                    <section className="intro intro--repos-loaded">
                        <p>viewing gitlery for {repos[0].username}</p>

                        {/*<button>save link</button>*/}

                        <button className="intro__btn"
                                onClick={() => setRepos([])}
                        >new gitlery
                        </button>
                    </section>
                    :
                    <section className="intro intro--repos-not-loaded">
                        <p>Enter a GitHub username to create a gitlery (GitHub
                            gallery) for that user</p>

                        <input className="intro__username-input"
                               onKeyDown={handleInputKeyDown}
                               type="text"
                        />

                        {loading ? <p>Loading...</p> : null}
                    </section>
            }
        </>
    );
};

export default Intro;
