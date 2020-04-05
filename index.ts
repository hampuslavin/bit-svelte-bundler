import Vinyl from "Vinyl";
const rollup = require("rollup");
import svelte from "rollup-plugin-svelte";
import "svelte";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";

export const compile = (files: Vinyl[], distPath: string) => {
  return new Promise((resolve) => {
    resolve(rollupBuild(files, distPath));
  });
};

const rollupBuild = async (files: Vinyl[], distPath: string) => {
  const inputOptions = {
    input: files.map((file) => file.path),
    plugins: [svelte({ customElement: true }), resolve()],
  };
  const bundle = await rollup.rollup(inputOptions);

  const outputOptions = {
    file: `${distPath}/bundle.js`,
    format: "cjs",
    name: "Bundle",
  };

  const { output } = await bundle.generate(outputOptions);
  let compiledFile = null;

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === "chunk") {
      compiledFile = new Vinyl({
        contents: Buffer.alloc(chunkOrAsset.code.length, chunkOrAsset.code),
        base: distPath,
        path: path.join(distPath, chunkOrAsset.fileName),
        basename: chunkOrAsset.fileName,
      });
    }
  }
  return [compiledFile];
};
