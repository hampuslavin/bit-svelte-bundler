"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Vinyl_1 = __importDefault(require("Vinyl"));
var rollup = require("rollup");
var rollup_plugin_svelte_1 = __importDefault(require("rollup-plugin-svelte"));
var plugin_json_1 = __importDefault(require("@rollup/plugin-json"));
var plugin_image_1 = __importDefault(require("@rollup/plugin-image"));
require("svelte");
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var path_1 = __importDefault(require("path"));
exports.compile = function (files, distPath) {
    return new Promise(function (resolve) {
        resolve(rollupBuild(files, distPath));
    });
};
var Rollup;
(function (Rollup) {
    Rollup["CHUNK"] = "chunk";
})(Rollup || (Rollup = {}));
var rollupBuild = function (files, distPath) { return __awaiter(void 0, void 0, void 0, function () {
    var inputOptions, bundle, outputOptions, output, compiledFiles, _i, output_1, chunkOrAsset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputOptions = {
                    input: files.map(function (file) { return file.path; }),
                    plugins: [rollup_plugin_svelte_1["default"]({ customElement: true }), plugin_node_resolve_1["default"](), plugin_json_1["default"](), plugin_image_1["default"]()]
                };
                return [4 /*yield*/, rollup.rollup(inputOptions)];
            case 1:
                bundle = _a.sent();
                outputOptions = {
                    file: distPath + "/bundle.js",
                    format: "cjs",
                    name: "Bundle"
                };
                return [4 /*yield*/, bundle.generate(outputOptions)];
            case 2:
                output = (_a.sent()).output;
                compiledFiles = [];
                for (_i = 0, output_1 = output; _i < output_1.length; _i++) {
                    chunkOrAsset = output_1[_i];
                    if (chunkOrAsset.type === Rollup.CHUNK) {
                        compiledFiles.push(new Vinyl_1["default"]({
                            contents: Buffer.alloc(chunkOrAsset.code.length, chunkOrAsset.code),
                            base: distPath,
                            path: path_1["default"].join(distPath, chunkOrAsset.fileName),
                            basename: chunkOrAsset.fileName
                        }));
                    }
                }
                return [2 /*return*/, compiledFiles];
        }
    });
}); };
