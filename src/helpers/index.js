const checkID = (id) => {
  if (isNaN(id)) {
    let response = {
      ok: false,
      meta: {
        status: 404
      },
      msg: "Numero incorrecto"
    }
    return response
  }
  return false
}


module.exports = {checkID}