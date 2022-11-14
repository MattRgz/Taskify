const axios = require("axios");

export const postNewList = (setList) => {
    axios.post('http://localhost:8080/api/list/new', setList)
        .resolve((res) => {return res.data._id} )
        .catch(err => console.log(err.response.data.error));
}

export const postNewListProduct = (list_id, setProducts) => {
    axios.post(`http://localhost:8080/api/list/${list_id}/product/new`, setProducts)
        .then((res) => 'Ok')
        .catch(err => console.log(err.response.data.error));
}
