function myFunc(obj,key)  {
    return obj[key] 
    }
console.log(myFunc({continent:'Asia',country:'Japan'},'continent'))
console.log(myFunc({country:'Sweden',continent:'Europe'},'country'))