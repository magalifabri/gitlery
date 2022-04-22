import React from 'react';
import '../styling/RepoCards.scss';


const RepoCards = ({repos, setSelectedRepo}) => {

    const getClassNames = (event) => {
        const width = event.target.naturalWidth;
        const height = event.target.naturalHeight;

        if (width > height) {
            event.target.parentNode.classList.add('repo-card--wide');
        } else {
            event.target.parentNode.classList.add('repo-card--tall');
        }
    }


    const openModal = event => {
        const repoId = event.target.id;

        setSelectedRepo(repoId);
    }


    return (
        <div className="grid-wrapper"> {
            repos.map(repo => {
                return (
                    <div className="repo-card">
                        <img key={repo.id}
                             id={repo.id}
                             className="repo-card__screenshot"
                             src={repo.screenshotUrl} alt=""
                             onLoad={getClassNames}
                             onClick={openModal}
                        />
                        <a className="repo-card__link"
                           href={repo.html_url}
                           target="_blank"
                        >{repo.name}</a>
                    </div>
                )
            })
        } </div>
    );
};

export default RepoCards;
