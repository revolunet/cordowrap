# cordowrap

![npm](https://img.shields.io/npm/v/cordowrap.svg) ![license](https://img.shields.io/npm/l/cordowrap.svg) ![github-issues](https://img.shields.io/github/issues/revolunet/cordowrap.svg) ![Circle CI build status](https://circleci.com/gh/revolunet/cordowrap.svg?style=svg)

![nodei.co](https://nodei.co/npm/cordowrap.png?downloads=true&downloadRank=true&stars=true)

Promise-based Cordova APIs with mocks support






## QuickStart

Create a new a folder then

```sh
curl -fsSL https://github.com/revolunet/node-babel-boilerplate/archive/master.tar.gz | tar -xz --strip-components=1 node-babel-boilerplate-master
npm i
git init
```

Edit `package.json` and the `LICENSE`, then run `npm run readme` to update your README.

## Scripts

 - **npm run readme** : `node ./node_modules/node-readme/bin/node-readme.js`
 - **npm run test** : `find ./spec -iname '*.spec.js' -exec ./node_modules/.bin/babel-node {} \; | ./node_modules/.bin/tap-spec`
 - **npm run zuul** : `./node_modules/zuul/bin/zuul -- spec/**/*.spec.js`
 - **npm run build** : `babel -d ./dist ./src`
 - **npm run watch** : `babel --watch -d ./dist ./src`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[babel](https://www.npmjs.com/package/babel) | 5.6.23 | ✔
[babel-eslint](https://www.npmjs.com/package/babel-eslint) | 3.1.23 | ✔
[babelify](https://www.npmjs.com/package/babelify) | 6.1.2 | ✔
[es6-template-strings](https://www.npmjs.com/package/es6-template-strings) | 1.0.0 | ✔
[eslint](https://www.npmjs.com/package/eslint) | 1.0.0-rc-1 | ✔
[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) | 0.0.6 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | 0.1.7 | ✔
[semistandard](https://www.npmjs.com/package/semistandard) | 6.1.2 | ✔
[tap-spec](https://www.npmjs.com/package/tap-spec) | 4.0.2 | ✔
[tape](https://www.npmjs.com/package/tape) | 4.0.0 | ✔
[zuul](https://www.npmjs.com/package/zuul) | 3.2.0 | ✔


## Author

Julien Bouquillon <julien@bouquillon.com> http://github.com/revolunet

## License

 - **MIT** : http://opensource.org/licenses/MIT
