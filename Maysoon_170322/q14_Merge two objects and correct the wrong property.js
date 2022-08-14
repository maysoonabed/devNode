function myFunc(x,y){
   let dup ={}
   for (let xKey of Object.keys(x)){
if(y[xKey]&& x[xKey]!==y[xKey]){
    dup={
        [xKey]:x[xKey]
    }
    y['d']=y[xKey]
        }
   }
  return {...x,...y,...dup}
}
console.log(myFunc({a:1,b:2},{c:3,b:4}))
