// --a=10 --b=20

// externo
const minimist = require("minimist");

// interno
const meuModulo = require("./meu_modulo");
const soma = meuModulo.soma;

const args = minimist(process.argv.slice(2));

const a = args["a"];
const b = args["b"];

soma(a, b);
