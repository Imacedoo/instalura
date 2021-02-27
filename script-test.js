const shell = require('shelljs');

shell.exect('git diff --name-only branch-scripts-testes..main');

console.log('Olá Mundo dos testes');
