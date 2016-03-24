// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function nil(x) { return typeof(x) == undefined || x == null; }
function is(x) { return !nil(x); }

function rad2deg(x) { return x*360/(2*3.1415926); }
function lerp(a,b,t) { return a+t*(b-a); }

function V2(pt) { if (pt.cx) { return [pt.cx,pt.y2]; } if (pt.getBBox) { return V2(pt.getBBox()); } if (pt.x) { return [pt.x, pt.y] }; return pt; }

function V2dot(A,B) { return A[0]*B[0]+A[1]*B[1]; }
function V2len(A) { return Math.sqrt(V2dot(A,A)); }
function V2add(A,B) { return [A[0]+B[0],A[1]+B[1]]; }
function V2sub(A,B) { return [A[0]-B[0],A[1]-B[1]]; }
function V2mul(s,A) { return [s*A[0],s*A[1]]; }
function V2lerp(A,B,t) { return [lerp(A[0],B[0],t), lerp(A[1],B[1],t)]; }
function V2mid(A,B) { return V2lerp(A,B,0.5); }
function V2dist(A,B) { return V2len(V2sub(B,A)); }
function V2cross(A,B) { var C = V2sub(B,A); return [-C[1],C[0]] }
function V2rot(A,B) { var C = V2cross(A,B); return -Math.atan2(C[0],C[1]); }

function on(track, x) { return V2(track.getPointAtLength(x)); }
function bbox(e) { var bb = e.getBBox(); return [bb.x,bb.y,bb.x2,bb.y2]; }

function YPos() { return window.pageYOffset || window.scrollY; }
function YMax() {
  // http://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
  return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight) - window.innerHeight;
}

// illustrator sometimes appends _1_ to IDs for mysterious reasons.
function sel(s, name) {
  if (name[0] != '#') { name = '#' + name; }
  return s.select(name+'_1_') || s.select(name);
}

function xform(e,Tx,Ty,rot,Rx,Ry) {
  var s = "";
  if (is(Tx))  { s += 't'+Tx+','+Ty; }
  if (is(rot)) { s += 'r'+rot; }
  if (is(Rx))  { s += ','+Rx+','+Ry; }
  // console.log(s);
  return e.transform(s);
}

function Xform(e,T,rot,R) {
  return xform(e,T[0],T[1],rot,R[0],R[1]);
}

function distBetween(e1,e2) {
  return V2len(V2sub(V2(e1), V2(e2)));
}

function cart(e,wheelL,wheelR,track,x) {
  var L = V2(wheelL);
  var R = V2(wheelR);
  var Lpos = on(track, x);
  var Rpos = on(track, x + V2dist(L,R));
  var rot = V2rot(Lpos,Rpos);
  return Xform(e, V2sub(Lpos,L), rad2deg(rot), L);
}

$(document).ready(function() {
  var root = Snap('#infograph');
  Snap.load('svg/scene.svg', function(scene) {
    root.append(scene);
    var track = sel(root,'#track');
    var dino = sel(root,'#dinoCar');
    var wheelL = sel(root,'#dinoWheelL');
    var wheelR = sel(root,'#dinoWheelR');

    var dx = -dino.getBBox().x;
    var dy = -dino.getBBox().y;
    xform(dino, 0, 0);
    xform(wheelL, dx, dy);
    xform(wheelR, dx, dy);

    // Snap.animate(0, track.getTotalLength(), function(l) {
    //   cart(dino,wheelL,wheelR,track,l);
    // }, 30000, mina.bounce);


    var start = new Date().getTime();
    var t=0,dt=0,now=start,time;
    var fps=0,fpsSec=0,fpsCount=0;

    var u,uChase=0;

    function updateT() {
      now = new Date().getTime();
      dt = now - (time || now);
      t = now - start;
      time = now;
      t /= 1000.0;
      dt /= 1000.0;
    }

    function updateFPS() {
      var sec = Math.floor(t);
      if (sec != fpsSec) {
        fpsSec = sec;
        fps = fpsCount;
        fpsCount = 0;
        console.log("fps: " + fps);
      } else {
        ++fpsCount;
      }
    }

    function update() {
      updateT();
      updateFPS();

      var y=YPos();
      var y2=YMax();
      var yt=y/y2;
      var l=yt*track.getTotalLength();

      uChase=l;
      // console.log([u,uChase]);

      var k=4.0;
      u=u||uChase;
      u=lerp(u,uChase,k*dt);

      cart(dino,wheelL,wheelR,track,u);
    }

    function render() {
      update();
      var ctx={root:root};
    }

    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();
  });
});
