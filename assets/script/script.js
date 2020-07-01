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
    getMostPopular();
}

initialization();

// "Как только ты достал данные, then - вызови мне функцию с тем, что ты вернул
function getMostPopular() {
    request('/search/repositories?q=stars:>100&per_page=10').then(data => createRepos(data.items));
}

//todo сюда пойдёт ф-я (с привязкой к кнопке, которая вызовется, если задан конкретный юзер - показать его репы)

// const inputForm = document.getElementById('input-form');
//
// function getRepo() {
//     inputForm.addEventListener('submit', event => {
//         const repo = inputForm.value;
//         request('/search/repositories').then(data => createRepos(data.items)); НЕ ДОДЕЛАНО
//     })
// }

function createRepos(repositories) {
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