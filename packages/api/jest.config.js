module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{js,}', '!<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
}
