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
    let page = new URL(window.location).searchParams.get('page');

    if (repoName !== null) {
        findRepo(repoName, page);
    } else {
        findMostPopular(page);
    }

}

initialization();


// "Как только ты достал данные, then - вызови мне функцию с тем, что ты вернул
function findMostPopular(page) {
    request('/search/repositories?q=stars:>100&per_page=10' + (page !== null ? '&page=' + page : ''))
        .then(data => {
            if (page !== null) {
                setURLParam({'page': page});
            }
            createRepos(data.items);
            createPagination(data.total_count, page);
        });
}


const searchField = document.getElementById('search-field');
const inputForm = document.getElementById('input-form');


searchField.addEventListener('submit', event => {
    event.preventDefault();

    findRepo(inputForm.value, 1);
});

function findRepo(repo, page) {
    request('/search/repositories?q=' + repo + '&sort=stars&order=desc&per_page=10' + (page !== null ? '&page=' + page : ''))
        .then(data => {
            setURLParam({'name': repo, 'page': page});
            createRepos(data.items);
            createPagination(data.total_count, page);
        });
}

function setURLParam(params) {

    let url = new URL(window.location);
    let urlParams = new URLSearchParams(url.search.slice(1));

    for (const key in params) {
        urlParams.set(key, params[key]);
    }

    let newURL = url.pathname + '?' + urlParams.toString();

    //pushState добавляет новый URL в строку без перезагрузки страницы
    window.history.pushState({}, document.title, newURL);
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

function createPagination(totalCount, currentPage) {
    const pageCount = Math.ceil(totalCount / 10);

    const pagination = document.getElementById('pagination');
    pagination.innerText = "";

    if (currentPage === null) {
        currentPage = 1;
    }

    //todo сделать так чтобы отображались и другие страницы тоже!
    for (let i = 1; i <= pageCount; i++) {

        if (i == currentPage) {
            pagination.appendChild(createInactivePaginationButton(i));
        } else {
            pagination.appendChild(createPaginationButton(i));
        }
    }
}

function createPaginationButton(page) {
    const pageNumber = document.createElement('button');
    pageNumber.setAttribute('class', 'page-link');
    pageNumber.innerText = page;

    pageNumber.addEventListener('click', event => {
        let repoName = new URL(window.location).searchParams.get('name');
        if(repoName) {
            findRepo(repoName, event.target.innerHTML);
        } else {
            findMostPopular(event.target.innerHTML);
        }
    })

    return pageNumber;
}

function createInactivePaginationButton(page) {
    const pageNumber = document.createElement('button');
    pageNumber.setAttribute('class', 'inactive-page-link');
    pageNumber.innerText = page;

    return pageNumber;
}