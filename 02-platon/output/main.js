(function () {
  'use strict';

  // 3d vector class
  class _vec3 {
    constructor(x, y, z) {
      if (x == undefined) {
        this.x = 0, this.y = 0, this.z = 0;
      } else if (typeof x == 'object') {
        if (x.length == 3) {
          this.x = x[0], this.y = x[1], this.z = x[2];
        } else {
          this.x = x.x, this.y = x.y, this.z = x.z;
        }
      } else {
        if (y == undefined && z == undefined) {
          this.x = x, this.y = x, this.z = x;
        } else {
          this.x = x, this.y = y, this.z = z;
        }
      }
    }
    
    // Vectors addition function
    add(v) {
      if (typeof v == 'number') {
        return vec3(this.x + v, this.y + v, this.z + v);
      }
      return vec3(this.x + v.x, this.y + v.y, this.z + v.z);    
    } // End of 'add' function
    
    // Vectors dot product function
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    // Vectors substruction function
    sub(v) {
      if (typeof v == 'number') {
        return vec3(this.x - v, this.y - v, this.z - v);
      }
      return vec3(this.x - v.x, this.y - v.y, this.z - v.z);    
    } // End of 'sub' function
    
    // Vector to number multiplication function
    mul(n) {
      return vec3(this.x * n, this.y * n, this.z * n);
    } // End of 'mul' function

    // Vector to number division function
    div(n) {
      return vec3(this.x / n, this.y / n, this.z / n);
    } // End of 'div' function

    // Getting negative vector function
    neg() {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'neg' function 

    // Getting vector's length function
    len() {
      let len = this.dot(this);

      if (len == 1 || len == 0) {
        return len;
      }
      return Math.sqrt(len);
    } // End of 'len' function

    // Getting vector's length in square function
    len2() {
      return this.dot(this);
    } // End of 'len2' function

    // Vector normalizing function
    norm() {
      let len = this.dot(this);

      if (len == 1 || len == 0)
        return this;
      return this.div(Math.sqrt(len));
    } // End of 'norm' function

    // Vectors cross propuct function
    cross(v) {
      return vec3(this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x);  
    } // End of 'cross' function

    // Vector's transformation function
    transform(m) {
      return vec3(this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0],
                  this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1],
                  this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2]);
    } // End of 'transform' function

    // Vector to matrix multiplication function 
    mulMatr(m) {
      let w = this.x * m.m[0][3] + this.y * m.m[1][3] + this.z * m.m[2][3] + m.m[3][3];

      return vec3((this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0]) / w,
                   (this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1]) / w,
                   (this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]) / w);
    } // End of 'mulMatr' function

    // Vector's transformation function
    pointTransform(m) {
      return vec3(this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
                  this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
                  this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]);
    } // End of 'pointTransform' function
  }

  // Vector creation function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  // 4x4 matrix class
  class _mat4 {
    constructor(m = null) {
      if (m == null) {
        this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
      } else if (typeof m == 'object' && m.length == 4) {
        this.m = m; 
      } else {
        this.m = m.m;
      }
    }
    
    // Making from matrix solid array function
    toArray() {
      return [].concat(...this.m);
    } // End of 'toArray' function

    // Getting matrix determinant function
    det() {
      return + this.m[0][0] * matrDet3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                         this.m[2][1], this.m[2][2], this.m[2][3],
                                         this.m[3][1], this.m[3][2], this.m[3][3]) +
             - this.m[0][1] * matrDet3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                         this.m[2][0], this.m[2][2], this.m[2][3],
                                         this.m[3][0], this.m[3][2], this.m[3][3]) +
             + this.m[0][2] * matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                         this.m[2][0], this.m[2][1], this.m[2][3],
                                         this.m[3][0], this.m[3][1], this.m[3][3]) +
             - this.m[0][3] * matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                         this.m[2][0], this.m[2][1], this.m[2][2],
                                         this.m[3][0], this.m[3][1], this.m[3][2]);
    } // End of 'det' function

    // Getting transposition matrix function
    setTrans(dx, dy, dz) {
      let m = mat4();
      if (typeof dx == 'object') {
        m.m[3][0] = dx.x, m.m[3][1] = dx.y, m.m[3][2] = dx.z;
      } else {
        m.m[3][0] = dx, m.m[3][1] = dy, m.m[3][2] = dz;
      }
      
      return m;
    } // End of 'setTrans' function

    // Matrixes multiplication function
    mul(m) {
      let r = mat4();

      r.m[0][0] = this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] +
        this.m[0][3] * m.m[3][0];

      r.m[0][1] = this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] +
        this.m[0][3] * m.m[3][1];

      r.m[0][2] = this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] +
        this.m[0][3] * m.m[3][2];

      r.m[0][3] = this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] +
        this.m[0][3] * m.m[3][3];


      r.m[1][0] = this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] +
        this.m[1][3] * m.m[3][0];

      r.m[1][1] = this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] +
        this.m[1][3] * m.m[3][1];

      r.m[1][2] = this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] +
        this.m[1][3] * m.m[3][2];

      r.m[1][3] = this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] +
        this.m[1][3] * m.m[3][3];


      r.m[2][0] = this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] +
        this.m[2][3] * m.m[3][0];

      r.m[2][1] = this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] +
        this.m[2][3] * m.m[3][1];

      r.m[2][2] = this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] +
        this.m[2][3] * m.m[3][2];

      r.m[2][3] = this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] +
        this.m[2][3] * m.m[3][3];


      r.m[3][0] = this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] +
        this.m[3][3] * m.m[3][0];

      r.m[3][1] = this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] +
        this.m[3][3] * m.m[3][1];

      r.m[3][2] = this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] +
        this.m[3][3] * m.m[3][2];

      r.m[3][3] = this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] +
        this.m[3][3] * m.m[3][3];

      return r;
    } // End of 'mul' function

    // Getting inversed matrix function
    inverse() {
      let
        r = mat4(),
        det = this.det();

      if (det == 0)
        return r;

      /* build adjoint matrix */
      r.m[0][0] =
        +matrDet3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                    this.m[2][1], this.m[2][2], this.m[2][3],
                    this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][0] =
        -matrDet3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[2][0], this.m[2][2], this.m[2][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][0] =
        +matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[2][0], this.m[2][1], this.m[2][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][0] =
        -matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[2][0], this.m[2][1], this.m[2][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;

      r.m[0][1] =
        -matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[2][1], this.m[2][2], this.m[2][3],
                    this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][1] =
        +matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[2][0], this.m[2][2], this.m[2][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][1] =
        -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[2][0], this.m[2][1], this.m[2][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][1] =
        +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[2][0], this.m[2][1], this.m[2][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][2] =
        +matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[1][1], this.m[1][2], this.m[1][3],
                    this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][2] =
        -matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][2] =
        +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][2] =
        -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][3] =
        -matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[1][1], this.m[1][2], this.m[1][3],
                    this.m[2][1], this.m[2][2], this.m[2][3]) / det;

      r.m[1][3] =
        +matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[2][0], this.m[2][2], this.m[2][3]) / det;

      r.m[2][3] =
        -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[2][0], this.m[2][1], this.m[2][3]) / det;

      r.m[3][3] =
        +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[2][0], this.m[2][1], this.m[2][2]) / det;

      return r;
    } // End of 'inverse' function

    // Getting rotation by vector function
    setRotation(angle, v) {
      let rad = angle / 180.0 * Math.PI, s = Math.sin(rad), c = Math.cos(rad);
      let r = mat4();
      
      r.m = [[c + v.x * v.x * (1 - c), , v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0], 
             [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
             [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0], 
             [0, 0, 0, 1]];

      return r;
    } // End of 'setRotation' function

    // Getting look-at point matrix function
    setView(loc, at, up1) {
      let
        dir = at.sub(loc).norm(),
        right = dir.cross(up1).norm(),
        up = right.cross(dir).norm();
      let m = mat4();
      m.m =
        [
          [right.x, up.x, -dir.x, 0],
          [right.y, up.y, -dir.y, 0], 
          [right.z, up.z, -dir.z, 0],
          [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1]
        ];

    return m;
    } // End of 'setView' function
    
    // Getting frustrum matrix function
    setFrustrum ( left,  right, bottom, top, near, far ) {
      let m = mat4();
      m.m = [[(2 * near) / (right - left), 0, 0, 0],
            [0, (2 * near) / (top - bottom), 0, 0],
            [(right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1)],
            [0, 0, (-((2 * near * far) / (far - near))), 0]];

      return m;
    } // End of 'setFrustrum' function

    // Matrix transposition function
    transpose() {
      let m = mat4();

      m.m = [[this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]],
             [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]],
             [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]],
             [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]];
      return m;
    } // End of 'transpose' function
    
    // Getting matrix rotation by x axis function
    setRotateX (angle) {
      let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);

      let m = mat4();

      m.m[1][1] = co;
      m.m[1][2] = si;
      m.m[2][1] = -si;
      m.m[2][2] = co; 
      
      return m;
    } // End of 'setRotateX' function

    // Getting matrix rotation by y axis function
    setRotateY (angle) {
      let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);
      
      let m = mat4();
      
      m.m[0][0] = co;
      m.m[0][2] = -si;
      m.m[2][0] = si;
      m.m[2][2] = co; 
      
      return m;
    } // End of 'setRotateY' function

    // Getting matrix rotation by z axis function
    setRotateZ (angle) {
      let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);

      let m = mat4();

      m.m[0][0] = co;
      m.m[0][1] = si;
      m.m[1][0] = -si;
      m.m[1][1] = co; 
         
      return m;
    } // End of 'setRotateZ' function
    
    // Getting scale matrix function
    setScale(v) {
      let m = mat4();
      
      if (typeof v == 'object') {
        m.m[0][0] = v.x;
        m.m[1][1] = v.y;
        m.m[2][2] = v.z;
      } else {
        m.m[0][0] = v;
        m.m[1][1] = v;
        m.m[2][2] = v;
      }

      return m;
    } // End of 'setScale'

    // Getting ortho matrix function
    setOrtho ( left,  right, bottom, top, near, far ) {
      let m = mat4();
      m.m = [[2 / (right - left), 0, 0, 0],
             [0, 2 / (top - bottom), 0, 0],
             [0, 0, -2 / (far - near), 0],
             [-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1]];

      return m;
    } // End of 'setOrtho' function
  }

  // Getting 3x3 matrix determinant function
  function matrDet3x3( a11, a12, a13,
                       a21, a22, a23,
                       a31, a32, a33 )
  {
    return a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
           a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;
  } // End of 'matrDet3x3' function

  // Matrix creation function
  function mat4(...args) {
    return new _mat4(...args);
  } // End of 'mat4' function

  // Camera class
  class _camera {
    loc = vec3();
    at = vec3();
    dir = vec3();
    right = vec3();
    up = vec3();
    matrView = mat4(); 
    matrProj = mat4(); 
    matrVP = mat4();
    frameW;
    frameH;
    wp;
    hp;
    projSize;
    projDist;
    projFarClip;

    // Setting camera function
    setCam(loc, at, up) {
      this.matrView = mat4().setView(loc, at, up);

      this.right = vec3(this.matrView.m[0][0],
                        this.matrView.m[1][0],
                        this.matrView.m[2][0]);
      this.up = vec3(this.matrView.m[0][1],
                        this.matrView.m[1][1],
                        this.matrView.m[2][1]);
      this.dir = vec3(-this.matrView.m[0][2],
                        -this.matrView.m[1][2],
                        -this.matrView.m[2][2]);
      this.loc = vec3(loc);
      this.at = vec3(at);

      this.matrVP = this.matrView.mul(this.matrProj);
    } // End of 'setCam' function

    // Setting camera frame size function
    setProj(projSize, projDist, projFarClip) {
      let rx, ry;

      this.projDist = projDist;
      this.projFarClip = projFarClip;
      rx = ry = this.projSize = projSize;

      /* Correct aspect ratio */
      if (this.frameW >= this.frameH)
        rx *= this.frameW / this.frameH;
      else
        ry *= this.frameH / this.frameW;

      this.wp = rx;
      this.hp = ry;
      this.matrProj =
        mat4().setFrustrum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.projFarClip);
      this.matrVP = this.matrView.mul(this.matrProj);
    } // End of 'setProj' function

    // Setting projection data function
    setSize(frameW, frameH) {
      this.frameW = frameW;
      this.frameH = frameH;
      this.setProj(this.projSize, this.projDist, this.projFarClip);
    } // End of 'setSize' function
  }

  // Camera creation function
  function camera(...args) {
    return new _camera(...args);
  } // End of 'camera' function

  // Shader class
  class _shader {
    async load() {
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
    }
    // Shader updation function
    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = this.rnd.gl.createShader(s.type);
        this.rnd.gl.shaderSource(s.id, s.src);
        this.rnd.gl.compileShader(s.id);
        if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
          let buf = this.rnd.gl.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
      this.id = this.rnd.gl.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          this.rnd.gl.attachShader(this.id, s.id);
      });
      this.rnd.gl.linkProgram(this.id);
      if (!this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.LINK_STATUS)) {
        let buf = this.rnd.gl.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    } // End of 'updateShadersSource' function

    // Shader's data updation function
    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = this.rnd.gl.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.rnd.gl.getAttribLocation(this.id, info.name),
        };
      }
   
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = this.rnd.gl.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.rnd.gl.getUniformLocation(this.id, info.name),
        };
      }
   
      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = this.rnd.gl.getActiveUniformBlockName(this.id, i);
        const index = this.rnd.gl.getActiveUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: this.rnd.gl.getActiveUniformBlockParameter(this.id, idx, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: this.rnd.gl.getActiveUniformBlockParameter(this.id, idx, this.rnd.gl.UNIFORM_BLOCK_BINDING),
        };
      }
    } // End of 'updateShaderData' function

    // Shader's programm appling function
    apply() {
      if (this.id != null)
        this.rnd.gl.useProgram(this.id);
    } // End of 'apply' function

    constructor(name, rnd) {
      this.name = name;
      this.rnd = rnd;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: this.rnd.gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: this.rnd.gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      // this.staticInit(name, rnd);
    }
  }

  // Shader creation function
  function shader(name, rnd) {
    return new _shader(name, rnd);
  } // End of 'shader' function

  // Vertex base class
  class _vertex {
    point = vec3();
    normal = vec3();

    constructor(x, y, z) {
      if (typeof x == 'object')
        this.point = vec3(x);
      else
        this.point = vec3(x, y, z);
    }
  }

  // Vertex creation function
  function vertex(...args) {
    return new _vertex(...args);
  } // End of 'vertex' function

  // Primitive data class
  class _primData {
    matrix = mat4();

    constructor(vertexes, indexes) {
      autoNormal(vertexes, indexes);
      this.vertexes = [];
      for (let vect of vertexes) {
        this.vertexes.push(vect.point.x);
        this.vertexes.push(vect.point.y);
        this.vertexes.push(vect.point.z);
        this.vertexes.push(vect.normal.x);
        this.vertexes.push(vect.normal.y);
        this.vertexes.push(vect.normal.z);
      }

      this.indexes = indexes;
    }
  }

  // Primitive class
  class _prim {
    vertArray;
    vertBuffer;
    indBuffer;
    numOfElem;

    constructor(shd, data) {
      this.shd = shd;
      this.rnd = this.shd.rnd;
      this.matrix = data.matrix;
      
      this.numOfElem = data.vertexes.length;
      
      const posLoc = this.rnd.gl.getAttribLocation(shd.id, "InPosition");
      const normLoc = this.rnd.gl.getAttribLocation(shd.id, "InNormal");
      this.vertArray = this.rnd.gl.createVertexArray();
      this.rnd.gl.bindVertexArray(this.vertArray);
      this.vertBuffer = this.rnd.gl.createBuffer();
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(data.vertexes), this.rnd.gl.STATIC_DRAW);
      
      if (posLoc != -1) {
        this.rnd.gl.vertexAttribPointer(posLoc, 3, this.rnd.gl.FLOAT, false, 24, 0);
        this.rnd.gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        this.rnd.gl.vertexAttribPointer(normLoc, 3, this.rnd.gl.FLOAT, false, 24, 12);
        this.rnd.gl.enableVertexAttribArray(normLoc);
      }
      
      if (data.indexes != undefined) {
        this.numOfElem = data.indexes.length;
        
        this.indBuffer = this.rnd.gl.createBuffer();
        this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data.indexes), this.rnd.gl.STATIC_DRAW);  
      } 
    }

    // Drawing primitive function
    draw(world, cam) {
      this.shd.apply();

      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      let wvp = world.mul(cam.matrVP);
      let winv = world.inverse().transpose();
            
      if (this.shd.uniforms['MatrWVP'] != undefined)
        this.rnd.gl.uniformMatrix4fv(this.shd.uniforms['MatrWVP'].loc, false, new Float32Array(wvp.toArray()));
      if (this.shd.uniforms['MatrWInv'])
        this.rnd.gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
      if (this.shd.uniforms['Time'])
        this.rnd.gl.uniform1f(this.shd.uniforms['Time'].loc, t);
      if (this.shd.uniforms['CamDir'])       
        this.rnd.gl.uniform3f(this.shd.uniforms['CamDir'].loc, this.rnd.cam.dir.x, this.rnd.cam.dir.y, this.rnd.cam.dir.z);

      this.rnd.gl.bindVertexArray(this.vertArray);
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
      if (this.shd.id != null) {
        if (this.indBuffer == undefined)
          this.rnd.gl.drawArrays(this.rnd.gl.TRIANGLES, 0, this.numOfElem);
        else {
          this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
          this.rnd.gl.drawElements(this.rnd.gl.TRIANGLES, this.numOfElem, this.rnd.gl.UNSIGNED_INT, 0);
        }
      }
    } // End of 'draw' function
  }

  // Normal computation function
  function autoNormal(vertexes, indexes) {
    if (indexes == undefined) {
      for (let i = 0; i < vertexes.length; i += 3) {
        let norm = (vertexes[i + 1].point.sub(vertexes[i].point)).cross(vertexes[i + 2].point.sub(vertexes[i].point)).norm();

        
        vertexes[i].normal = vertexes[i].normal.add(norm);
        vertexes[i + 1].normal = vertexes[i + 1].normal.add(norm);
        vertexes[i + 2].normal = vertexes[i + 2].normal.add(norm);
      }
    } else {
      for (let i = 0; i < indexes.length; i += 3) {
        let 
          n0 = indexes[i], n1 = indexes[i + 1], n2 = indexes[i + 2];
        let
          p0 = vertexes[n0].point,
          p1 = vertexes[n1].point,
          p2 = vertexes[n2].point,
          norm = p1.sub(p0).cross(p2.sub(p0)).norm();
    
          vertexes[n0].normal = vertexes[n0].normal.add(norm);
          vertexes[n1].normal = vertexes[n1].normal.add(norm);
          vertexes[n2].normal = vertexes[n2].normal.add(norm);
      }
      
      for (let i in vertexes) {
        vertexes[i].normal = vertexes[i].normal.norm();
      }
    }
  } // End of 'autoNormal' function

  // Primitive creation function
  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  // Primitive data creation function
  function primData(...args) {
    return new _primData(...args);
  } // End of 'primData' function

  // Render object class
  class _renderer {
    gl;
    canvas;
    controlable = false;
    prims = [];
    shds = [];
    cam = camera();

    constructor(id) {
      this.canvas = document.querySelector(id);
      this.cam = camera();
    
      this.cam.frameW = this.canvas.clientWidth;
      this.cam.frameH = this.canvas.clientHeight;
      this.cam.projDist = 0.1;
      this.cam.projSize = 0.1;
      this.cam.projFarClip = 300;

      this.cam.setCam(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
      this.cam.setProj(0.1, 0.1, 300);

      // Web grafix library initialization
      this.gl = this.canvas.getContext("webgl2");
    
      if (this.gl == null) {
        alert("WebGL2 not supported");
        return;
      }

      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.clearColor(0.30, 0.47, 0.8, 1.0);

      this.setControl();
      
      const anim = () => {
        this.render();
      
        window.requestAnimationFrame(anim);
      };  

      anim();
    }

    // Adding primitives (in shader) to render object function
    async addPrims(shdName, primsData) {
      let newShd;
      for (shd of this.shds) 
        if (shd.name == shdName) {
          newShd = snd;
          break;
        }
      if (newShd == undefined) {
        newShd = shader(shdName, this);
        await newShd.load();
        this.shds.push(newShd);
      }
      for (let primData of primsData) {
        this.prims.push(prim(newShd, primData));
      }
    } // End of 'addPrims' function

    // Drawing frame function
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
      
      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      // Drawing primitives
      if (this.prims != undefined)
        for (let prm of this.prims)
          prm.draw(prm.matrix.mul(mat4().setRotateY(30 * t)), this.cam);
    } // End of 'render' function 

    setControl() {
      this.canvas.addEventListener("mousedown", (event) => {
        this.controlable = true;
        event.preventDefault();
      });

      this.canvas.addEventListener("mouseup", (event) => {
        this.controlable = false;
        event.preventDefault();
      });

      this.canvas.addEventListener("mousewheel", (event) => { 
        let dist = this.cam.at.sub(this.cam.loc).len();
        
        dist += event.wheelDelta / 120;
        if (dist < 0.001)
          dist = 0.001;

        this.cam.setCam(this.cam.loc.norm().mul(dist), this.cam.at, vec3(0, 1, 0));
        event.preventDefault();
      });

      this.canvas.addEventListener("mousemove", (event) => {
        if (this.controlable) {
          let dist, sinT, cosT, sinP, cosP, plen, azimuth, elevator;
    
          dist = this.cam.at.sub(this.cam.loc).len();
          
          cosT = (this.cam.loc.y - this.cam.at.y) / dist;
          sinT = Math.sqrt(1 - cosT * cosT);
        
          plen = dist * sinT;
          cosP = (this.cam.loc.z - this.cam.at.z) / plen;
          sinP = (this.cam.loc.x - this.cam.at.x) / plen;
        
          azimuth = Math.atan2(sinP, cosP) * 180 / Math.PI;
          elevator = Math.atan2(sinT, cosT) * 180 / Math.PI;
        
          azimuth -= 0.5 * event.movementX;
        
          elevator -= 0.5 * event.movementY;
        
          if (elevator > 178.0)
            elevator = 178.0;
          if (elevator < 0.08)
            elevator = 0.08;
          
          this.cam.setCam(vec3(0, dist, 0).pointTransform(mat4().setRotateX(elevator)
                                                    .mul(mat4().setRotateY(azimuth)
                                                    .mul(mat4().setTrans(this.cam.at)))), this.cam.at, vec3(0, 1, 0));
        }
        event.preventDefault();
      });
    }
  }  

  // Renderer creation function
  function renderer(...args) {
    return new _renderer(...args);
  } // End of 'renderer' function

  // Getting tetrahedron primitive function
  function setTetrahedron() {
    const vert = [
      vertex(0, 0, 1), vertex(1, 0, 0), vertex(0, 1, 0), vertex(1) 
    ];
    const ind = [
      0, 1, 2, 
      0, 1, 3, 
      0, 2, 3, 
      1, 2, 3
    ];

    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }

    const prmData = primData(vertexes);
    prmData.matrix = mat4().setTrans(-0.5, -0.5, -0.5);
    return prmData;
  } // End of 'setTetrahedron' function

  // Getting cube primitive function
  function setCube() {
    const vert =  [
      vertex(-0.5), vertex(0.5, -0.5, -0.5), vertex(-0.5, 0.5, -0.5), 
      vertex(-0.5, -0.5, 0.5), vertex(0.5, 0.5, -0.5), 
      vertex(0.5, -0.5, 0.5), vertex(-0.5, 0.5, 0.5), vertex(0.5),
    ];
    const ind = [
      0, 1, 2, 
      1, 2, 4, 
      1, 4, 7, 
      1, 7, 5, 
      7, 5, 3, 
      7, 3, 6,
      0, 1, 3,
      3, 1, 5,
      6, 3, 0,
      6, 0, 2,
      2, 6, 7,
      2, 7, 4
    ];
    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }

    return primData(vertexes); 
  } // End of 'setCube' function

  // Getting octahedron primitive function
  function setOctahedron() {
    const sqrt2 = Math.sqrt(2) / 2;
    const vert = [
      vertex(sqrt2, 0, 0), vertex(-sqrt2, 0, 0),
      vertex(0, 0, sqrt2), vertex(0, 0, -sqrt2), 
      vertex(0, sqrt2, 0), vertex(0, -sqrt2, 0),  
    ];
    const ind = [
      0, 3, 4, 0, 2, 4, 2, 4, 1, 1, 3, 4,
      1, 3, 5, 3, 5, 0, 0, 5, 2, 2, 5, 1
    ];
    
    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }
    return primData(vertexes);
  } // End of 'setOctahedron' function

  // Getting icosahedron primitive function
  function setIcosahedron() {
    const vert = [];

    let angle = 0;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), -0.5, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }
    
    angle = Math.PI;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), 0.5, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    vert.push(vertex(0, Math.sqrt(5) / 2, 0));
    vert.push(vertex(0, -Math.sqrt(5) / 2, 0));

    const ind = [
      8, 7, 0, 0, 4, 7, 7, 6, 4, 4, 3, 6, 6, 5, 
      3, 3, 2, 5, 5, 9, 2, 2, 1, 9, 9, 8, 1, 1, 0, 8,
      5, 6, 10, 6, 7, 10, 7, 8, 10, 8, 9, 10, 9, 5, 10,
      0, 1, 11, 1, 2, 11, 2, 3, 11, 3, 4, 11, 4, 0, 11,
    ];

    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }
    return primData(vertexes);
  } // End of 'setIcosahedron' function

  // Getting dodecahedron primitive function
  function setDodecahedron() {
    // Create icosahedron
    const icovert = [];

    let angle = 0;
    for (let i = 0; i < 5; i++) {
      icovert.push(vec3(Math.cos(angle), -0.5, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }
    
    angle = Math.PI;
    for (let i = 0; i < 5; i++) {
      icovert.push(vec3(Math.cos(angle), 0.5, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    icovert.push(vec3(0, Math.sqrt(5) / 2, 0));
    icovert.push(vec3(0, -Math.sqrt(5) / 2, 0));

    const icoind = [
      8, 7, 0, 0, 4, 7, 7, 6, 4, 4, 3, 6, 6, 5, 
      3, 3, 2, 5, 5, 9, 2, 2, 1, 9, 9, 8, 1, 1, 0, 8,
      5, 6, 10, 6, 7, 10, 7, 8, 10, 8, 9, 10, 9, 5, 10,
      0, 1, 11, 1, 2, 11, 2, 3, 11, 3, 4, 11, 4, 0, 11,
    ];

    const icovertexes = [];

    for (let i of icoind) 
      icovertexes.push(vec3(icovert[i]));

    const vert = [];
    for (let i = 0; i < icoind.length; i += 3)
      vert.push(vertex(icovertexes[i].add(icovertexes[i + 1]).add(icovertexes[i + 2]).div(3)));
    const ind = [
      0, 1, 2, 0, 2, 11, 0, 11, 12,
      11, 2, 3, 11, 3, 4, 11, 4, 10,
      10, 4, 5, 10, 5, 6, 10, 6, 14, 
      14, 6, 7, 14, 7, 8, 14, 8, 13,
      13, 8, 9, 13, 9, 0, 13, 0, 12,

      2, 1, 3, 1, 3, 19, 1, 15, 19,
      3, 19, 18, 3, 18, 5, 3, 5, 4,
      5, 18, 17, 5, 6, 17, 6, 17, 7,
      7, 17, 16, 7, 16, 8, 16, 8, 9,
      9, 16, 15, 9, 15, 1, 9, 1, 0,

      10, 11, 14, 11, 14, 13, 11, 13, 12,
      17, 18, 19, 17, 19, 15, 17, 15, 16
    ];

    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }
    return primData(vertexes);
  } // End of 'setDodecahedron' function

  // Getting rhombic triacontahedron (30 faces) primitive function
  function set30hedron() {
    const phi = (1 + Math.sqrt(5)) / 2, h = phi;

    let vert = [vertex(0, Math.sqrt(2) * phi / 2, 0)];
    
    let angle = 0;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(phi * Math.cos(angle), 0, phi * Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    angle = Math.atan(1 / phi);
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), Math.sqrt(2) * phi / 4, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    for (let i = 1; i < 6; i++)
      vert.push(vertex(vert[i].point.add(vert[i % 5 + 1].point).sub(vert[i + 5].point)));


    vert.push(vertex(0, -Math.sqrt(2) * phi / 2 - h, 0));
    
    angle = Math.PI;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(phi * Math.cos(angle), -h, phi * Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    angle = Math.PI + Math.atan(1 / phi);
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), -Math.sqrt(2) * phi / 4 - h, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    for (let i = 1; i < 6; i++)
      vert.push(vertex(vert[i + 16].point.add(vert[i % 5 + 17].point).sub(vert[i + 21].point)));

    
    const ind = [
      0, 10, 6, 10, 6, 1,
      0, 6, 7, 6, 7, 2,
      0, 8, 7, 8, 7, 3,
      0, 8, 9, 9, 8, 4,
      0, 9, 10, 10, 9, 5,

      6, 1, 2, 1, 2, 11,
      7, 2, 3, 2, 3, 12,
      8, 4, 3, 4, 3, 13,
      5, 9, 4, 5, 4, 14,
      5, 10, 1, 5, 1, 15,

      16, 26, 22, 26, 22, 17,
      16, 22, 23, 22, 23, 18,
      16, 24, 23, 24, 23, 19,
      16, 24, 25, 25, 24, 20,
      16, 25, 26, 26, 25, 21,

      22, 17, 18, 17, 18, 27,
      23, 18, 19, 18, 19, 28,
      24, 20, 19, 20, 19, 29,
      21, 25, 20, 21, 20, 30,
      21, 26, 17, 21, 17, 31,

      18, 28, 14, 14, 5, 28,
      28, 19, 15, 15, 5, 28,
      19, 29, 15, 15, 1, 29,
      29, 20, 1, 1, 11, 20,
      20, 30, 11, 11, 2, 30,
      30, 21, 2, 2, 12, 21,
      21, 31, 12, 12, 3, 31,
      31, 17, 3, 3, 13, 17,
      17, 27, 13, 13, 4, 27,
      27, 18, 4, 4, 14, 18
    ];

    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }

    let prmData = primData(vertexes);
    prmData.matrix = mat4().setScale(0.5).mul(mat4().setTrans(0, 0.5, 0)); 
    return prmData;
  } // End of 'set30hedron' function

  // Main project function
  function main() {
    const rnd = renderer("#glCanvas");
    const rnd1 = renderer("#glCanvas1");
    const rnd2 = renderer("#glCanvas2");
    const rnd3 = renderer("#glCanvas3");
    const rnd4 = renderer("#glCanvas4");

    const rnd30 = renderer("#glCanvas30");
    rnd.addPrims("default", [setIcosahedron()]);
    rnd1.addPrims("default", [setDodecahedron()]);
    rnd2.addPrims("default", [setOctahedron()]);
    rnd3.addPrims("default", [setCube()]);
    rnd4.addPrims("default", [setTetrahedron()]);
    rnd30.addPrims("default", [set30hedron()]);
  } // End of 'main' function

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC9tdGhfdmVjMy5qcyIsIi4uL3NyYy9tdGgvbXRoX21hdDQuanMiLCIuLi9zcmMvbXRoL210aF9jYW0uanMiLCIuLi9zcmMvcm5kL3Jlcy9zaGQuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvcm5kL3Jlcy9wb2x5aGVkcmFzLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gM2QgdmVjdG9yIGNsYXNzXHJcbmNsYXNzIF92ZWMzIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMCwgdGhpcy56ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHgubGVuZ3RoID09IDMpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdLCB0aGlzLnogPSB4WzJdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgueCwgdGhpcy55ID0geC55LCB0aGlzLnogPSB4Lno7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh5ID09IHVuZGVmaW5lZCAmJiB6ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHgsIHRoaXMueiA9IHg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0geCwgdGhpcy55ID0geSwgdGhpcy56ID0gejtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBWZWN0b3JzIGFkZGl0aW9uIGZ1bmN0aW9uXHJcbiAgYWRkKHYpIHtcclxuICAgIGlmICh0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LCB0aGlzLnkgKyB2LCB0aGlzLnogKyB2KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopOyAgICBcclxuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIFZlY3RvcnMgZG90IHByb2R1Y3QgZnVuY3Rpb25cclxuICBkb3Qodikge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3JzIHN1YnN0cnVjdGlvbiBmdW5jdGlvblxyXG4gIHN1Yih2KSB7XHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdiwgdGhpcy55IC0gdiwgdGhpcy56IC0gdik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgdG8gbnVtYmVyIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uXHJcbiAgbXVsKG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciB0byBudW1iZXIgZGl2aXNpb24gZnVuY3Rpb25cclxuICBkaXYobikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC8gbiwgdGhpcy55IC8gbiwgdGhpcy56IC8gbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2RpdicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBuZWdhdGl2ZSB2ZWN0b3IgZnVuY3Rpb25cclxuICBuZWcoKSB7XHJcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcclxuICB9IC8vIEVuZCBvZiAnbmVnJyBmdW5jdGlvbiBcclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAxIHx8IGxlbiA9PSAwKSB7XHJcbiAgICAgIHJldHVybiBsZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGxlbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2xlbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggaW4gc3F1YXJlIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybSgpIHtcclxuICAgIGxldCBsZW4gPSB0aGlzLmRvdCh0aGlzKTtcclxuXHJcbiAgICBpZiAobGVuID09IDEgfHwgbGVuID09IDApXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KE1hdGguc3FydChsZW4pKTtcclxuICB9IC8vIEVuZCBvZiAnbm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9ycyBjcm9zcyBwcm9wdWN0IGZ1bmN0aW9uXHJcbiAgY3Jvc3Modikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7ICBcclxuICB9IC8vIEVuZCBvZiAnY3Jvc3MnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcidzIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXHJcbiAgdHJhbnNmb3JtKG0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG0ubVswXVswXSArIHRoaXMueSAqIG0ubVsxXVswXSArIHRoaXMueiAqIG0ubVsyXVswXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zZm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRvIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvbiBcclxuICBtdWxNYXRyKG0pIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogbS5tWzBdWzNdICsgdGhpcy55ICogbS5tWzFdWzNdICsgdGhpcy56ICogbS5tWzJdWzNdICsgbS5tWzNdWzNdO1xyXG5cclxuICAgIHJldHVybiB2ZWMzKCh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0pIC8gdyxcclxuICAgICAgICAgICAgICAgICAodGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgKHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSArIG0ubVszXVsyXSkgLyB3KTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTWF0cicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yJ3MgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25cclxuICBwb2ludFRyYW5zZm9ybShtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0gKyBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZWMzKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cclxuIiwiLy8gNHg0IG1hdHJpeCBjbGFzc1xyXG5jbGFzcyBfbWF0NCB7XHJcbiAgY29uc3RydWN0b3IobSA9IG51bGwpIHtcclxuICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgdGhpcy5tID0gW1sxLCAwLCAwLCAwXSwgWzAsIDEsIDAsIDBdLCBbMCwgMCwgMSwgMF0sIFswLCAwLCAwLCAxXV07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtID09ICdvYmplY3QnICYmIG0ubGVuZ3RoID09IDQpIHtcclxuICAgICAgdGhpcy5tID0gbTsgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm0gPSBtLm07XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIE1ha2luZyBmcm9tIG1hdHJpeCBzb2xpZCBhcnJheSBmdW5jdGlvblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3RvQXJyYXknIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IGRldGVybWluYW50IGZ1bmN0aW9uXHJcbiAgZGV0KCkge1xyXG4gICAgcmV0dXJuICsgdGhpcy5tWzBdWzBdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgLSB0aGlzLm1bMF1bMV0gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICArIHRoaXMubVswXVsyXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgIC0gdGhpcy5tWzBdWzNdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKTtcclxuICB9IC8vIEVuZCBvZiAnZGV0JyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIHRyYW5zcG9zaXRpb24gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0VHJhbnMoZHgsIGR5LCBkeikge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBpZiAodHlwZW9mIGR4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIG0ubVszXVswXSA9IGR4LngsIG0ubVszXVsxXSA9IGR4LnksIG0ubVszXVsyXSA9IGR4Lno7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtLm1bM11bMF0gPSBkeCwgbS5tWzNdWzFdID0gZHksIG0ubVszXVsyXSA9IGR6O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0VHJhbnMnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHJpeGVzIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uXHJcbiAgbXVsKG0pIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG5cclxuICAgIHIubVswXVswXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVswXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bMF1bMV0gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzBdWzJdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVszXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzFdWzBdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bMV1bMl0gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzFdWzNdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMl1bMF0gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzJdWzFdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsyXVsyXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVszXVswXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVswXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzNdWzJdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVszXVszXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVszXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIGludmVyc2VkIG1hdHJpeCBmdW5jdGlvblxyXG4gIGludmVyc2UoKSB7XHJcbiAgICBsZXRcclxuICAgICAgciA9IG1hdDQoKSxcclxuICAgICAgZGV0ID0gdGhpcy5kZXQoKTtcclxuXHJcbiAgICBpZiAoZGV0ID09IDApXHJcbiAgICAgIHJldHVybiByO1xyXG5cclxuICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICByLm1bMF1bMF0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMF0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMF0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMF0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMF1bMV0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMV0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMV0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMV0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzJdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzJdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzJdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzJdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVszXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVszXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH0gLy8gRW5kIG9mICdpbnZlcnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIHJvdGF0aW9uIGJ5IHZlY3RvciBmdW5jdGlvblxyXG4gIHNldFJvdGF0aW9uKGFuZ2xlLCB2KSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG4gICAgXHJcbiAgICByLm0gPSBbW2MgKyB2LnggKiB2LnggKiAoMSAtIGMpLCAsIHYueSAqIHYueCAqICgxIC0gYykgLSB2LnogKiBzLCB2LnogKiB2LnggKiAoMSAtIGMpICsgdi55ICogcywgMF0sIFxyXG4gICAgICAgICAgIFt2LnggKiB2LnkgKiAoMSAtIGMpICsgdi56ICogcywgYyArIHYueSAqIHYueSAqICgxIC0gYyksIHYueiAqIHYueSAqICgxIC0gYykgLSB2LnggKiBzLCAwXSxcclxuICAgICAgICAgICBbdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMF0sIFxyXG4gICAgICAgICAgIFswLCAwLCAwLCAxXV1cclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRpb24nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbG9vay1hdCBwb2ludCBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRWaWV3KGxvYywgYXQsIHVwMSkge1xyXG4gICAgbGV0XHJcbiAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtKCksXHJcbiAgICAgIHVwID0gcmlnaHQuY3Jvc3MoZGlyKS5ub3JtKCk7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIG0ubSA9XHJcbiAgICAgIFtcclxuICAgICAgICBbcmlnaHQueCwgdXAueCwgLWRpci54LCAwXSxcclxuICAgICAgICBbcmlnaHQueSwgdXAueSwgLWRpci55LCAwXSwgXHJcbiAgICAgICAgW3JpZ2h0LnosIHVwLnosIC1kaXIueiwgMF0sXHJcbiAgICAgICAgWy1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFdXHJcbiAgICAgIF07XHJcblxyXG4gIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRWaWV3JyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIEdldHRpbmcgZnJ1c3RydW0gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0RnJ1c3RydW0gKCBsZWZ0LCAgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKVxyXG4gICAgbS5tID0gW1soMiAqIG5lYXIpIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgWzAsICgyICogbmVhcikgLyAodG9wIC0gYm90dG9tKSwgMCwgMF0sXHJcbiAgICAgICAgICBbKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgKC0oKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpKSksICgtMSldLFxyXG4gICAgICAgICAgWzAsIDAsICgtKCgyICogbmVhciAqIGZhcikgLyAoZmFyIC0gbmVhcikpKSwgMF1dO1xyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRGcnVzdHJ1bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0cml4IHRyYW5zcG9zaXRpb24gZnVuY3Rpb25cclxuICB0cmFuc3Bvc2UoKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuXHJcbiAgICBtLm0gPSBbW3RoaXMubVswXVswXSwgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMl1bMF0sIHRoaXMubVszXVswXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVsxXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVszXVsxXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVsyXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVszXVsyXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVszXSwgdGhpcy5tWzFdWzNdLCB0aGlzLm1bMl1bM10sIHRoaXMubVszXVszXV1dO1xyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zcG9zZScgZnVuY3Rpb25cclxuICBcclxuICAvLyBHZXR0aW5nIG1hdHJpeCByb3RhdGlvbiBieSB4IGF4aXMgZnVuY3Rpb25cclxuICBzZXRSb3RhdGVYIChhbmdsZSkge1xyXG4gICAgbGV0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzaSA9IE1hdGguc2luKHJhZCksIGNvID0gTWF0aC5jb3MocmFkKTtcclxuXHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuXHJcbiAgICBtLm1bMV1bMV0gPSBjbztcclxuICAgIG0ubVsxXVsyXSA9IHNpO1xyXG4gICAgbS5tWzJdWzFdID0gLXNpO1xyXG4gICAgbS5tWzJdWzJdID0gY287IFxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRlWCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeSBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWSAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICBcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgXHJcbiAgICBtLm1bMF1bMF0gPSBjbztcclxuICAgIG0ubVswXVsyXSA9IC1zaTtcclxuICAgIG0ubVsyXVswXSA9IHNpO1xyXG4gICAgbS5tWzJdWzJdID0gY287IFxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRlWScgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeiBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWiAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tWzBdWzBdID0gY287XHJcbiAgICBtLm1bMF1bMV0gPSBzaTtcclxuICAgIG0ubVsxXVswXSA9IC1zaTtcclxuICAgIG0ubVsxXVsxXSA9IGNvOyBcclxuICAgICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVonIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gR2V0dGluZyBzY2FsZSBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRTY2FsZSh2KSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIG0ubVswXVswXSA9IHYueDtcclxuICAgICAgbS5tWzFdWzFdID0gdi55O1xyXG4gICAgICBtLm1bMl1bMl0gPSB2Lno7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtLm1bMF1bMF0gPSB2O1xyXG4gICAgICBtLm1bMV1bMV0gPSB2O1xyXG4gICAgICBtLm1bMl1bMl0gPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRTY2FsZSdcclxuXHJcbiAgLy8gR2V0dGluZyBvcnRobyBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRPcnRobyAoIGxlZnQsICByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhciApIHtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgbS5tID0gW1syIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgIFswLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICAgICAgIFswLCAwLCAtMiAvIChmYXIgLSBuZWFyKSwgMF0sXHJcbiAgICAgICAgICAgWy0ocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAtKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgMV1dO1xyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRPcnRobycgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gR2V0dGluZyAzeDMgbWF0cml4IGRldGVybWluYW50IGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG1hdHJEZXQzeDMoIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgICAgICAgICAgICAgIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgIGEzMSwgYTMyLCBhMzMgKVxyXG57XHJcbiAgcmV0dXJuIGExMSAqIGEyMiAqIGEzMyArIGExMiAqIGEyMyAqIGEzMSArIGExMyAqIGEyMSAqIGEzMiAtXHJcbiAgICAgICAgIGExMSAqIGEyMyAqIGEzMiAtIGExMiAqIGEyMSAqIGEzMyAtIGExMyAqIGEyMiAqIGEzMTtcclxufSAvLyBFbmQgb2YgJ21hdHJEZXQzeDMnIGZ1bmN0aW9uXHJcblxyXG4vLyBNYXRyaXggY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX21hdDQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdtYXQ0JyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSAnLi9tdGhfbWF0NCc7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tICcuL210aF92ZWMzJztcclxuXHJcbi8vIENhbWVyYSBjbGFzc1xyXG5jbGFzcyBfY2FtZXJhIHtcclxuICBsb2MgPSB2ZWMzKCk7XHJcbiAgYXQgPSB2ZWMzKCk7XHJcbiAgZGlyID0gdmVjMygpO1xyXG4gIHJpZ2h0ID0gdmVjMygpO1xyXG4gIHVwID0gdmVjMygpO1xyXG4gIG1hdHJWaWV3ID0gbWF0NCgpOyBcclxuICBtYXRyUHJvaiA9IG1hdDQoKTsgXHJcbiAgbWF0clZQID0gbWF0NCgpO1xyXG4gIGZyYW1lVztcclxuICBmcmFtZUg7XHJcbiAgd3A7XHJcbiAgaHA7XHJcbiAgcHJvalNpemU7XHJcbiAgcHJvakRpc3Q7XHJcbiAgcHJvakZhckNsaXA7XHJcblxyXG4gIC8vIFNldHRpbmcgY2FtZXJhIGZ1bmN0aW9uXHJcbiAgc2V0Q2FtKGxvYywgYXQsIHVwKSB7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpLnNldFZpZXcobG9jLCBhdCwgdXApO1xyXG5cclxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XHJcbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xyXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsyXVsyXSk7XHJcbiAgICB0aGlzLmxvYyA9IHZlYzMobG9jKTtcclxuICAgIHRoaXMuYXQgPSB2ZWMzKGF0KTtcclxuXHJcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRDYW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldHRpbmcgY2FtZXJhIGZyYW1lIHNpemUgZnVuY3Rpb25cclxuICBzZXRQcm9qKHByb2pTaXplLCBwcm9qRGlzdCwgcHJvakZhckNsaXApIHtcclxuICAgIGxldCByeCwgcnk7XHJcblxyXG4gICAgdGhpcy5wcm9qRGlzdCA9IHByb2pEaXN0O1xyXG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IHByb2pGYXJDbGlwO1xyXG4gICAgcnggPSByeSA9IHRoaXMucHJvalNpemUgPSBwcm9qU2l6ZTtcclxuXHJcbiAgICAvKiBDb3JyZWN0IGFzcGVjdCByYXRpbyAqL1xyXG4gICAgaWYgKHRoaXMuZnJhbWVXID49IHRoaXMuZnJhbWVIKVxyXG4gICAgICByeCAqPSB0aGlzLmZyYW1lVyAvIHRoaXMuZnJhbWVIO1xyXG4gICAgZWxzZVxyXG4gICAgICByeSAqPSB0aGlzLmZyYW1lSCAvIHRoaXMuZnJhbWVXO1xyXG5cclxuICAgIHRoaXMud3AgPSByeDtcclxuICAgIHRoaXMuaHAgPSByeTtcclxuICAgIHRoaXMubWF0clByb2ogPVxyXG4gICAgICBtYXQ0KCkuc2V0RnJ1c3RydW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bCh0aGlzLm1hdHJQcm9qKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0UHJvaicgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2V0dGluZyBwcm9qZWN0aW9uIGRhdGEgZnVuY3Rpb25cclxuICBzZXRTaXplKGZyYW1lVywgZnJhbWVIKSB7XHJcbiAgICB0aGlzLmZyYW1lVyA9IGZyYW1lVztcclxuICAgIHRoaXMuZnJhbWVIID0gZnJhbWVIO1xyXG4gICAgdGhpcy5zZXRQcm9qKHRoaXMucHJvalNpemUsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRTaXplJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBDYW1lcmEgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfY2FtZXJhKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnY2FtZXJhJyBmdW5jdGlvbiIsIi8vIFNoYWRlciBjbGFzc1xyXG5jbGFzcyBfc2hhZGVyIHtcclxuICBhc3luYyBsb2FkKCkge1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgfVxyXG4gIC8vIFNoYWRlciB1cGRhdGlvbiBmdW5jdGlvblxyXG4gIHVwZGF0ZVNoYWRlcnNTb3VyY2UoKSB7IFxyXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIGlmICh0aGlzLnNoYWRlcnNbMF0uc3JjID09IFwiXCIgfHwgdGhpcy5zaGFkZXJzWzFdLnNyYyA9PSBcIlwiKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2Uocy5pZCwgcy5zcmMpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHMuaWQpO1xyXG4gICAgICBpZiAoIXRoaXMucm5kLmdsLmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLnJuZC5nbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzLmlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU2hhZGVyICR7dGhpcy5uYW1lfS8ke3MubmFtZX0gY29tcGlsZSBmYWlsOiAke2J1Zn1gKTtcclxuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9KTsgICAgICAgICAgICAgXHJcbiAgICB0aGlzLmlkID0gdGhpcy5ybmQuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIGlmIChzLmlkICE9IG51bGwpXHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLmlkKTtcclxuICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuaWQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIHRoaXMudXBkYXRlU2hhZGVyRGF0YSgpOyAgICBcclxuICB9IC8vIEVuZCBvZiAndXBkYXRlU2hhZGVyc1NvdXJjZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2hhZGVyJ3MgZGF0YSB1cGRhdGlvbiBmdW5jdGlvblxyXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICAvLyBTaGFkZXIgYXR0cmlidXRlc1xyXG4gICAgdGhpcy5hdHRycyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRBdHRycyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX0FUVFJJQlVURVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZUF0dHJpYih0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy5hdHRyc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuIFxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm1zXHJcbiAgICB0aGlzLnVuaWZvcm1zID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1zID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybXNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybSBibG9ja3NcclxuICAgIHRoaXMudW5pZm9ybUJsb2NrcyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRVbmlmb3JtQmxvY2tzID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1CbG9ja3M7IGkrKykge1xyXG4gICAgICBjb25zdCBibG9ja19uYW1lID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrTmFtZSh0aGlzLmlkLCBpKTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcclxuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHNpemU6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLmlkLCBpZHgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcclxuICAgICAgICBiaW5kOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0JJTkRJTkcpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICd1cGRhdGVTaGFkZXJEYXRhJyBmdW5jdGlvblxyXG5cclxuICAvLyBTaGFkZXIncyBwcm9ncmFtbSBhcHBsaW5nIGZ1bmN0aW9uXHJcbiAgYXBwbHkoKSB7XHJcbiAgICBpZiAodGhpcy5pZCAhPSBudWxsKVxyXG4gICAgICB0aGlzLnJuZC5nbC51c2VQcm9ncmFtKHRoaXMuaWQpO1xyXG4gIH0gLy8gRW5kIG9mICdhcHBseScgZnVuY3Rpb25cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZSwgcm5kKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICBbXHJcbiAgICAgICB7XHJcbiAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5WRVJURVhfU0hBREVSLFxyXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcclxuICAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICAgfSxcclxuICAgICAgIHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5GUkFHTUVOVF9TSEFERVIsXHJcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXHJcbiAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gICAgLy8gdGhpcy5zdGF0aWNJbml0KG5hbWUsIHJuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTaGFkZXIgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lLCBybmQpIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSwgcm5kKTtcclxufSAvLyBFbmQgb2YgJ3NoYWRlcicgZnVuY3Rpb25cclxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX21hdDQuanNcIjtcclxuXHJcbi8vIFZlcnRleCBiYXNlIGNsYXNzXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gIHBvaW50ID0gdmVjMygpO1xyXG4gIG5vcm1hbCA9IHZlYzMoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeikge1xyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKVxyXG4gICAgICB0aGlzLnBvaW50ID0gdmVjMyh4KTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5wb2ludCA9IHZlYzMoeCwgeSwgeik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWZXJ0ZXggY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdmVydGV4KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVydGV4JyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGRhdGEgY2xhc3NcclxuY2xhc3MgX3ByaW1EYXRhIHtcclxuICBtYXRyaXggPSBtYXQ0KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZlcnRleGVzLCBpbmRleGVzKSB7XHJcbiAgICBhdXRvTm9ybWFsKHZlcnRleGVzLCBpbmRleGVzKTtcclxuICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgIGZvciAobGV0IHZlY3Qgb2YgdmVydGV4ZXMpIHtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QucG9pbnQueCk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnBvaW50LnkpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5wb2ludC56KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3Qubm9ybWFsLngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5ub3JtYWwueSk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0Lm5vcm1hbC56KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZGV4ZXMgPSBpbmRleGVzO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUHJpbWl0aXZlIGNsYXNzXHJcbmNsYXNzIF9wcmltIHtcclxuICB2ZXJ0QXJyYXk7XHJcbiAgdmVydEJ1ZmZlcjtcclxuICBpbmRCdWZmZXI7XHJcbiAgbnVtT2ZFbGVtO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzaGQsIGRhdGEpIHtcclxuICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgdGhpcy5ybmQgPSB0aGlzLnNoZC5ybmQ7XHJcbiAgICB0aGlzLm1hdHJpeCA9IGRhdGEubWF0cml4O1xyXG4gICAgXHJcbiAgICB0aGlzLm51bU9mRWxlbSA9IGRhdGEudmVydGV4ZXMubGVuZ3RoO1xyXG4gICAgXHJcbiAgICBjb25zdCBwb3NMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGQuaWQsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgIGNvbnN0IG5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGQuaWQsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICB0aGlzLnZlcnRBcnJheSA9IHRoaXMucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xyXG4gICAgdGhpcy52ZXJ0QnVmZmVyID0gdGhpcy5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0QnVmZmVyKTtcclxuICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodGhpcy5ybmQuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGRhdGEudmVydGV4ZXMpLCB0aGlzLnJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICBcclxuICAgIGlmIChwb3NMb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NMb2MsIDMsIHRoaXMucm5kLmdsLkZMT0FULCBmYWxzZSwgMjQsIDApO1xyXG4gICAgICB0aGlzLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vcm1Mb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihub3JtTG9jLCAzLCB0aGlzLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDI0LCAxMik7XHJcbiAgICAgIHRoaXMucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1Mb2MpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoZGF0YS5pbmRleGVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm51bU9mRWxlbSA9IGRhdGEuaW5kZXhlcy5sZW5ndGg7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmluZEJ1ZmZlciA9IHRoaXMucm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZEJ1ZmZlcik7XHJcbiAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodGhpcy5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShkYXRhLmluZGV4ZXMpLCB0aGlzLnJuZC5nbC5TVEFUSUNfRFJBVyk7ICBcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICAvLyBEcmF3aW5nIHByaW1pdGl2ZSBmdW5jdGlvblxyXG4gIGRyYXcod29ybGQsIGNhbSkge1xyXG4gICAgdGhpcy5zaGQuYXBwbHkoKTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCB0ID0gZGF0ZS5nZXRNaW51dGVzKCkgKiA2MCArXHJcbiAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICBsZXQgd3ZwID0gd29ybGQubXVsKGNhbS5tYXRyVlApO1xyXG4gICAgbGV0IHdpbnYgPSB3b3JsZC5pbnZlcnNlKCkudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgICBcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldWUCddICE9IHVuZGVmaW5lZClcclxuICAgICAgdGhpcy5ybmQuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldWUCddLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkod3ZwLnRvQXJyYXkoKSkpO1xyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV0ludiddKVxyXG4gICAgICB0aGlzLnJuZC5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV0ludiddLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkod2ludi50b0FycmF5KCkpKTtcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snVGltZSddKVxyXG4gICAgICB0aGlzLnJuZC5nbC51bmlmb3JtMWYodGhpcy5zaGQudW5pZm9ybXNbJ1RpbWUnXS5sb2MsIHQpO1xyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydDYW1EaXInXSkgICAgICAgXHJcbiAgICAgIHRoaXMucm5kLmdsLnVuaWZvcm0zZih0aGlzLnNoZC51bmlmb3Jtc1snQ2FtRGlyJ10ubG9jLCB0aGlzLnJuZC5jYW0uZGlyLngsIHRoaXMucm5kLmNhbS5kaXIueSwgdGhpcy5ybmQuY2FtLmRpci56KTtcclxuXHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XHJcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xyXG4gICAgICBpZiAodGhpcy5pbmRCdWZmZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMucm5kLmdsLmRyYXdBcnJheXModGhpcy5ybmQuZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLm51bU9mRWxlbSk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy5ybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbSwgdGhpcy5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBOb3JtYWwgY29tcHV0YXRpb24gZnVuY3Rpb25cclxuZnVuY3Rpb24gYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBsZXQgbm9ybSA9ICh2ZXJ0ZXhlc1tpICsgMV0ucG9pbnQuc3ViKHZlcnRleGVzW2ldLnBvaW50KSkuY3Jvc3ModmVydGV4ZXNbaSArIDJdLnBvaW50LnN1Yih2ZXJ0ZXhlc1tpXS5wb2ludCkpLm5vcm0oKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICB2ZXJ0ZXhlc1tpICsgMV0ubm9ybWFsID0gdmVydGV4ZXNbaSArIDFdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgIHZlcnRleGVzW2kgKyAyXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpICsgMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGxldCBcclxuICAgICAgICBuMCA9IGluZGV4ZXNbaV0sIG4xID0gaW5kZXhlc1tpICsgMV0sIG4yID0gaW5kZXhlc1tpICsgMl07XHJcbiAgICAgIGxldFxyXG4gICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvaW50LFxyXG4gICAgICAgIHAxID0gdmVydGV4ZXNbbjFdLnBvaW50LFxyXG4gICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvaW50LFxyXG4gICAgICAgIG5vcm0gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuICBcclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybWFsID0gdmVydGV4ZXNbbjBdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm1hbCA9IHZlcnRleGVzW24xXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICAgIHZlcnRleGVzW24yXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSBpbiB2ZXJ0ZXhlcykge1xyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwubm9ybSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSAvLyBFbmQgb2YgJ2F1dG9Ob3JtYWwnIGZ1bmN0aW9uXHJcblxyXG4vLyBQcmltaXRpdmUgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW0oLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ByaW0oLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdwcmltJyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGRhdGEgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW1EYXRhKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wcmltRGF0YSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ByaW1EYXRhJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSAnLi4vbXRoL210aF92ZWMzLmpzJ1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSAnLi4vbXRoL210aF9tYXQ0LmpzJ1xyXG5pbXBvcnQgeyBjYW1lcmEgfSBmcm9tICcuLi9tdGgvbXRoX2NhbS5qcydcclxuaW1wb3J0IHsgc2hhZGVyIH0gZnJvbSAnLi9yZXMvc2hkLmpzJztcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gJy4vcmVzL3ByaW0uanMnO1xyXG5cclxuLy8gUmVuZGVyIG9iamVjdCBjbGFzc1xyXG5jbGFzcyBfcmVuZGVyZXIge1xyXG4gIGdsO1xyXG4gIGNhbnZhcztcclxuICBjb250cm9sYWJsZSA9IGZhbHNlO1xyXG4gIHByaW1zID0gW107XHJcbiAgc2hkcyA9IFtdO1xyXG4gIGNhbSA9IGNhbWVyYSgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihpZCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcclxuICAgIHRoaXMuY2FtID0gY2FtZXJhKCk7XHJcbiAgXHJcbiAgICB0aGlzLmNhbS5mcmFtZVcgPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcclxuICAgIHRoaXMuY2FtLmZyYW1lSCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcclxuICAgIHRoaXMuY2FtLnByb2pEaXN0ID0gMC4xO1xyXG4gICAgdGhpcy5jYW0ucHJvalNpemUgPSAwLjE7XHJcbiAgICB0aGlzLmNhbS5wcm9qRmFyQ2xpcCA9IDMwMDtcclxuXHJcbiAgICB0aGlzLmNhbS5zZXRDYW0odmVjMygwLCAwLCA0KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICB0aGlzLmNhbS5zZXRQcm9qKDAuMSwgMC4xLCAzMDApO1xyXG5cclxuICAgIC8vIFdlYiBncmFmaXggbGlicmFyeSBpbml0aWFsaXphdGlvblxyXG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgXHJcbiAgICBpZiAodGhpcy5nbCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMzAsIDAuNDcsIDAuOCwgMS4wKTtcclxuXHJcbiAgICB0aGlzLnNldENvbnRyb2woKTtcclxuICAgIFxyXG4gICAgY29uc3QgYW5pbSA9ICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIFxyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW0pO1xyXG4gICAgfSAgXHJcblxyXG4gICAgYW5pbSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQWRkaW5nIHByaW1pdGl2ZXMgKGluIHNoYWRlcikgdG8gcmVuZGVyIG9iamVjdCBmdW5jdGlvblxyXG4gIGFzeW5jIGFkZFByaW1zKHNoZE5hbWUsIHByaW1zRGF0YSkge1xyXG4gICAgbGV0IG5ld1NoZDtcclxuICAgIGZvciAoc2hkIG9mIHRoaXMuc2hkcykgXHJcbiAgICAgIGlmIChzaGQubmFtZSA9PSBzaGROYW1lKSB7XHJcbiAgICAgICAgbmV3U2hkID0gc25kO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICBpZiAobmV3U2hkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICBuZXdTaGQgPSBzaGFkZXIoc2hkTmFtZSwgdGhpcyk7XHJcbiAgICAgIGF3YWl0IG5ld1NoZC5sb2FkKCk7XHJcbiAgICAgIHRoaXMuc2hkcy5wdXNoKG5ld1NoZCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBwcmltRGF0YSBvZiBwcmltc0RhdGEpIHtcclxuICAgICAgdGhpcy5wcmltcy5wdXNoKHByaW0obmV3U2hkLCBwcmltRGF0YSkpO1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdhZGRQcmltcycgZnVuY3Rpb25cclxuXHJcbiAgLy8gRHJhd2luZyBmcmFtZSBmdW5jdGlvblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIFxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdCA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xyXG4gICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDA7XHJcblxyXG4gICAgLy8gRHJhd2luZyBwcmltaXRpdmVzXHJcbiAgICBpZiAodGhpcy5wcmltcyAhPSB1bmRlZmluZWQpXHJcbiAgICAgIGZvciAobGV0IHBybSBvZiB0aGlzLnByaW1zKVxyXG4gICAgICAgIHBybS5kcmF3KHBybS5tYXRyaXgubXVsKG1hdDQoKS5zZXRSb3RhdGVZKDMwICogdCkpLCB0aGlzLmNhbSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb24gXHJcblxyXG4gIHNldENvbnRyb2woKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gdHJ1ZTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gZmFsc2U7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCAoZXZlbnQpID0+IHsgXHJcbiAgICAgIGxldCBkaXN0ID0gdGhpcy5jYW0uYXQuc3ViKHRoaXMuY2FtLmxvYykubGVuKCk7XHJcbiAgICAgIFxyXG4gICAgICBkaXN0ICs9IGV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XHJcbiAgICAgIGlmIChkaXN0IDwgMC4wMDEpXHJcbiAgICAgICAgZGlzdCA9IDAuMDAxO1xyXG5cclxuICAgICAgdGhpcy5jYW0uc2V0Q2FtKHRoaXMuY2FtLmxvYy5ub3JtKCkubXVsKGRpc3QpLCB0aGlzLmNhbS5hdCwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5jb250cm9sYWJsZSkge1xyXG4gICAgICAgIGxldCBkaXN0LCBzaW5ULCBjb3NULCBzaW5QLCBjb3NQLCBwbGVuLCBhemltdXRoLCBlbGV2YXRvcjtcclxuICBcclxuICAgICAgICBkaXN0ID0gdGhpcy5jYW0uYXQuc3ViKHRoaXMuY2FtLmxvYykubGVuKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29zVCA9ICh0aGlzLmNhbS5sb2MueSAtIHRoaXMuY2FtLmF0LnkpIC8gZGlzdDtcclxuICAgICAgICBzaW5UID0gTWF0aC5zcXJ0KDEgLSBjb3NUICogY29zVCk7XHJcbiAgICAgIFxyXG4gICAgICAgIHBsZW4gPSBkaXN0ICogc2luVDtcclxuICAgICAgICBjb3NQID0gKHRoaXMuY2FtLmxvYy56IC0gdGhpcy5jYW0uYXQueikgLyBwbGVuO1xyXG4gICAgICAgIHNpblAgPSAodGhpcy5jYW0ubG9jLnggLSB0aGlzLmNhbS5hdC54KSAvIHBsZW47XHJcbiAgICAgIFxyXG4gICAgICAgIGF6aW11dGggPSBNYXRoLmF0YW4yKHNpblAsIGNvc1ApICogMTgwIC8gTWF0aC5QSTtcclxuICAgICAgICBlbGV2YXRvciA9IE1hdGguYXRhbjIoc2luVCwgY29zVCkgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICBcclxuICAgICAgICBhemltdXRoIC09IDAuNSAqIGV2ZW50Lm1vdmVtZW50WDtcclxuICAgICAgXHJcbiAgICAgICAgZWxldmF0b3IgLT0gMC41ICogZXZlbnQubW92ZW1lbnRZO1xyXG4gICAgICBcclxuICAgICAgICBpZiAoZWxldmF0b3IgPiAxNzguMClcclxuICAgICAgICAgIGVsZXZhdG9yID0gMTc4LjA7XHJcbiAgICAgICAgaWYgKGVsZXZhdG9yIDwgMC4wOClcclxuICAgICAgICAgIGVsZXZhdG9yID0gMC4wODtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbS5zZXRDYW0odmVjMygwLCBkaXN0LCAwKS5wb2ludFRyYW5zZm9ybShtYXQ0KCkuc2V0Um90YXRlWChlbGV2YXRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubXVsKG1hdDQoKS5zZXRSb3RhdGVZKGF6aW11dGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm11bChtYXQ0KCkuc2V0VHJhbnModGhpcy5jYW0uYXQpKSkpLCB0aGlzLmNhbS5hdCwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSAgXHJcblxyXG4vLyBSZW5kZXJlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3JlbmRlcmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncmVuZGVyZXInIGZ1bmN0aW9uIiwiaW1wb3J0IHsgcHJpbURhdGEsIHZlcnRleCB9IGZyb20gXCIuL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX21hdDQuanNcIjtcclxuXHJcbi8vIEdldHRpbmcgdGV0cmFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXRyYWhlZHJvbigpIHtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KDAsIDAsIDEpLCB2ZXJ0ZXgoMSwgMCwgMCksIHZlcnRleCgwLCAxLCAwKSwgdmVydGV4KDEpIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgXHJcbiAgICAwLCAxLCAzLCBcclxuICAgIDAsIDIsIDMsIFxyXG4gICAgMSwgMiwgM1xyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZydHgubm9ybWFsID0gdmVjMyh2ZXJ0W2ldLm5vcm1hbCk7IFxyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0VHJhbnMoLTAuNSwgLTAuNSwgLTAuNSk7XHJcbiAgcmV0dXJuIHBybURhdGE7XHJcbn0gLy8gRW5kIG9mICdzZXRUZXRyYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgY3ViZSBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1YmUoKSB7XHJcbiAgY29uc3QgdmVydCA9ICBbXHJcbiAgICB2ZXJ0ZXgoLTAuNSksIHZlcnRleCgwLjUsIC0wLjUsIC0wLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoLTAuNSwgLTAuNSwgMC41KSwgdmVydGV4KDAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoMC41LCAtMC41LCAwLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAwLjUpLCB2ZXJ0ZXgoMC41KSxcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIFxyXG4gICAgMSwgMiwgNCwgXHJcbiAgICAxLCA0LCA3LCBcclxuICAgIDEsIDcsIDUsIFxyXG4gICAgNywgNSwgMywgXHJcbiAgICA3LCAzLCA2LFxyXG4gICAgMCwgMSwgMyxcclxuICAgIDMsIDEsIDUsXHJcbiAgICA2LCAzLCAwLFxyXG4gICAgNiwgMCwgMixcclxuICAgIDIsIDYsIDcsXHJcbiAgICAyLCA3LCA0XHJcbiAgXTtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2cnR4Lm5vcm1hbCA9IHZlYzModmVydFtpXS5ub3JtYWwpOyBcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpOyBcclxufSAvLyBFbmQgb2YgJ3NldEN1YmUnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIG9jdGFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPY3RhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHNxcnQyID0gTWF0aC5zcXJ0KDIpIC8gMjtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KHNxcnQyLCAwLCAwKSwgdmVydGV4KC1zcXJ0MiwgMCwgMCksXHJcbiAgICB2ZXJ0ZXgoMCwgMCwgc3FydDIpLCB2ZXJ0ZXgoMCwgMCwgLXNxcnQyKSwgXHJcbiAgICB2ZXJ0ZXgoMCwgc3FydDIsIDApLCB2ZXJ0ZXgoMCwgLXNxcnQyLCAwKSwgIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMywgNCwgMCwgMiwgNCwgMiwgNCwgMSwgMSwgMywgNCxcclxuICAgIDEsIDMsIDUsIDMsIDUsIDAsIDAsIDUsIDIsIDIsIDUsIDFcclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZydHgubm9ybWFsID0gdmVjMyh2ZXJ0W2ldLm5vcm1hbCk7IFxyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufSAvLyBFbmQgb2YgJ3NldE9jdGFoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIGljb3NhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SWNvc2FoZWRyb24oKSB7XHJcbiAgY29uc3QgdmVydCA9IFtdO1xyXG5cclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgLTAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG4gIFxyXG4gIGFuZ2xlID0gTWF0aC5QSTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIE1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIC1NYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcblxyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDgsIDcsIDAsIDAsIDQsIDcsIDcsIDYsIDQsIDQsIDMsIDYsIDYsIDUsIFxyXG4gICAgMywgMywgMiwgNSwgNSwgOSwgMiwgMiwgMSwgOSwgOSwgOCwgMSwgMSwgMCwgOCxcclxuICAgIDUsIDYsIDEwLCA2LCA3LCAxMCwgNywgOCwgMTAsIDgsIDksIDEwLCA5LCA1LCAxMCxcclxuICAgIDAsIDEsIDExLCAxLCAyLCAxMSwgMiwgMywgMTEsIDMsIDQsIDExLCA0LCAwLCAxMSxcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2cnR4Lm5vcm1hbCA9IHZlYzModmVydFtpXS5ub3JtYWwpOyBcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn0gLy8gRW5kIG9mICdzZXRJY29zYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgZG9kZWNhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gIC8vIENyZWF0ZSBpY29zYWhlZHJvblxyXG4gIGNvbnN0IGljb3ZlcnQgPSBbXTtcclxuXHJcbiAgbGV0IGFuZ2xlID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgaWNvdmVydC5wdXNoKHZlYzMoTWF0aC5jb3MoYW5nbGUpLCAtMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcbiAgXHJcbiAgYW5nbGUgPSBNYXRoLlBJO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpY292ZXJ0LnB1c2godmVjMyhNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBpY292ZXJ0LnB1c2godmVjMygwLCBNYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcbiAgaWNvdmVydC5wdXNoKHZlYzMoMCwgLU1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuXHJcbiAgY29uc3QgaWNvaW5kID0gW1xyXG4gICAgOCwgNywgMCwgMCwgNCwgNywgNywgNiwgNCwgNCwgMywgNiwgNiwgNSwgXHJcbiAgICAzLCAzLCAyLCA1LCA1LCA5LCAyLCAyLCAxLCA5LCA5LCA4LCAxLCAxLCAwLCA4LFxyXG4gICAgNSwgNiwgMTAsIDYsIDcsIDEwLCA3LCA4LCAxMCwgOCwgOSwgMTAsIDksIDUsIDEwLFxyXG4gICAgMCwgMSwgMTEsIDEsIDIsIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDAsIDExLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGljb3ZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaWNvaW5kKSBcclxuICAgIGljb3ZlcnRleGVzLnB1c2godmVjMyhpY292ZXJ0W2ldKSk7XHJcblxyXG4gIGNvbnN0IHZlcnQgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGljb2luZC5sZW5ndGg7IGkgKz0gMylcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoaWNvdmVydGV4ZXNbaV0uYWRkKGljb3ZlcnRleGVzW2kgKyAxXSkuYWRkKGljb3ZlcnRleGVzW2kgKyAyXSkuZGl2KDMpKSk7XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgMCwgMiwgMTEsIDAsIDExLCAxMixcclxuICAgIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDEwLFxyXG4gICAgMTAsIDQsIDUsIDEwLCA1LCA2LCAxMCwgNiwgMTQsIFxyXG4gICAgMTQsIDYsIDcsIDE0LCA3LCA4LCAxNCwgOCwgMTMsXHJcbiAgICAxMywgOCwgOSwgMTMsIDksIDAsIDEzLCAwLCAxMixcclxuXHJcbiAgICAyLCAxLCAzLCAxLCAzLCAxOSwgMSwgMTUsIDE5LFxyXG4gICAgMywgMTksIDE4LCAzLCAxOCwgNSwgMywgNSwgNCxcclxuICAgIDUsIDE4LCAxNywgNSwgNiwgMTcsIDYsIDE3LCA3LFxyXG4gICAgNywgMTcsIDE2LCA3LCAxNiwgOCwgMTYsIDgsIDksXHJcbiAgICA5LCAxNiwgMTUsIDksIDE1LCAxLCA5LCAxLCAwLFxyXG5cclxuICAgIDEwLCAxMSwgMTQsIDExLCAxNCwgMTMsIDExLCAxMywgMTIsXHJcbiAgICAxNywgMTgsIDE5LCAxNywgMTksIDE1LCAxNywgMTUsIDE2XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdnJ0eC5ub3JtYWwgPSB2ZWMzKHZlcnRbaV0ubm9ybWFsKTsgXHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59IC8vIEVuZCBvZiAnc2V0RG9kZWNhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyByaG9tYmljIHRyaWFjb250YWhlZHJvbiAoMzAgZmFjZXMpIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0MzBoZWRyb24oKSB7XHJcbiAgY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMiwgaCA9IHBoaTtcclxuXHJcbiAgbGV0IHZlcnQgPSBbdmVydGV4KDAsIE1hdGguc3FydCgyKSAqIHBoaSAvIDIsIDApXTtcclxuICBcclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHBoaSAqIE1hdGguY29zKGFuZ2xlKSwgMCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguYXRhbigxIC8gcGhpKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIE1hdGguc3FydCgyKSAqIHBoaSAvIDQsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaV0ucG9pbnQuYWRkKHZlcnRbaSAlIDUgKyAxXS5wb2ludCkuc3ViKHZlcnRbaSArIDVdLnBvaW50KSkpO1xyXG5cclxuXHJcbiAgdmVydC5wdXNoKHZlcnRleCgwLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gMiAtIGgsIDApKTtcclxuICBcclxuICBhbmdsZSA9IE1hdGguUEk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgocGhpICogTWF0aC5jb3MoYW5nbGUpLCAtaCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguUEkgKyBNYXRoLmF0YW4oMSAvIHBoaSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gNCAtIGgsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaSArIDE2XS5wb2ludC5hZGQodmVydFtpICUgNSArIDE3XS5wb2ludCkuc3ViKHZlcnRbaSArIDIxXS5wb2ludCkpKTtcclxuXHJcbiAgXHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMTAsIDYsIDEwLCA2LCAxLFxyXG4gICAgMCwgNiwgNywgNiwgNywgMixcclxuICAgIDAsIDgsIDcsIDgsIDcsIDMsXHJcbiAgICAwLCA4LCA5LCA5LCA4LCA0LFxyXG4gICAgMCwgOSwgMTAsIDEwLCA5LCA1LFxyXG5cclxuICAgIDYsIDEsIDIsIDEsIDIsIDExLFxyXG4gICAgNywgMiwgMywgMiwgMywgMTIsXHJcbiAgICA4LCA0LCAzLCA0LCAzLCAxMyxcclxuICAgIDUsIDksIDQsIDUsIDQsIDE0LFxyXG4gICAgNSwgMTAsIDEsIDUsIDEsIDE1LFxyXG5cclxuICAgIDE2LCAyNiwgMjIsIDI2LCAyMiwgMTcsXHJcbiAgICAxNiwgMjIsIDIzLCAyMiwgMjMsIDE4LFxyXG4gICAgMTYsIDI0LCAyMywgMjQsIDIzLCAxOSxcclxuICAgIDE2LCAyNCwgMjUsIDI1LCAyNCwgMjAsXHJcbiAgICAxNiwgMjUsIDI2LCAyNiwgMjUsIDIxLFxyXG5cclxuICAgIDIyLCAxNywgMTgsIDE3LCAxOCwgMjcsXHJcbiAgICAyMywgMTgsIDE5LCAxOCwgMTksIDI4LFxyXG4gICAgMjQsIDIwLCAxOSwgMjAsIDE5LCAyOSxcclxuICAgIDIxLCAyNSwgMjAsIDIxLCAyMCwgMzAsXHJcbiAgICAyMSwgMjYsIDE3LCAyMSwgMTcsIDMxLFxyXG5cclxuICAgIDE4LCAyOCwgMTQsIDE0LCA1LCAyOCxcclxuICAgIDI4LCAxOSwgMTUsIDE1LCA1LCAyOCxcclxuICAgIDE5LCAyOSwgMTUsIDE1LCAxLCAyOSxcclxuICAgIDI5LCAyMCwgMSwgMSwgMTEsIDIwLFxyXG4gICAgMjAsIDMwLCAxMSwgMTEsIDIsIDMwLFxyXG4gICAgMzAsIDIxLCAyLCAyLCAxMiwgMjEsXHJcbiAgICAyMSwgMzEsIDEyLCAxMiwgMywgMzEsXHJcbiAgICAzMSwgMTcsIDMsIDMsIDEzLCAxNyxcclxuICAgIDE3LCAyNywgMTMsIDEzLCA0LCAyNyxcclxuICAgIDI3LCAxOCwgNCwgNCwgMTQsIDE4XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdnJ0eC5ub3JtYWwgPSB2ZWMzKHZlcnRbaV0ubm9ybWFsKTsgXHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuXHJcbiAgbGV0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC41KS5tdWwobWF0NCgpLnNldFRyYW5zKDAsIDAuNSwgMCkpOyBcclxuICByZXR1cm4gcHJtRGF0YTtcclxufSAvLyBFbmQgb2YgJ3NldDMwaGVkcm9uJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyByZW5kZXJlciB9IGZyb20gXCIuL3JuZC9ybmQuanNcIjtcclxuaW1wb3J0ICogYXMgcG9seSBmcm9tIFwiLi9ybmQvcmVzL3BvbHloZWRyYXMuanNcIjtcclxuXHJcbi8vIE1haW4gcHJvamVjdCBmdW5jdGlvblxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG4gIGNvbnN0IHJuZCA9IHJlbmRlcmVyKFwiI2dsQ2FudmFzXCIpO1xyXG4gIGNvbnN0IHJuZDEgPSByZW5kZXJlcihcIiNnbENhbnZhczFcIik7XHJcbiAgY29uc3Qgcm5kMiA9IHJlbmRlcmVyKFwiI2dsQ2FudmFzMlwiKTtcclxuICBjb25zdCBybmQzID0gcmVuZGVyZXIoXCIjZ2xDYW52YXMzXCIpO1xyXG4gIGNvbnN0IHJuZDQgPSByZW5kZXJlcihcIiNnbENhbnZhczRcIik7XHJcblxyXG4gIGNvbnN0IHJuZDMwID0gcmVuZGVyZXIoXCIjZ2xDYW52YXMzMFwiKTtcclxuICBybmQuYWRkUHJpbXMoXCJkZWZhdWx0XCIsIFtwb2x5LnNldEljb3NhaGVkcm9uKCldKTtcclxuICBybmQxLmFkZFByaW1zKFwiZGVmYXVsdFwiLCBbcG9seS5zZXREb2RlY2FoZWRyb24oKV0pO1xyXG4gIHJuZDIuYWRkUHJpbXMoXCJkZWZhdWx0XCIsIFtwb2x5LnNldE9jdGFoZWRyb24oKV0pO1xyXG4gIHJuZDMuYWRkUHJpbXMoXCJkZWZhdWx0XCIsIFtwb2x5LnNldEN1YmUoKV0pO1xyXG4gIHJuZDQuYWRkUHJpbXMoXCJkZWZhdWx0XCIsIFtwb2x5LnNldFRldHJhaGVkcm9uKCldKTtcclxuICBybmQzMC5hZGRQcmltcyhcImRlZmF1bHRcIiwgW3BvbHkuc2V0MzBoZWRyb24oKV0pO1xyXG59IC8vIEVuZCBvZiAnbWFpbicgZnVuY3Rpb25cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgbWFpbigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbInBvbHkuc2V0SWNvc2FoZWRyb24iLCJwb2x5LnNldERvZGVjYWhlZHJvbiIsInBvbHkuc2V0T2N0YWhlZHJvbiIsInBvbHkuc2V0Q3ViZSIsInBvbHkuc2V0VGV0cmFoZWRyb24iLCJwb2x5LnNldDMwaGVkcm9uIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLE1BQU0sS0FBSyxDQUFDO0VBQ1osRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7RUFDeEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRCxPQUFPO0VBQ1AsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUM1QyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzNDLE9BQU8sTUFBTTtFQUNiLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0MsT0FBTztFQUNQLEtBQUs7RUFDTCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7RUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLEdBQUc7RUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQztFQUNqQixLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzFCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUM1QixNQUFNLE9BQU8sSUFBSSxDQUFDO0VBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDM0MsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUNmLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckY7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQzlGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUMvRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFO0VBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEYsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUYsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDNUIsQ0FBQzs7RUNsSEQ7RUFDQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7RUFDbkIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hFLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtFQUN0RCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLEtBQUssTUFBTTtFQUNYLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25CLEtBQUs7RUFDTCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksT0FBTyxFQUFFLElBQUksUUFBUSxFQUFFO0VBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDM0QsS0FBSyxNQUFNO0VBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNyRCxLQUFLO0VBQ0w7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSTtFQUNKLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRTtFQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7RUFDaEIsTUFBTSxPQUFPLENBQUMsQ0FBQztBQUNmO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUN4QixJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1RSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3JHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFD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QUMsQ0FBQyxDQUFDO0VBQzNDLHNCQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUNuRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO0VBQzNDLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ2Y7RUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0VBQzdCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7RUFDbkMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDO0VBQ0E7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTTtFQUNsQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFB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QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDakQsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMzSDtFQUNBO0VBQ0EsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hELE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLEtBQUs7RUFDTCxHQUFHLE1BQU07RUFDVCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDaEQsTUFBTTtFQUNOLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNO0VBQ04sUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25EO0VBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUQsS0FBSztFQUNMO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM1QixNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNyRCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVB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RUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLE1BQU0sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0VBQzdCLEtBQUssQ0FBQyxDQUFDO0FBQ1A7RUFDQSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxLQUFLO0VBQ3pELE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0VBQzVCLFFBQVEsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0VBQ2xFO0VBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkQ7RUFDQSxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0VBQ3ZELFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztFQUMxQztFQUNBLFFBQVEsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7RUFDM0IsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztFQUN2RCxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FB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LElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztFQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNsQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1QyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0M7RUFDQSxFQUFFLE1BQU0sR0FBRyxHQUFHO0VBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDcEQsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUN0QjtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7RUFDckIsSUFBSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN4QixHQUFHO0VBQ0gsRUFBRSxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUM1QixDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsZUFBZSxHQUFHO0VBQ2xDO0VBQ0EsRUFBRSxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDckI7RUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNoQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9ELElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3QixHQUFHO0VBQ0g7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2xCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUM5QixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3QixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QztFQUNBLEVBQUUsTUFBTSxNQUFNLEdBQUc7RUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDcEQsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN6QjtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNO0VBQ3RCLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QztFQUNBLEVBQUUsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0VBQ2xCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0YsRUFBRSxNQUFNLEdBQUcsR0FBRztFQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ2hDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2pDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2pDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2pDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2pDO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDaEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDaEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDakMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDakMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDaEM7RUFDQSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN0QyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN0QyxHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3RCO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtFQUNyQixJQUFJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDdkMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hCLEdBQUc7RUFDSCxFQUFFLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQzVCLENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxXQUFXLEdBQUc7RUFDOUIsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzlDO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQ7RUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNoQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZFLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3QixHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUM3QixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RjtBQUNBO0VBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkQ7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2xCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUN2QyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUY7RUFDQTtFQUNBLEVBQUUsTUFBTSxHQUFHLEdBQUc7RUFDZCxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN0QjtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCO0VBQ0EsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDMUI7RUFDQSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMxQjtFQUNBLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ3hCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ3hCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ3hCLElBQUksRUFB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
