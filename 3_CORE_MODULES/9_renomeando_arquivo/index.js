const fs = require('fs')

fs.rename('arquivo.txt', 'novoarquivo.txt', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Arquivo renomeado!')
})
