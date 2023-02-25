<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>#{DESC}#</i>
    <br>
    <br>
    <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#/actions">
      <img src="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://bundlephobia.com/package/#{REPO_NAME}#">
      <img src="https://img.shields.io/bundlephobia/minzip/#{REPO_NAME}#">
    </a>
    <a href="https://www.npmjs.com/package/#{REPO_NAME}#">
      <img src="https://img.shields.io/npm/dw/#{REPO_NAME}#">
    </a>
    <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/#{REPO_NAME}#">
    </a>
</p>
<p align="center">
  <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#">Home</a>
  -
  <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#">Documentation</a>
</p>

# Install / Import

```bash
$ npm install --save #{REPO_NAME}#
```

```typescript
import { myFunction, myObject } from "#{REPO_NAME}#";
```

Specific imports:

```typescript
import { myFunction } from "#{REPO_NAME}#/myFunction";
import { myObject } from "#{REPO_NAME}#/myObject";
```

# Contributing

## Testing your changes in an external app

You have made some changes to the code and you want to test them
in your app before submitting a pull request?

Assuming `you/my-app` have `#{REPO_NAME}#` as a dependency.

```bash
cd ~/github
git clone https://github.com/you/my-app
cd my-app
yarn

cd ~/github
git clone https://github.com/garronej/#{REPO_NAME}#
cd #{REPO_NAME}#
yarn
yarn build
yarn link-in-app my-app
npx tsc -w

# Open another terminal

cd ~/github/my-app
rm -rf node_modules/.cache
yarn start # Or whatever my-app is using for starting the project
```

You don't have to use `~/github` as reference path. Just make sure `my-app` and `#{REPO_NAME}#`
are in the same directory.

> Note for the maintainer: You might run into issues if you do not list all your singleton dependencies in
> `src/link-in-app.js -> singletonDependencies`. A singleton dependency is a dependency that can
> only be present once in an App. Singleton dependencies are usually listed as peerDependencies example `react`, `@emotion/*`.

## Releasing

For releasing a new version on GitHub and NPM you don't need to create a tag.  
Just update the `package.json` version number and push.

For publishing a release candidate update your `package.json` with `1.3.4-rc.0` (`.1`, `.2`, ...).  
It also work if you do it from a branch that have an open PR on main.

> Make sure your have defined the `NPM_TOKEN` repository secret or NPM publishing will fail.
