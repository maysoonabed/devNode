
function myFunc(a,b){
    const res = [...new Set(a.concat(b).sort())] 
    return res
   }
   
   console.log(myFunc([1,2],[3,2,4]))
   console.log(myFunc([33,-32,23],[35,23,-34]))

   
   
   