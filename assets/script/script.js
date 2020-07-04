// request -- запрос к серверу
// path - вторая (изменчивая) часть пути, по которому нужно обратиться
async function request(path) {
    let url = 'https://api.github.com' + path;

    let response = await fetch(url);

    // "если не вылезла ошибка"
    if (response.ok) {

        // "верни результат в виде объекта
        return await response.json();

    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}


function initialization() {
    let repoName = new URL(window.location)
        .searchParams
        .get('name');

    if (repoName !== null) {
        findRepo(repoName);
    } else {
        getMostPopular();
    }
}

initialization();

// "Как только ты достал данные, then - вызови мне функцию с тем, что ты вернул
function getMostPopular() {
    request('/search/repositories?q=stars:>100&per_page=10')
        .then(data => {
            createRepos(data.items);
            createPagination(data.total_count);
        });

    //todo сюда добавить пагинацию
}


const searchField = document.getElementById('search-field');
const inputForm = document.getElementById('input-form');


searchField.addEventListener('submit', event => {
    event.preventDefault();

    findRepo(inputForm.value);
});

function findRepo(repo) {
    request('/search/repositories?q=' + repo + '&sort=stars&order=desc&per_page=10')
        .then(data => {
            createRepos(data.items);
            setURLParam('name', repo);
        });
}

function setURLParam(paramKey, param) {
    window.history.pushState({}, document.title, "index.html?" + paramKey + '=' + param);
}


function createRepos(repositories) {

    const reposList = document.getElementById('repos-list');
    reposList.innerText = '';

    repositories.forEach(repository => createRepo(repository));

}

function createRepo(repository) {
    console.log(repository);

    const reposList = document.getElementById('repos-list');

    const repo = document.createElement('div');
    repo.setAttribute('class', 'repo');


    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');

    let repoCardLink = document.createElement('a')
    repoCardLink.setAttribute('href', 'repocard.html?repo=' + repository.full_name);
    repoCardLink.innerText = repository.name;

    repoName.appendChild(repoCardLink);

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐' + repository.stargazers_count;

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = repository.updated_at;

    let repoLink = document.createElement('div');
    repoLink.setAttribute('class', 'repo-link');

    let githubLink = document.createElement('a');
    githubLink.setAttribute('href', repository.html_url)
    githubLink.innerText = 'Github';

    repoLink.appendChild(githubLink);

    repo.appendChild(repoName);
    repo.appendChild(stars);
    repo.appendChild(lastCommit);
    repo.appendChild(repoLink);

    reposList.appendChild(repo);

    let container = document.getElementById('container');

    container.appendChild(reposList);
}

function createPagination(totalCount) {
    const pageCount = Math.ceil(totalCount / 10);
    console.log(pageCount);

    const pagination = document.getElementById('pagination');

}