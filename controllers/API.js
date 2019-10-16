'use strict';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const Product = require('../models/product');

const WooCommerce = new WooCommerceRestApi({
  url: 'http://vps676674.ovh.net', // Your store URL
  consumerKey: 'ck_d7a857bfea5db8f317c6172ec81e942a494d9e1e', // Your consumer key
  consumerSecret: 'cs_076313c56f21174816d97914abeb3d80c17434ff', // Your consumer secret
  version: 'wc/v3' // WooCommerce WP REST API version
});
class APIWooCommerce {

    async getAllProducts() {
        console.log("API.products()");
        //console.log(await WooCommerce.get("products"));
        return WooCommerce.get("products",{'per_page': 30});
    }  
    async getProduct(id) {
        console.log("getProduct("+id+")");
        //console.log(await WooCommerce.get("products/"+id));
        return await WooCommerce.get("products/"+id);
    }
    async getWatches() {
        console.log("getWatches()");
        var watches = {};
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element => {
            if(!element.virtual) {
                const watch = new Product(element);
                watches.push(watch);
            }
        });

        return watches;
    }
    async getCadrans() {
        // virtual true + product.categories.slug = "cadran")
        console.log("getcadrans()");
        const cadrans = [];
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element =>{
            if(element.virtual && element.categories[0].slug == "cadran") {
                const cadran = new Product(element);
                cadrans.push(cadran);
                console.log(cadran);

            }
        })

        return cadrans;
    }
    async getBracelets() {
        console.log("getBracelets()");
        // virtual true + product.categories.slug = "bracelet")
        const bracelets = [];
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element => {
            if(element.virtual && element.categories[0].slug == "bracelet") {
                const bracelet = new Product(element);
                bracelets.push(bracelet);
                console.log(bracelet);
            }
        })

        return bracelets;
    }
}
  
module.exports = new APIWooCommerce();