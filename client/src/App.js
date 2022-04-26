import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence} from 'framer-motion';
import Header from "./components/Header";
import RepoCards from "./components/RepoCards";
import Modal from "./components/Modal";
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import InfoModal from "./components/InfoModal";
import './styling/general.scss';

const LOCAL_STORAGE_REPOS_KEY = "repos";


const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [usernameInputError, setUsernameInputError] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const usernameInputRef = useRef();


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


    const handleInputKeyDown = async ({key, target}) => {
        const isEnterKey = key === 'Enter';
        const isSearchBtn = target.classList.contains('intro__icon');

        if (isEnterKey || isSearchBtn) {
            const requestedUser = usernameInputRef.current.value;

            setLoading(true);
            const [successful, foundRepos] = await getRepos(requestedUser);
            setLoading(false);

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

            <main className="main">

                <Intro reposLoaded={repos.length > 0}
                       repos={repos}
                       setRepos={setRepos}
                       handleInputKeyDown={handleInputKeyDown}
                       loading={loading}
                       usernameInputError={usernameInputError}
                       usernameInputRef={usernameInputRef}
                />

                {
                    repos.length > 0 &&
                    <RepoCards repos={repos}
                               setSelectedRepo={setSelectedRepo}
                    />
                }

                <AnimatePresence>
                    {
                        selectedRepo &&
                        <Modal
                            repo={repos.find(repo => repo.id === selectedRepo.id)}
                            screenshotOrientation={selectedRepo.screenshotOrientation}
                            setSelectedRepo={setSelectedRepo}
                        />
                    }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        modalVisible &&
                        <InfoModal setModalVisible={setModalVisible}/>
                    }
                </AnimatePresence>

            </main>

            <Footer setModalVisible={setModalVisible}/>
        </>
    );
}

export default App;