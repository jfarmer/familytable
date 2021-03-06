const jwt = require('jsonwebtoken');

const withAuth = function(req,res, next) {
  const token = req.cookies.token;
  console.log('TOKEN displayed by withAuth: ', token);

  if (!token) {
    res.status(401).send('Unauthorized: no token provided');
  } else {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: invalid token');
        console.log('An error occurred with the token!')
      } else {
        console.log('DECODED EMAIL: ',decoded.email);
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;
