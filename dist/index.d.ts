/// <reference types="vinyl" />
import Vinyl from "Vinyl";
import "svelte";
export declare const compile: (files: Vinyl[], distPath: string) => Promise<unknown>;
