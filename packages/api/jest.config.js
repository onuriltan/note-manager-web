module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{ts,}', '!<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@middleware/(.*)': '<rootDir>/src/middlewares/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
  },
}
