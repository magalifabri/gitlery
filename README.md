# [Gitlery](https://github.com/magalifabri/gitlery)

This project was made as an exercise for the coding school BeCode in Belgium.

The purpose of the exercise was to gain experience with [ReactJS](https://reactjs.org/) by building a web app of your own choosing.

The built web app, Gitlery, checks the GitHub repositories for a given username and looks for a screenshot in each readme. With the found screenshots it creates an image gallery (a _gitlery_). Modal windows provide additional information on the repository's project.

A gitlery can be saved to get a link with which you can easily and quickly refer to it.


### View result on [gitlery.herokuapp.com](https://gitlery.herokuapp.com/)


## How It Works

The following rules are followed in the search:
- the repository is public
- the readme file is called 'README.md' or 'readme.md'
- the screenshot is included in the readme as an html image element
- the src attribute of the image element contains the word 'screenshot'
- the first screenshot found is taken
- when available, the homepage link and project description are taken from the About section of the repository page


## Acknowledgements

Data used from [GitHub API](https://docs.github.com/en/rest) and [GitHub](https://github.com/)

Powered by [React](https://reactjs.org/)

Deployed with [Heroku](https://www.heroku.com/home)


## Author

Made by [Magali Fabri](https://github.com/magalifabri?tab=repositories)


## Screenshot

<img src="https://raw.githubusercontent.com/magalifabri/gitlery/main/screenshot.png" alt="desktop screenshot of Gitlery homepage"/>
