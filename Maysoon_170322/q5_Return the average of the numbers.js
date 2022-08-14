
function myFunc(a){
    return a.reduce((sum, a) => sum + a, 0)/a.length
}

console.log(myFunc([1,2,3]))