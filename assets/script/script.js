fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
    .then(response => response.json())
    .then(commits => alert(commits[0].author.login));