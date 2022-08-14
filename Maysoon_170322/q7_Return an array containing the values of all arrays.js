
function myFunc(...a){
    const res=[]

    return res.concat(...a)
}

console.log(myFunc([1,2,3,4,5],[true],['test']))
