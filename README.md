# upyun-deployer
[![NPM version](https://img.shields.io/npm/v/upyun-deployer.svg?style=flat)](https://www.npmjs.org/package/upyun-deployer)

simple node module for deploy static files to UPYUN bucket

------

## Installation

```bash
$ npm install upyun-deployer -g
```

## Usage

```sh
$ up-deploy -local ./ --base site --bucket somebucket --operator someone --password mypwd
```

or, given a config jason like this:

```js
module.exports = {
  localPath: '../docs/site/',
  baseDir: 'site',
  bucket: 'somebucket',
  operator: 'someone',
  password: 'somepwd'
};
```

and then:

```sh
$ up-deploy --config /path/to/config
```

## License

MIT © [Leigh Zhu](#)
