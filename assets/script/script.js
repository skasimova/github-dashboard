function createRepos() {
    const REPOS_LIST = document.createElement('div');
    REPOS_LIST.setAttribute('class', 'repos-list');

    const REPO = document.createElement('div');
    REPO.setAttribute('class', 'repo');

    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');
    repoName.innerText = 'Name example';

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐2';

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = '20 May 2020';

    let githubLink = document.createElement('div');
    githubLink.setAttribute('class', 'repo-link');
    githubLink.innerText = 'Link';

    REPO.appendChild(repoName);
    REPO.appendChild(stars);
    REPO.appendChild(lastCommit);
    REPO.appendChild(githubLink);

    REPOS_LIST.appendChild(REPO);

    let container = document.getElementById('container');

    container.appendChild(REPOS_LIST);
}

createRepos();

// todo добавить, что так надо делать только если в поле поиска ничего не введено!
for (let i = 1; i <= 10; ++i) {
    createRepos(i);
}


// todo незаконченная штука (как забрать что-то определённое и хотя бы алёртнуть это?)
async function getSmth() {
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
// получить один заголовок
    alert(response.headers.get('Content-Type'));
}

getSmth();