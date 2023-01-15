module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/auth/login",
        destination: "https://ordering-pizza-app.vercel.app/api/login",
      },
      {
        source: "/api/order",
        destination: "https://ordering-pizza-app.vercel.app/api/order",
      },
      {
        source: "/api/products",
        destination: "https://ordering-pizza-app.vercel.app/api/products",
      }
    ];
  };
  return {
    rewrites,
    images:{
      domains:["res.cloudinary.com"]
    }
  };
};