
# GitHub Repo Secrets to set: 

The following Secrets need to be set to be able to publish.

- ``PAT``: GitHub Personal access token.
- ``NODE_AUTH_TOKEN``: NPM Authorization token.


[ts-ci](https://github.com/garronej/ts_ci) is a template that:
- Automatically fills the paperwork for you: Fills the package.json and README.md
- Automate testing: Every commit pushed will be automatically tested on docker containers against many Node and Deno version ( ``npm test`` ), if everything passes you'll get a green label on the readme.
- Publish for you on NPM: Each time you'll change the version number in ``package.json`` a workflow that publishes for NPM and [deno.land](https://deno.land/x/) will trigger. The CHANGELOG.md will be automatically updated based on commit messages since last release.
- Enable you to only track sources on the main branch: With this template you won't have to track ``dist/`` on your main branch.
- Enable short import path: No more ``import 'my_module/dist/theFileNeeded'`` your users will be able to ``import 'my_module/theFileNeeded'``.  
