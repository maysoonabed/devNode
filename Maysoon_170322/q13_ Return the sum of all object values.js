function myFunc(obj)  {
    return  Object.values(obj).reduce((a, b) => a + b)
    }
console.log(myFunc({a:1,b:2,c:3} ))
