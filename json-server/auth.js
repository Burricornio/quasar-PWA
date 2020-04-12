// json-server --watch db.json --port 4000 --middlewares auth.js

const users = [
  {id: Date.now(), email: 'burri@cornio.com', password: '123456', displayName: 'Burricornio'}
];

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const user = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if (user) {
      return res.status(200).json({
        res: 'User authenticated',
        user
      })
    }
    return res.status(401).json({
      message: 'User not found'
    })

  } else if (req.method === 'POST' && req.path === '/register') {
    const user = { id: Date.now(), email: req.body.email, password: req.body.password, displayName: req.body.displayName }
    users.push(user)
    return res.status(200).json({
      res: 'User registered',
      user
    })
  } else {
    next()
  }
}


