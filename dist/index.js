var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Vinyl from "Vinyl";
const rollup = require("rollup");
import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import "svelte";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
export const compile = (files, distPath) => {
    return new Promise((resolve) => {
        resolve(rollupBuild(files, distPath));
    });
};
var Rollup;
(function (Rollup) {
    Rollup["CHUNK"] = "chunk";
})(Rollup || (Rollup = {}));
const rollupBuild = (files, distPath) => __awaiter(void 0, void 0, void 0, function* () {
    const inputOptions = {
        input: files.map((file) => file.path),
        plugins: [svelte({ customElement: true }), resolve(), json(), image()],
    };
    const bundle = yield rollup.rollup(inputOptions);
    const outputOptions = {
        file: `${distPath}/bundle.js`,
        format: "cjs",
        name: "Bundle",
    };
    const { output } = yield bundle.generate(outputOptions);
    const compiledFiles = [];
    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === Rollup.CHUNK) {
            compiledFiles.push(new Vinyl({
                contents: Buffer.alloc(chunkOrAsset.code.length, chunkOrAsset.code),
                base: distPath,
                path: path.join(distPath, chunkOrAsset.fileName),
                basename: chunkOrAsset.fileName,
            }));
        }
    }
    return compiledFiles;
});
