//todo удалить все англ комменты к коду

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
    let repoName = new URL(window.location).searchParams.get('name');

    if (repoName !== null) {
        findRepo(repoName);
    } else {
        findMostPopular();
    }
}

initialization();

// "Как только ты достал данные, then - вызови мне функцию с тем, что ты вернул
function findMostPopular() {
    request('/search/repositories?q=stars:>100&per_page=10')
        .then(data => {
            createRepos(data.items);
            createPagination(data.total_count);
        });
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
            setURLParam('name', repo);
            createRepos(data.items);
            createPagination(data.total_count);
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
}

//todo сделать так, чтобы кнопки отображались под списком, а не над!
function createPagination(totalCount) {
    const pageCount = 10;//Math.ceil(totalCount / 10);

    const pagination = document.getElementById('pagination');

    for (let i = 1; i <= pageCount; i++) {
        const paginationButton = createPaginationButton(i);

        pagination.appendChild(paginationButton);
    }
}

function createPaginationButton(page) {
    const pageNumber = document.createElement('button');
    pageNumber.setAttribute('class', 'page-link');
    pageNumber.innerText = page;

    return pageNumber;
}