#version 300 es
precision highp float;
in vec3 InPosition;
in vec3 InNormal;
in vec2 InTexCoord;

uniform Prim
{
  mat4 MatrWVP;
  mat4 MatrWInv;
  mat4 MatrW;
};

out vec3 DrawNormal;
out vec3 DrawPos;
out vec2 DrawTexCoord;
    
void main( void )
{
  gl_Position = MatrWVP * vec4(InPosition, 1);
  DrawNormal = normalize(mat3(MatrWInv) * InNormal);
  DrawPos = (MatrW * vec4(InPosition, 1)).xyz;
  DrawTexCoord = InTexCoord;
}