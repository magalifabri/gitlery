import React from 'react';


const InfoModalChild = () => {
    return (
        <>
            <p className="modal-container__line big-text">How It Works</p>
            <p className="modal-container__line">Gitlery checks the repositories for the given username and looks for a screenshot in each readme.</p>
            <p>With the found screenshots it creates an image gallery.</p>
            <p className="modal-container__line">The following rules are followed in the search:</p>
            <ul>
                <li>the repository is public</li>
                <li>the readme file is called <em>'README.md'</em> or <em>'readme.md'</em></li>
                <li>the screenshot is included in the readme as an html <code>image</code> element</li>
                <li>the <code>src</code> attribute of the <code>image</code> element contains the word <em>'screenshot'</em></li>
                <li>the first screenshot found is taken</li>
            </ul>

            <hr className="modal-container__hr"/>

            <p className="modal-container__line text-center">Made by <a className="modal-container__link" href="https://github.com/magalifabri">Magali
                Fabri</a>
            </p>

            <p className="modal-container__line text-center">View source code on <a className="modal-container__link" href="https://github.com/magalifabri/gitlery">GitHub</a></p>
        </>
    );
};

export default InfoModalChild;
