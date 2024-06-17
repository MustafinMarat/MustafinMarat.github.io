#version 300 es
precision highp float;
in vec3 InPosition;
in vec3 InNormal;

uniform mat4 MatrWVP;
uniform mat4 MatrWInv;

out vec3 DrawNormal;
    
void main( void )
{
  gl_Position = MatrWVP * vec4(InPosition, 1);
  DrawNormal = normalize(mat3(MatrWInv) * InNormal);
}