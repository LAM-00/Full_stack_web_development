/***
 * JSON.stringify / JSON.parse
 * */

const obj = {name: 'x', age: 16};


const json = JSON.stringify(obj);  
console.log(json);   //{"name":"x","age":16}


const back = JSON.parse(json);
console.log(back.name)   // x


/**
 * Functions are NOT valid JSON
 * This is a JavaScript object (OK)
 * This cannot be JSON (JSON data only).
 * */

const obj1 = {name: 'x',greet: () => 'hi'};
console.log(obj1.greet());   // WORKS!!


const json1 = JSON.stringify(obj1);
console.log(json1);     // message disappears!!

