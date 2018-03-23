module.exports = {
  moduleFileExtensions: [ 'ts', 'js', 'json' ],
  transform: { '^.+\\.ts$': '<rootDir>/jest.transpiler.js' },
  testMatch: [ '**/__tests__/**/*.ts' ],
  setupTestFrameworkScriptFile: '<rootDir>/jest.boot.js'
}
