

const axios = require("axios");


export const login = (user, setAlertMsg, alertMsg, llegaId) => {
  axios
    .post("http://localhost:8080/api/login", user, { withCredentials: true })
    .then((res) => {
      console.log(res.data.id._id);
      llegaId(res.data.id._id)

    })
    .catch((err) => {
      Object?.entries(err.data.msg).map((e) => {
        console.log(e[1].message);
        setAlertMsg([...alertMsg, e[1].message]);
        alert("todos los campos son obligatorios" + JSON.stringify([...alertMsg, e[1].message]))
      })

    })

}


export const createNewUser = (user, setAlertMsg, alertMsg) => {
  axios
    .post("http://localhost:8080/api/user/new", user)
    .then((res) => (console.log(res.data.user)))
    .catch((err) => {
      Object?.entries(err.response.data.error.errors).map((e) => {
        console.log(e[1].message);
        setAlertMsg([...alertMsg, e[1].message]);
        alert("todos los campos son obligatorios" + JSON.stringify([...alertMsg, e[1].message]))
      })
    })

};


export const findOneSingleUser = (setUser) => {

  axios
    .get(`http://localhost:8080/api/user/`, { withCredentials: true })
    .then((res) => {
      (setUser(res.data.user))
      console.log(res.data.user)
    })
}

export const updateExistingUser = (id, userForm, setAlertMsg, alertMsg) => {
  console.log("este es el user form" + JSON.stringify(userForm))
  axios
    .put(`http://localhost:8080/api/user/update/${id}`, userForm, { withCredentials: true })
    .then((res) => ((res.data.user)))
    .catch((err) => {
      Object?.entries(err.response.data.error.errors).map((e) => {
        console.log(e[1].message);
        setAlertMsg([...alertMsg, e[1].message]);
        alert("todos los campos son obligatorios" + JSON.stringify([...alertMsg, e[1].message]))
      })
    })
}

