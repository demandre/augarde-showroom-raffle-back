'use strict';

class Product {
  constructor(JSONdata) {
        this.id = JSONdata.id;
        this.price = JSONdata.price;
        this.name = JSONdata.name;
        this.description = JSONdata.description;

  }
}

module.exports = Product;

// catalogue avec id, nom, prix, photo -> images.src
// virtual true 