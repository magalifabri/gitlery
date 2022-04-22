import React from 'react';
import '../styling/RepoCards.scss';

const RepoCards = ({repos}) => {

    const getClassNames = (event) => {
        const width = event.target.naturalWidth;
        const height = event.target.naturalHeight;

        if (width > height) {
            event.target.parentNode.classList.add('repo-card--wide');
        } else {
            event.target.parentNode.classList.add('repo-card--tall');
        }
    }


    return (
        <div className="grid-wrapper">
            {
                repos.map(repo => {
                    return (
                        <div className="repo-card">
                            <img className="repo-card__screenshot"
                                src={repo.screenshotUrl} alt=""
                                onLoad={getClassNames}
                            />
                            <a className="repo-card__link" href={repo.html_url}>{repo.name}</a>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default RepoCards;
