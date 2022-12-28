async function logout(req, res) {
  try {
    /*
      #swagger.tags=['Authorization']
      #swagger.description='Logout from early office'
      #swagger.summary='Logout from early office'
    */

    res.clearCookie("authToken");
    return res.status(200).json("Logout successful");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error");
  }
}

module.exports = {
  logout,
};
