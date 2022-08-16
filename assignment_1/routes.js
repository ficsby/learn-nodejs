const MAX_NUM_USERS = 10;

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Assignment 1 | Home</title></head>');

    const greeting = '<h1>Hello! This is the best nodejs server :)</h1>';
    const form =
      '<form action="/create-user" method="POST"><button type="submit" name="new_user" value="User 10">Add User</button></form>';
    res.write(`<body>${greeting}${form}</body>`);
    res.write('</html>');
  } else if (url === '/users') {
    userList = '';

    for (let i = 0; i < MAX_NUM_USERS; i++) {
      userList += `<li>User ${i}</li>`;
    }

    res.write('<html>');
    res.write('<head><title>Assignment 1 | Users</title></head>');
    res.write(`<body><ul>${userList}</ul><body>`);
    res.write('</html>');
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUser = parsedBody.split('=')[1];
      console.log(`Added User: ${newUser}`);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }
  return res.end();
};

module.exports = requestHandler;
