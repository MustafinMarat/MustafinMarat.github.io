#version 300 es
precision highp float;
in vec3 DrawNormal;
in vec3 DrawPos;
in vec2 DrawTexCoord;

uniform vec3 CamLoc;


out vec4 OutColor;

uniform Material
{
  vec4 MtlKa4;
  vec4 MtlKdTrans;
  vec4 MtlKsPh;
  ivec4 TexCon[2];
};

#define MtlKa MtlKa4.xyz
#define MtlKd MtlKdTrans.xyz
#define MtlKs MtlKsPh.xyz
#define MtlPh MtlKsPh.w
#define MtlTrans MtlKdTrans.w 


void main( void )
{
  OutColor = vec4(MtlKa, MtlTrans);
}
