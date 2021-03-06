module.exports = {
  // roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
    "@tests/(.*)": "<rootDir>/__tests__/$1"
  }
}
