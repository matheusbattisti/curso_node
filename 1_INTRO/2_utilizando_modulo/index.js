const fs = require('fs')

fs.readFile('arquivo.txt', 'utf8', (err, data) => {
  console.log(data)
})
