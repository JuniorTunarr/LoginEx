// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const { method } = req;
  const { name, email, password } = req.body;

  const jwt = require("jsonwebtoken");
  var userInfo = { name: name, email: email };
  var array = new Uint32Array(10);
  var secretKey = Math.random();
  if (method! == "POST") {
    return res.status(404).end();
  }
  if (!email || !password) {
    return res.status(400).json({
      error: "Missing required params",
    });
  }
};
