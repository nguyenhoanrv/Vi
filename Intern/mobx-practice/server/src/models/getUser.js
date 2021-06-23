const User = require("../models/user");
const getUser = async (username, password) => {
  //console.log(username, password)
  try {
    const data = await User
      .where({
        username,
        password
      }).fetch();
    //console.log("Data",data)
    return data
  } catch (err) {
    console.log(err);
  }

};

module.exports = getUser;