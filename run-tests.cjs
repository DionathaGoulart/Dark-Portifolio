const { exec } = require('child_process');

console.log('🧪 Executando testes...\n');

const command = 'npx vitest run --reporter=basic --run --no-watch';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erro ao executar testes:', error);
    process.exit(1);
  }

  if (stderr) {
    console.error('⚠️ Warnings:', stderr);
  }

  console.log(stdout);
  console.log('\n✅ Testes finalizados com sucesso!');
  process.exit(0);
});
