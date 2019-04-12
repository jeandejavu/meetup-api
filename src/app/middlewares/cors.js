const cors = (request, response, next) => {
  const origin = request.header('Origin')
  response.header('Access-Control-Allow-Origin', origin)
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  response.header('Access-Control-Allow-Headers', '*')
  response.header('Access-Control-Allow-Credentials', 'true')

  if (request.method === 'OPTIONS') {
    response.send()
    return
  }

  next()
}

module.exports = cors
