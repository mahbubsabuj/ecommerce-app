const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;
  return expressJwt
    .expressjwt({
      secret,
      algorithms: ["HS256"],
      isRevoked: isRevoked,
    })
    .unless({
      path: [
        {url: new RegExp(/\/public\/uploads(.*)/), method: ['GET', 'POST']},
        {
          url: new RegExp(/\/api\/v1\/products(.*)/),
          methods: ["GET", "OPTIONS"],
        },
        {
          url: new RegExp(/\/api\/v1\/categories(.*)/),
          methods: ["GET", "OPTIONS"],
        },
        `${api}/users/login`,
        `${api}/users/register`,
        {url: /(.*)/}
      ],
    });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
  return false;
}

module.exports = authJwt;
