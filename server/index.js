const path = require('path');
const express = require("express");
require('dotenv').config();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const {uuid} = require('uuidv4');

const PORT = process.env.PORT || 3001;

const app = express();

// function to get the raw data
const getRawData = async (URL) => {
    let status;
    let rawData;

    await fetch(URL)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => rawData = data);

    return [status, rawData];
};


const getScreenshotUrl = async repoUrl => {
    // const [status, rawData] = await getRawData(repoUrl); // more robust, but takes longer

    let [status, rawData] = await getRawData(`https://raw.githubusercontent.com/${repoUrl}/master/README.md`);

    if (status !== 200) {
        [status, rawData] = await getRawData(`https://raw.githubusercontent.com/${repoUrl}/master/readme.md`);

        if (status !== 200) {
            console.log(status);
            return;
        }
    }

    const $ = cheerio.load(rawData);

    // parse screenshot URL
    const imagesCh = $('img');
    console.log(imagesCh.length);
    if (!imagesCh.length) {
        return;
    }

    const screenshotsCh = imagesCh.filter((index, img) => {
        return $(img).attr('src').includes('screenshot');
    });
    const screenshotUrl = screenshotsCh.attr('src');

    return screenshotUrl;
};


const getReposWithScreenshots = async repos => {
    const reposWithScreenshots = [];
    let i = 1;
    const numRepos = repos.length;

    // loop over repos
    for (const repo of repos) {

        // request repo contents if repo is not a fork
        if (!repo.fork) {
            console.log(`checking ${repo.html_url}... (${i++}/${numRepos})`);

            const screenshotUrl = await getScreenshotUrl(repo.full_name);

            // if they have a readme with a screenshot
            if (screenshotUrl) {

                // save repo info in array
                reposWithScreenshots.push({
                    name: repo.name,
                    html_url: repo.html_url,
                    screenshotUrl: screenshotUrl,
                    description: repo.description,
                    homepage: repo.homepage,
                    id: uuid(),
                    username: repo.owner.login,
                });
            }
        }
    }

    return reposWithScreenshots;
}


const getReposOfUser = async user => {
    let status;
    let repos;

    await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
        headers: {
            'Authorization': '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',
        }
    })
        .then(response => {
            status = response.status;
            return response.json();
        })
        .then(data => repos = data);

    return [status, repos];
}


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /get-repos route
app.get("/get-repos", async (req, res) => {
    const requestedUser = req.query['requested-user'];
    const [status, repos] = await getReposOfUser(requestedUser);

    if (status !== 200) {
        res.json({
            successful: false,
            repos: null,
            message: `username '${requestedUser}' not found`
        });
        return;
    }

    const reposWithScreenshots = await getReposWithScreenshots(repos);

    console.log(reposWithScreenshots.length + ' suitable repos found');
    if (reposWithScreenshots.length === 0) {
        res.json({
            successful: false,
            repos: null,
            message: `no suitable repositories found for ${requestedUser}`
        });
        return;
    }

    res.json({
        successful: true,
        repos: reposWithScreenshots,
        message: ''
    });
});


// CRUD - DB OPERATIONS

const pool = require('./db');

app.use(express.json());

app.post("/create-gitlery", async (req, res) => {
    try {
        const {username, repos} = req.body;

        const newDbEntry = await pool.query(
            "INSERT INTO gitleries (username, repos) VALUES($1, $2) RETURNING *",
            [username, repos]
        );

        res.json(newDbEntry);
    } catch (e) {
        console.log(e.message);
    }
})

app.get("/get-gitlery/:username", async (req, res) => {
    const {username} = req.params;

    try {
        const repos = await pool.query (
            "SELECT * FROM gitleries WHERE username = $1",
            [username]
        );

        res.json(repos.rows[0].repos);
    } catch (e) {
        console.log(e.message)
    }
})


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
