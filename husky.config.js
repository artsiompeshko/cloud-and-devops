module.exports = {
  hooks: {
    'pre-commit': 'npm run format && npm run lint',
  },
};
