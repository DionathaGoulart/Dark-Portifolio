const { spawn } = require('child_process');

console.log('🧪 Executando testes...\n');

const vitest = spawn('npx', ['vitest', 'run', '--run', '--no-watch'], {
  stdio: 'inherit'
});

vitest.on('close', (code) => {
  console.log(`\n✅ Testes finalizados com código: ${code}`);
  process.exit(code);
});

vitest.on('error', (error) => {
  console.error('Erro ao executar testes:', error);
  process.exit(1);
});
