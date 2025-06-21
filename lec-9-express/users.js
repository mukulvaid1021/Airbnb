
const fs = require('fs');

const userrequesthandler = ((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male" />')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female" />')
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();

  } else if (req.url.toLowerCase() === "/submit-details" &&
        req.method == "POST") {
          // data ko chunks me lega 
          const body = [];
          req.on('data',chunk =>{
            console.log(chunk);
            body.push(chunk);
          });
          // sara data aa jayaga toh end kr dega
          req.on('end',()=>{
            const fullbody = Buffer.concat(body).toString();
            console.log(fullbody);
            const params = new URLSearchParams(fullbody);
            //const objbody = {};
            //for(const [key,val] of params.entries()){
             // objbody[key] = val;
            //}
            const objbody = Object.fromEntries(params);
            console.log(objbody);
            fs.writeFile('user.txt', JSON.stringify(objbody),error =>{
              console.log('Data written successfully');
              res.statusCode = 302;
              res.setHeader('Location', '/');
              return res.end();
            });
          });
          //fs.writeFileSync('user.txt', "Mukul vaid");
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
});

module.exports = userrequesthandler;