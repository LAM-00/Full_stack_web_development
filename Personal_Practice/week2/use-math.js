// use-math.js


/**
 * we have math.js and we defined a mrthod called
 * add(a,b) now we are using the method add() from the
 * math.js file into this use-math file
 * using require('./FILENAME')
 * */


// Node looks for: math.js
// in the same folder as the file that called it
// require() is how Node.js  imports code from:
// --> built‑in modules (like path)
// --> files you wrote (like ./math.js)
// --> installed packages (like express)

const math = require('./math');
console.log(math.add(2,3));


/**
 * using built-in modules(like path)
 * */

// WE store that object in a variable called path.
const path = require('path');


// This joins path segments in a safe way.
//On Windows, it prints: a\b
console.log(path.join('a', 'b'));
