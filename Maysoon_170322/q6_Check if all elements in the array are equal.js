
function myFunc(a){
    return a.every((x) => x===a[0])
}

console.log(myFunc([1,2,3,4,5]))
console.log(myFunc([1,1]))