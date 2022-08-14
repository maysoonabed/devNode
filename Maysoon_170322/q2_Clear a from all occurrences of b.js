console.log("i")
function myFunc(a,b){
    return a.filter(x=>x!=b)
}

console.log(myFunc([1,2,3],2))