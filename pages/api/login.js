import cookie from "cookie";

export default async function handler(req, res) {
  const {username, password} = req.body;
  if(username === process.env.ADMINE_USERNAME && password === process.env.ADMINE_PASSWORD){
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN, {
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json("Succesfull");
  }else {
    res.stats(400).json("Wrong Credentials");
  }
}