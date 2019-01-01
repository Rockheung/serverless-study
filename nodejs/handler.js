const https = require("https");
const querystring = require("querystring");

module.exports.handler = async (event, context, callback) => {
  //return {
  //  statusCode: 200,
  //  body: JSON.stringify({
  //    message: 'Go Serverless v1.0! Your function executed successfully!',
  //    input: event,
  //  }),
  //};


  const buildResponse = (code, body) => ({
    statusCode: code,
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.airkorea.or.kr',
      port: 443,
      path: '/web/mMyTownAirInfoAjax',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    const req = https.request(options, (res) => {
      res.setEncoding('utf-8');
      res.on('data', (d) => {
        var ress = JSON.parse(d).list.filter((l) => {
          return l.CODE === "131241";
        })[0];
        resolve(buildResponse(200, JSON.parse(d)));
      });
    });

    req.on('error', (e) => {
      console.log(e.message);
      reject(e.message);
    });

    // tm_x=222104.46594925277&tm_y=461877.5291267588
    req.write(querystring.stringify({
      tm_x: 222134.77,
      tm_y: 461877.5291267588
    }));
    req.end();
  });


  // switch (event.httpMethod) {
  //   case "GET":
  //     return buildResponse(200, { message: "GET method"});
  //   case "POST":
  //     console.log(options);
  //   case "PUT":
  //     return buildResponse(200, { message: "PUT method"});
  // }

  // callback(null, buildResponse(400, { message: "Unauthorized method"}));
};
