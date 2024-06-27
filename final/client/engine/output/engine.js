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

  // Vector (3d) creation function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  // 2d vector class
  class _vec2 {
    constructor(x, y) {
      if (x == undefined) {
        this.x = 0, this.y = 0;
      } else if (typeof x == 'object') {
        if (x.length == 2) {
          this.x = x[0], this.y = x[1];
        } else {
          this.x = x.x, this.y = x.y;
        }
      } else {
        if (y == undefined) {
          this.x = x, this.y = x;
        } else {
          this.x = x, this.y = y;
        }
      }
    }
  }

  // Vector (2d) creation function
  function vec2(...args) {
    return new _vec2(...args);
  } // End of 'vec2' function

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
    setRotation(v, angle) {
      const rad = angle / 180.0 * Math.PI, s = Math.sin(rad), c = Math.cos(rad);
      let r = mat4();
      r.m = [
        [c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0],
        [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
        [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0],
        [0, 0, 0, 1]
      ];
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
        const index = this.rnd.gl.getUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: this.rnd.gl.getActiveUniformBlockParameter(this.id, index, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: this.rnd.gl.getActiveUniformBlockParameter(this.id, index, this.rnd.gl.UNIFORM_BLOCK_BINDING),
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

  // Timer class constructor function
  function Timer() {
    // Timer obtain current time in seconds method
    const getTime = () => {
      const date = new Date();
      let t =
        date.getMilliseconds() / 1000.0 +
        date.getSeconds() +
        date.getMinutes() * 60;
      return t;
    };
   
    // Timer response method
    this.response = (tag_id = null) => {
      let t = getTime();
      // Global time
      this.globalTime = t;
      this.globalDeltaTime = t - this.oldTime;
      // Time with pause
      if (this.isPause) {
        this.localDeltaTime = 0;
        this.pauseTime += t - this.oldTime;
      } else {
        this.localDeltaTime = this.globalDeltaTime;
        this.localTime = t - this.pauseTime - this.startTime;
      }
      // FPS
      this.frameCounter++;
      if (t - this.oldTimeFPS > 3) {
        this.FPS = this.frameCounter / (t - this.oldTimeFPS);
        this.oldTimeFPS = t;
        this.frameCounter = 0;
        if (tag_id != null)
          document.getElementById(tag_id).innerHTML = this.getFPS();
      }
      this.oldTime = t;
    };
   
    // Obtain FPS as string method
    this.getFPS = () => this.FPS.toFixed(3);
   
    // Fill timer global data
    this.globalTime = this.localTime = getTime();
    this.globalDeltaTime = this.localDeltaTime = 0;
   
    // Fill timer semi global data
    this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
    this.frameCounter = 0;
    this.isPause = false;
    this.FPS = 30.0;
    this.pauseTime = 0;
   
    return this;
  } // End of 'Timer' function

  function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.clientX - p2.clientX, 2) + Math.pow(p1.clientY - p2.clientY, 2));
  }
   
  class _input {
    constructor(rnd) {
      //gl.canvas.addEventListener('click', (e) => this.onClick(e));
      rnd.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      rnd.canvas.addEventListener('mousewheel', (e) => this.onMouseWheel(e));
      rnd.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
      rnd.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
      rnd.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
      if ('ontouchstart' in document.documentElement) {
        rnd.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        rnd.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        rnd.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
      }
      
      window.addEventListener('keydown', (e) => this.onKeyDown(e));
      window.addEventListener('keyup', (e) => this.onKeyUp(e));
      
      this.mX = 0;
      this.mY = 0;
      this.mZ = 0;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mButtons = [0, 0, 0, 0, 0];
      this.mButtonsOld = [0, 0, 0, 0, 0];
      this.mButtonsClick = [0, 0, 0, 0, 0];
      
      // Zoom specific
      this.scaling = false;
      this.dist = 0;
      this.scale_factor = 1.0;
      this.curr_scale = 1.0;
      this.max_zoom = 8.0;
      this.min_zoom = 0.5;
      
      this.keys = [];
      this.keysOld = [];
      this.keysClick = [];
      [
        "Enter", "Backspace",
        "Delete", "Space", "Tab", "Escape", "ArrowLeft", "ArrowUp", "ArrowRight",
        "ArrowDown", "Shift", "Control", "Alt", "ShiftLeft", "ShiftRight", "ControlLeft",
        "ControlRight", "PageUp", "PageDown", "End", "Home",
        "Digit0", "Digit1",
        "KeyP", "KeyW", "KeyS", "KeyA", "KeyD",
        "Numpad0", "NumpadMultiply",
        "F1",
      ].forEach(key => {
        this.keys[key] = 0;
        this.keysOld[key] = 0;
        this.keysClick[key] = 0;
      });
   
      this.shiftKey = false;
      this.altKey = false;
      this.ctrlKey = false;
   
      this.isFirst = true;
    } // End of 'constructor' function
   
    /// Mouse handle functions
   
    onClick(e) {
    } // End of 'onClick' function
    
    onTouchStart(e) {
      if (e.touches.length == 1)
        this.mButtons[0] = 1;
      else if (e.touches.length == 2) {
        this.mButtons[0] = 0;
        this.mButtons[2] = 1;
      }
      else {
        this.mButtons[0] = 0;
        this.mButtons[2] = 0;
        this.mButtons[1] = 1;
      }
      let
        //x = e.touches[0].clientX - e.target.offsetLeft,
        //y = e.touches[0].clientY - e.target.offsetTop;
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mX = x;
      this.mY = y;
   
      let tt = e.targetTouches;
      if (tt.length >= 2) {
        this.dist = distance(tt[0], tt[1]);
        this.scaling = true;
      } else {                    
        this.scaling = false;
      }
      //vg.log(`Zoom start: issc:${this.scaling}`);
    } // End of 'onTouchStart' function
   
    onTouchMove(e) {
      e.preventDefault();
   
      let
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
   
      let tt = e.targetTouches;
      if (this.scaling) {                                             
        this.mDz = 0;
        this.curr_scale = (distance(tt[0], tt[1]) / this.dist) * this.scale_factor;
   
         let d = distance(tt[0], tt[1]);
        if (Math.abs(d - this.dist) > 0) {
          if (d < this.dist)
            this.mDz = 1 * (d / this.dist), this.dist = d;
          else if (d > this.dist)
            this.mDz = -1 * (this.dist / d), this.dist = d;
          this.mZ += this.mDz;
   
          this.mDx = x - this.mX;
          this.mDy = y - this.mY;
          this.mX = x;
          this.mY = y;
          return;
        }
      }
   
      if (this.mButtons[1] == 1) {
        this.mDx = 0;
        this.mDy = 0;
        this.mDz = y - this.mZ;
        this.mX = x;
        this.mY = y;
        this.mZ += this.mDz;
      } else {
        this.mDx = x - this.mX;
        this.mDy = y - this.mY;
        this.mDz = 0;
        this.mX = x;
        this.mY = y;
      }  
    } // End of 'onTouchMove' function
   
    onTouchEnd(e) {
      this.mButtons[0] = 0;
      this.mButtons[1] = 0;
      this.mButtons[2] = 0;
      let
        //x = e.touches[0].clientX - e.target.offsetLeft,
        //y = e.touches[0].clientY - e.target.offsetTop;
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mX = x;
      this.mY = y;
   
      let tt = e.targetTouches;
      if (tt.length < 2) {
        this.scaling = false;
        if (this.curr_scale < this.min_zoom) {
          this.scale_factor = this.min_zoom;
        } else {
          if (this.curr_scale > this.max_zoom) {
            this.scale_factor = this.max_zoom; 
          } else {
            this.scale_factor = this.curr_scale;
          }
        }
      } else {
        this.scaling = true;
      }
      //vg.log(`Zoom end: issc:${this.scaling} (mZ: ${this.mZ})`);
    } // End of 'onTouchMove' function
   
    onMouseMove(e) {
      let
        dx = e.movementX,
        dy = e.movementY;
      this.mDx = dx;
      this.mDy = dy;
      this.mDz = 0;
      this.mX += dx;
      this.mY += dy;
    } // End of 'onMouseMove' function
   
    onMouseWheel(e) {
      if (e.wheelDelta != 0)
        e.preventDefault();
      this.mZ += (this.mDz = e.wheelDelta / 120);
    } // End of 'onMouseWheel' function
   
    onMouseDown(e) {
      e.preventDefault();
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
   
      this.mButtonsOld[e.button] = this.mButtons[e.button];
      this.mButtons[e.button] = 1;
      this.mButtonsClick[e.button] = !this.mButtonsOld[e.button] && this.mButtons[e.button];
      
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onMouseMove' function
    
    onMouseUp(e) {
      e.preventDefault();
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
   
      this.mButtonsOld[e.button] = this.mButtons[e.button];
      this.mButtons[e.button] = 0;
      this.mButtonsClick[e.button] = 0;
   
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onMouseMove' function
   
    /// Keyboard handle
    onKeyDown(e) {
      if (e.target.tagName.toLowerCase() == 'textarea')
        return;
      let focused_element = null;
      if (document.hasFocus() &&
          document.activeElement !== document.body &&
          document.activeElement !== document.documentElement) {
        focused_element = document.activeElement;
        if (focused_element.tagName.toLowerCase() == 'textarea')
          return;
      }      
      if (e.code != "F12" && e.code != "F11" && e.code != "KeyR")
        e.preventDefault();
      this.keysOld[e.code] = this.keys[e.code];
      this.keys[e.code] = 1;
      this.keysClick[e.code] = !this.keysOld[e.code] && this.keys[e.code];
      
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onKeyDown' function
    
    onKeyUp(e) {
      if (e.target.tagName.toLowerCase() == 'textarea')
        return;
      let focused_element = null;
      if (document.hasFocus() &&
          document.activeElement !== document.body &&
          document.activeElement !== document.documentElement) {
        focused_element = document.activeElement;
        if (focused_element.tagName.toLowerCase() == 'textarea')
          return;
      }      
      if (e.code != "F12" && e.code != "F11" && e.code != "KeyR")
        e.preventDefault();
      this.keysOld[e.code] = this.keys[e.code];
      this.keys[e.code] = 0;
      this.keysClick[e.code] = 0;
   
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onKeyUp' function
    
    /// Camera movement handling
    reset() {
      //vg.log(`MsDz: ${this.mDz}`);
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mButtonsClick.forEach(k => this.mButtonsClick[k] = 0);
      this.keysClick.forEach(k => this.keysClick[k] = 0);
   
      this.shiftKey = this.keys["ShiftLeft"] || this.keys["ShiftRight"];
      this.altKey = this.keys["AltLeft"] || this.keys["AltRight"];
      this.ctrlKey = this.keys["ControlLeft"] || this.keys["ControlRight"];
    } // End of 'reset' function
  }

  // Input object cration function
  function input(...args) {
    return new _input(...args);
  } // End of 'input' function

  // Render object class
  class _renderer {
    gl;
    canvas;
    shds = [];
    units = [];
    AABB = [];
    cam = camera();

    constructor(id) {
      this.canvas = document.querySelector(id);
      this.cam = camera();
      this.timer = new Timer();
      this.input = input(this);

      window.addEventListener("resize", () => {
        this.resize();
      });
    
      this.cam.frameW = this.canvas.clientWidth;
      this.cam.frameH = this.canvas.clientHeight;
      this.cam.projDist = 0.1;
      this.cam.projSize = 0.1;
      this.cam.projFarClip = 300;
      
      this.cam.setCam(vec3(4), vec3(0), vec3(0, 1, 0));
      this.cam.setProj(0.1, 0.1, 300);

      // Web grafix library initialization
      this.gl = this.canvas.getContext("webgl2");
    
      if (this.gl == null) {
        alert("WebGL2 not supported");
        return;
      }

      this.resize();

      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.clearColor(0.30, 0.47, 0.8, 1.0);
      
      const anim = () => {
        this.timer.response();
        this.render();
      
        window.requestAnimationFrame(anim);
      };

      anim();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.cam.setSize(this.canvas.width, this.canvas.height);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    async addShader(shdName) {
      let newShd;
      for (let shd of this.shds) 
        if (shd.name == shdName) {
          newShd = shd;
          break;
        }
      if (newShd == undefined) {
        newShd = shader(shdName, this);
        await newShd.load();
        this.shds.push(newShd);
      }
      return newShd;
    }

    addUnit(unit) {
      this.units.push(unit);
    }

    // Drawing frame function
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
      
      // Asking units
      if (this.units != undefined)
        for (let unit of this.units)
          unit.response();
      
      // Drawing units
      if (this.units != undefined)
        for (let unit of this.units)
          unit.draw();

      // Deleting anactive units
      if (this.units != undefined)
        for (let ind in this.units)
          if (this.units[ind].active != undefined && this.units[ind].active == false) {
            this.units.splice(ind, 1);
          }

      // (!!!) Deleting anactive BB
      if (this.AABB != undefined)
        for (let ind in this.AABB)
          if (this.AABB[ind].active != undefined && this.AABB[ind].active == false) {
            this.AABB.splice(ind, 1);
          }
    } // End of 'render' function 
  }  

  // Renderer creation function
  function renderer(...args) {
    return new _renderer(...args);
  } // End of 'renderer' function

  class _buffer {
    constructor(rnd, type, size) {
      this.type = type;    // Buffer type (gl.***_BUFFER)
      this.size = size;    // Buffer size in bytes
      this.rnd = rnd;
      this.id = null;
      if (size == 0 || type == undefined)
        return;
      this.id = rnd.gl.createBuffer();
      rnd.gl.bindBuffer(type, this.id);
      rnd.gl.bufferData(type, size, rnd.gl.STATIC_DRAW);
    }
    update(offset, data) {
      this.rnd.gl.bindBuffer(this.type, this.id);
      this.rnd.gl.bufferSubData(this.type, offset, data);
    }
  }
   
   
  class _ubo_buffer extends _buffer {
    constructor(rnd, name, size, bindPoint) {
      super(rnd, rnd.gl.UNIFORM_BUFFER, size);
      this.name = name;
      this.bindPoint = bindPoint; // Buffer GPU binding point
    }
    apply (shd) {
      if (shd == undefined || shd.id == undefined || shd.uniformBlocks[this.name] == undefined)
        return;
      this.rnd.gl.uniformBlockBinding(shd.id, shd.uniformBlocks[this.name].index, this.bindPoint);
      this.rnd.gl.bindBufferBase(this.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
    }                        
  }
  function ubo_buffer(...args) {
    return new _ubo_buffer(...args);
  } // End of 'ubo_buffer' function
   // End of 'ubo_buffer' function

  const MatLib = [];
  MatLib.push({"name": "Black Plastic",   "Ka": vec3(0.0, 0.0, 0.0),             "Kd": vec3(0.01, 0.01, 0.01),           "Ks": vec3(0.5, 0.5, 0.5),              "Ph": 32});
  MatLib.push({"name": "Brass",           "Ka": vec3(0.329412,0.223529,0.027451), "Kd": vec3(0.780392,0.568627,0.113725), "Ks": vec3(0.992157,0.941176,0.807843), "Ph": 27.8974});
  MatLib.push({"name": "Bronze",          "Ka": vec3(0.2125,0.1275,0.054),       "Kd": vec3(0.714,0.4284,0.18144),       "Ks": vec3(0.393548,0.271906,0.166721),  "Ph": 25.6});
  MatLib.push({"name": "Chrome",          "Ka": vec3(0.25, 0.25, 0.25),          "Kd": vec3(0.4, 0.4, 0.4),              "Ks": vec3(0.774597, 0.774597, 0.774597), "Ph": 76.8});
  MatLib.push({"name": "Copper",          "Ka": vec3(0.19125,0.0735,0.0225),     "Kd": vec3(0.7038,0.27048,0.0828),      "Ks": vec3(0.256777,0.137622,0.086014),  "Ph": 12.8});
  MatLib.push({"name": "Gold",            "Ka": vec3(0.24725,0.1995,0.0745),     "Kd": vec3(0.75164,0.60648,0.22648),    "Ks": vec3(0.628281,0.555802,0.366065),  "Ph": 51.2});
  MatLib.push({"name": "Peweter",         "Ka": vec3(0.10588,0.058824,0.113725), "Kd": vec3(0.427451,0.470588,0.541176), "Ks": vec3(0.3333,0.3333,0.521569),      "Ph": 9.84615});
  MatLib.push({"name": "Silver",          "Ka": vec3(0.19225,0.19225,0.19225),   "Kd": vec3(0.50754,0.50754,0.50754),    "Ks": vec3(0.508273,0.508273,0.508273),  "Ph": 51.2});
  MatLib.push({"name": "Polished Silver", "Ka": vec3(0.23125,0.23125,0.23125), "Kd": vec3(0.2775,0.2775,0.2775),       "Ks": vec3(0.773911,0.773911,0.773911),  "Ph": 89.6});
  MatLib.push({"name": "Turquoise",       "Ka": vec3(0.1, 0.18725, 0.1745),      "Kd": vec3(0.396, 0.74151, 0.69102),    "Ks": vec3(0.297254, 0.30829, 0.306678), "Ph": 12.8});
  MatLib.push({"name": "Ruby",            "Ka": vec3(0.1745, 0.01175, 0.01175),  "Kd": vec3(0.61424, 0.04136, 0.04136),  "Ks": vec3(0.727811, 0.626959, 0.626959), "Ph": 76.8});
  MatLib.push({"name": "Polished Gold",   "Ka": vec3(0.24725, 0.2245, 0.0645),   "Kd": vec3(0.34615, 0.3143, 0.0903),    "Ks": vec3(0.797357, 0.723991, 0.208006), "Ph": 83.2});
  MatLib.push({"name": "Polished Bronze", "Ka": vec3(0.25, 0.148, 0.06475),    "Kd": vec3(0.4, 0.2368, 0.1036),        "Ks": vec3(0.774597, 0.458561, 0.200621), "Ph": 76.8});
  MatLib.push({"name": "Polished Copper", "Ka": vec3(0.2295, 0.08825, 0.0275), "Kd": vec3(0.5508, 0.2118, 0.066),      "Ks": vec3(0.580594, 0.223257, 0.0695701), "Ph": 51.2});
  MatLib.push({"name": "Jade",            "Ka": vec3(0.135, 0.2225, 0.1575),     "Kd": vec3(0.135, 0.2225, 0.1575),      "Ks": vec3(0.316228, 0.316228, 0.316228), "Ph": 12.8});
  MatLib.push({"name": "Obsidian",        "Ka": vec3(0.05375, 0.05, 0.06625),    "Kd": vec3(0.18275, 0.17, 0.22525),     "Ks": vec3(0.332741, 0.328634, 0.346435), "Ph": 38.4});
  MatLib.push({"name": "Pearl",           "Ka": vec3(0.25, 0.20725, 0.20725),    "Kd": vec3(1.0, 0.829, 0.829),          "Ks": vec3(0.296648, 0.296648, 0.296648), "Ph": 11.264});
  MatLib.push({"name": "Emerald",         "Ka": vec3(0.0215, 0.1745, 0.0215),    "Kd": vec3(0.07568, 0.61424, 0.07568),  "Ks": vec3(0.633, 0.727811, 0.633),       "Ph": 76.8});
  MatLib.push({"name": "Black Rubber",    "Ka": vec3(0.02, 0.02, 0.02),          "Kd": vec3(0.01, 0.01, 0.01),           "Ks": vec3(0.4, 0.4, 0.4),                "Ph": 10.0});

  // Material class
  class _mtl {
    tex = [];
    texCon = [-1, -1, -1, -1, -1, -1, -1, -1];
    constructor(shd, name, ka, kd, ks, ph, trans ) {
      this.rnd = shd.rnd;
      this.name = name;
      this.shd = shd;

      this.ka = ka;
      this.kd = kd;
      this.ks = ks;
      this.ph = ph;
      this.trans = trans;
     
      this.ubo = ubo_buffer(this.rnd, "Material", this.shd.uniformBlocks["Material"].size, 1);
      this.ubo.update(0, new Float32Array([ka.x, ka.y, ka.z, 0, kd.x, kd.y, kd.z, trans, ks.x, ks.y, ks.z, ph]));
    }

    apply() {
      this.shd.apply();
      this.ubo.apply(this.shd);

      for (let i = 0; i < this.tex.length; i++) {
        if (this.tex[i])
          if (this.shd.uniforms[`Tex${i}`]) {
            this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + i);
            this.rnd.gl.bindTexture(this.tex[i].type, this.tex[i].id);
            this.rnd.gl.uniform1i(this.shd.uniforms[`Tex${i}`].loc, i);
          }
      }
    }

    attachTex(tex) {
      if (tex.length >= 8)
        return;
      this.tex[this.tex.length - 1] = tex;
      this.texCon[this.tex.length - 1] = 1;
      this.ubo.update(16 * 3, new Uint32Array(this.texCon));
    }
  }

  // Material creation function
  function mtl(...args) {
    return new _mtl(...args);
  } // End of 'mtl' function

  // Get material by name from library
  function getMtl(shd, name) {
    for (let mat of MatLib)
      if (name == mat.name)
        return mtl(shd, name, mat.Ka, mat.Kd, mat.Ks, mat.Ph, 1);
    return mtl(shd, name, MatLib[1].Ka, MatLib[1].Kd, MatLib[1].Ks, MatLib[1].Ph, 1);
  } // End 'getMtl' function

  // Vertex base class
  class _vertex {
    point = vec3();
    normal = vec3();
    texCoord = vec2();

    constructor(x, y, z) {
      if (typeof x == 'object')
        this.point = vec3(x);
      else
        this.point = vec3(x, y, z);
    }

    setTex(x, y) {
      if (typeof x == 'object')
        this.texCoord = vec2(x);
      else
        this.texCoord = vec2(x, y);
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
        this.vertexes.push(vect.texCoord.x);
        this.vertexes.push(vect.texCoord.y);
      }

      this.indexes = indexes;
      
      this.minBB = vec3(vertexes[0].point);
      this.maxBB = vec3(vertexes[0].point);
      
      for (let vert of vertexes) {
        if (vert.point.x > this.maxBB.x)
          this.maxBB.x = vert.point.x;
        if (vert.point.y > this.maxBB.y)
          this.maxBB.y = vert.point.y;
        if (vert.point.z > this.maxBB.z)
          this.maxBB.z = vert.point.z;

        if (vert.point.x < this.minBB.x)
          this.minBB.x = vert.point.x;
        if (vert.point.y < this.minBB.y)
          this.minBB.y = vert.point.y;
        if (vert.point.z < this.minBB.z)
          this.minBB.z = vert.point.z;
      }
    }
  }

  // Bound Box class
  class _box {
    curVertexes = [];

    constructor(minBB, maxBB) {
      this.active = true; /// (!!!)
      this.minBB = vec3();
      this.maxBB = vec3();

      const vertexes = [
          // Up
          vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, minBB.z), 
          // Down
          vec3(minBB.x, maxBB.y, minBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB), vec3(maxBB.x, maxBB.y, minBB.z)
      ];

      const ind = [0, 1, 2, 2, 0, 3, 
                   4, 5, 6, 6, 4, 7,

                   0, 1, 5, 0, 5, 4,
                   0, 4, 3, 4, 3, 7,
                   3, 2, 7, 2, 7, 6,
                   1, 2, 6, 1, 6, 5
      ];

      this.vertexes = [];

      for (let i of ind) {
        let vert = vertex(vertexes[i]);
        this.vertexes.push(vert);
      }
      
    }

    updateBB() {
      this.minBB = vec3(this.curVertexes[0].point);
      this.maxBB = vec3(this.curVertexes[0].point);
      for (let vert of this.curVertexes) {
        if (vert.point.x > this.maxBB.x)
          this.maxBB.x = vert.point.x;
        if (vert.point.y > this.maxBB.y)
          this.maxBB.y = vert.point.y;
        if (vert.point.z > this.maxBB.z)
          this.maxBB.z = vert.point.z;

        if (vert.point.x < this.minBB.x)
          this.minBB.x = vert.point.x;
        if (vert.point.y < this.minBB.y)
          this.minBB.y = vert.point.y;
        if (vert.point.z < this.minBB.z)
          this.minBB.z = vert.point.z;
      }
    }

    mulMatr(m) {
      for (let i = 0; i < this.vertexes.length; i++)
        this.curVertexes[i] = vertex(this.vertexes[i].point.mulMatr(m));
      this.updateBB();
    }

     /// (!!!) Closing BB to use function
     close() {
      this.active = false;
    } // End of 'close' function
  }

  // Bound Box creation function
  function box(...args) {
    return new _box(...args);
  } // End of 'primData' function

  // Primitive class
  class _prim {
    vertArray;
    vertBuffer;

    indBuffer;
    numOfElem;

    world = mat4();

    constructor(mtl, data, isBB=true) {
      this.rnd = mtl.shd.rnd;
      this.mtl = mtl;
      this.shd = mtl.shd;
      this.type = this.rnd.gl.TRIANGLES;
      if (isBB) { 
        this.BB = box(data.minBB, data.maxBB);
        this.rnd.AABB.push(this.BB);
      }

      this.matrix = data.matrix;

      this.ubo = ubo_buffer(this.rnd, "Prim", this.shd.uniformBlocks['Prim'].size, 0);

      this.numOfElem = data.vertexes.length;
      
      const posLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InPosition");
      const normLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InNormal");
      const texLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InTexCoord");
      this.vertArray = this.rnd.gl.createVertexArray();
      this.rnd.gl.bindVertexArray(this.vertArray);
      this.vertBuffer = this.rnd.gl.createBuffer();
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(data.vertexes), this.rnd.gl.STATIC_DRAW);
      
      if (posLoc != -1) {
        this.rnd.gl.vertexAttribPointer(posLoc, 3, this.rnd.gl.FLOAT, false, 32, 0);
        this.rnd.gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        this.rnd.gl.vertexAttribPointer(normLoc, 3, this.rnd.gl.FLOAT, false, 32, 12);
        this.rnd.gl.enableVertexAttribArray(normLoc);
      }
      if (texLoc != -1) {
        this.rnd.gl.vertexAttribPointer(texLoc, 2, this.rnd.gl.FLOAT, false, 32, 24);
        this.rnd.gl.enableVertexAttribArray(texLoc);
      }

      if (data.indexes != undefined) {
        this.numOfElem = data.indexes.length;
        
        this.indBuffer = this.rnd.gl.createBuffer();
        this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data.indexes), this.rnd.gl.STATIC_DRAW);  
      }
    }

    // Drawing primitive function
    draw(world) {
      this.mtl.apply();
      
      if (world == undefined)
        world = mat4();
      world = this.matrix.mul(world);
      
      if (this.BB)
        this.BB.mulMatr(world);

      let wvp = world.mul(this.rnd.cam.matrVP);
      let winv = world.inverse().transpose();
      
      if (this.shd.uniformBlocks["Prim"] != undefined) {
        this.ubo.update(0, new Float32Array(wvp.toArray().concat(winv.toArray(), world.toArray())));
        this.ubo.apply(this.shd);
      }
      
      if (this.shd.uniforms['Time'])
        this.rnd.gl.uniform1f(this.shd.uniforms['Time'].loc, this.rnd.timer.localTime);
      if (this.shd.uniforms['CamLoc'])
        this.rnd.gl.uniform3f(this.shd.uniforms['CamLoc'].loc, this.rnd.cam.loc.x, this.rnd.cam.loc.y, this.rnd.cam.loc.z);

      this.rnd.gl.bindVertexArray(this.vertArray);
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
      if (this.shd.id != null) {
        if (this.indBuffer == undefined)
          this.rnd.gl.drawArrays(this.type, 0, this.numOfElem);
        else {
          this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
          this.rnd.gl.drawElements(this.type, this.numOfElem, this.rnd.gl.UNSIGNED_INT, 0);
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

  // Image class
  class _image {
    constructor(name, href) {
      this.name = name;
      this.img = new Image();
      this.img.src = href;
    }
  }

  // Image creation function
  function image(...args) {
    return new _image(...args);
  }

  // Texture class
  class _texture {
    constructor(rnd, nameURL, textureType = "2d") {
      this.name = nameURL.name;
      this.type = rnd.gl.TEXTURE_2D;
      this.id = rnd.gl.createTexture();
      rnd.gl.bindTexture(this.type, this.id);
      if (nameURL.img) {
        rnd.gl.texImage2D(this.type, 0, rnd.gl.RGBA, 1, 1, 0, rnd.gl.RGBA,
                      rnd.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
        nameURL.img.onload = () => {
          rnd.gl.bindTexture(this.type, this.id);
          rnd.gl.pixelStorei(rnd.gl.UNPACK_FLIP_Y_WEBGL, true);
          rnd.gl.texImage2D(this.type, 0, rnd.gl.RGBA, rnd.gl.RGBA, rnd.gl.UNSIGNED_BYTE,
                        nameURL.img);
          rnd.gl.generateMipmap(this.type);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_WRAP_S, rnd.gl.REPEAT);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_WRAP_T, rnd.gl.REPEAT);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_MIN_FILTER,
                                      rnd.gl.LINEAR_MIPMAP_LINEAR);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_MAG_FILTER, rnd.gl.LINEAR);
        };
      }
    }
  }

  // Texture creation function
  function texture(...args) {
    return new _texture(...args);
  } // End of 'texture' function

  function setSphere(sizePhi, sizeTheta) {
    const vertexes = [];
    const PI = Math.PI;
    const stepPhi = 2 * PI / sizePhi;
    const stepTheta = PI / sizeTheta;

    const phiStepSin = Math.sin(stepPhi);
    const phiStepCos = Math.cos(stepPhi);
    const thetaStepSin = Math.sin(stepTheta);
    const thetaStepCos = Math.cos(stepTheta);

    for (let theta = 0; theta < 2 * PI; theta += stepTheta)
      for (let phi = -PI / 2; phi < PI / 2; phi += stepPhi) {
        let phiSin = Math.sin(phi);
        let phiCos = Math.cos(phi);
        let thetaSin = Math.sin(theta);
        let thetaCos = Math.cos(theta);

        let thetaWithStepSin = thetaSin * thetaStepCos + thetaCos * thetaStepSin;
        let phiWithStepSin = phiSin * phiStepCos + phiCos * phiStepSin;
        let thetaWithStepCos = thetaCos * thetaStepCos - thetaSin * thetaStepSin;
        let phiWithStepCos = phiCos * phiStepCos - phiSin * phiStepSin;

        vertexes.push(vertex(phiCos * thetaCos, phiSin, phiCos * thetaSin));
        vertexes.push(vertex(phiWithStepCos * thetaCos, phiWithStepSin, phiWithStepCos * thetaSin));
        vertexes.push(vertex(phiCos * thetaWithStepCos, phiSin, phiCos * thetaWithStepSin));
        
        vertexes.push(vertex(phiWithStepCos * thetaWithStepCos, phiWithStepSin, phiWithStepCos * thetaWithStepSin));
        vertexes.push(vertex(phiWithStepCos * thetaCos, phiWithStepSin, phiWithStepCos * thetaSin));
        vertexes.push(vertex(phiCos * thetaWithStepCos, phiSin, phiCos * thetaWithStepSin));
      }
    
    return primData(vertexes);
  }

  function setLine(start, end) {
    const vertexes = [vertex(start), vertex(end), vertex(end.add(vec3(0.005))), 
                      vertex(start), vertex(end.add(vec3(0.005))), vertex(start.add(vec3(0.005)))];
    return primData(vertexes);
  }

  async function loadObj(fileName) {
    let vert = [];
    let file = await fetch(`bin/models/${fileName}`);
    let src = await file.text();
    let lines = src.split('\n');

    let vertexes = [];
    let indexes = [];
    for (let line of lines) {
        if (line[0] == 'v') {
            let toks = line.split(' ');
            let v = [];

            for (let i = 0; i < toks.length; i++) {
                if (toks[i] == "") {
                    toks.splice(i, 1);
                    i--;
                }
            }

            for (let i = 1; i < 4; i++)
                v.push(parseFloat(toks[i]));

            vert.push(vec3(v[0], v[1], v[2]));
            vertexes.push(vertex(vec3(v[0], v[1], v[2])));
        } else if (line[0] == 'f') {
            let toks = line.split(' ');

            for (let t = 1; t < 4; t++) {
                //vertex(vert[parseInt(toks[t].split('/')[0]) - 1]);
                indexes.push(parseInt(toks[t].split('/')[0]) - 1);
            }
        }
    }

    return primData(vertexes, indexes);
  }

  // Test unit class
  class _playerUnit {
    constructor(rnd, color) {
      this.rnd = rnd;
      this.controlable = false;
      this.pos = vec3();
      this.color = color;
      this.speed = 0.1;
      this.velocity = vec3();
      this.jumpSpeed = 0;
      this.headX = 0;
      this.headY = 0;
      this.hp = 3;
      this.init();

      this.rnd.cam.setCam(vec3(0, 8, 8), vec3(0), vec3(0, 1, 0));
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.727811, 0.626959, 0.626959), 76.8, 1.0);
      this.prim = prim(material, setSphere(500, 500));
      this.prim.matrix = this.prim.matrix.mul(mat4().setScale(0.1));

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw(mat4().setTrans(this.pos));
    } // End of 'draw' function

    // Responsing function
    response() {
      // Movement
      if (this.rnd.input.keysClick["Enter"]) {
        this.rnd.canvas.requestPointerLock();
        this.controlable = true;
      }
      // (!!!)
      if (this.rnd.input.keysClick["Escape"])
        this.controlable = false;

      if (this.controlable == false)
        return;

      let dir = this.rnd.cam.dir;
      dir.y = 0;

      if (this.pos.y == 0) {
        this.velocity = vec3();
        if (this.rnd.input.keys["KeyD"])
          this.velocity = this.velocity.add(vec3(-dir.z, 0, dir.x));
        if (this.rnd.input.keys["KeyA"])
          this.velocity = this.velocity.add(vec3(dir.z, 0, -dir.x));
        if (this.rnd.input.keys["KeyW"])
          this.velocity = this.velocity.add(dir);
        if (this.rnd.input.keys["KeyS"])
          this.velocity = this.velocity.add(dir.neg());
      }
        
      this.pos = this.pos.add(this.velocity.norm().mul(this.speed));

      if (this.jumpSpeed > -1)
        this.jumpSpeed -= 0.005;
      
      if (this.rnd.input.keysClick["Space"] && this.pos.y == 0)
        this.jumpSpeed = 0.1;

      this.pos.y += this.jumpSpeed;

      if (this.pos.y < 0)
        this.pos.y = 0;
      
      this.headX = (window.innerWidth - this.rnd.input.mX) / 1000;
      this.headY = (window.innerHeight - this.rnd.input.mY) / 1000;

      if (this.headY >= 1.5)
        this.headY = 1.5;
      if (this.headY <= -1.5)
        this.headY = -1.5;

      dir = vec3(Math.sin(this.headX) * Math.cos(this.headY), Math.sin(this.headY), Math.cos(this.headX) * Math.cos(this.headY)).mul(3);
      this.rnd.cam.setCam(this.pos.add(vec3(0, 1, 0)), this.pos.add(dir), vec3(0, 1, 0));
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function playerUnit(...args) {
    return new _playerUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _plateUnit {
    constructor(rnd, size, height) {
      this.rnd = rnd;
      this.size = size;
      this.height = height;
      this.init();
    }

    // Unit initialization function
    async init() {
      const vert = [vertex(-this.size, this.height, -this.size), 
                    vertex(this.size, this.height, -this.size), 
                    vertex(-this.size, this.height, this.size),
                    vertex(this.size, this.height, -this.size), 
                    vertex(-this.size, this.height, this.size),
                    vertex(this.size, this.height, this.size)
      ];
      vert[0].setTex(0, 0);
      vert[1].setTex(0, 1);
      vert[2].setTex(1, 0);
      vert[3].setTex(0, 1);
      vert[4].setTex(1, 0);
      vert[5].setTex(1, 1);

      const texImg = image("plate", "bin/img/floor.jpg");
      const tex = texture(this.rnd, texImg);

      const data = primData(vert);

      const shd = await this.rnd.addShader("phong");
      const mtl = getMtl(shd, "Gold");
      mtl.attachTex(tex);
      this.prim = prim(mtl, data);

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw();
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function
    
    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function plateUnit(...args) {
    return new _plateUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _crossUnit {
    constructor(rnd) {
      this.rnd = rnd;
      
      this.init();
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      
      this.cross = prim(getMtl(shd, "Silver"), setSphere(100, 100), false);
      this.cross.matrix = mat4().setScale(0.001);

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.cross.draw(mat4().setTrans(this.rnd.cam.loc.add(this.rnd.cam.dir.mul(0.5))));
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function crossUnit(...args) {
    return new _crossUnit(...args);
  } // End of 'crossUnit' function

  // Ray class
  class _ray {
    constructor(origin, direction) {
      this.origin = vec3(origin);
      this.dir = vec3(direction).norm();
    }

    // Get intersection with AABB using 'SlabMethod'
    getIntersection(minBB, maxBB) {
      let tLow = [(minBB.x - this.origin.x) / this.dir.x, 
                  (minBB.y - this.origin.y) / this.dir.y, 
                  (minBB.z - this.origin.z) / this.dir.z
      ];
      let tHeight = [
        (maxBB.x - this.origin.x) / this.dir.x, 
        (maxBB.y - this.origin.y) / this.dir.y, 
        (maxBB.z - this.origin.z) / this.dir.z
      ];
      let tClose = [], tFar = [];
      for (let i = 0; i < 3; i++) {
        if (tHeight[i] > tLow[i]) {
          tClose.push(tLow[i]);
          tFar.push(tHeight[i]);
        } else {
          tFar.push(tLow[i]);
          tClose.push(tHeight[i]);
        }
      }
      tClose = getArrayMax(tClose);
      tFar = getArrayMin(tFar);
      return [tClose, tFar];
    } // End of 'getIntersection' function

    // Get point on by parameter 
    getPoint(t) {
      return this.origin.add(this.dir.mul(t));
    } // End of 'getPoint' function
  }

  function getArrayMin(arr) {
    let min = arr[0];
    for (let elem of arr)
      if (elem < min)
        min = elem;
    return min;
  }

  function getArrayMax(arr) {
    let max = arr[0];
    for (let elem of arr)
      if (elem > max)
        max = elem;
    return max;
  }

  // Ray creation function
  function ray(...args) {
    return new _ray(...args);
  } // End of 'ray' function

  // Test unit class
  class _shootingUnit {
    constructor(rnd, color) {
      this.rnd = rnd;
      this.color = color;
      this.shootng = false;
      
      this.init();

      this.rnd.canvas.addEventListener("mousedown", (event) => {
        this.shootng = true;
        event.preventDefault();
      });
    }

    // Unit initialization function
    async init() {
      this.hits = [];
      this.shd = await this.rnd.addShader("bullets");
      
      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      for (let hit of this.hits)
        if (hit)
          hit.draw();
    } // End of 'draw' function

    // Responsing function
    response() {
      if (this.shootng) { 
        this.shootng = false;      
        let bulletRay = ray(this.rnd.cam.loc, this.rnd.cam.dir);
        let minT = Infinity;
        let hitName = "";

        for (let AABB of this.rnd.AABB) {
          let t = bulletRay.getIntersection(AABB.minBB, AABB.maxBB);
          if (t[0] <= t[1] && t[0] >= 0) {
            if (t[0] < minT) {
              minT = t[0];
              if (AABB.enemy)
                hitName = AABB.enemy.name;
            }
          }
        }
        this.addHit(this.rnd.cam.loc.sub(vec3(0, 1, 0)), bulletRay.getPoint(minT), this.color);
        if (socket)
          socket.send(JSON.stringify({type: "shoot", start: this.rnd.cam.loc, end: bulletRay.getPoint(minT), hit: hitName, color: this.color}));
      }
      
      for (let ind in this.hits)
        if (this.hits[ind].active == false) {
          this.hits.splice(ind, 1);
        }
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function

    // Adding enemy hit to array
    addHit(start, end, color) {
      const material = mtl(this.shd, "bullet", color.mul(0.7), color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
      let hit = prim(material, setLine(start, end), false);
      hit.active = true;
      setTimeout(() => {
        hit.active = false;
      }, 100);
      this.hits.push(hit);
    } // End of 'addHit' function
  }

  // Unit creation function
  function shootingUnit(...args) {
    return new _shootingUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _enemyUnit {
    constructor(rnd, name, pos, color) {
      this.rnd = rnd;
      this.pos = pos;
      this.dir = vec3(1, 0, 0);
      this.name = name;
      this.color = color;
      this.active = true;
      
      this.init();
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
      const model = await loadObj("cow.obj");
      this.prim = prim(material, model);
      this.prim.matrix = mat4().setScale(0.1).mul(mat4().setRotateZ(90)).mul(mat4().setRotateY(180));
      this.prim.BB.enemy = this;
    
      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      let rot = mat4().setRotateY(Math.atan2(this.dir.z, this.dir.x) * 180 / Math.PI);
      let tr = mat4().setTrans(this.pos);
      this.prim.draw(rot.mul(tr));
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
      this.prim.BB.close();
    } // End of 'close' function

    // Getting (!!!) enemy position from server function
    getPos(pos) {
      this.pos = vec3(pos);
    } // End of 'getPos' function

    // Getting (!!!) enemy view direction from server function
    getDir(dir) {
      this.dir = vec3(dir);
    } // End of 'getPos' function

  }

  // Unit creation function
  function enemyUnit(...args) {
    return new _enemyUnit(...args);
  } // End of 'enemyUnit' function

  let playerName, playerColor, players = {}, me;

  // Main project function
  function main() {
    const rnd = renderer("#glCanvas");

    me = playerUnit(rnd, playerColor);
    plateUnit(rnd, 30, 0);
    let shoot = shootingUnit(rnd, playerColor);
    crossUnit(rnd);
    //unit.testUnit(rnd);

    let socket = new WebSocket("ws:/localhost:3030");
    let chatWindow = document.querySelector("#playersWindow");
    {
      let newPlayer = document.createElement('div');
      newPlayer.id = playerName;
      newPlayer.innerText = playerName;
      chatWindow.appendChild(newPlayer);
    }

    if (window.socket == undefined)
      window.socket = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({type: "connect", text: playerName, color: playerColor}));
    };

    socket.onmessage = (event) => {
      let info = JSON.parse(event.data);
      if (info.type == "nameError") {
        alert(info.data);
        window.location.href = "/index.html";
      }
      if (info.type == "newPlayer") {
        players[info.data.name] = enemyUnit(rnd, info.data.name, vec3(info.data.pos), vec3(info.data.color));
        if (info.data.name) {
          let newPlayer = document.createElement('div');
          newPlayer.id = info.data.name;
          newPlayer.innerText = info.data.name;
          chatWindow.appendChild(newPlayer);
        }
      }
      if (info.type == "start") {
        for (let character in info.data)  
          if (character != playerName) {
            players[character] = enemyUnit(rnd, character, vec3(info.data[character].pos), vec3(info.data[character].color));
            let newPlayer = document.createElement('div');
            newPlayer.id = character;
            newPlayer.innerText = character;
            chatWindow.appendChild(newPlayer);
          }
      }
      if (info.type == "setPos")
        for (let character in info.data)
          if (character != playerName)
            if (players[character]) {
              players[character].getPos(info.data[character].pos);
              players[character].getDir(info.data[character].dir);
            }
      if (info.type == "playerClose") {
        players[info.data].close();
        delete players[info.data];
        let toDel =  document.getElementById(info.data);
        toDel.remove();
      }
      if (info.type == "shoot") {
        shoot.addHit(vec3(info.data.start), vec3(info.data.end), vec3(info.data.color));
        if (info.data.hit == playerName) {
          me.hp--;
          document.querySelector("#healthPoints").textContent = `HP: ${me.hp}`;
          document.querySelector("#damage").className = "isDamaged";
          setTimeout(() => {
            document.querySelector("#damage").className = "nonDamaged";
          }, 100);
          if (me.hp <= 0) 
            window.location.href = "/index.html";
        }
      }
    };

    setInterval(() => {
      socket.send(JSON.stringify({type: "myPos", name: playerName, pos: me.pos, dir: rnd.cam.dir}));
    }, 10);

    setInterval(() => {
      document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
    }, 1000);
  } // End of 'main' function


  window.addEventListener("load", () => {
    playerName = sessionStorage.getItem("name");
    playerColor = vec3(parseInt(sessionStorage.getItem("color").slice(1, 3), 16) / 255, 
                       parseInt(sessionStorage.getItem("color").slice(3, 5), 16) / 255, 
                       parseInt(sessionStorage.getItem("color").slice(5, 7), 16) / 255);
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbXRoL210aF92ZWMzLmpzIiwiLi4vc3JjL210aC9tdGhfbWF0NC5qcyIsIi4uL3NyYy9tdGgvbXRoX2NhbS5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy90aW1lci5qcyIsIi4uL3NyYy9ybmQvaW5wdXQuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9ybmQvcmVzL2J1ZmZlci5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3ByaW0uanMiLCIuLi9zcmMvcm5kL3Jlcy90ZXh0dXJlLmpzIiwiLi4vc3JjL3JuZC9yZXMvdG9wb2xvZ3kuanMiLCIuLi9zcmMvdW5pdHMvcGxheWVyVW5pdC5qcyIsIi4uL3NyYy91bml0cy9wbGF0ZVVuaXQuanMiLCIuLi9zcmMvdW5pdHMvY3Jvc3NVbml0LmpzIiwiLi4vc3JjL210aC9tdGhfcmF5LmpzIiwiLi4vc3JjL3VuaXRzL3Nob290aW5nVW5pdC5qcyIsIi4uL3NyYy91bml0cy9lbmVteVVuaXQuanMiLCIuLi9lbmdpbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gM2QgdmVjdG9yIGNsYXNzXHJcbmNsYXNzIF92ZWMzIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMCwgdGhpcy56ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHgubGVuZ3RoID09IDMpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdLCB0aGlzLnogPSB4WzJdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgueCwgdGhpcy55ID0geC55LCB0aGlzLnogPSB4Lno7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh5ID09IHVuZGVmaW5lZCAmJiB6ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHgsIHRoaXMueiA9IHg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0geCwgdGhpcy55ID0geSwgdGhpcy56ID0gejtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBWZWN0b3JzIGFkZGl0aW9uIGZ1bmN0aW9uXHJcbiAgYWRkKHYpIHtcclxuICAgIGlmICh0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LCB0aGlzLnkgKyB2LCB0aGlzLnogKyB2KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopOyAgICBcclxuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIFZlY3RvcnMgZG90IHByb2R1Y3QgZnVuY3Rpb25cclxuICBkb3Qodikge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3JzIHN1YnN0cnVjdGlvbiBmdW5jdGlvblxyXG4gIHN1Yih2KSB7XHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdiwgdGhpcy55IC0gdiwgdGhpcy56IC0gdik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgdG8gbnVtYmVyIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uXHJcbiAgbXVsKG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciB0byBudW1iZXIgZGl2aXNpb24gZnVuY3Rpb25cclxuICBkaXYobikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC8gbiwgdGhpcy55IC8gbiwgdGhpcy56IC8gbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2RpdicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBuZWdhdGl2ZSB2ZWN0b3IgZnVuY3Rpb25cclxuICBuZWcoKSB7XHJcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcclxuICB9IC8vIEVuZCBvZiAnbmVnJyBmdW5jdGlvbiBcclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAxIHx8IGxlbiA9PSAwKSB7XHJcbiAgICAgIHJldHVybiBsZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGxlbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2xlbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggaW4gc3F1YXJlIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybSgpIHtcclxuICAgIGxldCBsZW4gPSB0aGlzLmRvdCh0aGlzKTtcclxuXHJcbiAgICBpZiAobGVuID09IDEgfHwgbGVuID09IDApXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KE1hdGguc3FydChsZW4pKTtcclxuICB9IC8vIEVuZCBvZiAnbm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9ycyBjcm9zcyBwcm9wdWN0IGZ1bmN0aW9uXHJcbiAgY3Jvc3Modikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7ICBcclxuICB9IC8vIEVuZCBvZiAnY3Jvc3MnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcidzIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXHJcbiAgdHJhbnNmb3JtKG0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG0ubVswXVswXSArIHRoaXMueSAqIG0ubVsxXVswXSArIHRoaXMueiAqIG0ubVsyXVswXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zZm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRvIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvbiBcclxuICBtdWxNYXRyKG0pIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogbS5tWzBdWzNdICsgdGhpcy55ICogbS5tWzFdWzNdICsgdGhpcy56ICogbS5tWzJdWzNdICsgbS5tWzNdWzNdO1xyXG5cclxuICAgIHJldHVybiB2ZWMzKCh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0pIC8gdyxcclxuICAgICAgICAgICAgICAgICAodGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgKHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSArIG0ubVszXVsyXSkgLyB3KTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTWF0cicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yJ3MgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25cclxuICBwb2ludFRyYW5zZm9ybShtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0gKyBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yICgzZCkgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxyXG5cclxuLy8gMmQgdmVjdG9yIGNsYXNzXHJcbmNsYXNzIF92ZWMyIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHgubGVuZ3RoID09IDIpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgueCwgdGhpcy55ID0geC55O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4LCB0aGlzLnkgPSB4O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFZlY3RvciAoMmQpIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZWMyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVjMicgZnVuY3Rpb24iLCIvLyA0eDQgbWF0cml4IGNsYXNzXHJcbmNsYXNzIF9tYXQ0IHtcclxuICBjb25zdHJ1Y3RvcihtID0gbnVsbCkge1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm0gPSBbWzEsIDAsIDAsIDBdLCBbMCwgMSwgMCwgMF0sIFswLCAwLCAxLCAwXSwgWzAsIDAsIDAsIDFdXTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG0gPT0gJ29iamVjdCcgJiYgbS5sZW5ndGggPT0gNCkge1xyXG4gICAgICB0aGlzLm0gPSBtOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubSA9IG0ubTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gTWFraW5nIGZyb20gbWF0cml4IHNvbGlkIGFycmF5IGZ1bmN0aW9uXHJcbiAgdG9BcnJheSgpIHtcclxuICAgIHJldHVybiBbXS5jb25jYXQoLi4udGhpcy5tKTtcclxuICB9IC8vIEVuZCBvZiAndG9BcnJheScgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggZGV0ZXJtaW5hbnQgZnVuY3Rpb25cclxuICBkZXQoKSB7XHJcbiAgICByZXR1cm4gKyB0aGlzLm1bMF1bMF0gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICAtIHRoaXMubVswXVsxXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgICsgdGhpcy5tWzBdWzJdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgLSB0aGlzLm1bMF1bM10gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdkZXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgdHJhbnNwb3NpdGlvbiBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRUcmFucyhkeCwgZHksIGR6KSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIGlmICh0eXBlb2YgZHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgbS5tWzNdWzBdID0gZHgueCwgbS5tWzNdWzFdID0gZHgueSwgbS5tWzNdWzJdID0gZHguejtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG0ubVszXVswXSA9IGR4LCBtLm1bM11bMV0gPSBkeSwgbS5tWzNdWzJdID0gZHo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRUcmFucycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0cml4ZXMgbXVsdGlwbGljYXRpb24gZnVuY3Rpb25cclxuICBtdWwobSkge1xyXG4gICAgbGV0IHIgPSBtYXQ0KCk7XHJcblxyXG4gICAgci5tWzBdWzBdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVswXVsxXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bMF1bMl0gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzBdWzNdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMV1bMF0gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzFdWzFdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsxXVsyXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bMV1bM10gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVsyXVswXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVswXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bMl1bMV0gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzJdWzJdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVsyXVszXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVszXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzNdWzBdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVszXVsxXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bM11bMl0gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzNdWzNdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgaW52ZXJzZWQgbWF0cml4IGZ1bmN0aW9uXHJcbiAgaW52ZXJzZSgpIHtcclxuICAgIGxldFxyXG4gICAgICByID0gbWF0NCgpLFxyXG4gICAgICBkZXQgPSB0aGlzLmRldCgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMClcclxuICAgICAgcmV0dXJuIHI7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIubVswXVswXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVswXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuICAgIHIubVswXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsxXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsxXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bMl0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMl0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMl0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMl0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzNdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzNdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzNdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzNdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ2ludmVyc2UnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgcm90YXRpb24gYnkgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRpb24odiwgYW5nbGUpIHtcclxuICAgIGNvbnN0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzID0gTWF0aC5zaW4ocmFkKSwgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIHIubSA9IFtcclxuICAgICAgW2MgKyB2LnggKiB2LnggKiAoMSAtIGMpLCB2LnkgKiB2LnggKiAoMSAtIGMpIC0gdi56ICogcywgdi56ICogdi54ICogKDEgLSBjKSArIHYueSAqIHMsIDBdLFxyXG4gICAgICBbdi54ICogdi55ICogKDEgLSBjKSArIHYueiAqIHMsIGMgKyB2LnkgKiB2LnkgKiAoMSAtIGMpLCB2LnogKiB2LnkgKiAoMSAtIGMpIC0gdi54ICogcywgMF0sXHJcbiAgICAgIFt2LnggKiB2LnogKiAoMSAtIGMpIC0gdi55ICogcywgdi55ICogdi56ICogKDEgLSBjKSArIHYueCAqIHMsIGMgKyB2LnogKiB2LnogKiAoMSAtIGMpLCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0aW9uJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIGxvb2stYXQgcG9pbnQgbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0Vmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtKCksXHJcbiAgICAgIHJpZ2h0ID0gZGlyLmNyb3NzKHVwMSkubm9ybSgpLFxyXG4gICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBtLm0gPVxyXG4gICAgICBbXHJcbiAgICAgICAgW3JpZ2h0LngsIHVwLngsIC1kaXIueCwgMF0sXHJcbiAgICAgICAgW3JpZ2h0LnksIHVwLnksIC1kaXIueSwgMF0sIFxyXG4gICAgICAgIFtyaWdodC56LCB1cC56LCAtZGlyLnosIDBdLFxyXG4gICAgICAgIFstbG9jLmRvdChyaWdodCksIC1sb2MuZG90KHVwKSwgbG9jLmRvdChkaXIpLCAxXVxyXG4gICAgICBdO1xyXG5cclxuICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0VmlldycgZnVuY3Rpb25cclxuICBcclxuICAvLyBHZXR0aW5nIGZydXN0cnVtIG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldEZydXN0cnVtICggbGVmdCwgIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyICkge1xyXG4gICAgbGV0IG0gPSBtYXQ0KClcclxuICAgIG0ubSA9IFtbKDIgKiBuZWFyKSAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICAgIFswLCAoMiAqIG5lYXIpIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksICgtKChmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSkpLCAoLTEpXSxcclxuICAgICAgICAgIFswLCAwLCAoLSgoMiAqIG5lYXIgKiBmYXIpIC8gKGZhciAtIG5lYXIpKSksIDBdXTtcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0RnJ1c3RydW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHJpeCB0cmFuc3Bvc2l0aW9uIGZ1bmN0aW9uXHJcbiAgdHJhbnNwb3NlKCkge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tID0gW1t0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bMV0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bM11bMV1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bMl0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bM11bMl1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM11dXTtcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc3Bvc2UnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeCBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWCAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tWzFdWzFdID0gY287XHJcbiAgICBtLm1bMV1bMl0gPSBzaTtcclxuICAgIG0ubVsyXVsxXSA9IC1zaTtcclxuICAgIG0ubVsyXVsyXSA9IGNvOyBcclxuICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVgnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IHJvdGF0aW9uIGJ5IHkgYXhpcyBmdW5jdGlvblxyXG4gIHNldFJvdGF0ZVkgKGFuZ2xlKSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHNpID0gTWF0aC5zaW4ocmFkKSwgY28gPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgXHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIFxyXG4gICAgbS5tWzBdWzBdID0gY287XHJcbiAgICBtLm1bMF1bMl0gPSAtc2k7XHJcbiAgICBtLm1bMl1bMF0gPSBzaTtcclxuICAgIG0ubVsyXVsyXSA9IGNvOyBcclxuICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVknIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IHJvdGF0aW9uIGJ5IHogYXhpcyBmdW5jdGlvblxyXG4gIHNldFJvdGF0ZVogKGFuZ2xlKSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHNpID0gTWF0aC5zaW4ocmFkKSwgY28gPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG5cclxuICAgIG0ubVswXVswXSA9IGNvO1xyXG4gICAgbS5tWzBdWzFdID0gc2k7XHJcbiAgICBtLm1bMV1bMF0gPSAtc2k7XHJcbiAgICBtLm1bMV1bMV0gPSBjbzsgXHJcbiAgICAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRSb3RhdGVaJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIEdldHRpbmcgc2NhbGUgbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0U2NhbGUodikge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBcclxuICAgIGlmICh0eXBlb2YgdiA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBtLm1bMF1bMF0gPSB2Lng7XHJcbiAgICAgIG0ubVsxXVsxXSA9IHYueTtcclxuICAgICAgbS5tWzJdWzJdID0gdi56O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbS5tWzBdWzBdID0gdjtcclxuICAgICAgbS5tWzFdWzFdID0gdjtcclxuICAgICAgbS5tWzJdWzJdID0gdjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2NhbGUnXHJcblxyXG4gIC8vIEdldHRpbmcgb3J0aG8gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0T3J0aG8gKCBsZWZ0LCAgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIG0ubSA9IFtbMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICAgICBbMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgICAgICBbMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDBdLFxyXG4gICAgICAgICAgIFstKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIDFdXTtcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0T3J0aG8nIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIEdldHRpbmcgM3gzIG1hdHJpeCBkZXRlcm1pbmFudCBmdW5jdGlvblxyXG5mdW5jdGlvbiBtYXRyRGV0M3gzKCBhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgICAgICAgICAgICAgICBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgICAgICAgICAgICAgICBhMzEsIGEzMiwgYTMzIClcclxue1xyXG4gIHJldHVybiBhMTEgKiBhMjIgKiBhMzMgKyBhMTIgKiBhMjMgKiBhMzEgKyBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICAgICBhMTEgKiBhMjMgKiBhMzIgLSBhMTIgKiBhMjEgKiBhMzMgLSBhMTMgKiBhMjIgKiBhMzE7XHJcbn0gLy8gRW5kIG9mICdtYXRyRGV0M3gzJyBmdW5jdGlvblxyXG5cclxuLy8gTWF0cml4IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnbWF0NCcgZnVuY3Rpb25cclxuIiwiaW1wb3J0IHsgbWF0NCB9IGZyb20gJy4vbXRoX21hdDQnO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSAnLi9tdGhfdmVjMyc7XHJcblxyXG4vLyBDYW1lcmEgY2xhc3NcclxuY2xhc3MgX2NhbWVyYSB7XHJcbiAgbG9jID0gdmVjMygpO1xyXG4gIGF0ID0gdmVjMygpO1xyXG4gIGRpciA9IHZlYzMoKTtcclxuICByaWdodCA9IHZlYzMoKTtcclxuICB1cCA9IHZlYzMoKTtcclxuICBtYXRyVmlldyA9IG1hdDQoKTsgXHJcbiAgbWF0clByb2ogPSBtYXQ0KCk7IFxyXG4gIG1hdHJWUCA9IG1hdDQoKTtcclxuICBmcmFtZVc7XHJcbiAgZnJhbWVIO1xyXG4gIHdwO1xyXG4gIGhwO1xyXG4gIHByb2pTaXplO1xyXG4gIHByb2pEaXN0O1xyXG4gIHByb2pGYXJDbGlwO1xyXG5cclxuICAvLyBTZXR0aW5nIGNhbWVyYSBmdW5jdGlvblxyXG4gIHNldENhbShsb2MsIGF0LCB1cCkge1xyXG4gICAgdGhpcy5tYXRyVmlldyA9IG1hdDQoKS5zZXRWaWV3KGxvYywgYXQsIHVwKTtcclxuXHJcbiAgICB0aGlzLnJpZ2h0ID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMF0pO1xyXG4gICAgdGhpcy51cCA9IHZlYzModGhpcy5tYXRyVmlldy5tWzBdWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzFdWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzJdWzFdKTtcclxuICAgIHRoaXMuZGlyID0gdmVjMygtdGhpcy5tYXRyVmlldy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3Lm1bMl1bMl0pO1xyXG4gICAgdGhpcy5sb2MgPSB2ZWMzKGxvYyk7XHJcbiAgICB0aGlzLmF0ID0gdmVjMyhhdCk7XHJcblxyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bCh0aGlzLm1hdHJQcm9qKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Q2FtJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXR0aW5nIGNhbWVyYSBmcmFtZSBzaXplIGZ1bmN0aW9uXHJcbiAgc2V0UHJvaihwcm9qU2l6ZSwgcHJvakRpc3QsIHByb2pGYXJDbGlwKSB7XHJcbiAgICBsZXQgcngsIHJ5O1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcclxuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcclxuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XHJcblxyXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcclxuICAgIGVsc2VcclxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcclxuXHJcbiAgICB0aGlzLndwID0gcng7XHJcbiAgICB0aGlzLmhwID0gcnk7XHJcbiAgICB0aGlzLm1hdHJQcm9qID1cclxuICAgICAgbWF0NCgpLnNldEZydXN0cnVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWwodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFByb2onIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldHRpbmcgcHJvamVjdGlvbiBkYXRhIGZ1bmN0aW9uXHJcbiAgc2V0U2l6ZShmcmFtZVcsIGZyYW1lSCkge1xyXG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XHJcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2l6ZScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gQ2FtZXJhIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmEoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2NhbWVyYSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2NhbWVyYScgZnVuY3Rpb24iLCIvLyBTaGFkZXIgY2xhc3NcclxuY2xhc3MgX3NoYWRlciB7XHJcbiAgYXN5bmMgbG9hZCgpIHtcclxuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcclxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGJpbi9zaGFkZXJzLyR7dGhpcy5uYW1lfS8ke3MubmFtZX0uZ2xzbGApO1xyXG4gICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICBpZiAodHlwZW9mIHNyYyA9PSBcInN0cmluZ1wiICYmIHNyYyAhPSBcIlwiKVxyXG4gICAgICAgIHMuc3JjID0gc3JjO1xyXG4gICAgfVxyXG4gICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICAgIHRoaXMudXBkYXRlU2hhZGVyc1NvdXJjZSgpO1xyXG4gIH1cclxuICAvLyBTaGFkZXIgdXBkYXRpb24gZnVuY3Rpb25cclxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkgeyBcclxuICAgIHRoaXMuc2hhZGVyc1swXS5pZCA9IG51bGw7XHJcbiAgICB0aGlzLnNoYWRlcnNbMV0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5zaGFkZXJzWzBdLnNyYyA9PSBcIlwiIHx8IHRoaXMuc2hhZGVyc1sxXS5zcmMgPT0gXCJcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7ICAgICAgICAgICAgIFxyXG4gICAgdGhpcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBpZiAocy5pZCAhPSBudWxsKVxyXG4gICAgICAgIHRoaXMucm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLmlkLCBzLmlkKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5ybmQuZ2wubGlua1Byb2dyYW0odGhpcy5pZCk7XHJcbiAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ3VwZGF0ZVNoYWRlcnNTb3VyY2UnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNoYWRlcidzIGRhdGEgdXBkYXRpb24gZnVuY3Rpb25cclxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcclxuICAgIHRoaXMuYXR0cnMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50QXR0cnMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMucm5kLmdsLkFDVElWRV9BVFRSSUJVVEVTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRBdHRyczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuaWQsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFNoYWRlciB1bmlmb3Jtc1xyXG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRVbmlmb3JtcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtKHRoaXMuaWQsIGkpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuIFxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXHJcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja05hbWUodGhpcy5pZCwgaSk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ybmQuZ2wuZ2V0VW5pZm9ybUJsb2NrSW5kZXgodGhpcy5pZCwgYmxvY2tfbmFtZSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICBzaXplOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcclxuICAgICAgICBiaW5kOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfQklORElORyksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSAvLyBFbmQgb2YgJ3VwZGF0ZVNoYWRlckRhdGEnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNoYWRlcidzIHByb2dyYW1tIGFwcGxpbmcgZnVuY3Rpb25cclxuICBhcHBseSgpIHtcclxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXHJcbiAgICAgIHRoaXMucm5kLmdsLnVzZVByb2dyYW0odGhpcy5pZCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2FwcGx5JyBmdW5jdGlvblxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lLCBybmQpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzID1cclxuICAgIFtcclxuICAgICAgIHtcclxuICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgIG5hbWU6IFwidmVydFwiLFxyXG4gICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICB9LFxyXG4gICAgICAge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICAvLyB0aGlzLnN0YXRpY0luaXQobmFtZSwgcm5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFNoYWRlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhZGVyKG5hbWUsIHJuZCkge1xyXG4gIHJldHVybiBuZXcgX3NoYWRlcihuYW1lLCBybmQpO1xyXG59IC8vIEVuZCBvZiAnc2hhZGVyJyBmdW5jdGlvblxyXG4iLCIvLyBUaW1lciBjbGFzcyBjb25zdHJ1Y3RvciBmdW5jdGlvblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICAvLyBUaW1lciBvYnRhaW4gY3VycmVudCB0aW1lIGluIHNlY29uZHMgbWV0aG9kXG4gIGNvbnN0IGdldFRpbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHQgPVxuICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXG4gICAgICBkYXRlLmdldFNlY29uZHMoKSArXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwO1xuICAgIHJldHVybiB0O1xuICB9O1xuIFxuICAvLyBUaW1lciByZXNwb25zZSBtZXRob2RcbiAgdGhpcy5yZXNwb25zZSA9ICh0YWdfaWQgPSBudWxsKSA9PiB7XG4gICAgbGV0IHQgPSBnZXRUaW1lKCk7XG4gICAgLy8gR2xvYmFsIHRpbWVcbiAgICB0aGlzLmdsb2JhbFRpbWUgPSB0O1xuICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcbiAgICAvLyBUaW1lIHdpdGggcGF1c2VcbiAgICBpZiAodGhpcy5pc1BhdXNlKSB7XG4gICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcbiAgICAgIHRoaXMucGF1c2VUaW1lICs9IHQgLSB0aGlzLm9sZFRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSB0aGlzLmdsb2JhbERlbHRhVGltZTtcbiAgICAgIHRoaXMubG9jYWxUaW1lID0gdCAtIHRoaXMucGF1c2VUaW1lIC0gdGhpcy5zdGFydFRpbWU7XG4gICAgfVxuICAgIC8vIEZQU1xuICAgIHRoaXMuZnJhbWVDb3VudGVyKys7XG4gICAgaWYgKHQgLSB0aGlzLm9sZFRpbWVGUFMgPiAzKSB7XG4gICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xuICAgICAgdGhpcy5vbGRUaW1lRlBTID0gdDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcbiAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnX2lkKS5pbm5lckhUTUwgPSB0aGlzLmdldEZQUygpO1xuICAgIH1cbiAgICB0aGlzLm9sZFRpbWUgPSB0O1xuICB9O1xuIFxuICAvLyBPYnRhaW4gRlBTIGFzIHN0cmluZyBtZXRob2RcbiAgdGhpcy5nZXRGUFMgPSAoKSA9PiB0aGlzLkZQUy50b0ZpeGVkKDMpO1xuIFxuICAvLyBGaWxsIHRpbWVyIGdsb2JhbCBkYXRhXG4gIHRoaXMuZ2xvYmFsVGltZSA9IHRoaXMubG9jYWxUaW1lID0gZ2V0VGltZSgpO1xuICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xuIFxuICAvLyBGaWxsIHRpbWVyIHNlbWkgZ2xvYmFsIGRhdGFcbiAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm9sZFRpbWUgPSB0aGlzLm9sZFRpbWVGUFMgPSB0aGlzLmdsb2JhbFRpbWU7XG4gIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcbiAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XG4gIHRoaXMuRlBTID0gMzAuMDtcbiAgdGhpcy5wYXVzZVRpbWUgPSAwO1xuIFxuICByZXR1cm4gdGhpcztcbn0gLy8gRW5kIG9mICdUaW1lcicgZnVuY3Rpb24iLCJmdW5jdGlvbiBkaXN0YW5jZShwMSwgcDIpIHtcclxuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHAxLmNsaWVudFggLSBwMi5jbGllbnRYLCAyKSArIE1hdGgucG93KHAxLmNsaWVudFkgLSBwMi5jbGllbnRZLCAyKSk7XHJcbn1cclxuIFxyXG5jbGFzcyBfaW5wdXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCkge1xyXG4gICAgLy9nbC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5vbkNsaWNrKGUpKTtcclxuICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHRoaXMub25Nb3VzZU1vdmUoZSkpO1xyXG4gICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKGUpID0+IHRoaXMub25Nb3VzZVdoZWVsKGUpKTtcclxuICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHRoaXMub25Nb3VzZURvd24oZSkpO1xyXG4gICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHRoaXMub25Nb3VzZVVwKGUpKTtcclxuICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHRoaXMub25Ub3VjaFN0YXJ0KGUpKTtcclxuICAgICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4gdGhpcy5vblRvdWNoTW92ZShlKSk7XHJcbiAgICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4gdGhpcy5vblRvdWNoRW5kKGUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gdGhpcy5vbktleURvd24oZSkpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHRoaXMub25LZXlVcChlKSk7XHJcbiAgICBcclxuICAgIHRoaXMubVggPSAwO1xyXG4gICAgdGhpcy5tWSA9IDA7XHJcbiAgICB0aGlzLm1aID0gMDtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuICAgIHRoaXMubUJ1dHRvbnMgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICB0aGlzLm1CdXR0b25zT2xkID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgdGhpcy5tQnV0dG9uc0NsaWNrID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgXHJcbiAgICAvLyBab29tIHNwZWNpZmljXHJcbiAgICB0aGlzLnNjYWxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzdCA9IDA7XHJcbiAgICB0aGlzLnNjYWxlX2ZhY3RvciA9IDEuMDtcclxuICAgIHRoaXMuY3Vycl9zY2FsZSA9IDEuMDtcclxuICAgIHRoaXMubWF4X3pvb20gPSA4LjA7XHJcbiAgICB0aGlzLm1pbl96b29tID0gMC41O1xyXG4gICAgXHJcbiAgICB0aGlzLmtleXMgPSBbXTtcclxuICAgIHRoaXMua2V5c09sZCA9IFtdO1xyXG4gICAgdGhpcy5rZXlzQ2xpY2sgPSBbXTtcclxuICAgIFtcclxuICAgICAgXCJFbnRlclwiLCBcIkJhY2tzcGFjZVwiLFxyXG4gICAgICBcIkRlbGV0ZVwiLCBcIlNwYWNlXCIsIFwiVGFiXCIsIFwiRXNjYXBlXCIsIFwiQXJyb3dMZWZ0XCIsIFwiQXJyb3dVcFwiLCBcIkFycm93UmlnaHRcIixcclxuICAgICAgXCJBcnJvd0Rvd25cIiwgXCJTaGlmdFwiLCBcIkNvbnRyb2xcIiwgXCJBbHRcIiwgXCJTaGlmdExlZnRcIiwgXCJTaGlmdFJpZ2h0XCIsIFwiQ29udHJvbExlZnRcIixcclxuICAgICAgXCJDb250cm9sUmlnaHRcIiwgXCJQYWdlVXBcIiwgXCJQYWdlRG93blwiLCBcIkVuZFwiLCBcIkhvbWVcIixcclxuICAgICAgXCJEaWdpdDBcIiwgXCJEaWdpdDFcIixcclxuICAgICAgXCJLZXlQXCIsIFwiS2V5V1wiLCBcIktleVNcIiwgXCJLZXlBXCIsIFwiS2V5RFwiLFxyXG4gICAgICBcIk51bXBhZDBcIiwgXCJOdW1wYWRNdWx0aXBseVwiLFxyXG4gICAgICBcIkYxXCIsXHJcbiAgICBdLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgdGhpcy5rZXlzW2tleV0gPSAwO1xyXG4gICAgICB0aGlzLmtleXNPbGRba2V5XSA9IDA7XHJcbiAgICAgIHRoaXMua2V5c0NsaWNrW2tleV0gPSAwO1xyXG4gICAgfSk7XHJcbiBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSBmYWxzZTtcclxuICAgIHRoaXMuYWx0S2V5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmN0cmxLZXkgPSBmYWxzZTtcclxuIFxyXG4gICAgdGhpcy5pc0ZpcnN0ID0gdHJ1ZTtcclxuICB9IC8vIEVuZCBvZiAnY29uc3RydWN0b3InIGZ1bmN0aW9uXHJcbiBcclxuICAvLy8gTW91c2UgaGFuZGxlIGZ1bmN0aW9uc1xyXG4gXHJcbiAgb25DbGljayhlKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ29uQ2xpY2snIGZ1bmN0aW9uXHJcbiAgXHJcbiAgb25Ub3VjaFN0YXJ0KGUpIHtcclxuICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09IDEpXHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMF0gPSAxO1xyXG4gICAgZWxzZSBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMF0gPSAwO1xyXG4gICAgICB0aGlzLm1CdXR0b25zWzJdID0gMTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm1CdXR0b25zWzBdID0gMDtcclxuICAgICAgdGhpcy5tQnV0dG9uc1syXSA9IDA7XHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMV0gPSAxO1xyXG4gICAgfVxyXG4gICAgbGV0XHJcbiAgICAgIC8veCA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50YXJnZXQub2Zmc2V0TGVmdCxcclxuICAgICAgLy95ID0gZS50b3VjaGVzWzBdLmNsaWVudFkgLSBlLnRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICAgIHggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICB5ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gICAgdGhpcy5tWCA9IHg7XHJcbiAgICB0aGlzLm1ZID0geTtcclxuIFxyXG4gICAgbGV0IHR0ID0gZS50YXJnZXRUb3VjaGVzO1xyXG4gICAgaWYgKHR0Lmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIHRoaXMuZGlzdCA9IGRpc3RhbmNlKHR0WzBdLCB0dFsxXSk7XHJcbiAgICAgIHRoaXMuc2NhbGluZyA9IHRydWU7XHJcbiAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgIHRoaXMuc2NhbGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy92Zy5sb2coYFpvb20gc3RhcnQ6IGlzc2M6JHt0aGlzLnNjYWxpbmd9YCk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uVG91Y2hTdGFydCcgZnVuY3Rpb25cclxuIFxyXG4gIG9uVG91Y2hNb3ZlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuIFxyXG4gICAgbGV0XHJcbiAgICAgIHggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICB5ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXQub2Zmc2V0VG9wO1xyXG4gXHJcbiAgICBsZXQgdHQgPSBlLnRhcmdldFRvdWNoZXM7XHJcbiAgICBpZiAodGhpcy5zY2FsaW5nKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgIHRoaXMubUR6ID0gMDtcclxuICAgICAgdGhpcy5jdXJyX3NjYWxlID0gKGRpc3RhbmNlKHR0WzBdLCB0dFsxXSkgLyB0aGlzLmRpc3QpICogdGhpcy5zY2FsZV9mYWN0b3I7XHJcbiBcclxuICAgICAgIGxldCBkID0gZGlzdGFuY2UodHRbMF0sIHR0WzFdKTtcclxuICAgICAgaWYgKE1hdGguYWJzKGQgLSB0aGlzLmRpc3QpID4gMCkge1xyXG4gICAgICAgIGlmIChkIDwgdGhpcy5kaXN0KVxyXG4gICAgICAgICAgdGhpcy5tRHogPSAxICogKGQgLyB0aGlzLmRpc3QpLCB0aGlzLmRpc3QgPSBkO1xyXG4gICAgICAgIGVsc2UgaWYgKGQgPiB0aGlzLmRpc3QpXHJcbiAgICAgICAgICB0aGlzLm1EeiA9IC0xICogKHRoaXMuZGlzdCAvIGQpLCB0aGlzLmRpc3QgPSBkO1xyXG4gICAgICAgIHRoaXMubVogKz0gdGhpcy5tRHo7XHJcbiBcclxuICAgICAgICB0aGlzLm1EeCA9IHggLSB0aGlzLm1YO1xyXG4gICAgICAgIHRoaXMubUR5ID0geSAtIHRoaXMubVk7XHJcbiAgICAgICAgdGhpcy5tWCA9IHg7XHJcbiAgICAgICAgdGhpcy5tWSA9IHk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIGlmICh0aGlzLm1CdXR0b25zWzFdID09IDEpIHtcclxuICAgICAgdGhpcy5tRHggPSAwO1xyXG4gICAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICAgIHRoaXMubUR6ID0geSAtIHRoaXMubVo7XHJcbiAgICAgIHRoaXMubVggPSB4O1xyXG4gICAgICB0aGlzLm1ZID0geTtcclxuICAgICAgdGhpcy5tWiArPSB0aGlzLm1EejtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubUR4ID0geCAtIHRoaXMubVg7XHJcbiAgICAgIHRoaXMubUR5ID0geSAtIHRoaXMubVk7XHJcbiAgICAgIHRoaXMubUR6ID0gMDtcclxuICAgICAgdGhpcy5tWCA9IHg7XHJcbiAgICAgIHRoaXMubVkgPSB5O1xyXG4gICAgfSAgXHJcbiAgfSAvLyBFbmQgb2YgJ29uVG91Y2hNb3ZlJyBmdW5jdGlvblxyXG4gXHJcbiAgb25Ub3VjaEVuZChlKSB7XHJcbiAgICB0aGlzLm1CdXR0b25zWzBdID0gMDtcclxuICAgIHRoaXMubUJ1dHRvbnNbMV0gPSAwO1xyXG4gICAgdGhpcy5tQnV0dG9uc1syXSA9IDA7XHJcbiAgICBsZXRcclxuICAgICAgLy94ID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICAvL3kgPSBlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgICAgeCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgIHkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICB0aGlzLm1YID0geDtcclxuICAgIHRoaXMubVkgPSB5O1xyXG4gXHJcbiAgICBsZXQgdHQgPSBlLnRhcmdldFRvdWNoZXM7XHJcbiAgICBpZiAodHQubGVuZ3RoIDwgMikge1xyXG4gICAgICB0aGlzLnNjYWxpbmcgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMuY3Vycl9zY2FsZSA8IHRoaXMubWluX3pvb20pIHtcclxuICAgICAgICB0aGlzLnNjYWxlX2ZhY3RvciA9IHRoaXMubWluX3pvb207XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3Vycl9zY2FsZSA+IHRoaXMubWF4X3pvb20pIHtcclxuICAgICAgICAgIHRoaXMuc2NhbGVfZmFjdG9yID0gdGhpcy5tYXhfem9vbTsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2NhbGVfZmFjdG9yID0gdGhpcy5jdXJyX3NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zY2FsaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vdmcubG9nKGBab29tIGVuZDogaXNzYzoke3RoaXMuc2NhbGluZ30gKG1aOiAke3RoaXMubVp9KWApO1xyXG4gIH0gLy8gRW5kIG9mICdvblRvdWNoTW92ZScgZnVuY3Rpb25cclxuIFxyXG4gIG9uTW91c2VNb3ZlKGUpIHtcclxuICAgIGxldFxyXG4gICAgICBkeCA9IGUubW92ZW1lbnRYLFxyXG4gICAgICBkeSA9IGUubW92ZW1lbnRZO1xyXG4gICAgdGhpcy5tRHggPSBkeDtcclxuICAgIHRoaXMubUR5ID0gZHk7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICB0aGlzLm1YICs9IGR4O1xyXG4gICAgdGhpcy5tWSArPSBkeTtcclxuICB9IC8vIEVuZCBvZiAnb25Nb3VzZU1vdmUnIGZ1bmN0aW9uXHJcbiBcclxuICBvbk1vdXNlV2hlZWwoZSkge1xyXG4gICAgaWYgKGUud2hlZWxEZWx0YSAhPSAwKVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm1aICs9ICh0aGlzLm1EeiA9IGUud2hlZWxEZWx0YSAvIDEyMCk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uTW91c2VXaGVlbCcgZnVuY3Rpb25cclxuIFxyXG4gIG9uTW91c2VEb3duKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuIFxyXG4gICAgdGhpcy5tQnV0dG9uc09sZFtlLmJ1dHRvbl0gPSB0aGlzLm1CdXR0b25zW2UuYnV0dG9uXTtcclxuICAgIHRoaXMubUJ1dHRvbnNbZS5idXR0b25dID0gMTtcclxuICAgIHRoaXMubUJ1dHRvbnNDbGlja1tlLmJ1dHRvbl0gPSAhdGhpcy5tQnV0dG9uc09sZFtlLmJ1dHRvbl0gJiYgdGhpcy5tQnV0dG9uc1tlLmJ1dHRvbl07XHJcbiAgICBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSBlLnNoaWZ0S2V5O1xyXG4gICAgdGhpcy5hbHRLZXkgPSBlLmFsdEtleTtcclxuICAgIHRoaXMuY3RybEtleSA9IGUuY3RybEtleTtcclxuICB9IC8vIEVuZCBvZiAnb25Nb3VzZU1vdmUnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgb25Nb3VzZVVwKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuIFxyXG4gICAgdGhpcy5tQnV0dG9uc09sZFtlLmJ1dHRvbl0gPSB0aGlzLm1CdXR0b25zW2UuYnV0dG9uXTtcclxuICAgIHRoaXMubUJ1dHRvbnNbZS5idXR0b25dID0gMDtcclxuICAgIHRoaXMubUJ1dHRvbnNDbGlja1tlLmJ1dHRvbl0gPSAwO1xyXG4gXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZS5zaGlmdEtleTtcclxuICAgIHRoaXMuYWx0S2V5ID0gZS5hbHRLZXk7XHJcbiAgICB0aGlzLmN0cmxLZXkgPSBlLmN0cmxLZXk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uTW91c2VNb3ZlJyBmdW5jdGlvblxyXG4gXHJcbiAgLy8vIEtleWJvYXJkIGhhbmRsZVxyXG4gIG9uS2V5RG93bihlKSB7XHJcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZXh0YXJlYScpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGxldCBmb2N1c2VkX2VsZW1lbnQgPSBudWxsO1xyXG4gICAgaWYgKGRvY3VtZW50Lmhhc0ZvY3VzKCkgJiZcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5ICYmXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XHJcbiAgICAgIGZvY3VzZWRfZWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGlmIChmb2N1c2VkX2VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZXh0YXJlYScpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSAgICAgIFxyXG4gICAgaWYgKGUuY29kZSAhPSBcIkYxMlwiICYmIGUuY29kZSAhPSBcIkYxMVwiICYmIGUuY29kZSAhPSBcIktleVJcIilcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5rZXlzT2xkW2UuY29kZV0gPSB0aGlzLmtleXNbZS5jb2RlXTtcclxuICAgIHRoaXMua2V5c1tlLmNvZGVdID0gMTtcclxuICAgIHRoaXMua2V5c0NsaWNrW2UuY29kZV0gPSAhdGhpcy5rZXlzT2xkW2UuY29kZV0gJiYgdGhpcy5rZXlzW2UuY29kZV07XHJcbiAgICBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSBlLnNoaWZ0S2V5O1xyXG4gICAgdGhpcy5hbHRLZXkgPSBlLmFsdEtleTtcclxuICAgIHRoaXMuY3RybEtleSA9IGUuY3RybEtleTtcclxuICB9IC8vIEVuZCBvZiAnb25LZXlEb3duJyBmdW5jdGlvblxyXG4gIFxyXG4gIG9uS2V5VXAoZSkge1xyXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGV4dGFyZWEnKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBsZXQgZm9jdXNlZF9lbGVtZW50ID0gbnVsbDtcclxuICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpICYmXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSAmJlxyXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICBmb2N1c2VkX2VsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICBpZiAoZm9jdXNlZF9lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGV4dGFyZWEnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gICAgICBcclxuICAgIGlmIChlLmNvZGUgIT0gXCJGMTJcIiAmJiBlLmNvZGUgIT0gXCJGMTFcIiAmJiBlLmNvZGUgIT0gXCJLZXlSXCIpXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMua2V5c09sZFtlLmNvZGVdID0gdGhpcy5rZXlzW2UuY29kZV07XHJcbiAgICB0aGlzLmtleXNbZS5jb2RlXSA9IDA7XHJcbiAgICB0aGlzLmtleXNDbGlja1tlLmNvZGVdID0gMDtcclxuIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IGUuc2hpZnRLZXk7XHJcbiAgICB0aGlzLmFsdEtleSA9IGUuYWx0S2V5O1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xyXG4gIH0gLy8gRW5kIG9mICdvbktleVVwJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vLyBDYW1lcmEgbW92ZW1lbnQgaGFuZGxpbmdcclxuICByZXNldCgpIHtcclxuICAgIC8vdmcubG9nKGBNc0R6OiAke3RoaXMubUR6fWApO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gICAgdGhpcy5tQnV0dG9uc0NsaWNrLmZvckVhY2goayA9PiB0aGlzLm1CdXR0b25zQ2xpY2tba10gPSAwKTtcclxuICAgIHRoaXMua2V5c0NsaWNrLmZvckVhY2goayA9PiB0aGlzLmtleXNDbGlja1trXSA9IDApO1xyXG4gXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gdGhpcy5rZXlzW1wiU2hpZnRMZWZ0XCJdIHx8IHRoaXMua2V5c1tcIlNoaWZ0UmlnaHRcIl07XHJcbiAgICB0aGlzLmFsdEtleSA9IHRoaXMua2V5c1tcIkFsdExlZnRcIl0gfHwgdGhpcy5rZXlzW1wiQWx0UmlnaHRcIl07XHJcbiAgICB0aGlzLmN0cmxLZXkgPSB0aGlzLmtleXNbXCJDb250cm9sTGVmdFwiXSB8fCB0aGlzLmtleXNbXCJDb250cm9sUmlnaHRcIl07XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc2V0JyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBJbnB1dCBvYmplY3QgY3JhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gaW5wdXQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2lucHV0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnaW5wdXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gJy4uL210aC9tdGhfdmVjMy5qcyc7XHJcbmltcG9ydCB7IGNhbWVyYSB9IGZyb20gJy4uL210aC9tdGhfY2FtLmpzJztcclxuaW1wb3J0IHsgc2hhZGVyIH0gZnJvbSAnLi9yZXMvc2hkLmpzJztcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi90aW1lci5qcyc7XHJcbmltcG9ydCB7IGlucHV0IH0gZnJvbSAnLi9pbnB1dC5qcyc7XHJcblxyXG4vLyBSZW5kZXIgb2JqZWN0IGNsYXNzXHJcbmNsYXNzIF9yZW5kZXJlciB7XHJcbiAgZ2w7XHJcbiAgY2FudmFzO1xyXG4gIHNoZHMgPSBbXTtcclxuICB1bml0cyA9IFtdO1xyXG4gIEFBQkIgPSBbXTtcclxuICBjYW0gPSBjYW1lcmEoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoaWQpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XHJcbiAgICB0aGlzLmNhbSA9IGNhbWVyYSgpO1xyXG4gICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgdGhpcy5pbnB1dCA9IGlucHV0KHRoaXMpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgIH0pO1xyXG4gIFxyXG4gICAgdGhpcy5jYW0uZnJhbWVXID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGg7XHJcbiAgICB0aGlzLmNhbS5mcmFtZUggPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbS5wcm9qRGlzdCA9IDAuMTtcclxuICAgIHRoaXMuY2FtLnByb2pTaXplID0gMC4xO1xyXG4gICAgdGhpcy5jYW0ucHJvakZhckNsaXAgPSAzMDA7XHJcbiAgICBcclxuICAgIHRoaXMuY2FtLnNldENhbSh2ZWMzKDQpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICAgIHRoaXMuY2FtLnNldFByb2ooMC4xLCAwLjEsIDMwMCk7XHJcblxyXG4gICAgLy8gV2ViIGdyYWZpeCBsaWJyYXJ5IGluaXRpYWxpemF0aW9uXHJcbiAgICB0aGlzLmdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuICBcclxuICAgIGlmICh0aGlzLmdsID09IG51bGwpIHtcclxuICAgICAgYWxlcnQoXCJXZWJHTDIgbm90IHN1cHBvcnRlZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzaXplKCk7XHJcblxyXG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjMwLCAwLjQ3LCAwLjgsIDEuMCk7XHJcbiAgICBcclxuICAgIGNvbnN0IGFuaW0gPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIFxyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW0oKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbS5zZXRTaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZFNoYWRlcihzaGROYW1lKSB7XHJcbiAgICBsZXQgbmV3U2hkO1xyXG4gICAgZm9yIChsZXQgc2hkIG9mIHRoaXMuc2hkcykgXHJcbiAgICAgIGlmIChzaGQubmFtZSA9PSBzaGROYW1lKSB7XHJcbiAgICAgICAgbmV3U2hkID0gc2hkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICBpZiAobmV3U2hkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICBuZXdTaGQgPSBzaGFkZXIoc2hkTmFtZSwgdGhpcyk7XHJcbiAgICAgIGF3YWl0IG5ld1NoZC5sb2FkKCk7XHJcbiAgICAgIHRoaXMuc2hkcy5wdXNoKG5ld1NoZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3U2hkO1xyXG4gIH1cclxuXHJcbiAgYWRkVW5pdCh1bml0KSB7XHJcbiAgICB0aGlzLnVuaXRzLnB1c2godW5pdCk7XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3aW5nIGZyYW1lIGZ1bmN0aW9uXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgXHJcbiAgICAvLyBBc2tpbmcgdW5pdHNcclxuICAgIGlmICh0aGlzLnVuaXRzICE9IHVuZGVmaW5lZClcclxuICAgICAgZm9yIChsZXQgdW5pdCBvZiB0aGlzLnVuaXRzKVxyXG4gICAgICAgIHVuaXQucmVzcG9uc2UoKTtcclxuICAgIFxyXG4gICAgLy8gRHJhd2luZyB1bml0c1xyXG4gICAgaWYgKHRoaXMudW5pdHMgIT0gdW5kZWZpbmVkKVxyXG4gICAgICBmb3IgKGxldCB1bml0IG9mIHRoaXMudW5pdHMpXHJcbiAgICAgICAgdW5pdC5kcmF3KCk7XHJcblxyXG4gICAgLy8gRGVsZXRpbmcgYW5hY3RpdmUgdW5pdHNcclxuICAgIGlmICh0aGlzLnVuaXRzICE9IHVuZGVmaW5lZClcclxuICAgICAgZm9yIChsZXQgaW5kIGluIHRoaXMudW5pdHMpXHJcbiAgICAgICAgaWYgKHRoaXMudW5pdHNbaW5kXS5hY3RpdmUgIT0gdW5kZWZpbmVkICYmIHRoaXMudW5pdHNbaW5kXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRoaXMudW5pdHMuc3BsaWNlKGluZCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vICghISEpIERlbGV0aW5nIGFuYWN0aXZlIEJCXHJcbiAgICBpZiAodGhpcy5BQUJCICE9IHVuZGVmaW5lZClcclxuICAgICAgZm9yIChsZXQgaW5kIGluIHRoaXMuQUFCQilcclxuICAgICAgICBpZiAodGhpcy5BQUJCW2luZF0uYWN0aXZlICE9IHVuZGVmaW5lZCAmJiB0aGlzLkFBQkJbaW5kXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRoaXMuQUFCQi5zcGxpY2UoaW5kLCAxKTtcclxuICAgICAgICB9XHJcbiAgfSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb24gXHJcbn0gIFxyXG5cclxuLy8gUmVuZGVyZXIgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9yZW5kZXJlciguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3JlbmRlcmVyJyBmdW5jdGlvbiIsImNsYXNzIF9idWZmZXIge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgdHlwZSwgc2l6ZSkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTsgICAgLy8gQnVmZmVyIHR5cGUgKGdsLioqKl9CVUZGRVIpXHJcbiAgICB0aGlzLnNpemUgPSBzaXplOyAgICAvLyBCdWZmZXIgc2l6ZSBpbiBieXRlc1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIGlmIChzaXplID09IDAgfHwgdHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuaWQgPSBybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBybmQuZ2wuYmluZEJ1ZmZlcih0eXBlLCB0aGlzLmlkKTtcclxuICAgIHJuZC5nbC5idWZmZXJEYXRhKHR5cGUsIHNpemUsIHJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgfVxyXG4gIHVwZGF0ZShvZmZzZXQsIGRhdGEpIHtcclxuICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmlkKTtcclxuICAgIHRoaXMucm5kLmdsLmJ1ZmZlclN1YkRhdGEodGhpcy50eXBlLCBvZmZzZXQsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdidWZmZXInIGZ1bmN0aW9uXHJcbiBcclxuIFxyXG5jbGFzcyBfdWJvX2J1ZmZlciBleHRlbmRzIF9idWZmZXIge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSwgc2l6ZSwgYmluZFBvaW50KSB7XHJcbiAgICBzdXBlcihybmQsIHJuZC5nbC5VTklGT1JNX0JVRkZFUiwgc2l6ZSk7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5iaW5kUG9pbnQgPSBiaW5kUG9pbnQ7IC8vIEJ1ZmZlciBHUFUgYmluZGluZyBwb2ludFxyXG4gIH1cclxuICBhcHBseSAoc2hkKSB7XHJcbiAgICBpZiAoc2hkID09IHVuZGVmaW5lZCB8fCBzaGQuaWQgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLnJuZC5nbC51bmlmb3JtQmxvY2tCaW5kaW5nKHNoZC5pZCwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXS5pbmRleCwgdGhpcy5iaW5kUG9pbnQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlckJhc2UodGhpcy5ybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHRoaXMuYmluZFBvaW50LCB0aGlzLmlkKTtcclxuICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVib19idWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3Vib19idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd1Ym9fYnVmZmVyJyBmdW5jdGlvblxyXG4gXHJcbi8vIC4gLiAuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXhfYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZXJ0ZXhfYnVmZmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVydGV4X2J1ZmZlcicgZnVuY3Rpb25cclxuICAgICAgICBcclxuY2xhc3MgX2luZGV4X2J1ZmZlciBleHRlbmRzIF9idWZmZXIge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgaUFycmF5KSB7XHJcbiAgICBjb25zdCBuID0gaUFycmF5Lmxlbmd0aDtcclxuICAgIHN1cGVyKHJuZCwgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG4gKiA0KTtcclxuICAgIHJuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pZCk7XHJcbiAgICBybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIDAsIG5ldyBVaW50MzJBcnJheShpQXJyYXkpLCAwKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4X2J1ZmZlciguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfaW5kZXhfYnVmZmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndWJvX2J1ZmZlcicgZnVuY3Rpb24iLCJpbXBvcnQgeyB1Ym9fYnVmZmVyIH0gZnJvbSAnLi9idWZmZXIuanMnO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSAnLi4vLi4vbXRoL210aF92ZWMzLmpzJztcclxuXHJcbmNvbnN0IE1hdExpYiA9IFtdO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQmxhY2sgUGxhc3RpY1wiLCAgIFwiS2FcIjogdmVjMygwLjAsIDAuMCwgMC4wKSwgICAgICAgICAgICAgXCJLZFwiOiB2ZWMzKDAuMDEsIDAuMDEsIDAuMDEpLCAgICAgICAgICAgXCJLc1wiOiB2ZWMzKDAuNSwgMC41LCAwLjUpLCAgICAgICAgICAgICAgXCJQaFwiOiAzMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQnJhc3NcIiwgICAgICAgICAgIFwiS2FcIjogdmVjMygwLjMyOTQxMiwwLjIyMzUyOSwwLjAyNzQ1MSksIFwiS2RcIjogdmVjMygwLjc4MDM5MiwwLjU2ODYyNywwLjExMzcyNSksIFwiS3NcIjogdmVjMygwLjk5MjE1NywwLjk0MTE3NiwwLjgwNzg0MyksIFwiUGhcIjogMjcuODk3NH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQnJvbnplXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjIxMjUsMC4xMjc1LDAuMDU0KSwgICAgICAgXCJLZFwiOiB2ZWMzKDAuNzE0LDAuNDI4NCwwLjE4MTQ0KSwgICAgICAgXCJLc1wiOiB2ZWMzKDAuMzkzNTQ4LDAuMjcxOTA2LDAuMTY2NzIxKSwgIFwiUGhcIjogMjUuNn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQ2hyb21lXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjI1LCAwLjI1LCAwLjI1KSwgICAgICAgICAgXCJLZFwiOiB2ZWMzKDAuNCwgMC40LCAwLjQpLCAgICAgICAgICAgICAgXCJLc1wiOiB2ZWMzKDAuNzc0NTk3LCAwLjc3NDU5NywgMC43NzQ1OTcpLCBcIlBoXCI6IDc2Ljh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIkNvcHBlclwiLCAgICAgICAgICBcIkthXCI6IHZlYzMoMC4xOTEyNSwwLjA3MzUsMC4wMjI1KSwgICAgIFwiS2RcIjogdmVjMygwLjcwMzgsMC4yNzA0OCwwLjA4MjgpLCAgICAgIFwiS3NcIjogdmVjMygwLjI1Njc3NywwLjEzNzYyMiwwLjA4NjAxNCksICBcIlBoXCI6IDEyLjh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIkdvbGRcIiwgICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4yNDcyNSwwLjE5OTUsMC4wNzQ1KSwgICAgIFwiS2RcIjogdmVjMygwLjc1MTY0LDAuNjA2NDgsMC4yMjY0OCksICAgIFwiS3NcIjogdmVjMygwLjYyODI4MSwwLjU1NTgwMiwwLjM2NjA2NSksICBcIlBoXCI6IDUxLjJ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBld2V0ZXJcIiwgICAgICAgICBcIkthXCI6IHZlYzMoMC4xMDU4OCwwLjA1ODgyNCwwLjExMzcyNSksIFwiS2RcIjogdmVjMygwLjQyNzQ1MSwwLjQ3MDU4OCwwLjU0MTE3NiksIFwiS3NcIjogdmVjMygwLjMzMzMsMC4zMzMzLDAuNTIxNTY5KSwgICAgICBcIlBoXCI6IDkuODQ2MTV9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlNpbHZlclwiLCAgICAgICAgICBcIkthXCI6IHZlYzMoMC4xOTIyNSwwLjE5MjI1LDAuMTkyMjUpLCAgIFwiS2RcIjogdmVjMygwLjUwNzU0LDAuNTA3NTQsMC41MDc1NCksICAgIFwiS3NcIjogdmVjMygwLjUwODI3MywwLjUwODI3MywwLjUwODI3MyksICBcIlBoXCI6IDUxLjJ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBvbGlzaGVkIFNpbHZlclwiLCBcIkthXCI6IHZlYzMoMC4yMzEyNSwwLjIzMTI1LDAuMjMxMjUpLCBcIktkXCI6IHZlYzMoMC4yNzc1LDAuMjc3NSwwLjI3NzUpLCAgICAgICBcIktzXCI6IHZlYzMoMC43NzM5MTEsMC43NzM5MTEsMC43NzM5MTEpLCAgXCJQaFwiOiA4OS42fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJUdXJxdW9pc2VcIiwgICAgICAgXCJLYVwiOiB2ZWMzKDAuMSwgMC4xODcyNSwgMC4xNzQ1KSwgICAgICBcIktkXCI6IHZlYzMoMC4zOTYsIDAuNzQxNTEsIDAuNjkxMDIpLCAgICBcIktzXCI6IHZlYzMoMC4yOTcyNTQsIDAuMzA4MjksIDAuMzA2Njc4KSwgXCJQaFwiOiAxMi44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJSdWJ5XCIsICAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMTc0NSwgMC4wMTE3NSwgMC4wMTE3NSksICBcIktkXCI6IHZlYzMoMC42MTQyNCwgMC4wNDEzNiwgMC4wNDEzNiksICBcIktzXCI6IHZlYzMoMC43Mjc4MTEsIDAuNjI2OTU5LCAwLjYyNjk1OSksIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgR29sZFwiLCAgIFwiS2FcIjogdmVjMygwLjI0NzI1LCAwLjIyNDUsIDAuMDY0NSksICAgXCJLZFwiOiB2ZWMzKDAuMzQ2MTUsIDAuMzE0MywgMC4wOTAzKSwgICAgXCJLc1wiOiB2ZWMzKDAuNzk3MzU3LCAwLjcyMzk5MSwgMC4yMDgwMDYpLCBcIlBoXCI6IDgzLjJ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBvbGlzaGVkIEJyb256ZVwiLCBcIkthXCI6IHZlYzMoMC4yNSwgMC4xNDgsIDAuMDY0NzUpLCAgICBcIktkXCI6IHZlYzMoMC40LCAwLjIzNjgsIDAuMTAzNiksICAgICAgICBcIktzXCI6IHZlYzMoMC43NzQ1OTcsIDAuNDU4NTYxLCAwLjIwMDYyMSksIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgQ29wcGVyXCIsIFwiS2FcIjogdmVjMygwLjIyOTUsIDAuMDg4MjUsIDAuMDI3NSksIFwiS2RcIjogdmVjMygwLjU1MDgsIDAuMjExOCwgMC4wNjYpLCAgICAgIFwiS3NcIjogdmVjMygwLjU4MDU5NCwgMC4yMjMyNTcsIDAuMDY5NTcwMSksIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiSmFkZVwiLCAgICAgICAgICAgIFwiS2FcIjogdmVjMygwLjEzNSwgMC4yMjI1LCAwLjE1NzUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuMTM1LCAwLjIyMjUsIDAuMTU3NSksICAgICAgXCJLc1wiOiB2ZWMzKDAuMzE2MjI4LCAwLjMxNjIyOCwgMC4zMTYyMjgpLCBcIlBoXCI6IDEyLjh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIk9ic2lkaWFuXCIsICAgICAgICBcIkthXCI6IHZlYzMoMC4wNTM3NSwgMC4wNSwgMC4wNjYyNSksICAgIFwiS2RcIjogdmVjMygwLjE4Mjc1LCAwLjE3LCAwLjIyNTI1KSwgICAgIFwiS3NcIjogdmVjMygwLjMzMjc0MSwgMC4zMjg2MzQsIDAuMzQ2NDM1KSwgXCJQaFwiOiAzOC40fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQZWFybFwiLCAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjUsIDAuMjA3MjUsIDAuMjA3MjUpLCAgICBcIktkXCI6IHZlYzMoMS4wLCAwLjgyOSwgMC44MjkpLCAgICAgICAgICBcIktzXCI6IHZlYzMoMC4yOTY2NDgsIDAuMjk2NjQ4LCAwLjI5NjY0OCksIFwiUGhcIjogMTEuMjY0fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJFbWVyYWxkXCIsICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMDIxNSwgMC4xNzQ1LCAwLjAyMTUpLCAgICBcIktkXCI6IHZlYzMoMC4wNzU2OCwgMC42MTQyNCwgMC4wNzU2OCksICBcIktzXCI6IHZlYzMoMC42MzMsIDAuNzI3ODExLCAwLjYzMyksICAgICAgIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQmxhY2sgUnViYmVyXCIsICAgIFwiS2FcIjogdmVjMygwLjAyLCAwLjAyLCAwLjAyKSwgICAgICAgICAgXCJLZFwiOiB2ZWMzKDAuMDEsIDAuMDEsIDAuMDEpLCAgICAgICAgICAgXCJLc1wiOiB2ZWMzKDAuNCwgMC40LCAwLjQpLCAgICAgICAgICAgICAgICBcIlBoXCI6IDEwLjB9KTtcclxuXHJcbi8vIE1hdGVyaWFsIGNsYXNzXHJcbmNsYXNzIF9tdGwge1xyXG4gIHRleCA9IFtdO1xyXG4gIHRleENvbiA9IFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdO1xyXG4gIGNvbnN0cnVjdG9yKHNoZCwgbmFtZSwga2EsIGtkLCBrcywgcGgsIHRyYW5zICkge1xyXG4gICAgdGhpcy5ybmQgPSBzaGQucm5kO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuc2hkID0gc2hkO1xyXG5cclxuICAgIHRoaXMua2EgPSBrYTtcclxuICAgIHRoaXMua2QgPSBrZDtcclxuICAgIHRoaXMua3MgPSBrcztcclxuICAgIHRoaXMucGggPSBwaDtcclxuICAgIHRoaXMudHJhbnMgPSB0cmFucztcclxuICAgXHJcbiAgICB0aGlzLnVibyA9IHVib19idWZmZXIodGhpcy5ybmQsIFwiTWF0ZXJpYWxcIiwgdGhpcy5zaGQudW5pZm9ybUJsb2Nrc1tcIk1hdGVyaWFsXCJdLnNpemUsIDEpO1xyXG4gICAgdGhpcy51Ym8udXBkYXRlKDAsIG5ldyBGbG9hdDMyQXJyYXkoW2thLngsIGthLnksIGthLnosIDAsIGtkLngsIGtkLnksIGtkLnosIHRyYW5zLCBrcy54LCBrcy55LCBrcy56LCBwaF0pKTtcclxuICB9XHJcblxyXG4gIGFwcGx5KCkge1xyXG4gICAgdGhpcy5zaGQuYXBwbHkoKTtcclxuICAgIHRoaXMudWJvLmFwcGx5KHRoaXMuc2hkKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGV4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLnRleFtpXSlcclxuICAgICAgICBpZiAodGhpcy5zaGQudW5pZm9ybXNbYFRleCR7aX1gXSkge1xyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIGkpO1xyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy50ZXhbaV0udHlwZSwgdGhpcy50ZXhbaV0uaWQpO1xyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wudW5pZm9ybTFpKHRoaXMuc2hkLnVuaWZvcm1zW2BUZXgke2l9YF0ubG9jLCBpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hUZXgodGV4KSB7XHJcbiAgICBpZiAodGV4Lmxlbmd0aCA+PSA4KVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLnRleFt0aGlzLnRleC5sZW5ndGggLSAxXSA9IHRleDtcclxuICAgIHRoaXMudGV4Q29uW3RoaXMudGV4Lmxlbmd0aCAtIDFdID0gMTtcclxuICAgIHRoaXMudWJvLnVwZGF0ZSgxNiAqIDMsIG5ldyBVaW50MzJBcnJheSh0aGlzLnRleENvbikpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gTWF0ZXJpYWwgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIG10bCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfbXRsKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnbXRsJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0IG1hdGVyaWFsIGJ5IG5hbWUgZnJvbSBsaWJyYXJ5XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNdGwoc2hkLCBuYW1lKSB7XHJcbiAgZm9yIChsZXQgbWF0IG9mIE1hdExpYilcclxuICAgIGlmIChuYW1lID09IG1hdC5uYW1lKVxyXG4gICAgICByZXR1cm4gbXRsKHNoZCwgbmFtZSwgbWF0LkthLCBtYXQuS2QsIG1hdC5LcywgbWF0LlBoLCAxKTtcclxuICByZXR1cm4gbXRsKHNoZCwgbmFtZSwgTWF0TGliWzFdLkthLCBNYXRMaWJbMV0uS2QsIE1hdExpYlsxXS5LcywgTWF0TGliWzFdLlBoLCAxKTtcclxufSAvLyBFbmQgJ2dldE10bCcgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzLCB2ZWMyIH0gZnJvbSBcIi4uLy4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tdGhfbWF0NC5qc1wiO1xyXG5pbXBvcnQgeyB1Ym9fYnVmZmVyIH0gZnJvbSBcIi4vYnVmZmVyLmpzXCI7XHJcblxyXG4vLyBWZXJ0ZXggYmFzZSBjbGFzc1xyXG5jbGFzcyBfdmVydGV4IHtcclxuICBwb2ludCA9IHZlYzMoKTtcclxuICBub3JtYWwgPSB2ZWMzKCk7XHJcbiAgdGV4Q29vcmQgPSB2ZWMyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgdGhpcy5wb2ludCA9IHZlYzMoeCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMucG9pbnQgPSB2ZWMzKHgsIHksIHopO1xyXG4gIH1cclxuXHJcbiAgc2V0VGV4KHgsIHkpIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgdGhpcy50ZXhDb29yZCA9IHZlYzIoeCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMudGV4Q29vcmQgPSB2ZWMyKHgsIHkpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVmVydGV4IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ZlcnRleCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBkYXRhIGNsYXNzXHJcbmNsYXNzIF9wcmltRGF0YSB7XHJcbiAgbWF0cml4ID0gbWF0NCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gICAgYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbiAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICBmb3IgKGxldCB2ZWN0IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnBvaW50LngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5wb2ludC55KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QucG9pbnQueik7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0Lm5vcm1hbC54KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3Qubm9ybWFsLnkpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5ub3JtYWwueik7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnRleENvb3JkLngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC50ZXhDb29yZC55KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZGV4ZXMgPSBpbmRleGVzO1xyXG4gICAgXHJcbiAgICB0aGlzLm1pbkJCID0gdmVjMyh2ZXJ0ZXhlc1swXS5wb2ludCk7XHJcbiAgICB0aGlzLm1heEJCID0gdmVjMyh2ZXJ0ZXhlc1swXS5wb2ludCk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IHZlcnQgb2YgdmVydGV4ZXMpIHtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueCA+IHRoaXMubWF4QkIueClcclxuICAgICAgICB0aGlzLm1heEJCLnggPSB2ZXJ0LnBvaW50Lng7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnkgPiB0aGlzLm1heEJCLnkpXHJcbiAgICAgICAgdGhpcy5tYXhCQi55ID0gdmVydC5wb2ludC55O1xyXG4gICAgICBpZiAodmVydC5wb2ludC56ID4gdGhpcy5tYXhCQi56KVxyXG4gICAgICAgIHRoaXMubWF4QkIueiA9IHZlcnQucG9pbnQuejtcclxuXHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnggPCB0aGlzLm1pbkJCLngpXHJcbiAgICAgICAgdGhpcy5taW5CQi54ID0gdmVydC5wb2ludC54O1xyXG4gICAgICBpZiAodmVydC5wb2ludC55IDwgdGhpcy5taW5CQi55KVxyXG4gICAgICAgIHRoaXMubWluQkIueSA9IHZlcnQucG9pbnQueTtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueiA8IHRoaXMubWluQkIueilcclxuICAgICAgICB0aGlzLm1pbkJCLnogPSB2ZXJ0LnBvaW50Lno7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBCb3VuZCBCb3ggY2xhc3NcclxuY2xhc3MgX2JveCB7XHJcbiAgY3VyVmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IobWluQkIsIG1heEJCKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7IC8vLyAoISEhKVxyXG4gICAgdGhpcy5taW5CQiA9IHZlYzMoKTtcclxuICAgIHRoaXMubWF4QkIgPSB2ZWMzKCk7XHJcblxyXG4gICAgY29uc3QgdmVydGV4ZXMgPSBbXHJcbiAgICAgICAgLy8gVXBcclxuICAgICAgICB2ZWMzKG1pbkJCKSwgdmVjMyhtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtaW5CQi56KSwgXHJcbiAgICAgICAgLy8gRG93blxyXG4gICAgICAgIHZlYzMobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlYzMobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksIHZlYzMobWF4QkIpLCB2ZWMzKG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGluZCA9IFswLCAxLCAyLCAyLCAwLCAzLCBcclxuICAgICAgICAgICAgICAgICA0LCA1LCA2LCA2LCA0LCA3LFxyXG5cclxuICAgICAgICAgICAgICAgICAwLCAxLCA1LCAwLCA1LCA0LFxyXG4gICAgICAgICAgICAgICAgIDAsIDQsIDMsIDQsIDMsIDcsXHJcbiAgICAgICAgICAgICAgICAgMywgMiwgNywgMiwgNywgNixcclxuICAgICAgICAgICAgICAgICAxLCAyLCA2LCAxLCA2LCA1XHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgICBsZXQgdmVydCA9IHZlcnRleCh2ZXJ0ZXhlc1tpXSk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZXJ0KTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQkIoKSB7XHJcbiAgICB0aGlzLm1pbkJCID0gdmVjMyh0aGlzLmN1clZlcnRleGVzWzBdLnBvaW50KTtcclxuICAgIHRoaXMubWF4QkIgPSB2ZWMzKHRoaXMuY3VyVmVydGV4ZXNbMF0ucG9pbnQpO1xyXG4gICAgZm9yIChsZXQgdmVydCBvZiB0aGlzLmN1clZlcnRleGVzKSB7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnggPiB0aGlzLm1heEJCLngpXHJcbiAgICAgICAgdGhpcy5tYXhCQi54ID0gdmVydC5wb2ludC54O1xyXG4gICAgICBpZiAodmVydC5wb2ludC55ID4gdGhpcy5tYXhCQi55KVxyXG4gICAgICAgIHRoaXMubWF4QkIueSA9IHZlcnQucG9pbnQueTtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueiA+IHRoaXMubWF4QkIueilcclxuICAgICAgICB0aGlzLm1heEJCLnogPSB2ZXJ0LnBvaW50Lno7XHJcblxyXG4gICAgICBpZiAodmVydC5wb2ludC54IDwgdGhpcy5taW5CQi54KVxyXG4gICAgICAgIHRoaXMubWluQkIueCA9IHZlcnQucG9pbnQueDtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueSA8IHRoaXMubWluQkIueSlcclxuICAgICAgICB0aGlzLm1pbkJCLnkgPSB2ZXJ0LnBvaW50Lnk7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnogPCB0aGlzLm1pbkJCLnopXHJcbiAgICAgICAgdGhpcy5taW5CQi56ID0gdmVydC5wb2ludC56O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbXVsTWF0cihtKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGV4ZXMubGVuZ3RoOyBpKyspXHJcbiAgICAgIHRoaXMuY3VyVmVydGV4ZXNbaV0gPSB2ZXJ0ZXgodGhpcy52ZXJ0ZXhlc1tpXS5wb2ludC5tdWxNYXRyKG0pKTtcclxuICAgIHRoaXMudXBkYXRlQkIoKTtcclxuICB9XHJcblxyXG4gICAvLy8gKCEhISkgQ2xvc2luZyBCQiB0byB1c2UgZnVuY3Rpb25cclxuICAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0gLy8gRW5kIG9mICdjbG9zZScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gQm91bmQgQm94IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBib3goLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2JveCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ByaW1EYXRhJyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGNsYXNzXHJcbmNsYXNzIF9wcmltIHtcclxuICB2ZXJ0QXJyYXk7XHJcbiAgdmVydEJ1ZmZlcjtcclxuXHJcbiAgaW5kQnVmZmVyO1xyXG4gIG51bU9mRWxlbTtcclxuXHJcbiAgd29ybGQgPSBtYXQ0KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG10bCwgZGF0YSwgaXNCQj10cnVlKSB7XHJcbiAgICB0aGlzLnJuZCA9IG10bC5zaGQucm5kO1xyXG4gICAgdGhpcy5tdGwgPSBtdGw7XHJcbiAgICB0aGlzLnNoZCA9IG10bC5zaGQ7XHJcbiAgICB0aGlzLnR5cGUgPSB0aGlzLnJuZC5nbC5UUklBTkdMRVM7XHJcbiAgICBpZiAoaXNCQikgeyBcclxuICAgICAgdGhpcy5CQiA9IGJveChkYXRhLm1pbkJCLCBkYXRhLm1heEJCKTtcclxuICAgICAgdGhpcy5ybmQuQUFCQi5wdXNoKHRoaXMuQkIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF0cml4ID0gZGF0YS5tYXRyaXg7XHJcblxyXG4gICAgdGhpcy51Ym8gPSB1Ym9fYnVmZmVyKHRoaXMucm5kLCBcIlByaW1cIiwgdGhpcy5zaGQudW5pZm9ybUJsb2Nrc1snUHJpbSddLnNpemUsIDApO1xyXG5cclxuICAgIHRoaXMubnVtT2ZFbGVtID0gZGF0YS52ZXJ0ZXhlcy5sZW5ndGg7XHJcbiAgICBcclxuICAgIGNvbnN0IHBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc2hkLmlkLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICBjb25zdCBub3JtTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zaGQuaWQsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICBjb25zdCB0ZXhMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNoZC5pZCwgXCJJblRleENvb3JkXCIpO1xyXG4gICAgdGhpcy52ZXJ0QXJyYXkgPSB0aGlzLnJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydEFycmF5KTtcclxuICAgIHRoaXMudmVydEJ1ZmZlciA9IHRoaXMucm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XHJcbiAgICB0aGlzLnJuZC5nbC5idWZmZXJEYXRhKHRoaXMucm5kLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhLnZlcnRleGVzKSwgdGhpcy5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgXHJcbiAgICBpZiAocG9zTG9jICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zTG9jLCAzLCB0aGlzLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAwKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zTG9jKTtcclxuICAgIH1cclxuICAgIGlmIChub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIobm9ybUxvYywgMywgdGhpcy5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMTIpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtTG9jKTtcclxuICAgIH1cclxuICAgIGlmICh0ZXhMb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXhMb2MsIDIsIHRoaXMucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDI0KTtcclxuICAgICAgdGhpcy5ybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4TG9jKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YS5pbmRleGVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm51bU9mRWxlbSA9IGRhdGEuaW5kZXhlcy5sZW5ndGg7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmluZEJ1ZmZlciA9IHRoaXMucm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZEJ1ZmZlcik7XHJcbiAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodGhpcy5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShkYXRhLmluZGV4ZXMpLCB0aGlzLnJuZC5nbC5TVEFUSUNfRFJBVyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIERyYXdpbmcgcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbiAgZHJhdyh3b3JsZCkge1xyXG4gICAgdGhpcy5tdGwuYXBwbHkoKTtcclxuICAgIFxyXG4gICAgaWYgKHdvcmxkID09IHVuZGVmaW5lZClcclxuICAgICAgd29ybGQgPSBtYXQ0KCk7XHJcbiAgICB3b3JsZCA9IHRoaXMubWF0cml4Lm11bCh3b3JsZCk7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLkJCKVxyXG4gICAgICB0aGlzLkJCLm11bE1hdHIod29ybGQpO1xyXG5cclxuICAgIGxldCB3dnAgPSB3b3JsZC5tdWwodGhpcy5ybmQuY2FtLm1hdHJWUCk7XHJcbiAgICBsZXQgd2ludiA9IHdvcmxkLmludmVyc2UoKS50cmFuc3Bvc2UoKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1CbG9ja3NbXCJQcmltXCJdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnViby51cGRhdGUoMCwgbmV3IEZsb2F0MzJBcnJheSh3dnAudG9BcnJheSgpLmNvbmNhdCh3aW52LnRvQXJyYXkoKSwgd29ybGQudG9BcnJheSgpKSkpO1xyXG4gICAgICB0aGlzLnViby5hcHBseSh0aGlzLnNoZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snVGltZSddKVxyXG4gICAgICB0aGlzLnJuZC5nbC51bmlmb3JtMWYodGhpcy5zaGQudW5pZm9ybXNbJ1RpbWUnXS5sb2MsIHRoaXMucm5kLnRpbWVyLmxvY2FsVGltZSk7XHJcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybXNbJ0NhbUxvYyddKVxyXG4gICAgICB0aGlzLnJuZC5nbC51bmlmb3JtM2YodGhpcy5zaGQudW5pZm9ybXNbJ0NhbUxvYyddLmxvYywgdGhpcy5ybmQuY2FtLmxvYy54LCB0aGlzLnJuZC5jYW0ubG9jLnksIHRoaXMucm5kLmNhbS5sb2Mueik7XHJcblxyXG4gICAgdGhpcy5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydEFycmF5KTtcclxuICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRCdWZmZXIpO1xyXG4gICAgaWYgKHRoaXMuc2hkLmlkICE9IG51bGwpIHtcclxuICAgICAgaWYgKHRoaXMuaW5kQnVmZmVyID09IHVuZGVmaW5lZClcclxuICAgICAgICB0aGlzLnJuZC5nbC5kcmF3QXJyYXlzKHRoaXMudHlwZSwgMCwgdGhpcy5udW1PZkVsZW0pO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZEJ1ZmZlcik7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuZHJhd0VsZW1lbnRzKHRoaXMudHlwZSwgdGhpcy5udW1PZkVsZW0sIHRoaXMucm5kLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAnZHJhdycgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gTm9ybWFsIGNvbXB1dGF0aW9uIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIGF1dG9Ob3JtYWwodmVydGV4ZXMsIGluZGV4ZXMpIHtcclxuICBpZiAoaW5kZXhlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgbGV0IG5vcm0gPSAodmVydGV4ZXNbaSArIDFdLnBvaW50LnN1Yih2ZXJ0ZXhlc1tpXS5wb2ludCkpLmNyb3NzKHZlcnRleGVzW2kgKyAyXS5wb2ludC5zdWIodmVydGV4ZXNbaV0ucG9pbnQpKS5ub3JtKCk7XHJcblxyXG4gICAgICBcclxuICAgICAgdmVydGV4ZXNbaV0ubm9ybWFsID0gdmVydGV4ZXNbaV0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgICAgdmVydGV4ZXNbaSArIDFdLm5vcm1hbCA9IHZlcnRleGVzW2kgKyAxXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICB2ZXJ0ZXhlc1tpICsgMl0ubm9ybWFsID0gdmVydGV4ZXNbaSArIDJdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBsZXQgXHJcbiAgICAgICAgbjAgPSBpbmRleGVzW2ldLCBuMSA9IGluZGV4ZXNbaSArIDFdLCBuMiA9IGluZGV4ZXNbaSArIDJdO1xyXG4gICAgICBsZXRcclxuICAgICAgICBwMCA9IHZlcnRleGVzW24wXS5wb2ludCxcclxuICAgICAgICBwMSA9IHZlcnRleGVzW24xXS5wb2ludCxcclxuICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb2ludCxcclxuICAgICAgICBub3JtID0gcDEuc3ViKHAwKS5jcm9zcyhwMi5zdWIocDApKS5ub3JtKCk7XHJcbiAgXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm1hbCA9IHZlcnRleGVzW24wXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICAgIHZlcnRleGVzW24xXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMV0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMl0ubm9ybWFsID0gdmVydGV4ZXNbbjJdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgaW4gdmVydGV4ZXMpIHtcclxuICAgICAgdmVydGV4ZXNbaV0ubm9ybWFsID0gdmVydGV4ZXNbaV0ubm9ybWFsLm5vcm0oKTtcclxuICAgIH1cclxuICB9XHJcbn0gLy8gRW5kIG9mICdhdXRvTm9ybWFsJyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmltKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wcmltKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncHJpbScgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBkYXRhIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmltRGF0YSguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcHJpbURhdGEoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdwcmltRGF0YScgZnVuY3Rpb25cclxuXHJcbiIsIi8vIEltYWdlIGNsYXNzXHJcbmNsYXNzIF9pbWFnZSB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgaHJlZikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmltZy5zcmMgPSBocmVmO1xyXG4gIH1cclxufVxyXG5cclxuLy8gSW1hZ2UgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9pbWFnZSguLi5hcmdzKTtcclxufVxyXG5cclxuLy8gVGV4dHVyZSBjbGFzc1xyXG5jbGFzcyBfdGV4dHVyZSB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBuYW1lVVJMLCB0ZXh0dXJlVHlwZSA9IFwiMmRcIikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZVVSTC5uYW1lO1xyXG4gICAgdGhpcy50eXBlID0gcm5kLmdsLlRFWFRVUkVfMkQ7XHJcbiAgICB0aGlzLmlkID0gcm5kLmdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgIHJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgaWYgKG5hbWVVUkwuaW1nKSB7XHJcbiAgICAgIHJuZC5nbC50ZXhJbWFnZTJEKHRoaXMudHlwZSwgMCwgcm5kLmdsLlJHQkEsIDEsIDEsIDAsIHJuZC5nbC5SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgIHJuZC5nbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMjU1LCAyNTUsIDI1NSwgMF0pKTtcclxuICAgICAgbmFtZVVSTC5pbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHJuZC5nbC5waXhlbFN0b3JlaShybmQuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgICAgICAgcm5kLmdsLnRleEltYWdlMkQodGhpcy50eXBlLCAwLCBybmQuZ2wuUkdCQSwgcm5kLmdsLlJHQkEsIHJuZC5nbC5VTlNJR05FRF9CWVRFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZVVSTC5pbWcpO1xyXG4gICAgICAgIHJuZC5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLnR5cGUpO1xyXG4gICAgICAgIHJuZC5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudHlwZSwgcm5kLmdsLlRFWFRVUkVfV1JBUF9TLCBybmQuZ2wuUkVQRUFUKTtcclxuICAgICAgICBybmQuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnR5cGUsIHJuZC5nbC5URVhUVVJFX1dSQVBfVCwgcm5kLmdsLlJFUEVBVCk7XHJcbiAgICAgICAgcm5kLmdsLnRleFBhcmFtZXRlcmkodGhpcy50eXBlLCBybmQuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybmQuZ2wuTElORUFSX01JUE1BUF9MSU5FQVIpO1xyXG4gICAgICAgIHJuZC5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudHlwZSwgcm5kLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgcm5kLmdsLkxJTkVBUik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFRleHR1cmUgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHRleHR1cmUoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3RleHR1cmUoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd0ZXh0dXJlJyBmdW5jdGlvbiIsImltcG9ydCB7IHByaW1EYXRhLCB2ZXJ0ZXggfSBmcm9tIFwiLi9wcmltLmpzXCI7XHJcbmltcG9ydCB7IHZlYzMsIHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL210aF92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcblxyXG4vLyBHZXR0aW5nIHRldHJhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGV0cmFoZWRyb24oKSB7XHJcbiAgY29uc3QgdmVydCA9IFtcclxuICAgIHZlcnRleCgwLCAwLCAxKSwgdmVydGV4KDEsIDAsIDApLCB2ZXJ0ZXgoMCwgMSwgMCksIHZlcnRleCgxKSBcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIFxyXG4gICAgMCwgMSwgMywgXHJcbiAgICAwLCAyLCAzLCBcclxuICAgIDEsIDIsIDNcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJtRGF0YSA9IHByaW1EYXRhKHZlcnRleGVzKTtcclxuICBwcm1EYXRhLm1hdHJpeCA9IG1hdDQoKS5zZXRUcmFucygtMC41LCAtMC41LCAtMC41KTtcclxuICByZXR1cm4gcHJtRGF0YTtcclxufSAvLyBFbmQgb2YgJ3NldFRldHJhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyBjdWJlIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3ViZSgpIHtcclxuICBjb25zdCB2ZXJ0ID0gIFtcclxuICAgIHZlcnRleCgtMC41KSwgdmVydGV4KDAuNSwgLTAuNSwgLTAuNSksIHZlcnRleCgtMC41LCAwLjUsIC0wLjUpLCBcclxuICAgIHZlcnRleCgtMC41LCAtMC41LCAwLjUpLCB2ZXJ0ZXgoMC41LCAwLjUsIC0wLjUpLCBcclxuICAgIHZlcnRleCgwLjUsIC0wLjUsIDAuNSksIHZlcnRleCgtMC41LCAwLjUsIDAuNSksIHZlcnRleCgwLjUpLFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgXHJcbiAgICAxLCAyLCA0LCBcclxuICAgIDUsIDEsIDcsXHJcbiAgICAxLCA3LCA0LFxyXG4gICAgNSwgMywgNyxcclxuICAgIDMsIDcsIDYsXHJcbiAgICAwLCAxLCAzLFxyXG4gICAgMSwgMywgNSxcclxuICAgIDMsIDAsIDYsXHJcbiAgICAwLCA2LCAyLFxyXG4gICAgNiwgMiwgNyxcclxuICAgIDIsIDcsIDRcclxuICBdO1xyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0ZXggPSBbXHJcbiAgICB2ZWMyKDAsIDApLFxyXG4gICAgdmVjMigxLCAwKSxcclxuICAgIHZlYzIoMCwgMSksXHJcbiAgICB2ZWMyKDEsIDApLFxyXG4gICAgdmVjMigwLCAxKSxcclxuICAgIHZlYzIoMSwgMSlcclxuICBdXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kLmxlbmd0aDsgaSsrKVxyXG4gICAgdmVydGV4ZXNbaV0uc2V0VGV4KHRleFtpICUgNl0pO1xyXG5cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpOyBcclxufSAvLyBFbmQgb2YgJ3NldEN1YmUnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIG9jdGFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPY3RhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHNxcnQyID0gTWF0aC5zcXJ0KDIpIC8gMjtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KHNxcnQyLCAwLCAwKSwgdmVydGV4KC1zcXJ0MiwgMCwgMCksXHJcbiAgICB2ZXJ0ZXgoMCwgMCwgc3FydDIpLCB2ZXJ0ZXgoMCwgMCwgLXNxcnQyKSwgXHJcbiAgICB2ZXJ0ZXgoMCwgc3FydDIsIDApLCB2ZXJ0ZXgoMCwgLXNxcnQyLCAwKSwgIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMywgNCwgMCwgMiwgNCwgMiwgNCwgMSwgMSwgMywgNCxcclxuICAgIDEsIDMsIDUsIDMsIDUsIDAsIDAsIDUsIDIsIDIsIDUsIDFcclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn0gLy8gRW5kIG9mICdzZXRPY3RhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyBpY29zYWhlZHJvbiBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEljb3NhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHZlcnQgPSBbXTtcclxuXHJcbiAgbGV0IGFuZ2xlID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIC0wLjUsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuICBcclxuICBhbmdsZSA9IE1hdGguUEk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCAwLjUsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgdmVydC5wdXNoKHZlcnRleCgwLCBNYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcbiAgdmVydC5wdXNoKHZlcnRleCgwLCAtTWF0aC5zcXJ0KDUpIC8gMiwgMCkpO1xyXG5cclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICA4LCA3LCAwLCAwLCA0LCA3LCA3LCA2LCA0LCA0LCAzLCA2LCA2LCA1LCBcclxuICAgIDMsIDMsIDIsIDUsIDUsIDksIDIsIDIsIDEsIDksIDksIDgsIDEsIDEsIDAsIDgsXHJcbiAgICA1LCA2LCAxMCwgNiwgNywgMTAsIDcsIDgsIDEwLCA4LCA5LCAxMCwgOSwgNSwgMTAsXHJcbiAgICAwLCAxLCAxMSwgMSwgMiwgMTEsIDIsIDMsIDExLCAzLCA0LCAxMSwgNCwgMCwgMTEsXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufSAvLyBFbmQgb2YgJ3NldEljb3NhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyBkb2RlY2FoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREb2RlY2FoZWRyb24oKSB7XHJcbiAgLy8gQ3JlYXRlIGljb3NhaGVkcm9uXHJcbiAgY29uc3QgaWNvdmVydCA9IFtdO1xyXG5cclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpY292ZXJ0LnB1c2godmVjMyhNYXRoLmNvcyhhbmdsZSksIC0wLjUsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuICBcclxuICBhbmdsZSA9IE1hdGguUEk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIGljb3ZlcnQucHVzaCh2ZWMzKE1hdGguY29zKGFuZ2xlKSwgMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIGljb3ZlcnQucHVzaCh2ZWMzKDAsIE1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuICBpY292ZXJ0LnB1c2godmVjMygwLCAtTWF0aC5zcXJ0KDUpIC8gMiwgMCkpO1xyXG5cclxuICBjb25zdCBpY29pbmQgPSBbXHJcbiAgICA4LCA3LCAwLCAwLCA0LCA3LCA3LCA2LCA0LCA0LCAzLCA2LCA2LCA1LCBcclxuICAgIDMsIDMsIDIsIDUsIDUsIDksIDIsIDIsIDEsIDksIDksIDgsIDEsIDEsIDAsIDgsXHJcbiAgICA1LCA2LCAxMCwgNiwgNywgMTAsIDcsIDgsIDEwLCA4LCA5LCAxMCwgOSwgNSwgMTAsXHJcbiAgICAwLCAxLCAxMSwgMSwgMiwgMTEsIDIsIDMsIDExLCAzLCA0LCAxMSwgNCwgMCwgMTEsXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgaWNvdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpY29pbmQpIFxyXG4gICAgaWNvdmVydGV4ZXMucHVzaCh2ZWMzKGljb3ZlcnRbaV0pKTtcclxuXHJcbiAgY29uc3QgdmVydCA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaWNvaW5kLmxlbmd0aDsgaSArPSAzKVxyXG4gICAgdmVydC5wdXNoKHZlcnRleChpY292ZXJ0ZXhlc1tpXS5hZGQoaWNvdmVydGV4ZXNbaSArIDFdKS5hZGQoaWNvdmVydGV4ZXNbaSArIDJdKS5kaXYoMykpKTtcclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICAwLCAxLCAyLCAwLCAyLCAxMSwgMCwgMTEsIDEyLFxyXG4gICAgMTEsIDIsIDMsIDExLCAzLCA0LCAxMSwgNCwgMTAsXHJcbiAgICAxMCwgNCwgNSwgMTAsIDUsIDYsIDEwLCA2LCAxNCwgXHJcbiAgICAxNCwgNiwgNywgMTQsIDcsIDgsIDE0LCA4LCAxMyxcclxuICAgIDEzLCA4LCA5LCAxMywgOSwgMCwgMTMsIDAsIDEyLFxyXG5cclxuICAgIDIsIDEsIDMsIDEsIDMsIDE5LCAxLCAxNSwgMTksXHJcbiAgICAzLCAxOSwgMTgsIDMsIDE4LCA1LCAzLCA1LCA0LFxyXG4gICAgNSwgMTgsIDE3LCA1LCA2LCAxNywgNiwgMTcsIDcsXHJcbiAgICA3LCAxNywgMTYsIDcsIDE2LCA4LCAxNiwgOCwgOSxcclxuICAgIDksIDE2LCAxNSwgOSwgMTUsIDEsIDksIDEsIDAsXHJcblxyXG4gICAgMTAsIDExLCAxNCwgMTEsIDE0LCAxMywgMTEsIDEzLCAxMixcclxuICAgIDE3LCAxOCwgMTksIDE3LCAxOSwgMTUsIDE3LCAxNSwgMTZcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7IFxyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufSAvLyBFbmQgb2YgJ3NldERvZGVjYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgcmhvbWJpYyB0cmlhY29udGFoZWRyb24gKDMwIGZhY2VzKSBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldDMwaGVkcm9uKCkge1xyXG4gIGNvbnN0IHBoaSA9ICgxICsgTWF0aC5zcXJ0KDUpKSAvIDIsIGggPSBwaGk7XHJcblxyXG4gIGxldCB2ZXJ0ID0gW3ZlcnRleCgwLCBNYXRoLnNxcnQoMikgKiBwaGkgLyAyLCAwKV07XHJcbiAgXHJcbiAgbGV0IGFuZ2xlID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChwaGkgKiBNYXRoLmNvcyhhbmdsZSksIDAsIHBoaSAqIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgYW5nbGUgPSBNYXRoLmF0YW4oMSAvIHBoaSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCBNYXRoLnNxcnQoMikgKiBwaGkgLyA0LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKVxyXG4gICAgdmVydC5wdXNoKHZlcnRleCh2ZXJ0W2ldLnBvaW50LmFkZCh2ZXJ0W2kgJSA1ICsgMV0ucG9pbnQpLnN1Yih2ZXJ0W2kgKyA1XS5wb2ludCkpKTtcclxuXHJcblxyXG4gIHZlcnQucHVzaCh2ZXJ0ZXgoMCwgLU1hdGguc3FydCgyKSAqIHBoaSAvIDIgLSBoLCAwKSk7XHJcbiAgXHJcbiAgYW5nbGUgPSBNYXRoLlBJO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHBoaSAqIE1hdGguY29zKGFuZ2xlKSwgLWgsIHBoaSAqIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgYW5nbGUgPSBNYXRoLlBJICsgTWF0aC5hdGFuKDEgLyBwaGkpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgLU1hdGguc3FydCgyKSAqIHBoaSAvIDQgLSBoLCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKVxyXG4gICAgdmVydC5wdXNoKHZlcnRleCh2ZXJ0W2kgKyAxNl0ucG9pbnQuYWRkKHZlcnRbaSAlIDUgKyAxN10ucG9pbnQpLnN1Yih2ZXJ0W2kgKyAyMV0ucG9pbnQpKSk7XHJcblxyXG4gIFxyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEwLCA2LCAxMCwgNiwgMSxcclxuICAgIDAsIDYsIDcsIDYsIDcsIDIsXHJcbiAgICAwLCA4LCA3LCA4LCA3LCAzLFxyXG4gICAgMCwgOCwgOSwgOSwgOCwgNCxcclxuICAgIDAsIDksIDEwLCAxMCwgOSwgNSxcclxuXHJcbiAgICA2LCAxLCAyLCAxLCAyLCAxMSxcclxuICAgIDcsIDIsIDMsIDIsIDMsIDEyLFxyXG4gICAgOCwgNCwgMywgNCwgMywgMTMsXHJcbiAgICA1LCA5LCA0LCA1LCA0LCAxNCxcclxuICAgIDUsIDEwLCAxLCA1LCAxLCAxNSxcclxuXHJcbiAgICAxNiwgMjYsIDIyLCAyNiwgMjIsIDE3LFxyXG4gICAgMTYsIDIyLCAyMywgMjIsIDIzLCAxOCxcclxuICAgIDE2LCAyNCwgMjMsIDI0LCAyMywgMTksXHJcbiAgICAxNiwgMjQsIDI1LCAyNSwgMjQsIDIwLFxyXG4gICAgMTYsIDI1LCAyNiwgMjYsIDI1LCAyMSxcclxuXHJcbiAgICAyMiwgMTcsIDE4LCAxNywgMTgsIDI3LFxyXG4gICAgMjMsIDE4LCAxOSwgMTgsIDE5LCAyOCxcclxuICAgIDI0LCAyMCwgMTksIDIwLCAxOSwgMjksXHJcbiAgICAyMSwgMjUsIDIwLCAyMSwgMjAsIDMwLFxyXG4gICAgMjEsIDI2LCAxNywgMjEsIDE3LCAzMSxcclxuXHJcbiAgICAxOCwgMjgsIDE0LCAxNCwgNSwgMjgsXHJcbiAgICAyOCwgMTksIDE1LCAxNSwgNSwgMjgsXHJcbiAgICAxOSwgMjksIDE1LCAxNSwgMSwgMjksXHJcbiAgICAyOSwgMjAsIDEsIDEsIDExLCAyMCxcclxuICAgIDIwLCAzMCwgMTEsIDExLCAyLCAzMCxcclxuICAgIDMwLCAyMSwgMiwgMiwgMTIsIDIxLFxyXG4gICAgMjEsIDMxLCAxMiwgMTIsIDMsIDMxLFxyXG4gICAgMzEsIDE3LCAzLCAzLCAxMywgMTcsXHJcbiAgICAxNywgMjcsIDEzLCAxMywgNCwgMjcsXHJcbiAgICAyNywgMTgsIDQsIDQsIDE0LCAxOFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICBsZXQgcHJtRGF0YSA9IHByaW1EYXRhKHZlcnRleGVzKTtcclxuICBwcm1EYXRhLm1hdHJpeCA9IG1hdDQoKS5zZXRTY2FsZSgwLjUpLm11bChtYXQ0KCkuc2V0VHJhbnMoMCwgMC41LCAwKSk7IFxyXG4gIHJldHVybiBwcm1EYXRhO1xyXG59IC8vIEVuZCBvZiAnc2V0MzBoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3BoZXJlKHNpemVQaGksIHNpemVUaGV0YSkge1xyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcbiAgY29uc3QgUEkgPSBNYXRoLlBJO1xyXG4gIGNvbnN0IHN0ZXBQaGkgPSAyICogUEkgLyBzaXplUGhpO1xyXG4gIGNvbnN0IHN0ZXBUaGV0YSA9IFBJIC8gc2l6ZVRoZXRhO1xyXG5cclxuICBjb25zdCBwaGlTdGVwU2luID0gTWF0aC5zaW4oc3RlcFBoaSk7XHJcbiAgY29uc3QgcGhpU3RlcENvcyA9IE1hdGguY29zKHN0ZXBQaGkpO1xyXG4gIGNvbnN0IHRoZXRhU3RlcFNpbiA9IE1hdGguc2luKHN0ZXBUaGV0YSk7XHJcbiAgY29uc3QgdGhldGFTdGVwQ29zID0gTWF0aC5jb3Moc3RlcFRoZXRhKTtcclxuXHJcbiAgZm9yIChsZXQgdGhldGEgPSAwOyB0aGV0YSA8IDIgKiBQSTsgdGhldGEgKz0gc3RlcFRoZXRhKVxyXG4gICAgZm9yIChsZXQgcGhpID0gLVBJIC8gMjsgcGhpIDwgUEkgLyAyOyBwaGkgKz0gc3RlcFBoaSkge1xyXG4gICAgICBsZXQgcGhpU2luID0gTWF0aC5zaW4ocGhpKTtcclxuICAgICAgbGV0IHBoaUNvcyA9IE1hdGguY29zKHBoaSk7XHJcbiAgICAgIGxldCB0aGV0YVNpbiA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgICAgbGV0IHRoZXRhQ29zID0gTWF0aC5jb3ModGhldGEpO1xyXG5cclxuICAgICAgbGV0IHRoZXRhV2l0aFN0ZXBTaW4gPSB0aGV0YVNpbiAqIHRoZXRhU3RlcENvcyArIHRoZXRhQ29zICogdGhldGFTdGVwU2luO1xyXG4gICAgICBsZXQgcGhpV2l0aFN0ZXBTaW4gPSBwaGlTaW4gKiBwaGlTdGVwQ29zICsgcGhpQ29zICogcGhpU3RlcFNpbjtcclxuICAgICAgbGV0IHRoZXRhV2l0aFN0ZXBDb3MgPSB0aGV0YUNvcyAqIHRoZXRhU3RlcENvcyAtIHRoZXRhU2luICogdGhldGFTdGVwU2luO1xyXG4gICAgICBsZXQgcGhpV2l0aFN0ZXBDb3MgPSBwaGlDb3MgKiBwaGlTdGVwQ29zIC0gcGhpU2luICogcGhpU3RlcFNpbjtcclxuXHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaUNvcyAqIHRoZXRhQ29zLCBwaGlTaW4sIHBoaUNvcyAqIHRoZXRhU2luKSk7XHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaVdpdGhTdGVwQ29zICogdGhldGFDb3MsIHBoaVdpdGhTdGVwU2luLCBwaGlXaXRoU3RlcENvcyAqIHRoZXRhU2luKSk7XHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaUNvcyAqIHRoZXRhV2l0aFN0ZXBDb3MsIHBoaVNpbiwgcGhpQ29zICogdGhldGFXaXRoU3RlcFNpbikpO1xyXG4gICAgICBcclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpV2l0aFN0ZXBDb3MgKiB0aGV0YVdpdGhTdGVwQ29zLCBwaGlXaXRoU3RlcFNpbiwgcGhpV2l0aFN0ZXBDb3MgKiB0aGV0YVdpdGhTdGVwU2luKSk7XHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaVdpdGhTdGVwQ29zICogdGhldGFDb3MsIHBoaVdpdGhTdGVwU2luLCBwaGlXaXRoU3RlcENvcyAqIHRoZXRhU2luKSk7XHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaUNvcyAqIHRoZXRhV2l0aFN0ZXBDb3MsIHBoaVNpbiwgcGhpQ29zICogdGhldGFXaXRoU3RlcFNpbikpO1xyXG4gICAgfVxyXG4gIFxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRMaW5lKHN0YXJ0LCBlbmQpIHtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFt2ZXJ0ZXgoc3RhcnQpLCB2ZXJ0ZXgoZW5kKSwgdmVydGV4KGVuZC5hZGQodmVjMygwLjAwNSkpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4KHN0YXJ0KSwgdmVydGV4KGVuZC5hZGQodmVjMygwLjAwNSkpKSwgdmVydGV4KHN0YXJ0LmFkZCh2ZWMzKDAuMDA1KSkpXTtcclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QUFCQihtaW5CQiwgbWF4QkIpIHtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtcclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLFxyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksXHJcblxyXG4gICAgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQiksXHJcbiAgICB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCKSxcclxuXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWluQkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSxcclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1pbkJCLnopLFxyXG5cclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLFxyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcblxyXG4gICAgdmVydGV4KG1pbkJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSxcclxuICAgIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIpLFxyXG5cclxuICAgIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcbiAgICB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCKVxyXG4gIF07XHJcblxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkT2JqKGZpbGVOYW1lKSB7XHJcbiAgbGV0IHZlcnQgPSBbXTtcclxuICBsZXQgZmlsZSA9IGF3YWl0IGZldGNoKGBiaW4vbW9kZWxzLyR7ZmlsZU5hbWV9YCk7XHJcbiAgbGV0IHNyYyA9IGF3YWl0IGZpbGUudGV4dCgpO1xyXG4gIGxldCBsaW5lcyA9IHNyYy5zcGxpdCgnXFxuJyk7XHJcblxyXG4gIGxldCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gIGxldCBpbmRleGVzID0gW107XHJcbiAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xyXG4gICAgICBpZiAobGluZVswXSA9PSAndicpIHtcclxuICAgICAgICAgIGxldCB0b2tzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgbGV0IHYgPSBbXTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBpZiAodG9rc1tpXSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRva3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgICAgICAgIHYucHVzaChwYXJzZUZsb2F0KHRva3NbaV0pKTtcclxuXHJcbiAgICAgICAgICB2ZXJ0LnB1c2godmVjMyh2WzBdLCB2WzFdLCB2WzJdKSk7XHJcbiAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2ZWMzKHZbMF0sIHZbMV0sIHZbMl0pKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGluZVswXSA9PSAnZicpIHtcclxuICAgICAgICAgIGxldCB0b2tzID0gbGluZS5zcGxpdCgnICcpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IHQgPSAxOyB0IDwgNDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgLy92ZXJ0ZXgodmVydFtwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMV0pO1xyXG4gICAgICAgICAgICAgIGluZGV4ZXMucHVzaChwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbn1cclxuIiwiaW1wb3J0IHsgbXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL210aF92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIjtcclxuXHJcbi8vIFRlc3QgdW5pdCBjbGFzc1xyXG5jbGFzcyBfcGxheWVyVW5pdCB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBjb2xvcikge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLmNvbnRyb2xhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBvcyA9IHZlYzMoKTtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMuc3BlZWQgPSAwLjE7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVjMygpO1xyXG4gICAgdGhpcy5qdW1wU3BlZWQgPSAwO1xyXG4gICAgdGhpcy5oZWFkWCA9IDA7XHJcbiAgICB0aGlzLmhlYWRZID0gMDtcclxuICAgIHRoaXMuaHAgPSAzO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5ybmQuY2FtLnNldENhbSh2ZWMzKDAsIDgsIDgpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKVxyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gbXRsKHNoZCwgXCJwbGF5ZXJcIiwgdGhpcy5jb2xvci5tdWwoMC43KSwgdGhpcy5jb2xvciwgdmVjMygwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSwgNzYuOCwgMS4wKTtcclxuICAgIHRoaXMucHJpbSA9IHByaW0obWF0ZXJpYWwsIHRvcG8uc2V0U3BoZXJlKDUwMCwgNTAwKSk7XHJcbiAgICB0aGlzLnByaW0ubWF0cml4ID0gdGhpcy5wcmltLm1hdHJpeC5tdWwobWF0NCgpLnNldFNjYWxlKDAuMSkpO1xyXG5cclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgdGhpcy5wcmltLmRyYXcobWF0NCgpLnNldFRyYW5zKHRoaXMucG9zKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlc3BvbnNpbmcgZnVuY3Rpb25cclxuICByZXNwb25zZSgpIHtcclxuICAgIC8vIE1vdmVtZW50XHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c0NsaWNrW1wiRW50ZXJcIl0pIHtcclxuICAgICAgdGhpcy5ybmQuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vICghISEpXHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c0NsaWNrW1wiRXNjYXBlXCJdKVxyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udHJvbGFibGUgPT0gZmFsc2UpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBsZXQgZGlyID0gdGhpcy5ybmQuY2FtLmRpcjtcclxuICAgIGRpci55ID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5wb3MueSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWMzKCk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5RFwiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodmVjMygtZGlyLnosIDAsIGRpci54KSk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5QVwiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodmVjMyhkaXIueiwgMCwgLWRpci54KSk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5V1wiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQoZGlyKTtcclxuICAgICAgaWYgKHRoaXMucm5kLmlucHV0LmtleXNbXCJLZXlTXCJdKVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZChkaXIubmVnKCkpO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgIHRoaXMucG9zID0gdGhpcy5wb3MuYWRkKHRoaXMudmVsb2NpdHkubm9ybSgpLm11bCh0aGlzLnNwZWVkKSk7XHJcblxyXG4gICAgaWYgKHRoaXMuanVtcFNwZWVkID4gLTEpXHJcbiAgICAgIHRoaXMuanVtcFNwZWVkIC09IDAuMDA1O1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c0NsaWNrW1wiU3BhY2VcIl0gJiYgdGhpcy5wb3MueSA9PSAwKVxyXG4gICAgICB0aGlzLmp1bXBTcGVlZCA9IDAuMTtcclxuXHJcbiAgICB0aGlzLnBvcy55ICs9IHRoaXMuanVtcFNwZWVkO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcy55IDwgMClcclxuICAgICAgdGhpcy5wb3MueSA9IDA7XHJcbiAgICBcclxuICAgIHRoaXMuaGVhZFggPSAod2luZG93LmlubmVyV2lkdGggLSB0aGlzLnJuZC5pbnB1dC5tWCkgLyAxMDAwO1xyXG4gICAgdGhpcy5oZWFkWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnJuZC5pbnB1dC5tWSkgLyAxMDAwO1xyXG5cclxuICAgIGlmICh0aGlzLmhlYWRZID49IDEuNSlcclxuICAgICAgdGhpcy5oZWFkWSA9IDEuNTtcclxuICAgIGlmICh0aGlzLmhlYWRZIDw9IC0xLjUpXHJcbiAgICAgIHRoaXMuaGVhZFkgPSAtMS41O1xyXG5cclxuICAgIGRpciA9IHZlYzMoTWF0aC5zaW4odGhpcy5oZWFkWCkgKiBNYXRoLmNvcyh0aGlzLmhlYWRZKSwgTWF0aC5zaW4odGhpcy5oZWFkWSksIE1hdGguY29zKHRoaXMuaGVhZFgpICogTWF0aC5jb3ModGhpcy5oZWFkWSkpLm11bCgzKTtcclxuICAgIHRoaXMucm5kLmNhbS5zZXRDYW0odGhpcy5wb3MuYWRkKHZlYzMoMCwgMSwgMCkpLCB0aGlzLnBvcy5hZGQoZGlyKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBDbG9zaW5nIHVuaXQgZnVuY3Rpb25cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJVbml0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wbGF5ZXJVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgZ2V0TXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IHByaW0sIHByaW1EYXRhLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IGltYWdlLCB0ZXh0dXJlIH0gZnJvbSBcIi4uL3JuZC9yZXMvdGV4dHVyZS5qc1wiO1xyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9wbGF0ZVVuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgc2l6ZSwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCB2ZXJ0ID0gW3ZlcnRleCgtdGhpcy5zaXplLCB0aGlzLmhlaWdodCwgLXRoaXMuc2l6ZSksIFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0ZXgodGhpcy5zaXplLCB0aGlzLmhlaWdodCwgLXRoaXMuc2l6ZSksIFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0ZXgoLXRoaXMuc2l6ZSwgdGhpcy5oZWlnaHQsIHRoaXMuc2l6ZSksXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCh0aGlzLnNpemUsIHRoaXMuaGVpZ2h0LCAtdGhpcy5zaXplKSwgXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCgtdGhpcy5zaXplLCB0aGlzLmhlaWdodCwgdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgdmVydGV4KHRoaXMuc2l6ZSwgdGhpcy5oZWlnaHQsIHRoaXMuc2l6ZSlcclxuICAgIF07XHJcbiAgICB2ZXJ0WzBdLnNldFRleCgwLCAwKTtcclxuICAgIHZlcnRbMV0uc2V0VGV4KDAsIDEpO1xyXG4gICAgdmVydFsyXS5zZXRUZXgoMSwgMCk7XHJcbiAgICB2ZXJ0WzNdLnNldFRleCgwLCAxKTtcclxuICAgIHZlcnRbNF0uc2V0VGV4KDEsIDApO1xyXG4gICAgdmVydFs1XS5zZXRUZXgoMSwgMSk7XHJcblxyXG4gICAgY29uc3QgdGV4SW1nID0gaW1hZ2UoXCJwbGF0ZVwiLCBcImJpbi9pbWcvZmxvb3IuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4ID0gdGV4dHVyZSh0aGlzLnJuZCwgdGV4SW1nKTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gcHJpbURhdGEodmVydCk7XHJcblxyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBjb25zdCBtdGwgPSBnZXRNdGwoc2hkLCBcIkdvbGRcIik7XHJcbiAgICBtdGwuYXR0YWNoVGV4KHRleCk7XHJcbiAgICB0aGlzLnByaW0gPSBwcmltKG10bCwgZGF0YSk7XHJcblxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLnByaW0uZHJhdygpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIENsb3NpbmcgdW5pdCBmdW5jdGlvblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICB9IC8vIEVuZCBvZiAnY2xvc2UnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXRlVW5pdCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcGxhdGVVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgZ2V0TXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIlxyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9jcm9zc1VuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCkge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICBcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIFxyXG4gICAgdGhpcy5jcm9zcyA9IHByaW0oZ2V0TXRsKHNoZCwgXCJTaWx2ZXJcIiksIHRvcG8uc2V0U3BoZXJlKDEwMCwgMTAwKSwgZmFsc2UpO1xyXG4gICAgdGhpcy5jcm9zcy5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC4wMDEpO1xyXG5cclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgdGhpcy5jcm9zcy5kcmF3KG1hdDQoKS5zZXRUcmFucyh0aGlzLnJuZC5jYW0ubG9jLmFkZCh0aGlzLnJuZC5jYW0uZGlyLm11bCgwLjUpKSkpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBDbG9zaW5nIHVuaXQgZnVuY3Rpb25cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjcm9zc1VuaXQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2Nyb3NzVW5pdCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2Nyb3NzVW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoX3ZlYzNcIjtcclxuXHJcbi8vIFJheSBjbGFzc1xyXG5jbGFzcyBfcmF5IHtcclxuICBjb25zdHJ1Y3RvcihvcmlnaW4sIGRpcmVjdGlvbikge1xyXG4gICAgdGhpcy5vcmlnaW4gPSB2ZWMzKG9yaWdpbik7XHJcbiAgICB0aGlzLmRpciA9IHZlYzMoZGlyZWN0aW9uKS5ub3JtKCk7XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgaW50ZXJzZWN0aW9uIHdpdGggQUFCQiB1c2luZyAnU2xhYk1ldGhvZCdcclxuICBnZXRJbnRlcnNlY3Rpb24obWluQkIsIG1heEJCKSB7XHJcbiAgICBsZXQgdExvdyA9IFsobWluQkIueCAtIHRoaXMub3JpZ2luLngpIC8gdGhpcy5kaXIueCwgXHJcbiAgICAgICAgICAgICAgICAobWluQkIueSAtIHRoaXMub3JpZ2luLnkpIC8gdGhpcy5kaXIueSwgXHJcbiAgICAgICAgICAgICAgICAobWluQkIueiAtIHRoaXMub3JpZ2luLnopIC8gdGhpcy5kaXIuelxyXG4gICAgXTtcclxuICAgIGxldCB0SGVpZ2h0ID0gW1xyXG4gICAgICAobWF4QkIueCAtIHRoaXMub3JpZ2luLngpIC8gdGhpcy5kaXIueCwgXHJcbiAgICAgIChtYXhCQi55IC0gdGhpcy5vcmlnaW4ueSkgLyB0aGlzLmRpci55LCBcclxuICAgICAgKG1heEJCLnogLSB0aGlzLm9yaWdpbi56KSAvIHRoaXMuZGlyLnpcclxuICAgIF07XHJcbiAgICBsZXQgdENsb3NlID0gW10sIHRGYXIgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgIGlmICh0SGVpZ2h0W2ldID4gdExvd1tpXSkge1xyXG4gICAgICAgIHRDbG9zZS5wdXNoKHRMb3dbaV0pO1xyXG4gICAgICAgIHRGYXIucHVzaCh0SGVpZ2h0W2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0RmFyLnB1c2godExvd1tpXSk7XHJcbiAgICAgICAgdENsb3NlLnB1c2godEhlaWdodFtpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRDbG9zZSA9IGdldEFycmF5TWF4KHRDbG9zZSk7XHJcbiAgICB0RmFyID0gZ2V0QXJyYXlNaW4odEZhcik7XHJcbiAgICByZXR1cm4gW3RDbG9zZSwgdEZhcl07XHJcbiAgfSAvLyBFbmQgb2YgJ2dldEludGVyc2VjdGlvbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0IHBvaW50IG9uIGJ5IHBhcmFtZXRlciBcclxuICBnZXRQb2ludCh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcmlnaW4uYWRkKHRoaXMuZGlyLm11bCh0KSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldFBvaW50JyBmdW5jdGlvblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcnJheU1pbihhcnIpIHtcclxuICBsZXQgbWluID0gYXJyWzBdO1xyXG4gIGZvciAobGV0IGVsZW0gb2YgYXJyKVxyXG4gICAgaWYgKGVsZW0gPCBtaW4pXHJcbiAgICAgIG1pbiA9IGVsZW07XHJcbiAgcmV0dXJuIG1pbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlNYXgoYXJyKSB7XHJcbiAgbGV0IG1heCA9IGFyclswXTtcclxuICBmb3IgKGxldCBlbGVtIG9mIGFycilcclxuICAgIGlmIChlbGVtID4gbWF4KVxyXG4gICAgICBtYXggPSBlbGVtO1xyXG4gIHJldHVybiBtYXg7XHJcbn1cclxuXHJcbi8vIFJheSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmF5KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9yYXkoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdyYXknIGZ1bmN0aW9uIiwiaW1wb3J0IHsgcmF5IH0gZnJvbSBcIi4uL210aC9tdGhfcmF5LmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IG10bCB9IGZyb20gXCIuLi9ybmQvcmVzL210bC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgKiBhcyB0b3BvIGZyb20gXCIuLi9ybmQvcmVzL3RvcG9sb2d5LmpzXCI7XHJcblxyXG4vLyBUZXN0IHVuaXQgY2xhc3NcclxuY2xhc3MgX3Nob290aW5nVW5pdCB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBjb2xvcikge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnNob290bmcgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5ybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvb3RuZyA9IHRydWU7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFVuaXQgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25cclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgdGhpcy5oaXRzID0gW107XHJcbiAgICB0aGlzLnNoZCA9IGF3YWl0IHRoaXMucm5kLmFkZFNoYWRlcihcImJ1bGxldHNcIik7XHJcbiAgICBcclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgZm9yIChsZXQgaGl0IG9mIHRoaXMuaGl0cylcclxuICAgICAgaWYgKGhpdClcclxuICAgICAgICBoaXQuZHJhdygpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgICBpZiAodGhpcy5zaG9vdG5nKSB7IFxyXG4gICAgICB0aGlzLnNob290bmcgPSBmYWxzZTsgICAgICBcclxuICAgICAgbGV0IGJ1bGxldFJheSA9IHJheSh0aGlzLnJuZC5jYW0ubG9jLCB0aGlzLnJuZC5jYW0uZGlyKTtcclxuICAgICAgbGV0IG1pblQgPSBJbmZpbml0eTtcclxuICAgICAgbGV0IGhpdE5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgZm9yIChsZXQgQUFCQiBvZiB0aGlzLnJuZC5BQUJCKSB7XHJcbiAgICAgICAgbGV0IHQgPSBidWxsZXRSYXkuZ2V0SW50ZXJzZWN0aW9uKEFBQkIubWluQkIsIEFBQkIubWF4QkIpO1xyXG4gICAgICAgIGlmICh0WzBdIDw9IHRbMV0gJiYgdFswXSA+PSAwKSB7XHJcbiAgICAgICAgICBpZiAodFswXSA8IG1pblQpIHtcclxuICAgICAgICAgICAgbWluVCA9IHRbMF07XHJcbiAgICAgICAgICAgIGlmIChBQUJCLmVuZW15KVxyXG4gICAgICAgICAgICAgIGhpdE5hbWUgPSBBQUJCLmVuZW15Lm5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWRkSGl0KHRoaXMucm5kLmNhbS5sb2Muc3ViKHZlYzMoMCwgMSwgMCkpLCBidWxsZXRSYXkuZ2V0UG9pbnQobWluVCksIHRoaXMuY29sb3IpO1xyXG4gICAgICBpZiAoc29ja2V0KVxyXG4gICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiBcInNob290XCIsIHN0YXJ0OiB0aGlzLnJuZC5jYW0ubG9jLCBlbmQ6IGJ1bGxldFJheS5nZXRQb2ludChtaW5UKSwgaGl0OiBoaXROYW1lLCBjb2xvcjogdGhpcy5jb2xvcn0pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChsZXQgaW5kIGluIHRoaXMuaGl0cylcclxuICAgICAgaWYgKHRoaXMuaGl0c1tpbmRdLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuaGl0cy5zcGxpY2UoaW5kLCAxKTtcclxuICAgICAgfVxyXG4gIH0gLy8gRW5kIG9mICdyZXNwb25zZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ2xvc2luZyB1bml0IGZ1bmN0aW9uXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0gLy8gRW5kIG9mICdjbG9zZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gQWRkaW5nIGVuZW15IGhpdCB0byBhcnJheVxyXG4gIGFkZEhpdChzdGFydCwgZW5kLCBjb2xvcikge1xyXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBtdGwodGhpcy5zaGQsIFwiYnVsbGV0XCIsIGNvbG9yLm11bCgwLjcpLCBjb2xvciwgdmVjMygwLjMzMzMsMC4zMzMzLDAuNTIxNTY5KSwgOS44NDYxNSwgMS4wKTtcclxuICAgIGxldCBoaXQgPSBwcmltKG1hdGVyaWFsLCB0b3BvLnNldExpbmUoc3RhcnQsIGVuZCksIGZhbHNlKTtcclxuICAgIGhpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGhpdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sIDEwMCk7XHJcbiAgICB0aGlzLmhpdHMucHVzaChoaXQpO1xyXG4gIH0gLy8gRW5kIG9mICdhZGRIaXQnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNob290aW5nVW5pdCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfc2hvb3RpbmdVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgbXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL210aF92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIlxyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9lbmVteVVuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSwgcG9zLCBjb2xvcikge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuZGlyID0gdmVjMygxLCAwLCAwKTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICBcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gbXRsKHNoZCwgXCJwbGF5ZXJcIiwgdGhpcy5jb2xvci5tdWwoMC43KSwgdGhpcy5jb2xvciwgdmVjMygwLjMzMzMsMC4zMzMzLDAuNTIxNTY5KSwgOS44NDYxNSwgMS4wKTtcclxuICAgIGNvbnN0IG1vZGVsID0gYXdhaXQgdG9wby5sb2FkT2JqKFwiY293Lm9ialwiKTtcclxuICAgIHRoaXMucHJpbSA9IHByaW0obWF0ZXJpYWwsIG1vZGVsKTtcclxuICAgIHRoaXMucHJpbS5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC4xKS5tdWwobWF0NCgpLnNldFJvdGF0ZVooOTApKS5tdWwobWF0NCgpLnNldFJvdGF0ZVkoMTgwKSk7XHJcbiAgICB0aGlzLnByaW0uQkIuZW5lbXkgPSB0aGlzO1xyXG4gIFxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICBsZXQgcm90ID0gbWF0NCgpLnNldFJvdGF0ZVkoTWF0aC5hdGFuMih0aGlzLmRpci56LCB0aGlzLmRpci54KSAqIDE4MCAvIE1hdGguUEkpO1xyXG4gICAgbGV0IHRyID0gbWF0NCgpLnNldFRyYW5zKHRoaXMucG9zKTtcclxuICAgIHRoaXMucHJpbS5kcmF3KHJvdC5tdWwodHIpKTtcclxuICB9IC8vIEVuZCBvZiAnZHJhdycgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVzcG9uc2luZyBmdW5jdGlvblxyXG4gIHJlc3BvbnNlKCkge1xyXG4gIH0gLy8gRW5kIG9mICdyZXNwb25zZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ2xvc2luZyB1bml0IGZ1bmN0aW9uXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wcmltLkJCLmNsb3NlKCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nICghISEpIGVuZW15IHBvc2l0aW9uIGZyb20gc2VydmVyIGZ1bmN0aW9uXHJcbiAgZ2V0UG9zKHBvcykge1xyXG4gICAgdGhpcy5wb3MgPSB2ZWMzKHBvcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldFBvcycgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyAoISEhKSBlbmVteSB2aWV3IGRpcmVjdGlvbiBmcm9tIHNlcnZlciBmdW5jdGlvblxyXG4gIGdldERpcihkaXIpIHtcclxuICAgIHRoaXMuZGlyID0gdmVjMyhkaXIpO1xyXG4gIH0gLy8gRW5kIG9mICdnZXRQb3MnIGZ1bmN0aW9uXHJcblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmVteVVuaXQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2VuZW15VW5pdCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2VuZW15VW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vc3JjL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyByZW5kZXJlciB9IGZyb20gXCIuL3NyYy9ybmQvcm5kLmpzXCI7XHJcbmltcG9ydCAqIGFzIHVuaXQgZnJvbSBcIi4vc3JjL3VuaXRzL3VuaXRzLmpzXCI7XHJcblxyXG5sZXQgcGxheWVyTmFtZSwgcGxheWVyQ29sb3IsIHBsYXllcnMgPSB7fSwgbWU7XHJcblxyXG4vLyBNYWluIHByb2plY3QgZnVuY3Rpb25cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBjb25zdCBybmQgPSByZW5kZXJlcihcIiNnbENhbnZhc1wiKTtcclxuXHJcbiAgbWUgPSB1bml0LnBsYXllclVuaXQocm5kLCBwbGF5ZXJDb2xvcik7XHJcbiAgdW5pdC5wbGF0ZVVuaXQocm5kLCAzMCwgMCk7XHJcbiAgbGV0IHNob290ID0gdW5pdC5zaG9vdGluZ1VuaXQocm5kLCBwbGF5ZXJDb2xvcik7XHJcbiAgdW5pdC5jcm9zc1VuaXQocm5kKTtcclxuICAvL3VuaXQudGVzdFVuaXQocm5kKTtcclxuXHJcbiAgbGV0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovbG9jYWxob3N0OjMwMzBcIik7XHJcbiAgbGV0IGNoYXRXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcnNXaW5kb3dcIik7XHJcbiAge1xyXG4gICAgbGV0IG5ld1BsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbmV3UGxheWVyLmlkID0gcGxheWVyTmFtZTtcclxuICAgIG5ld1BsYXllci5pbm5lclRleHQgPSBwbGF5ZXJOYW1lO1xyXG4gICAgY2hhdFdpbmRvdy5hcHBlbmRDaGlsZChuZXdQbGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpbmRvdy5zb2NrZXQgPT0gdW5kZWZpbmVkKVxyXG4gICAgd2luZG93LnNvY2tldCA9IHNvY2tldDtcclxuXHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiBcImNvbm5lY3RcIiwgdGV4dDogcGxheWVyTmFtZSwgY29sb3I6IHBsYXllckNvbG9yfSkpO1xyXG4gIH07XHJcblxyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgIGxldCBpbmZvID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgIGlmIChpbmZvLnR5cGUgPT0gXCJuYW1lRXJyb3JcIikge1xyXG4gICAgICBhbGVydChpbmZvLmRhdGEpXHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaW5kZXguaHRtbFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm8udHlwZSA9PSBcIm5ld1BsYXllclwiKSB7XHJcbiAgICAgIHBsYXllcnNbaW5mby5kYXRhLm5hbWVdID0gdW5pdC5lbmVteVVuaXQocm5kLCBpbmZvLmRhdGEubmFtZSwgdmVjMyhpbmZvLmRhdGEucG9zKSwgdmVjMyhpbmZvLmRhdGEuY29sb3IpKTtcclxuICAgICAgaWYgKGluZm8uZGF0YS5uYW1lKSB7XHJcbiAgICAgICAgbGV0IG5ld1BsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG5ld1BsYXllci5pZCA9IGluZm8uZGF0YS5uYW1lO1xyXG4gICAgICAgIG5ld1BsYXllci5pbm5lclRleHQgPSBpbmZvLmRhdGEubmFtZTtcclxuICAgICAgICBjaGF0V2luZG93LmFwcGVuZENoaWxkKG5ld1BsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpbmZvLnR5cGUgPT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIGZvciAobGV0IGNoYXJhY3RlciBpbiBpbmZvLmRhdGEpICBcclxuICAgICAgICBpZiAoY2hhcmFjdGVyICE9IHBsYXllck5hbWUpIHtcclxuICAgICAgICAgIHBsYXllcnNbY2hhcmFjdGVyXSA9IHVuaXQuZW5lbXlVbml0KHJuZCwgY2hhcmFjdGVyLCB2ZWMzKGluZm8uZGF0YVtjaGFyYWN0ZXJdLnBvcyksIHZlYzMoaW5mby5kYXRhW2NoYXJhY3Rlcl0uY29sb3IpKTtcclxuICAgICAgICAgIGxldCBuZXdQbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIG5ld1BsYXllci5pZCA9IGNoYXJhY3RlcjtcclxuICAgICAgICAgIG5ld1BsYXllci5pbm5lclRleHQgPSBjaGFyYWN0ZXI7XHJcbiAgICAgICAgICBjaGF0V2luZG93LmFwcGVuZENoaWxkKG5ld1BsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluZm8udHlwZSA9PSBcInNldFBvc1wiKVxyXG4gICAgICBmb3IgKGxldCBjaGFyYWN0ZXIgaW4gaW5mby5kYXRhKVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT0gcGxheWVyTmFtZSlcclxuICAgICAgICAgIGlmIChwbGF5ZXJzW2NoYXJhY3Rlcl0pIHtcclxuICAgICAgICAgICAgcGxheWVyc1tjaGFyYWN0ZXJdLmdldFBvcyhpbmZvLmRhdGFbY2hhcmFjdGVyXS5wb3MpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzW2NoYXJhY3Rlcl0uZ2V0RGlyKGluZm8uZGF0YVtjaGFyYWN0ZXJdLmRpcik7XHJcbiAgICAgICAgICB9XHJcbiAgICBpZiAoaW5mby50eXBlID09IFwicGxheWVyQ2xvc2VcIikge1xyXG4gICAgICBwbGF5ZXJzW2luZm8uZGF0YV0uY2xvc2UoKTtcclxuICAgICAgZGVsZXRlIHBsYXllcnNbaW5mby5kYXRhXTtcclxuICAgICAgbGV0IHRvRGVsID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZm8uZGF0YSk7XHJcbiAgICAgIHRvRGVsLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm8udHlwZSA9PSBcInNob290XCIpIHtcclxuICAgICAgc2hvb3QuYWRkSGl0KHZlYzMoaW5mby5kYXRhLnN0YXJ0KSwgdmVjMyhpbmZvLmRhdGEuZW5kKSwgdmVjMyhpbmZvLmRhdGEuY29sb3IpKTtcclxuICAgICAgaWYgKGluZm8uZGF0YS5oaXQgPT0gcGxheWVyTmFtZSkge1xyXG4gICAgICAgIG1lLmhwLS07XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFsdGhQb2ludHNcIikudGV4dENvbnRlbnQgPSBgSFA6ICR7bWUuaHB9YDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhbWFnZVwiKS5jbGFzc05hbWUgPSBcImlzRGFtYWdlZFwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYW1hZ2VcIikuY2xhc3NOYW1lID0gXCJub25EYW1hZ2VkXCI7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZiAobWUuaHAgPD0gMCkgXHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2luZGV4Lmh0bWxcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNldEludGVydmFsKCgpID0+IHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiBcIm15UG9zXCIsIG5hbWU6IHBsYXllck5hbWUsIHBvczogbWUucG9zLCBkaXI6IHJuZC5jYW0uZGlyfSkpO1xyXG4gIH0sIDEwKTtcclxuXHJcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKS50ZXh0Q29udGVudCA9IGBNTTYgRlBTOiAke3JuZC50aW1lci5GUFN9YDtcclxuICB9LCAxMDAwKTtcclxufSAvLyBFbmQgb2YgJ21haW4nIGZ1bmN0aW9uXHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBwbGF5ZXJOYW1lID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVcIik7XHJcbiAgcGxheWVyQ29sb3IgPSB2ZWMzKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjb2xvclwiKS5zbGljZSgxLCAzKSwgMTYpIC8gMjU1LCBcclxuICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNvbG9yXCIpLnNsaWNlKDMsIDUpLCAxNikgLyAyNTUsIFxyXG4gICAgICAgICAgICAgICAgICAgICBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY29sb3JcIikuc2xpY2UoNSwgNyksIDE2KSAvIDI1NSk7XHJcbiAgbWFpbigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbInRvcG8uc2V0U3BoZXJlIiwidG9wby5zZXRMaW5lIiwidG9wby5sb2FkT2JqIiwidW5pdC5wbGF5ZXJVbml0IiwidW5pdC5wbGF0ZVVuaXQiLCJ1bml0LnNob290aW5nVW5pdCIsInVuaXQuY3Jvc3NVbml0IiwidW5pdC5lbmVteVVuaXQiXSwibWFwcGluZ3MiOiI7OztFQUFBO0VBQ0EsTUFBTSxLQUFLLENBQUM7RUFDWixFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUN4QixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3pDLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUNyQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7RUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwRCxPQUFPLE1BQU07RUFDYixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pELE9BQU87RUFDUCxLQUFLLE1BQU07RUFDWCxNQUFNLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFO0VBQzVDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0MsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMzQyxPQUFPO0VBQ1AsS0FBSztFQUNMLEdBQUc7RUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM5QixNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEQsS0FBSztFQUNMLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDcEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDcEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxHQUFHO0VBQ1IsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtFQUM5QixNQUFNLE9BQU8sR0FBRyxDQUFDO0VBQ2pCLEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMxQixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsSUFBSSxHQUFHO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQzVCLE1BQU0sT0FBTyxJQUFJLENBQUM7RUFDbEIsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO0VBQ1gsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMzQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25DLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1RSxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtFQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRjtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDOUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQy9GLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDakcsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQUU7RUFDcEIsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RixnQkFBZ0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEYsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMs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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLE9BQU8sRUFBRSxJQUFJLFFBQVEsRUFBRTtFQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzNELEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDckQsS0FBSztFQUNMO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUk7RUFDSixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDaEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2hCLE1BQU0sT0FBTyxDQUFDLENBQUM7QUFDZjtFQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7RUFDeEIsSUFBSSxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDOUUsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7RUFDVixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3hCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNuQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNQLE1BQU07RUFDTixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4RCxPQUFPLENBQUM7QUFDUjtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDWCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDdkQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUU7RUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pELFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hELFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDcEgsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Q7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QyxXQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsSDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDQSxTQUFTLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDbEMscUJBQXFCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUNsQyxxQkFBcUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQ2xDO0VBQ0EsRUFBRSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUM1RCxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQzdELENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDNUIsQ0FBQzs7RUMzVUQ7RUFDQSxNQUFNLE9BQU8sQ0FBQztFQUNkLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ2YsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDZCxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNmLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ2pCLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ2QsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDcEIsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDcEIsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbEIsRUFBRSxNQUFNLENBQUM7RUFDVCxFQUFFLE1BQU0sQ0FBQztFQUNULEVBQUUsRUFBRSxDQUFDO0VBQ0wsRUFBRSxFQUFFLENBQUM7RUFDTCxFQUFFLFFBQVEsQ0FBQztFQUNYLEVBQUUsUUFBUSxDQUFDO0VBQ1gsRUFBRSxXQUFXLENBQUM7QUFDZDtFQUNBO0VBQ0EsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hEO0VBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0Msc0JBQXNCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQyxzQkFBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3QyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QyxzQkFBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLHNCQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUNuRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO0VBQzNDLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ2Y7RUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0VBQzdCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FB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LEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNoTCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sYUFBYSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsVUFBVSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNoTCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzNLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxhQUFhLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDNUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sYUFBYSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sWUFBWSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FB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SSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQztFQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEtBQUs7RUFDTCxHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDQSxNQUFNLElBQUksQ0FBQztFQUNYLEVBQUUsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNuQjtFQUNBLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxL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RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQztFQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEtBQUs7RUFDTCxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7RUFDakQsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FB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TSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekg7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDaEQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUN0RSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFO0VBQzdCLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVM7RUFDckMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQzdELFdBQVc7RUFDWCxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDakYsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN6RixPQUFPO0VBQ1AsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNBLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7RUFDdkMsRUFBRSxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7RUFDNUIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ2pELE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDM0g7RUFDQTtFQUNBLE1BQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN4RCxNQUFNLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNoRSxNQUFNLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNoRSxLQUFLO0VBQ0wsR0FBRyxNQUFNO0VBQ1QsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ2hELE1BQU07RUFDTixRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTTtFQUNOLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO0VBQy9CLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO0VBQy9CLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO0VBQy9CLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNuRDtFQUNBLFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDNUIsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDckQsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQzlCLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0VBQzVCLENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDbEMsRUFBRSxPQUFPLElBQUksU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDaEMsQ0FBQzs7RUNwUkQ7RUFDQSxNQUFNLE1BQU0sQ0FBQztFQUNiLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7RUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztFQUMzQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztFQUN4QixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDTyxTQUFTLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRTtFQUMvQixFQUFFLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztFQUM3QixDQUFDO0FBQ0Q7RUFDQTtFQUNBLE1BQU0sUUFBUSxDQUFDO0VBQ2YsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxXQUFXLEdBQUcsSUFBSSxFQUFFO0VBQ2hELElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0VBQzdCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztFQUNsQyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztFQUNyQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzNDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0VBQ3JCLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0VBQ3ZFLG9CQUFvQixHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU07RUFDakMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMvQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDN0QsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWE7RUFDdEYsc0JBQXNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNuQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN6QyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUM5RSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUM5RSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0I7RUFDakUsb0NBQW9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQztFQUNqRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2xGLFFBQU87RUFDUCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDakMsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDL0IsQ0FBQzs7RUMyT00sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtFQUM5QyxFQUFFLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztFQUN0QixFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDckIsRUFBRSxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztFQUNuQyxFQUFFLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDbkM7RUFDQSxFQUFFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDdkMsRUFBRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQ3ZDLEVBQUUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUMzQyxFQUFFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0M7RUFDQSxFQUFFLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssSUFBSSxTQUFTO0VBQ3hELElBQUksS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLE9BQU8sRUFBRTtFQUMxRCxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxNQUFNLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckM7RUFDQSxNQUFNLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxRQUFRLEdBQUcsWUFBWSxDQUFDO0VBQy9FLE1BQU0sSUFBSSxjQUFjLEdBQUcsTUFBTSxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO0VBQ3JFLE1BQU0sSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLFFBQVEsR0FBRyxZQUFZLENBQUM7RUFDL0UsTUFBTSxJQUFJLGNBQWMsR0FBRyxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDckU7RUFDQSxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFFLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDbEcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7RUFDMUY7RUFDQSxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsY0FBYyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztFQUNsSCxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2xHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0VBQzFGLEtBQUs7RUFDTDtFQUNBLEVBQUUsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDNUIsQ0FBQztBQUNEO0VBQ08sU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtFQUNwQyxFQUFFLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUM1RSxvQkFBb0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEVBQUUsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDNUIsQ0FBQztBQXlCRDtFQUNPLGVBQWUsT0FBTyxDQUFDLFFBQVEsRUFBRTtFQUN4QyxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztFQUNoQixFQUFFLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRCxFQUFFLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0VBQzlCLEVBQUUsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QjtFQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0VBQ3BCLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0VBQ25CLEVBQUUsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7RUFDMUIsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7RUFDMUIsVUFBVSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JDLFVBQVUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JCO0VBQ0EsVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoRCxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtFQUNqQyxrQkFBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO0VBQ3RCLGVBQWU7RUFDZixXQUFXO0FBQ1g7RUFDQSxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQztFQUNBLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVDLFVBQVUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hELE9BQU8sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7RUFDakMsVUFBVSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDO0VBQ0EsVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3RDO0VBQ0EsY0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDaEUsV0FBVztFQUNYLE9BQU87RUFDUCxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztFQUNyQzs7RUNyWEE7RUFDQSxNQUFNLFdBQVcsQ0FBQztFQUNsQixFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0VBQzFCLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7RUFDbkIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztFQUM3QixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUMzQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNuQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2hCO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO0VBQzlELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxNQUFNLElBQUksR0FBRztFQUNmLElBQUksTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNsRCxJQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3hILElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFQSxTQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDekQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEU7RUFDQTtFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDM0IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzlDLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxRQUFRLEdBQUc7RUFDYjtFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7RUFDM0MsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0VBQzNDLE1BQU0sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7RUFDOUIsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7RUFDMUMsTUFBTSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUMvQjtFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUs7RUFDakMsTUFBTSxPQUFPO0FBQ2I7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUMvQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ3pCLE1BQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUM3QixNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMvQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDckQsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0VBQzNCLE1BQU0sSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7RUFDOUI7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDNUQsTUFBTSxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUMzQjtFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNqQztFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ3RCLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCO0VBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO0VBQ2hFLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FB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Q0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3JILElBQUksTUFBTSxLQUFLLEdBQUcsTUFBTUMsT0FBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ2hELElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQ3RDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0VBQzlCO0VBQ0E7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzNCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNwRixJQUFJLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDaEMs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
