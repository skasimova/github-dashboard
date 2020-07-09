async function request(path) {
    let url = 'https://api.github.com' + path;

    let response = await fetch(url);

    if (response.ok) {

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
    const repoSelected = document.getElementById('repo-selected');

    let headers = document.createElement('div');
    headers.setAttribute('class', 'repo-header');

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
    headers.appendChild(commitHeader);
    headers.appendChild(starsHeader);

    repoSelected.appendChild(headers);

    let mainInfo = document.createElement('div');
    mainInfo.setAttribute('class', 'main-info');

    let repoName = document.createElement('div');
    repoName.setAttribute('class', 'repo-name');
    repoName.innerHTML = data.name;

    let lastCommit = document.createElement('div');
    lastCommit.setAttribute('class', 'repo-last-commit');
    lastCommit.innerText = data.updated_at.replace('T', ' ').replace('Z', '');;

    let stars = document.createElement('div');
    stars.setAttribute('class', 'repo-stars');
    stars.innerText = '⭐' + data.stargazers_count;

    mainInfo.appendChild(repoName);
    mainInfo.appendChild(lastCommit);
    mainInfo.appendChild(stars);

    repoSelected.appendChild(mainInfo);

    const profileHeader = document.createElement('div');
    profileHeader.setAttribute('class', 'profile-header');
    profileHeader.innerText = "User's profile";

    repoSelected.appendChild(profileHeader);

    const repoOwner = document.createElement('div');
    repoOwner.setAttribute('class', 'repo-owner');

    const profilePic = document.createElement('img');
    profilePic.setAttribute('class', 'profile-pic');
    profilePic.setAttribute('width', '100px');
    profilePic.setAttribute('src', data.owner.avatar_url);

    const githubLink = document.createElement('a');
    githubLink.setAttribute('class', 'profile-link');
    githubLink.setAttribute('href', data.owner.html_url);
    githubLink.innerText = data.owner.login;

    repoOwner.appendChild(profilePic);
    repoOwner.appendChild(githubLink);

    repoSelected.appendChild(repoOwner);

    const langsHeader = document.createElement('div');
    langsHeader.setAttribute('class', 'languages-header');
    langsHeader.innerText = 'Languages used in the repository';

    const repoLangs = document.createElement('div');
    repoLangs.setAttribute('class', 'repo-languages');
    repoLangs.setAttribute('id', 'repo-languages');

    const descriptionHeader = document.createElement('div');
    descriptionHeader.setAttribute('class', 'description-header');
    descriptionHeader.innerText = 'Repository description';

    const description = document.createElement('div');
    description.setAttribute('class', 'repo-description');
    if (data.description === null) {
        description.innerText = 'The user has not provided a description for this repository';
    } else {
        description.innerText = data.description;
    }

    const contributorsHeader = document.createElement('div');
    contributorsHeader.setAttribute('class', 'contributors-header');
    contributorsHeader.innerText = 'Most popular contributors';

    const contributors = document.createElement('div');
    contributors.setAttribute('class', 'repo-contributors');
    contributors.setAttribute('id', 'repo-contributors');

    repoSelected.appendChild(langsHeader);
    repoSelected.appendChild(repoLangs);
    repoSelected.appendChild(descriptionHeader);
    repoSelected.appendChild(description);
    repoSelected.appendChild(contributorsHeader);
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

    if (languages.length === 0) {
        repoLangs.innerText = 'The information about the used languages is not available';
    } else {
        repoLangs.innerText = languages.join(', ');
    }
}

function getContributors() {
    let repoName = new URL(window.location)
        .searchParams
        .get('repo');

    request('/repos/' + repoName + '/contributors?per_page=10').then(data => fillInContributors(data));
}

function fillInContributors(data) {
    const contributors = document.getElementById('repo-contributors');

    let repoContributors = [];

    data.forEach(contributor => repoContributors.push(contributor.login));

    if (repoContributors.length === 0) {
        contributors.innerText = 'The information about contributors in unavailable';
    } else {
        contributors.innerText = repoContributors.join(', ');
    }
}