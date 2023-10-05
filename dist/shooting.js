/*! For license information please see shooting.js.LICENSE.txt */
!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i=Math.floor(1e3/60),r=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},o=new(function(){function t(t){var e=this;this.isReady=!1,this.image=new Image,this.image.src=t,this.image.onload=function(){e.isReady=!0},this.image.onerror=function(t){}}return t.prototype.getImage=function(){if(this.isReady)return this.image},t}())("asset/img/sprite.png"),s=function(t,e,n,i){this.x=t,this.y=e,this.w=n,this.h=i},a=[new s(0,0,22,42),new s(23,0,33,42),new s(57,0,43,42),new s(101,0,33,42),new s(135,0,21,42)],u=function(){function t(){this.x=57600,this.y=102400,this.speed=1024,this.anime=0}var e=t.prototype;return e.update=function(){f[37]&&this.x>this.speed?(this.x-=this.speed,this.anime>-8&&--this.anime):f[39]&&this.x<=115200-this.speed?(this.x+=this.speed,this.anime<8&&++this.anime):(this.anime>0&&(this.anime-=2),this.anime<0&&(this.anime+=2)),f[38]&&this.y>this.speed&&(this.y-=this.speed),f[40]&&this.y<=204800-this.speed&&(this.y+=this.speed)},e.draw=function(){!function(t,e,n){var i=a[t],r=i.x,s=i.y,u=i.w,h=i.h,f=(e>>8)-u/2,c=(n>>8)-h/2,d=y.get();if(!(f+u/2<d.x||f-u/2>=d.x+225||c+h/2<d.y||c-h/2>=d.y+400)){var l=o.getImage();x.drawImage(l,r,s,u,h,f,c,u,h)}}(2+(this.anime>>2),this.x,this.y)},t}(),h=function(){function t(t,e){this.x=t,this.y=e}var e=t.prototype;return e.get=function(){return{x:this.x,y:this.y}},e.set=function(t){var e=t.x,n=t.y;this.x=e,this.y=n},t}(),f=[],c=new u,y=new h(0,0),d=document.getElementById("can"),l=d.getContext("2d");d.width=450,d.height=800;var p=document.createElement("canvas"),x=p.getContext("2d");p.width=450,p.height=800;var m=0,v=0,g=Date.now();document.onkeydown=function(t){f[t.keyCode]=!0},document.onkeyup=function(t){f[t.keyCode]=!1};var w=[],b=function(){function t(){this.x=r(0,450)<<8,this.y=r(0,800)<<8,this.vx=0,this.vy=r(30,300),this.sz=r(1,2)}var e=t.prototype;return e.draw=function(){var t=this.x>>8,e=this.y>>8,n=y.get();t<n.x||t>=n.x+225||e<n.y||e>=n.y+400||(x.fillStyle=0!==r(0,2)?"#66f":"#8af",x.fillRect(t,e,this.sz,this.sz))},e.update=function(){this.x+=this.vx,this.y+=this.vy,this.y>204800&&(this.y=0,this.x=r(0,450)<<8)},t}();var I=function(){!function(t){for(var e=t.length,n=0;n<e;++n)t[n].update()}(w),c.update()},S=function(){!function(){x.fillStyle="black";var t=y.get();x.fillRect(t.x,t.y,225,400),function(t){for(var e=t.length,n=0;n<e;++n)t[n].draw()}(w),c.draw();var e={x:(c.x>>8)/450*225,y:(c.y>>8)/800*400};y.set(e),l.drawImage(p,e.x,e.y,225,400,0,0,450,800)}(),m++,g+1e3<=Date.now()&&(v=m,m=0,g=Date.now()),l.font="20px 'Impact'",l.fillStyle="white",l.fillText("FPS :"+v,20,20)};window.onload=function(){return function(){for(var t=0;t<300;++t)w[t]=new b;setInterval(I,i),requestInterval(S,Math.floor(i/4))}()}}]);