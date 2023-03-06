// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const { method } = req;
  const { email, password } = req.body;

  if (method! == "POST") {
    return res.status(404).end();
  }
  if (!email || !password) {
    return res.status(400).json({
      error: "Missing required params",
    });
  }
};
