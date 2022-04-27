import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence} from 'framer-motion';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import RepoCards from "./components/RepoCards";
import Modal from "./components/Modal";
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import InfoModalChild from "./components/InfoModalChild";
import SaveModalChild from "./components/SaveModalChild";
import ModalContainer from "./containers/ModalContainer";
import LoadGitlery from "./components/LoadGitlery";
import './styling/general.scss';

const LOCAL_STORAGE_REPOS_KEY = "repos";


const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [usernameInputError, setUsernameInputError] = useState('');
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [saveModalVisible, setSaveModalVisible] = useState(false);
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
        let responseData;

        await fetch(`/get-repos?requested-user=${requestedUser}`)
            .then(response => response.json())
            .then(data => responseData = data);

        return responseData;
    }


    const handleInputKeyDown = async ({key, target}) => {
        const isEnterKey = key === 'Enter';
        const isSearchBtn = target.classList.contains('intro__icon');

        if (isEnterKey || isSearchBtn) {
            const requestedUser = usernameInputRef.current.value;

            if (requestedUser === '') {
                setUsernameInputError('enter a username')
                return;
            }

            setLoading(true);
            const responseData = await getRepos(requestedUser);
            setLoading(false);

            if (responseData.successful) {
                setRepos(responseData.repos);
                setUsernameInputError('');
            } else {
                setUsernameInputError(responseData.message)
            }
        }
    };


    const saveGitlery = async () => {
        let data = {
            username: repos[0].username,
            repos: JSON.stringify(repos)
        };

        fetch("/create-gitlery", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        });

        setSaveModalVisible(true);
    };


    return (
        <Router>
            <Routes>
                {
                    repos.length === 0 &&
                    <Route path="/load-gitlery/:username"
                           element={<LoadGitlery setRepos={setRepos}/>}
                    >
                    </Route>
                }
            </Routes>

            <Header/>

            <main className="main">

                <Intro reposLoaded={repos.length > 0}
                       repos={repos}
                       setRepos={setRepos}
                       handleInputKeyDown={handleInputKeyDown}
                       loading={loading}
                       usernameInputError={usernameInputError}
                       usernameInputRef={usernameInputRef}
                       setInfoModalVisible={setInfoModalVisible}
                       saveGitlery={saveGitlery}
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
                        infoModalVisible &&
                        <ModalContainer setModalVisible={setInfoModalVisible}>
                            <InfoModalChild/>
                        </ModalContainer>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        saveModalVisible &&
                        <ModalContainer setModalVisible={setSaveModalVisible}>
                            <SaveModalChild username={repos[0].username}/>
                        </ModalContainer>
                    }
                </AnimatePresence>

            </main>

            <Footer setInfoModalVisible={setInfoModalVisible}/>

        </Router>
    );
}

export default App;