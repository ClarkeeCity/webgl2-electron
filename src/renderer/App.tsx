import './App.css';
import * as twgl from 'twgl.js';
import { useEffect } from 'react';
import * as THREE from 'three';
import { Models } from './gl-utils/models';
import * as ShaderSources from './gl-utils/shader-sources';

export default function App() {
  useEffect(() => {
    (async function fetchModel() {
      const response = await fetch('src/renderer/index.tsx');
      console.log(await response.text());
    })();
    const canvas = document.getElementById('renderWindow') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (!gl) return <span>something went wrong :c</span>;

    const program = twgl.createProgramInfo(gl, [
      ShaderSources.ShaderVert,
      ShaderSources.ShaderFrag,
    ]);

    const vertexAttributes = {
      position: { numComponents: 2, data: [1, 0, 0, 1, -1, -1] },
      color: { numComponents: 3, data: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
    };

    const uniforms = {
      aspect: window.innerWidth / window.innerHeight, // Update based on window height and width;
      scale: 3.0,
    };

    const bufferInfo = twgl.createBufferInfoFromArrays(gl, vertexAttributes);
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program.program);
    twgl.setBuffersAndAttributes(gl, program, bufferInfo);
    twgl.setUniforms(program, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
  }, []);

  return (
    <div>
      <canvas
        id="renderWindow"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}
