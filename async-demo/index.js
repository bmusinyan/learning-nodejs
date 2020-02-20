// understanding async javascript
/*
console.log(1);

getUser(1, (user) => {
    console.log(user);

    // get repos
    getRepos(user.gitHubUsername, (repos) => {
        console.log(repos);

        // CALLBACK HELL or CHRISTMAS TREE problem
    });
});

console.log(2);

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: 1, gitHubUsername: 'mosh'});
    }, 2000);
}
function getRepos(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
*/

// resolving callback hell problem with PROMISEs
console.log('Before');

getUser(1)
    .then(user => getRepos(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log(err));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading from database...");
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}
function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}
function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(['commits']);
        }, 2000);
    });
}