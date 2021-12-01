
import { listTagsFactory } from "./listTags";
import type { Octokit } from "@octokit/rest";
import { NpmModuleVersion } from "../NpmModuleVersion";

export function getLatestSemVersionedTagFactory(params: { octokit: Octokit; }) {

    const { octokit } = params;

    async function getLatestSemVersionedTag(
        params: { 
            owner: string; 
            repo: string; 
        }
    ): Promise<{ 
        tag: string; 
        version: NpmModuleVersion; 
    } | undefined> {

        const { owner, repo } = params;

        const semVersionedTags: { tag: string; version: NpmModuleVersion; }[] = [];

        const { listTags } = listTagsFactory({ octokit });

        for await (const tag of listTags({ owner, repo })) {

            const match = tag.match(/^v?([0-9]+\.[0-9]+\.[0-9]+)$/);

            if (!match) {
                continue;
            }

            semVersionedTags.push({
                tag,
                "version": NpmModuleVersion.parse( match[1])
             });

        }

        return semVersionedTags
            .sort(({ version: vX }, { version: vY }) => NpmModuleVersion.compare(vY, vX))[0];

    };

    return { getLatestSemVersionedTag };

}
