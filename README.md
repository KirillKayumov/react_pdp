# Social PDP frontend app

[![Build Status](https://semaphoreci.com/api/v1/kirill_kayumov/react_pdp/branches/master/shields_badge.svg)](https://semaphoreci.com/kirill_kayumov/react_pdp)
[![Code Climate](https://codeclimate.com/github/KirillKayumov/react_pdp/badges/gpa.svg)](https://codeclimate.com/github/KirillKayumov/react_pdp)

## NPM Dependencies:

List of all dependencies is presented [here](https://github.com/fs/react-base/blob/master/package.json)

## Install
### OSX

Install Node.js

Via brew:
```bash
brew install node
```

Via nvm:
```bash
brew install nvm
nvm install node
nvm alias default node
```

## Quick start

Run bootstrap script

```bash
bin/setup
```

## Run application

Run app (by default environment is 'development', port is 8000)

```bash
npm start
```

Run app with options

```bash
[<options>] npm start
```

```bash
NODE_ENV=development # build app with development environment
NODE_ENV=production # build app with production environment
NODE_ENV=test # build app with test environment
PORT=8000 # run server on 8000 port
```

Start to use application in browser:

```bash
localhost:8000
```

## Run tests and linters

```bash
npm test
```

## Code linting tasks

Run javascript linter
```bash
npm run eslint
```

Run stylesheets linter
```bash
npm run stylelint
```

Run all linters
```bash
npm run lint
```

## Test tasks

Run karma tests
```bash
npm run karma
```
