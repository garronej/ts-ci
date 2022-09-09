
import { listTagsFactory } from "./listTags";
import type { Octokit } from "@octokit/rest";
import { NpmModuleVersion } from "../NpmModuleVersion";

export function getLatestSemVersionedTagFactory(params: { octokit: Octokit; }) {

    const { octokit } = params;

    async function getLatestSemVersionedTag(
        params: {
            owner: string;
            repo: string;
            beta: "ONLY LOOK FOR BETA" | "IGNORE BETA" | "BETA OR REGULAR RELEASE";
            major: number | undefined;
        }
    ): Promise<{
        tag: string;
        version: NpmModuleVersion;
    } | undefined> {

        const { owner, repo, beta, major } = params;

        const semVersionedTags: { tag: string; version: NpmModuleVersion; }[] = [];

        const { listTags } = listTagsFactory({ octokit });

        for await (const tag of listTags({ owner, repo })) {

            let version: NpmModuleVersion;

            try {

                version = NpmModuleVersion.parse(tag.replace(/^[vV]?/, ""));

                if (major !== undefined && version.major !== major) {
                    continue;
                }

            } catch {
                continue;
            }

            switch (beta) {
                case "IGNORE BETA":
                    if (version.betaPreRelease !== undefined) {
                        continue;
                    }
                    break;
                case "ONLY LOOK FOR BETA":
                    if (version.betaPreRelease === undefined) {
                        continue;
                    }
                case "BETA OR REGULAR RELEASE":
                    break;
            }

            semVersionedTags.push({ tag, version });

        }

        return semVersionedTags
            .sort(({ version: vX }, { version: vY }) => NpmModuleVersion.compare(vY, vX))[0];

    };

    return { getLatestSemVersionedTag };

}
