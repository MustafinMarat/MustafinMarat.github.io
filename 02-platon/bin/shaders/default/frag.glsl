#version 300 es
precision highp float;
in vec3 DrawNormal;

uniform float Time;
uniform vec3 CamDir; 

out vec4 OutColor;
    
void main( void )
{
  vec3 N = normalize(faceforward(DrawNormal, CamDir, DrawNormal));
  vec3 col = vec3(0.8, 0.47, 0.30) * dot(N, -CamDir);
  OutColor = vec4(col, 1.0);
}
