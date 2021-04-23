const fetchData = callBack => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Done ${5+5+5+5+5}`);
        }, 1500);
    });
    return promise;
}

setTimeout(() => {
    console.log("Timing");
    fetchData()
        .then(text => {
            console.log(text);
            return fetchData();
        })
        .then(text2 => {
            console.log(text2);
        });
}, 2000); // async code

console.log("What's up")
console.log("What's up again")