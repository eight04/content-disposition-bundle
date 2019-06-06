import cjs from "rollup-plugin-cjs-es";
import resolve from 'rollup-plugin-node-resolve';
import shim from "rollup-plugin-shim";
import {terser} from 'rollup-plugin-terser';

import camelcase from "camelcase";
import endent from "endent";

const filename = "content-disposition";

export default [
  config({
    output: {
      file: `dist/${filename}.js`
    }
  }),
  config({
    output: {
      file: `dist/${filename}.min.js`
    },
    plugins: [terser()]
  })
];

function config({output, plugins = []}) {
  return {
    input: 'bundle.js',
    output: {
      format: 'iife',
      name: camelcase(filename),
      sourcemap: true,
      ...output
    },
    plugins: [
      shim({
        path: endent`
          export function basename(s) {
            const parts = s.split(/[\\/]/);
            return parts[parts.length - 1];
          }
        `,
        "safe-buffer": endent`
          export class Buffer {
            constructor(s) {
              this.s = s;
            }
            static from(binary) {
              return new Buffer(binary);
            }
            toString() {
              const bytes = new Uint8Array(this.s.length);
              for (let i = 0; i < this.s.length; i++) {
                bytes[i] = this.s.charCodeAt(i);
              }
              return new TextDecoder("utf-8").decode(bytes);
            }
          }
        `
      }),
      resolve(),
      cjs({nested: true}),
      ...plugins
    ]
  };
}
