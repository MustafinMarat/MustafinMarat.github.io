#version 300 es
precision highp float;
in vec3 DrawNormal;
in vec3 DrawPos;
in vec2 DrawTexCoord;

uniform float Time;
uniform vec3 CamLoc;
  
uniform sampler2D Tex0;
uniform sampler2D Tex1;

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

#define IsTexture0 bool(TexCon[0].x)
#define IsTexture1 bool(TexCon[0].y)
#define IsTexture2 bool(TexCon[0].z)
#define IsTexture3 bool(TexCon[0].w)
#define IsTexture4 bool(TexCon[1].x)
#define IsTexture5 bool(TexCon[1].y)
#define IsTexture6 bool(TexCon[1].z)
#define IsTexture7 bool(TexCon[1].w)

/* Phong light model shading function.
 * ARGUMENTS:
 *   - position:
 *       vec3 P;
 *   - normal:
 *       vec3 N;
 *   - ambient:
 *       vec3 Ka;
 *   - diffuse:
 *       vec3 Kd;
 *   - specular:
 *       vec3 Ks;
 *   - shinnes:
 *       float Ph;
 * RETURNS: lighted fragment.
 */
vec3 PhongShade( vec3 P, vec3 N, vec3 Ka, vec3 Kd, vec3 Ks, float Ph )
{
  vec3 V = normalize(P - CamLoc); // View vector
  vec3 L = -V; // Here should be a light directory (now it's camdir)
  float 
    cc = 1.0,
    cl = 0.001,
    cq = 0.0001,
    d = length(P - CamLoc),
    att = min(1.0, 1.0 / (cc + cl * d + cq * d * d));
  
  // Ambient lighting
  vec3 color = min(vec3(0.1), Ka);
 
  N = normalize(faceforward(N, V, N));
 
  // Diffuse lighting 
  color += Kd * max(0.0, dot(N, L));

  // Specular
  ///color += Ks * max(0.0, pow(dot(reflect(V, N), L), Ph));
  
  // Distance depended lighting
  color *= att;

  return color;
} /* End of 'Shade' function */
    
void main( void )
{
  if (IsTexture0)
  {
    vec4 tc = texture(Tex0, DrawTexCoord * 10.0);
    OutColor = vec4(PhongShade(DrawPos, DrawNormal, tc.xyz, tc.xyz, MtlKs, MtlPh), MtlTrans);
  }
  else 
    OutColor = vec4(PhongShade(DrawPos, DrawNormal, MtlKa, MtlKd, MtlKs, MtlPh), MtlTrans);
}