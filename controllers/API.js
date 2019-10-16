'use strict';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

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
        return WooCommerce.get("products");
    }  
    async getProduct(id) {
        console.log("getProductData("+id+")");
        //console.log(await WooCommerce.get("products/"+id));
        return await WooCommerce.get("products/"+id);
    }
    async getWatches() {
        this.getAllProducts();
        console.log(this.getAllProducts());
    }
    async getAllCadrants() {
        // virtual true + product.categories.slug = "cadran")
    }
    async getAllBracelets() {
        // virtual true + product.categories.slug = "bracelet")
    }
}  
  
module.exports = new APIWooCommerce();