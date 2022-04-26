import React from 'react';


const SaveModalChild = ({username}) => {
    return (
        <>
            <p className="modal-container__line big-text">Gitlery Saved</p>
            <p className="modal-container__line">Copy / save / share the
                following url to easily and quickly refer to the created
                gitlery:</p>
            <p className="modal-container__line">
                <a className="modal-container__link"
                   href={`https://localhost/load-gitlery?username=${username}`}>https://gitlery.herokuapp.com/load-gitlery?username={username}</a>
            </p>
            {/*<p><a href={`https://gitlery.herokuapp.com/load-gitlery?username=${username}`}>https://gitlery.herokuapp.com/load-gitlery?username={username}</a></p>*/}
        </>
    );
};

export default SaveModalChild;
