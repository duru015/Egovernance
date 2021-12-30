const Register = require("../../models/register.model");

const checkExistingUser = async(args) => {
    const {
        firstname,
        middlename,
        lastname,
        Dateofbirth,
        Fathername,
        mothername,
        PermanentAddress,
        Gender,
        BirthPlace,
        Grandfather,
        fathercitizenship,
    mothercitizenship,
        
      } = args;
      return await Register.findOne({firstname,
        middlename,
        lastname,
        Dateofbirth,
        Fathername,
        mothername,
        PermanentAddress,
        Gender,
        BirthPlace,
        Grandfather,
        fathercitizenship,
    mothercitizenship,})
}

const saveNewUser = async(args) => {
const {
  firstname,
  middlename,
  lastname,
  Dateofbirth,
  Fathername,
  mothername,
  PermanentAddress,
  Gender,
  BirthPlace,
  Grandfather,
  fathercitizenship,
mothercitizenship,
image
  } = args;
    return await Register.create({firstname,
      middlename,
      lastname,
      Dateofbirth,
      Fathername,
      mothername,
      PermanentAddress,
      Gender,
      BirthPlace,
      Grandfather,
      fathercitizenship,
  mothercitizenship,
  image
})
}

module.exports = {
    checkExistingUser,
    saveNewUser
}