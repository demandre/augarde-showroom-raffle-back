'use strict';

class virtualProduct {
  constructor(JSONdata) {
        this.id = JSONdata.id;
        this.name = JSONdata.name;
        this.image = JSONdata.images[0].src;      
  }
}
module.exports = virtualProduct;