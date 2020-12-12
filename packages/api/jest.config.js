module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{js,}', '!<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@middleware/(.*)': '<rootDir>/src/middlewares/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
  },
}
