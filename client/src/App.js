import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import RepoCards from "./components/RepoCards";
import Modal from "./components/Modal";
import './styling/general.scss';

const LOCAL_STORAGE_REPOS_KEY = "repos";


const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);


    // load repos from local storage
    useEffect(() => {
        const storedRepos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REPOS_KEY));

        if (storedRepos && storedRepos.length) {
            setRepos(storedRepos);
        }
    }, []);


    // save repos to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_REPOS_KEY, JSON.stringify(repos));
    }, [repos]);


    const getRepos = async requestedUser => {
        await fetch(`/get-repos?requested-user=${requestedUser}`)
            .then((res) => res.json())
            .then((data) => setRepos(data.repos));
    }

    //
    // const loadImages = () => {
    //     const newRepos = [...repos];
    //
    //     newRepos.map(repo => {
    //         const screenshot = new Image();
    //         screenshot.onload = () => console.log('loaded');
    //         screenshot.src = repo.screenshotUrl;
    //         return repo['screenshot'] = screenshot;
    //     });
    //
    //     setRepos(newRepos);
    // }


    const handleInputKeyDown = async ({key, target}) => {
        if (key === 'Enter') {
            const requestedUser = target.value;

            setLoading(true);
            await getRepos(requestedUser);
            setLoading(false);

            // loadImages();
            console.log(repos);
        }
    };


    return (
        <>
            <Header/>

            {
                !repos.length ?
                    <section className="intro">
                        <p>Enter a GitHub username to create a Gitlery (GitHub
                            gallery) for that user</p>

                        <input className="username-input"
                               onKeyDown={handleInputKeyDown}
                               type="text"
                               placeholder="GitHub username"
                        />
                    </section>
                    :
                    <section className="intro">
                        {/*<p>viewing gitlery for [username]</p>*/}
                        {/*<button>save link</button>*/}
                        <button onClick={() => setRepos([])}>new gitlery
                        </button>
                    </section>
            }

            {loading ? <p>Loading...</p> : null}

            <RepoCards repos={repos}
                       setSelectedRepo={setSelectedRepo}
            />

            {
                selectedRepo &&
                <Modal repo={repos.find(repo => repo.id === selectedRepo.id)}
                       screenshotOrientation={selectedRepo.screenshotOrientation}
                       setSelectedRepo={setSelectedRepo}
                />
            }
        </>
    );
}

export default App;