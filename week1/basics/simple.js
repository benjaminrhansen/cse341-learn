const person = {
    age=99,
    name = "Bob",
    greet() {
        console.log("Wow, this is like ERlang somewhat.......... maybe")
    }
}
person.greet()

const hobbies = ['Sports', 'cooking']

const copied = hobbies.slice(); // copy entire array
const spread = [...hobbies]; // pull out all elements into the new array

// ... rest operator
const toArray = (...args) => {
    return args;
}

// destructuring

// object destructuring
// extract the name property from an object
const printNme = ({ name }) => {
    console.log(name)
}

const { name, age } = person;