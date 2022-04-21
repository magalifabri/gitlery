import React, {useState} from "react";


const App = () => {
    // const [data, setData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     fetch("/api")
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message));
    // }, []);


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
            <input onKeyDown={handleInputKeyDown} type="text"/>
            {/*<p>{!data ? "Loading..." : data}</p>*/}
            {loading ? "Loading..." : null}
        </>
    );
}

export default App;