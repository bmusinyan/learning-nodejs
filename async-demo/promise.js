const p = new Promise((resolve, reject) => {
    // Kick of some async work
    
    resolve(1);
    reject(new Error('message'));
});

p.then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));