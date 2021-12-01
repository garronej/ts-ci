
import { listTagsFactory } from "./listTags";
import type { Octokit } from "@octokit/rest";
import { NpmModuleVersion } from "../NpmModuleVersion";

export function getLatestSemVersionedTagFactory(params: { octokit: Octokit; }) {

    const { octokit } = params;

    async function getLatestSemVersionedTag(
        params: { 
            owner: string; 
            repo: string; 
            doIgnoreBeta: boolean;
        }
    ): Promise<{ 
        tag: string; 
        version: NpmModuleVersion; 
    } | undefined> {

        const { owner, repo, doIgnoreBeta } = params;

        const semVersionedTags: { tag: string; version: NpmModuleVersion; }[] = [];

        const { listTags } = listTagsFactory({ octokit });

        for await (const tag of listTags({ owner, repo })) {

            let version: NpmModuleVersion;

            try{

                version = NpmModuleVersion.parse(tag.replace(/^[vV]?/, ""));

            }catch{
                continue;
            }

            if( doIgnoreBeta && version.betaPreRelease !== undefined ){
                continue;
            }

            semVersionedTags.push({ tag, version });

        }

        return semVersionedTags
            .sort(({ version: vX }, { version: vY }) => NpmModuleVersion.compare(vY, vX))[0];

    };

    return { getLatestSemVersionedTag };

}
