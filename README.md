<p align="center">
    <img width="350" src="https://user-images.githubusercontent.com/6702424/109354825-ab4b8e00-787e-11eb-8336-6009415ecaf6.png">  
</p>
<p align="center">
    <i> 🚀A starter for any TypeScript project meant to be published on NPM🚀</i>
    <br>
    <br>
</p>  
  
> 🗣️ Since a recent GitHub update you need to manually allow GitHub Action to push on your repo.  
> Fo this reason the inital setup will fail.  
> You need to enabled permission and re-run failed job: [see video](https://user-images.githubusercontent.com/6702424/213480604-0aac0ea7-487f-491d-94ae-df245b2c7ee8.mov)  


https://user-images.githubusercontent.com/6702424/197344513-065246b9-8823-4894-a9a7-6c539da10655.mp4

`ts-ci` is a project starter like [TSDX](https://github.com/formium/tsdx) or [typescript-starter](https://github.com/bitjson/typescript-starter) but (arguably) better because:  
- It's not a CLI tool, the automation happens within Github Actions.  
  Update your `package.json` version number, push. Voila, your new version is published on NPM.  
- It enables you to publish prerelease simply by updating your package version to something like `1.2.3-rc.3`.  
- When someone opens submit a PR the tests are run agaist their fork. 
- It doesn't bundle your library into a single file so users can cherry-pick what they want to import from your lib, your modules will be tree shakable. 
  E.g: `import { aSpecificFunction } from "your-module/aSpecificFile"`  
  

# Examples of project using this template

- [Keycloakify](https://github.com/garronej/keycloakify)
- [Denoify](https://github.com/garronej/denoify)
- [tss-react](https://github.com/garronej/tss-react)
- [EVT](https://github.com/garronej/evt) 
- [i18nifty](https://github.com/etalab/i18nifty)  

# How to use

- Click on ![image](https://user-images.githubusercontent.com/6702424/127756563-ec5f2d07-d758-43f1-8fac-387847c0d064.png)
- The repo name you will choose will be used as a module name for NPM.
- Go to the repository ``Settings`` tab, then ``Secrets`` you will need to add a new secret:
``NPM_TOKEN``, you NPM authorization token.
- To trigger publishing edit the ``package.json`` ``version`` field ( ``0.0.0``-> ``0.0.1`` for example) then push changes... that's all !
- Publish pre-release by setting your version number to `X.Y.Z-rc.U` (example: `1.0.0-rc.32`). On NPM the version will be tagged `next`.  
- The CI runs on `main` and on the branches that have a PR open on `main`.  

# Features

- ✍️ Filling up the `package.json`
- ✅ Testing on multiple Node version running on Ubuntu and Windows before publishing.
- 📦 Publishing on NPM and creating corresponding GitHub releases.  
- 🧪 Enable you to test your local copy of the module on an external app.  
- 🌗 You can use a different repo image for dark and light mode. 
  Example with: [i18nifty](https://github.com/etalab/i18nifty): [Light](https://user-images.githubusercontent.com/6702424/200299948-94bacf9d-381e-40f8-b9a3-8e726bcd37c5.png) - [Dark](https://user-images.githubusercontent.com/6702424/200299807-42388349-a5ae-44b2-abd1-0aa538b58da2.png)  
  See [here](https://github.com/etalab/i18nifty/blob/f6ad7bb11514224a416158af7af8e4073c7932c1/README.md?plain=1#L1-L11) the special GitHub syntax (`#gh-dark-mode-only`) that enable this to work.  
  TS-CI provides [an extra action that strips the dark mode specific image from your README.md](https://github.com/garronej/ts-ci/blob/09916b317c55a04dbf2fc036d7343cd6c6756cc6/.github/workflows/ci.yaml#L105-L107) before [publishing on NPM](https://www.npmjs.com/package/i18nifty) (NPM do not recognize `#gh-dark-mode-only` yet).  
- 🩳 TS-CI comes by default with [a step in the workflow](https://github.com/garronej/ts-ci/blob/09916b317c55a04dbf2fc036d7343cd6c6756cc6/.github/workflows/ci.yaml#L102) that move your dist files to the root before releasing.  
  This enables your user to import specific file of your module like:  
  `import {...} from "my_module/theFile"` (instead of "my_module/**dist**/theFile" )  
  Feel free to remove [this action](https://github.com/garronej/ts-ci/blob/09916b317c55a04dbf2fc036d7343cd6c6756cc6/.github/workflows/ci.yaml#L102) if you don't like this behavior (or if you juste have an index.ts and users are not supposed to cherry
  pick what they want to import from your module.) 
- ⚙️ ESlint and Prettier are automatically run against files staged for commit. (Optional, you can [disable](https://github.com/garronej/ts-ci/blob/8da207622e51a248542cf013707198cd7cad1d09/README.md?plain=1#L87-L91) this feature)  


# Relase in CJS, ESM or both

By default your module relase [in CJS](https://github.com/garronej/ts-ci/blob/8390339b52c98cdbd458d4b945286f999358a1ff/tsconfig.json#L3) with [ESM module interop](https://github.com/garronej/ts-ci/blob/8390339b52c98cdbd458d4b945286f999358a1ff/tsconfig.json#L6).  

If you want to **only** release as ESM just set `"module": "ES2020"` in your `tsconfig.json` (and remove `esModuleInterop`).    

If you want to release for both CJS and ESM, it's a bit less straign forward. You have to:  

- Have a `tsconfig.json` that targets CSM (as by default): [example](https://github.com/garronej/tss-react/blob/main/tsconfig.json)  
- Perfome two build, one for CJS, one for ESM. [example](https://github.com/garronej/tss-react/blob/3cab4732edaff7ba41e3f01b7524b8db47cf7f25/package.json#L43)  
- Provide a `module` and `exports` property in your `package.json`, [example](https://github.com/garronej/tss-react/blob/3cab4732edaff7ba41e3f01b7524b8db47cf7f25/package.json#L11-L41).  
- Exclude things you don't want in the NPM bundle. [Example](https://github.com/garronej/tss-react/blob/eca273675ea6b402a260d262c4e09cac3e415da5/package.json#L76-L77)

# FAQ

<details>
  <summary>Click to expand</summary>  

## Can I use `npm` (or something else) instead of `yarn`

Yes, just remove the `yarn.lock` file and edit `.github/workflows/ci.yaml`, replace all `yarn ***` by `npm run ****`.  
Note however that the the script (`scripts/link-in-app.ts`) that enable you to test in an external app will no longer work.  

## What will be included in the npm bundle?

All filles listed in [the files property of your package JSON](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/package.json#L35-L41).  


## How to debug the action

You can increase the verbosity by creating a new secret `ACTIONS_STEP_DEBUG` and setting it to true.  

![image](https://user-images.githubusercontent.com/6702424/144307837-f401c595-4695-45e3-8459-b1c1ca7fabb9.png)

## Disable linting and formatting

Remove [this](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/package.json#L15-L18), [this](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/package.json#L20-L32) and [this](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/package.json#L47-L53) from your `package.json`  
Remove [this](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/.github/workflows/ci.yaml#L12-L26) and [this](https://github.com/garronej/ts_ci/blob/974054f2b83f8170317f2b2fa60b5f78e9336c0b/.github/workflows/ci.yaml#L29) from `github/workflows/ci.yaml`  
Remove `.eslintignore`, `.eslintrc.js`, `.prettierignore` and `.prettierrc.json`.

## Accessing files outside the ``dist/`` directory (when [this line is present in your repo](https://github.com/garronej/ts-ci/blob/eabbcfa5b22777c6b051206d8f4e2c8a8624c853/.github/workflows/ci.yaml#L100))

The drawback of having short import path is that the dir structure  
is not exactly the same in production ( in the npm bundle ) and in development.

The files and directories in ``dist/`` will be moved to the root of the project.  

As a result this won't work in production: 

``src/index.ts``
```typescript
import * as fs from "fs";
import * as path from "path";

const str = fs.readFileSync(
    path.join(__dirname,"..", "package.json")
).toString("utf8");
```

Because ``/dist/index.js`` will be moved to ``/index.js``

You'll have to do: 

``src/index.ts``
```typescript
import * as fs from "fs";
import * as path from "path";
import { getProjectRoot } from "./tools/getProjectRoot";

const str = fs.readFileSync(
    path.join(getProjectRoot(),"package.json")
).toString("utf8");
```

With `getProjectRoot.ts` being:

```typescript
import * as fs from "fs";
import * as path from "path";

function getProjectRootRec(dirPath: string): string {
    if (fs.existsSync(path.join(dirPath, "package.json"))) {
        return dirPath;
    }
    return getProjectRootRec(path.join(dirPath, ".."));
}

let result: string | undefined = undefined;

export function getProjectRoot(): string {
    if (result !== undefined) {
        return result;
    }

    return (result = getProjectRootRec(__dirname));
}
```

</details>
