import Vinyl from "Vinyl";
const rollup = require("rollup");
import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import "svelte";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import fs from "fs";

export const compile = (files: Vinyl[], distPath: string) => {
  return new Promise((resolve) => {
    resolve(rollupBuild(files, distPath));
  });
};

enum Rollup {
  CHUNK = "chunk",
}

const rollupBuild = async (files: Vinyl[], distPath: string) => {
  const inputOptions = {
    input: files.map((file) => file.path),
    plugins: [
      svelte({
        preprocess: { markup: writeCustomElementTagIfMissing },
        customElement: true,
      }),
      resolve(),
      json(),
      image(),
    ],
  };
  const bundle = await rollup.rollup(inputOptions);

  const outputOptions = {
    file: `${distPath}/bundle.js`,
    format: "cjs",
    name: "Bundle",
  };

  const { output } = await bundle.generate(outputOptions);
  const compiledFiles = [];

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === Rollup.CHUNK) {
      compiledFiles.push(
        new Vinyl({
          contents: Buffer.alloc(chunkOrAsset.code.length, chunkOrAsset.code),
          base: distPath,
          path: path.join(distPath, chunkOrAsset.fileName),
          basename: chunkOrAsset.fileName,
        })
      );
    }
  }

  return compiledFiles;
};

const CUSTOM_ELEMENT_PATTERN = /svelte:options.*tag="/;
const FILENAME_PATTERN = /^\/?(.+\/)*(.+)\.(.+)$/;
const NAME_CAPTURE_GROUP = 2;

const writeCustomElementTagIfMissing = ({
  content,
  filename,
}): { code: string } => {
  let target = content;

  if (!CUSTOM_ELEMENT_PATTERN.test(content)) {
    const tagLabel = filename.match(FILENAME_PATTERN)[NAME_CAPTURE_GROUP];
    target = `${target}<svelte:options tag="custom-${tagLabel.toLowerCase()}" />`;
  }

  return {
    code: target,
  };
};
