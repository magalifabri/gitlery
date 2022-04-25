import React, {useEffect, useState} from "react";
import {AnimatePresence} from 'framer-motion';
import Header from "./components/Header";
import RepoCards from "./components/RepoCards";
import Modal from "./components/Modal";
import Intro from "./components/Intro";
import './styling/general.scss';

const LOCAL_STORAGE_REPOS_KEY = "repos";


const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [usernameInputError, setUsernameInputError] = useState('');


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
        let successful;
        let repos;

        await fetch(`/get-repos?requested-user=${requestedUser}`)
            .then(response => response.json())
            .then(data => {
                successful = data.successful;
                repos = data.repos
            });

        return [successful, repos];
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
            const [successful, foundRepos] = await getRepos(requestedUser);
            setLoading(false);

            // loadImages();

            if (successful) {
                setRepos(foundRepos);
                setUsernameInputError('');
            } else {
                setUsernameInputError(`username '${requestedUser}' not found`)
            }
        }
    };


    return (
        <>
            <Header/>

            <Intro reposLoaded={repos.length > 0}
                   repos={repos}
                   setRepos={setRepos}
                   handleInputKeyDown={handleInputKeyDown}
                   loading={loading}
                   usernameInputError={usernameInputError}
            />

            <RepoCards repos={repos}
                       setSelectedRepo={setSelectedRepo}
            />

            <AnimatePresence>
            {
                selectedRepo &&
                <Modal repo={repos.find(repo => repo.id === selectedRepo.id)}
                       screenshotOrientation={selectedRepo.screenshotOrientation}
                       setSelectedRepo={setSelectedRepo}
                />
            }
            </AnimatePresence>
        </>
    );
}

export default App;