'use strict';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const Product            = require('../models/product');
const VirtualProduct     = require('../models/virtualProduct');

const WooCommerce = new WooCommerceRestApi({
    url: 'http://vps676674.ovh.net', // Your store URL
    consumerKey: 'ck_d7a857bfea5db8f317c6172ec81e942a494d9e1e', // Your consumer key
    consumerSecret: 'cs_076313c56f21174816d97914abeb3d80c17434ff', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class APIWooCommerce {

    async getAllProducts() {
        console.log("API.products()");
        return WooCommerce.get("products", {'per_page': 30});
    }
    async setProductFromWooCommerceProduct(productWooCommerce){
        console.log("setProductFromWooCommerceProduct");
        const product = new Product(productWooCommerce);
        return product;
    }
    async getProduct(id) {
        console.log("getProduct(" + id + ")");
        const productWooCommerce = await WooCommerce.get("products/" + id);
        return productWooCommerce;
    }
    async getProductAndCheckWatch(id) {
        const WatchAndCadransAndBracelets = [];
        let productWooCommerce = await this.getProduct(id);
        const watch = this.isProductAWatch(productWooCommerce);
        if(watch) {
            console.log("IsAwAtch!");
            const cadrans = await this.getCadrans();
            const bracelets = await this.getBracelets();
            const watch = await this.setProductFromWooCommerceProduct(productWooCommerce.data);
            WatchAndCadransAndBracelets.push(watch, cadrans, bracelets);
            return WatchAndCadransAndBracelets;
        }
        else {
            console.log("not a watch");
            const product = this.setProductFromWooCommerceProduct(productWooCommerce.data);
            return product;
        }
    }

    async getWatches() {
        console.log("getWatches()");
        var watches       = [];
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element => {
            if (!element.virtual) {
                const watch = new Product(element);
                watches.push(watch);
            }
        });

        return watches;
    }

    async getCadrans() {
        console.log("getcadrans()");
        const cadrans     = [];
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element => {
            if (element.virtual && element.categories[0].slug == "cadran") {
                const cadran = new VirtualProduct(element);
                cadrans.push(cadran);
                //console.log(cadran);
            }
        })

        return cadrans;
    }

    async getBracelets() {
        console.log("getBracelets()");
        const bracelets   = [];
        const allProducts = await this.getAllProducts();
        allProducts.data.forEach(element => {
            if (element.virtual && element.categories[0].slug == "bracelet") {
                const bracelet = new VirtualProduct(element);
                bracelets.push(bracelet);
                //console.log(bracelet);
            }
        })

        return bracelets;
    }

    isProductAWatch(productWooCommerce) {
        return (!productWooCommerce.data.virtual);
    }
        
    
}

module.exports = new APIWooCommerce();