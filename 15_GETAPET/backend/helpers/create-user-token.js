const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    "nossosecret"
  );

  // set expiry to 1 month
  const d = new Date();
  d.setDate(d.getDate() + 30);

  res.cookie("jwt", token, {
    path: "/",
    expires: d,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  console.log(req.cookies);
  console.log(res.cookies);
  console.log(token);

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
