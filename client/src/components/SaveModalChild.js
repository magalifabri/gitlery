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
                    // href={`http://localhost:3000/load-gitlery/${username}`}>https://gitlery.herokuapp.com/load-gitlery/{username}</a>
                   href={`https://gitlery.herokuapp.com/load-gitlery/${username}`}>https://gitlery.herokuapp.com/load-gitlery/{username}</a>
            </p>
        </>
    );
};

export default SaveModalChild;
