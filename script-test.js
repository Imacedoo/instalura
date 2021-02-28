const shell = require('shelljs');

shell.exect('git diff --name-only branch-scripts-testes..main', { silent: true });

// eslint-disable-next-line no-console
console.log('Olá Mundo dos testes');
