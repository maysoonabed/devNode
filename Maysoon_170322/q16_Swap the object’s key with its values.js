function myFunc(obj){
    let res ={}
    for (let x of Object.keys(obj)){
     res={
    ...res,
      [obj[x]]:x
     }  
}
return res
}
console.log(myFunc({a:'x',b:'z'}))