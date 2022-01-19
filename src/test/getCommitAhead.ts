import { createOctokit } from "../tools/createOctokit";
import { getCommitAheadFactory } from "../tools/octokit-addons/getCommitAhead";

(async ()=>{

	const octokit = createOctokit({ "github_token": "" });

    const { getCommitAhead } = getCommitAheadFactory({ octokit });

    const { commits } = await getCommitAhead({
        "owner": "InseeFrLab",
        "repo": "keycloakify",
        "branchBehind": "v4.5.1",
        "branchAhead": "Ann2827/pull"
    }).catch(() => ({ "commits": undefined }));

	console.log(commits);


})()
