const axios = require("axios");


export const deleteAnExistingListProduct = (list_id,id) => {
    axios
    .delete(`http://localhost:8080/api/list/${list_id}/product/delete/${id}`, { withCredentials: true })
    .then((res) => (console.log(res.data)))  
}
