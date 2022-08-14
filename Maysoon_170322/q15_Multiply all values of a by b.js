function myFunc(x,y){
   
    for(const [key,val]of Object.entries(x)){
        x[key]=val *y
    }
  
  return x
}
console.log(myFunc({a:1,c:2,b:4},2))
 