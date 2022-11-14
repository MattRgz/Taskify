const axios = require("axios");


export const findAllProducts = (setProducts) =>{
    axios
    .get('http://localhost:8080/api/product')
    .then((res) => (setProducts(res.data.Products)))
    .catch(err => console.log(err.response.data.error));
}