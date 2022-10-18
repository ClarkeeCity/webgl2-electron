#version 300 es
precision mediump float;
in vec2 position;
in vec3 color;

uniform float aspect;
uniform float scale;

out vec3 fragColor;
void main () {
  gl_Position = vec4((scale * position) / vec2(aspect,1.0), 0.0, 5.0);
  fragColor = color;
}
