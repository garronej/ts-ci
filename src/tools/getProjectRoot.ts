

import * as fs from "fs";
import * as path from "path";

function getProjectRootRec(dirPath: string){
    if( fs.existSync(path.join(dirPath, "package.json")) ){
        return dirPath;
    }
    return getProjectRootRec(path.join(dirPath, ".."))
}

let result: string | undefined = undefined;

export function getProjectRoot(): string{

    if( result !== undefined ){
        return result;
    }

    return result = getProjectRootRec(__dirname);

}
