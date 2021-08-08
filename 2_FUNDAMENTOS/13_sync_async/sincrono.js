const fs = require("fs");

console.log("Início");

fs.writeFileSync("arquivo.txt", "Oi");

console.log("Fim");
