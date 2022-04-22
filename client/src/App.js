import React, {useEffect, useState} from "react";
import RepoCards from "./components/RepoCards";
import './styling/general.scss';

const LOCAL_STORAGE_REPOS_KEY = "repos";


const App = () => {
    // const [data, setData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     fetch("/api")
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message));
    // }, []);


    // load repos from local storage
    useEffect(() => {
        console.log('loading repos?');
        const storedRepos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REPOS_KEY));

        if (storedRepos && storedRepos.length) {
            console.log('yes');
            setRepos(storedRepos);
        }
    }, []);


    // save repos to local storage
    useEffect(() => {
        console.log('storing repos')
        localStorage.setItem(LOCAL_STORAGE_REPOS_KEY, JSON.stringify(repos));
    }, [repos]);


    const getRepos = async requestedUser => {
        await fetch(`/get-repos?requested-user=${requestedUser}`)
            .then((res) => res.json())
            .then((data) => setRepos(data.repos));
    }


    const handleInputKeyDown = async ({key, target}) => {
        if (key === 'Enter') {
            const requestedUser = target.value;

            setLoading(true);
            await getRepos(requestedUser);
            setLoading(false);

            console.log(repos);
        }
    };


    return (
        <>
            <input className="username-input" onKeyDown={handleInputKeyDown} type="text"/>
            {/*<p>{!data ? "Loading..." : data}</p>*/}
            {loading ? <p>Loading...</p> : null}
            <RepoCards repos={repos} />
        </>
    );
}

export default App;