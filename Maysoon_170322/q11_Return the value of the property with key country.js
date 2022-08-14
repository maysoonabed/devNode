function myFunc(obj)  {
    return obj['country'] 
    }
console.log(myFunc({continent:'Asia',country:'Japan'}))
console.log(myFunc({country:'Sweden',continent:'Europe'}))