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
        .get('repo');

    request('/repos/' + repoName).then(data => createRepo(data));
}

initialization();

function createRepo(data) {
    const repoSelected = document.createElement('div');
    repoSelected.setAttribute('class', 'repo-selected');

    const repo = document.createElement('div');
    repo.setAttribute('class', 'repo');

    let repoHeader = document.createElement('div');
    repoHeader.setAttribute('class', 'repo-header');

    repoSelected.appendChild(repoHeader);

    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');
    repoName.innerHTML = data.name;

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐' + data.stargazers_count;

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = data.updated_at;

    repoHeader.appendChild(repoName);
    repoHeader.appendChild(stars);
    repoHeader.appendChild(lastCommit);

    const repoOwner = document.createElement('div');
    repoOwner.setAttribute('class', 'repo-owner');

    const profilePic = document.createElement('img');
    profilePic.setAttribute('src', data.owner.avatar_url);

    const githubLink = document.createElement('a');
    githubLink.setAttribute('href', data.owner.html_url);
    githubLink.innerText = data.owner.login;

    repoOwner.appendChild(profilePic);
    repoOwner.appendChild(githubLink);

    repoSelected.appendChild(repoOwner);

    const repoLangs = document.createElement('div');
    repoLangs.setAttribute('class', 'repo-languages');
    // todo сделать так, чтобы считывал все языки! через .languages почему-то не работает
    repoLangs.innerText = data.language; //не уверена насчёт этого!!

    const description = document.createElement('div');
    description.setAttribute('class', 'repo-description');
    description.innerText = data.description;

    const contributors = document.createElement('div');
    contributors.setAttribute('class', 'repo-contributors');
    contributors.innerText = data.contributors_url[0].login;

    repo.appendChild(repoHeader);
    repo.appendChild(repoOwner);
    repo.appendChild(repoLangs);
    repo.appendChild(description);
    repo.appendChild(contributors);

    repoSelected.appendChild(repo);

    let container = document.getElementById('container');

    container.appendChild(repoSelected);
}