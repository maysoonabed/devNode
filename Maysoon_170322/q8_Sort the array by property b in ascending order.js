
function myFunc(arr){

    return arr.sort((x,y) => (x.b> y.b) ? 1 : -1)
   }
   
   console.log(myFunc([{a:1,b:2},{a:5,b:4}]))
   console.log(myFunc([{a:3,b:10},{a:5,b:4}]))

   
   
   