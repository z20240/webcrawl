# crawl-puppetter

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

<!-- ### Compiles and minifies for production
```
npm build
```

### Run your tests
```
npm run test
``` -->

### Lints and fixes files
```
npm run lint
```

### Install Lints And Pre-hooks into your project.
```
npm install --save-dev lint-staged husky
```

Add the script below into your package.json file
```json
{
    ...,
    "husky": {
    "hooks": {
        "pre-commit": "lint-staged"
    }
    },
    "lint-staged": {
    "*.js": ["eslint --fix --no-ignore .eslintrc.js", "git add"]
}

```

#### Trouble Shooting

If occur

`'module' is not defined` or `'require' is not defined` ...etc.

please add script below into your .eslintrc.*
```json
{
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "no-unused-vars": [
        "error",
        { "argsIgnorePattern": "next" }
    ]
}
```


Thene Open `babel.config.js` and Change the Code from `module.exports` to `export default`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
