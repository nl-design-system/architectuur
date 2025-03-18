module.exports = {
  '*': 'prettier --ignore-unknown --write',
  '*.{css,scss}': ['stylelint --allow-empty-input'],
  '*.{js,cjs,mjs,json,jsx,mdx,ts,tsx}': ['eslint --no-error-on-unmatched-pattern'],
  '*.md': ['markdownlint'],
  'package.json': 'npmPkgJsonLint --allowEmptyTargets',
};
