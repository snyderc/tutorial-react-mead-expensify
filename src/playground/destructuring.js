// ************************
// ES6 Object Destructuring
// Pull off various properties into their own variables

console.log('destructuring');

// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;

// if (city && typeof temperature === 'number') {
//     console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holliday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

// ***********************
//
// ES6 Array Destructuring
//

// const address = [
//     '1299 S Juniper St',
//     'Philadelphia',
//     'PA',
//     '19147'
// ];

// // Ordered list of variable names goes inside the brackets
// // Leave commas where there are blanks before or in the middle of the list
// // No renaming syntax b/c nothing to rename
// // Default if empty array, or if array isn't that long
// const [, city = 'Nowhere!', state] = address;

// console.log(`You are in ${city}, ${state}`);

const item = [
    'Coffee (hot)',
    '$2.00',
    '$2.50',
    '$2.75'
]

const [ itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}.`);