console.log("hello, this test.js is for actuall practicing the Node Program!");


/* 
Variables [let]
*/

let count = 0;
count += 1;
console.log(count);  // output should be 1


/* 
Constants [const]
*/
const pi = 3.14159;
console.log(pi);

//pi = 4;
//console.log(pi);

const user = {name: 'ANO'};
console.log(user);
// MUTABLE OBJECT
user.name = 'LIN';
console.log(user)





/*
 * let vs var (quick differences)
 * Scope: let is block-scoped; var is function-scoped
 * Redeclare: var allows redeclare in same scope; let does not
 * Hoisting: var is hoisted and initialized to undefined; let is hoisted but not 
 * initialized (TDZ)
 */


//Hoisting [example]//

console.log(x);  
// var is hoisted + initialized
// but undefined
var x = 10;


/*
console.log(y);   
// ReferenceError TDZ
// Cannot access 'y' before initialization
let y = 10;
*/


/*
 * Branching [if / else]
 */

const temp = 18;

if (temp >= 20)
    {console.log("t-short")}
else{console.log("hoodie")}

/*
 * looping [for] 
 */

for (let i = 1; i <= 3; i++)

    {
        //console.log("       *       ")

        for (let m = i+1; m <= 3; m++)
        {
            console.log("    /-*-/     ")
        }
    }


/*
 * looping [while] 
 */
let n = 3;
while (n > 0)
{
    //console.log("*");
    console.log(n);
    n--;
}



/**
 * Functions
 * */

function add(a,b)
{
    return a+b;
}
console.log("a1+b1 = ", add(1,2))
console.log("a2+b2 = ", add(2,3))




/*
 * Arrow Functions
 */


/** 
 * WE have two different ways of writing a function in JavaScript:
 * 1.Function expression
 * 2.Arrow function
 **/


// function expression
/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
const add1 = function (a, b) 
{
  return a + b;
};

// arrow function
/**
 * => means “return the following expression”.
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
const add2 = (a, b) => a + b;


/*
 * Objects
 */
const u = {nsid: 'zlq765', studentID: 1138};
console.log(u.studentID)
u.studentID = 3212;
console.log(u.studentID)
console.log(u.nsid);
/*
 * Functions inside Objects
 */
const hello = {name: 'Lin_Anour',
    greet()
    {
        return "Hi, " + hello.name + " !!!"}
    }
console.log(hello.greet())



/*
 * Adding functions to object
 */

const user1 = { name: 'Ada' };
user1.greet = function ()
{
  return 'Hi, ' + this.name;
};
console.log(user1.greet());
