import * as fs from "fs";

export async function action(
	_actionName: "remove_dark_mode_specific_images_from_readme"
) {

	fs.writeFileSync("README.md",
		Buffer.from(
			removeDarkModeSpecificImageFromReadme(
				fs.readFileSync("README.md").toString("utf8")
			),
			"utf8"
		)
	);

}

export function removeDarkModeSpecificImageFromReadme(readmeRawContent: string) {
	return readmeRawContent
		.replace(/^!\[[^\]]*\]\([^#]+#gh-dark-mode-only\)/gm, "");
}