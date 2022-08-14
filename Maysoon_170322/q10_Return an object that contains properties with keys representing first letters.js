function myFunc(arr)  {
const res = {};
   for(item of arr) {
       const firstLetter = item[0]
       if(!res[firstLetter])  res[firstLetter] = [];
       if(res[firstLetter].indexOf(item) < 0) res[firstLetter].push(item);       
   }
   return res;
}
//groupBy.....check it out
console.log(myFunc(['Berlin', 'Paris', 'Prague']));
