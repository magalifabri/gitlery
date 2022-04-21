import React from 'react';

const RepoCards = ({repos}) => {
    return (
        <div className="repo-cards-wrapper">
            {
                repos.map(repo => {
                    return (
                        <div className="card">
                            <img className="card__image"
                                 src={repo.screenshotUrl} alt=""/>
                            <a className="card__name"
                               href={repo.html_url}>{repo.name}</a>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default RepoCards;
