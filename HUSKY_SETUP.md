# Husky + lint-staged setup

To enable pre-commit hooks for linting and formatting:

1. Install dependencies:

```bash
npm install --save-dev husky lint-staged
```

2. Enable Husky:

```bash
npx husky install
```

3. Add prepare script to package.json (if not already present):

```json
"scripts": {
  "prepare": "husky install"
}
```

4. Create a pre-commit hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

5. Add lint-staged config to package.json:

```json
"lint-staged": {
  "src/**/*.{ts,tsx,js,jsx,json,css,md}": [
    "prettier --write",
    "eslint --fix"
  ]
}
```
