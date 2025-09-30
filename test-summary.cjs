#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read test results
const resultsPath = path.join(__dirname, 'test-results.json');

if (!fs.existsSync(resultsPath)) {
  console.log('❌ No test results found. Run tests first.');
  process.exit(1);
}

try {
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  
  // Calculate summary
  const totalTests = results.numTotalTests || 0;
  const passedTests = results.numPassedTests || 0;
  const failedTests = results.numFailedTests || 0;
  const skippedTests = results.numTodoTests || 0;
  const duration = results.startTime ? 
    ((Date.now() - results.startTime) / 1000).toFixed(2) : 'N/A';

  // Calculate success rate
  const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;

  // Colors for terminal output
  const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
  };

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bold}${colors.cyan}📊 RESUMO FINAL DOS TESTES${colors.reset}`);
  console.log('='.repeat(60));
  
  console.log(`\n${colors.bold}📈 Estatísticas:${colors.reset}`);
  console.log(`   Total de testes: ${colors.bold}${totalTests}${colors.reset}`);
  console.log(`   ${colors.green}✅ Passou: ${passedTests}${colors.reset}`);
  console.log(`   ${colors.red}❌ Falhou: ${failedTests}${colors.reset}`);
  console.log(`   ${colors.yellow}⏭️  Pulou: ${skippedTests}${colors.reset}`);
  
  console.log(`\n${colors.bold}⏱️  Tempo de execução: ${colors.blue}${duration}s${colors.reset}`);
  console.log(`\n${colors.bold}📊 Taxa de sucesso: ${colors.blue}${successRate}%${colors.reset}`);

  // Status overall
  if (failedTests === 0) {
    console.log(`\n${colors.green}${colors.bold}🎉 TODOS OS TESTES PASSARAM!${colors.reset}`);
  } else {
    console.log(`\n${colors.red}${colors.bold}⚠️  ALGUNS TESTES FALHARAM${colors.reset}`);
  }

  // Test files summary
  if (results.testResults && results.testResults.length > 0) {
    console.log(`\n${colors.bold}📁 Resumo por arquivo:${colors.reset}`);
    results.testResults.forEach(file => {
      const fileName = path.basename(file.name);
      const status = file.status === 'passed' ? 
        `${colors.green}✅` : 
        file.status === 'failed' ? 
        `${colors.red}❌` : 
        `${colors.yellow}⏭️`;
      
      console.log(`   ${status} ${fileName} (${file.numPassingTests}/${file.numFailingTests + file.numPassingTests})`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.cyan}✨ Testes concluídos com sucesso!${colors.reset}`);
  console.log('='.repeat(60) + '\n');

} catch (error) {
  console.error('❌ Erro ao processar resultados dos testes:', error.message);
  process.exit(1);
}
