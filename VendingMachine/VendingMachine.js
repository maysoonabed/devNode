
class VendingMachine {
  constructor(items) {
    this.jf = items
    this.products = require(items).data
    this.wallet = require(items).wallet
    let sum = 0

    console.log(this.wallet)
  }
  displayProducts() {
    console.log('Available Products are:')
    for (let product of this.products) {
      if (product.quantity > 0)
        console.log(product.id, product.name, product.cost)
    }
  }
  selectProduct() {
    const checkProduct = (id, cost) => {
      let selected = this.products.filter(x => x.id == id)[0];
      if (selected.cost <= cost) {
        selected.quantity = selected.quantity - 1
        this.wallet[cost]++
        let rem = cost - selected.cost
        //this.wallet-rem wa dekin
        console.log('Successfully Purchased, The remaining amount is: ', rem)
        const fs = require('fs');
        const fileName = this.jf;
        const file = require(fileName);
        file.date = this.products;
        file.wallet=this.wallet;
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
          if (err) return console.log(err);
        });
      }
      else {
        console.log('Not Enough Money To Purchase ', selected.name);
        console.log('Recieved ', cost, 'But ', selected.cost, 'Needed')
      }
    }
    //  let ids= this.products.map(a => a.id)
    const prompt = require('prompt');
    const properties = [
      {
        name: 'id',
      },
      {
        name: 'coin',
        validator: /^[0.5,1,2,5,10]/,
        warning: 'The Vending Machine ONLY accepts valid coins'
      }
    ];
    prompt.start();
    prompt.get(properties, function (err, result) {
      if (err) {
        return onErr(err);
      }
      checkProduct(result.id, result.coin)
    });

    function onErr(err) {
      console.log(err);
      return 1;
    }
  }
}

let x = new VendingMachine('./items.json')
x.displayProducts()
x.selectProduct()
