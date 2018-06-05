const promise = new Promise( (resolve, reject) => {
    setTimeout(() => {
        resolve('This is my resolved data');
        // reject('Something went wrong');
    }, 2000);
});

console.log('before');

// Register a callback on promise
// .then() is called if promise resolve()
// then() takes 1 argument: a function
// and that function only takes one argument -- 
// data from resolve() from the promise
// (if resolve() is set up to pass data)
promise.then( (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve('This is my resolved data');
            // reject('Something went wrong');
        }, 2000);
    });
}).then( (str) => {
    console.log('does this run?');
}).catch( (error) => {
    console.log('error: ', error);
});

// Promise chaining: Multiple .then() functions.
// If you use "return" in a then(), it gets passed
// to the next then() function

// You can also return a promise. What happens there
// is the returned promise runs, and if that promise
// is successful, the next then() function is the
// success case of that promise.

console.log('after');

// Note: then() can take a 2nd arg -- a function that will be treated
// as equivalent to catch() -- but using catch() is easier to read