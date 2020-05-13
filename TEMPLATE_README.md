# Template features: 

[ts-ci](https://github.com/garronej/ts_ci) is a template that:
- Automatically fills the paperwork for you: Fills the package.json and README.md
- Automate testing: Every commit pushed will be automatically tested on docker containers against many Node and Deno version ( ``npm test`` ), if everything passes you'll get a green label on the readme.
- Publish for you on NPM: Each time you'll change the version number in ``package.json`` a workflow that publishes for NPM and [deno.land](https://deno.land/x/) will trigger. The CHANGELOG.md will be automatically updated based on commit messages since last release.
- Enable you to only track sources on the main branch: With this template you won't have to track ``dist/`` on your main branch.
- Enable short import path: No more ``import 'my_module/dist/theFileNeeded'`` your users will be able to ``import 'my_module/theFileNeeded'``.  

# GitHub Repo Secrets to set: 

The following Secrets need to be set to be able to publish.

- ``PAT``: GitHub Personal access token.
- ``NODE_AUTH_TOKEN``: NPM Authorization token.

# NOTES:

- The template does not support ``.npmignore`` use ``package.json`` ``files`` instead.
- Don't forget to update the ``package.json`` ``files`` entry to specify the files you would like to be included in the NPM bundle.
- The dev dependency ``evt`` is just used as an utility in the demo ``/src/test/`` directory.
- The dev dependency ``denoify`` is needed for the NPM script ``enable_short_import_path``.

# Warning

The drawback of having short import path is that the file structure  
is not exactly the same in production ( in the npm bundle ) and in development.

The files and directories in ``dist/`` will be moved to the root of the project.  

As a result this won't work in production: 

``src/index.ts``
```typescript
const buff = require("fs").readFileSync(
    require("path").join(__filename,"..", "package.json")
);
```

Because ``/dist/index.js`` will be moved to ``/index.js``

You'll have to do: 

``src/index.ts``
```typescript
import { getProjectRoot } from "./tools/getProjectRoot";
const buff = require("fs").readFileSync(
    require("path").join(getProjectRoot(),"package.json")
);
```

