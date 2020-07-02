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
    //todo подумать, не удалить ли мне repoSelected нафик, а то очень много контейнеров
    const repoSelected = document.getElementById('repo-selected');

    let headers = document.createElement('div');
    headers.setAttribute('class', 'repo-header');

    //todo переименовать переменную nameOfRepo и разобраться, нужен ли headers
    const nameOfRepo = document.createElement('div');
    nameOfRepo.setAttribute('class', 'name-of-repo');
    nameOfRepo.innerText = "Repository's name";

    const starsHeader = document.createElement('div');
    starsHeader.setAttribute('class', 'stars-header');
    starsHeader.innerText = "Stars";

    const commitHeader = document.createElement('div');
    commitHeader.setAttribute('class', 'commit-header');
    commitHeader.innerText = "Latest commit";

    headers.appendChild(nameOfRepo);
    headers.appendChild(starsHeader);
    headers.appendChild(commitHeader);

    repoSelected.appendChild(headers);

    let mainInfo = document.createElement('div');
    mainInfo.setAttribute('class', 'main-info');

    // let userHeader = document.createElement('div');
    // userHeader.setAttribute('class', 'user-header');
    // userHeader.innerHTML = 'User info';

    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');
    repoName.innerHTML = data.name;

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = data.updated_at;

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐' + data.stargazers_count;

    // mainInfo.appendChild(userHeader);
    mainInfo.appendChild(repoName);
    mainInfo.appendChild(lastCommit);
    mainInfo.appendChild(stars);

    repoSelected.appendChild(mainInfo);

    const repoOwner = document.createElement('div');
    repoOwner.setAttribute('class', 'repo-owner');

    const profilePic = document.createElement('img');
    profilePic.setAttribute('class', 'profile-pic');
    profilePic.setAttribute('width', '100px');
    profilePic.setAttribute('src', data.owner.avatar_url);

    const githubLink = document.createElement('a');
    githubLink.setAttribute('class', 'profile-link');
    githubLink.setAttribute('href', data.owner.html_url);

    //todo добавить строки к именам
    githubLink.innerText = 'Github profile:' + data.owner.login;

    repoOwner.appendChild(profilePic);
    repoOwner.appendChild(githubLink);

    repoSelected.appendChild(repoOwner);

    const repoLangs = document.createElement('div');
    repoLangs.setAttribute('class', 'repo-languages');
    repoLangs.setAttribute('id', 'repo-languages');

    const description = document.createElement('div');
    description.setAttribute('class', 'repo-description');
    description.innerText = data.description;

    const contributors = document.createElement('div');
    contributors.setAttribute('class', 'repo-contributors');
    contributors.setAttribute('id', 'repo-contributors');

    repoSelected.appendChild(repoLangs);
    repoSelected.appendChild(description);
    repoSelected.appendChild(contributors);

    additionalRequest();
}

function additionalRequest() {
    getLangs();
    getContributors();
}

function getLangs() {
    let repoName = new URL(window.location)
        .searchParams
        .get('repo');

    request('/repos/' + repoName + '/languages').then(data => fillInLangs(data));
}

function fillInLangs(data) {

    const repoLangs = document.getElementById('repo-languages');

    let languages = Object.keys(data);

    repoLangs.innerText = languages.join(', ');
}

function getContributors() {
    let repoName = new URL(window.location)
        .searchParams
        .get('repo');

    request('/repos/' + repoName + '/contributors?per_page=10').then(data => fillInContributors(data));

}

function fillInContributors(data) {
    const contributors = document.getElementById('repo-contributors');

    console.log(data);

    let repoContributors = [];

    data.forEach(contributor => repoContributors.push(contributor.login));

    contributors.innerText = repoContributors.join(', ');
}