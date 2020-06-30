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
    stars.innerText = 'STARS';

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

async function getMostPopular() {
    let url = 'https://api.github.com/search/repositories?q=stars:>100&per_page=10';

    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
                       // получаем тело ответа (см. про этот метод ниже)
        let result = await response.json();

        console.log(result);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getMostPopular();

// работает но нужно текстом записать языки, а не JSON чтоб выводился
async function getLanguages() {
    let url = 'https://api.github.com/repos/sasharaeburn/fortune-cookie/languages';

    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let result = await response.json();

    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getLanguages();

// вроде работает
async function getStars() {
    let url = 'https://api.github.com/repos/sasharaeburn/fortune-cookie/stargazers';

    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let result = await response.json();

        console.log(result.length);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getStars();

// работает
async function getDescription() {
    let url = 'https://api.github.com/repos/sasharaeburn/fortune-cookie';

    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let result = await response.json();

        console.log(result.description);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getDescription();