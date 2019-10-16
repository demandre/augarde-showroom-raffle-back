'use strict';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

const WooCommerce = new WooCommerceRestApi({
  url: 'http://vps676674.ovh.net', // Your store URL
  consumerKey: 'ck_d7a857bfea5db8f317c6172ec81e942a494d9e1e', // Your consumer key
  consumerSecret: 'cs_076313c56f21174816d97914abeb3d80c17434ff', // Your consumer secret
  version: 'wc/v3' // WooCommerce WP REST API version
});
class API {

    async getAllProducts() {
        console.log("API.products()");
        //console.log(await WooCommerce.get("products"));
        return WooCommerce.get("products");
    }  

    async getProduct(id) {
        console.log("API.product(id)");
        return WooCommerce.get("products/17");
    }
}  
  
module.exports = new API();