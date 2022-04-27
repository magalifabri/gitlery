import React from "react";
import {useParams} from "react-router-dom";

const LoadGitlery = ({setRepos}) => {
    const {username} = useParams();

    const loadRepos = async username => {
        let responseData;

        await fetch(`/load-gitlery/${username}`)
            .then(response => response.json())
            .then(data => responseData = data);

        setRepos(responseData);
    }
    loadRepos(username);
};

export default LoadGitlery;