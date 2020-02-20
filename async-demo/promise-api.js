// sometimes we want to run multiple async requests
// in parallel and do something after all of them are done

/*const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
        // reject('Error happened...');
    }, 2000);
})
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
})
*/
// waits for all promises to come back before resolving
// RESULT is [1, 2]
// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

// as soon as one of the parallel promises is resolved\
// it return the result, does not wait for others   
// RESULT is 1, not an array
// Promise.race([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err));


// even better way 
// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepos(user);
        const commits = await getCommits(repos[0]);
        console.log("finished async call chain");
    } 
    catch (error) {
        console.log('error message');   
    }
}
displayCommits();

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