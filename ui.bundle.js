(()=>{"use strict";function e(e,t){return e.get(function(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}(e,t))}function t(e,t,o){return t=r(t),function(e,t){if(t&&("object"==u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,n()?Reflect.construct(t,o||[],r(e).constructor):t.apply(e,o))}function n(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(n=function(){return!!e})()}function r(e){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},r(e)}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,s(r.key),r)}}function l(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function s(e){var t=function(e){if("object"!=u(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:t+""}var f=1e12,p=function(){return l((function e(){c(this,e),this.currentValue=0,this.history=[],this.memory=[]}),[{key:"execute",value:function(e){if(e instanceof _)e.execute(this);else{this.history.push(this.currentValue);var t=e.execute(this.currentValue);if(!function(e){return e<Number.MAX_SAFE_INTEGER&&e>Number.MIN_SAFE_INTEGER}(t))throw new Error("value is out of bounds");this.currentValue=t}}},{key:"undo",value:function(){0!==this.history.length&&(this.currentValue=this.history.pop())}},{key:"clear",value:function(){this.currentValue=0,this.history=[]}}])}(),h=l((function e(){if(c(this,e),(this instanceof e?this.constructor:void 0)===e)throw new Error("Command is an abstract class and cannot be instantiated directly.")})),y=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){return(e*f+this.value*f)/f}}])}(h),v=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){return(e*f-this.value*f)/f}}])}(h),m=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){return e*this.value}}])}(h),w=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){if(0===this.value)throw new Error("Division by zero is not allowed");return e/this.value}}])}(h),x=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return Math.pow(e,2)}}])}(h),b=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return Math.pow(e,3)}}])}(h),d=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){if(this.value<1&&this.value>0&&e<0)throw new Error("impossible to take even root of negative number");return Math.pow(e,this.value)}}])}(h),E=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return Math.pow(10,e)}}])}(h),k=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){if(e<0)throw new Error("square root of a negative number");return Math.pow(e,.5)}}])}(h),g=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return e<0?-Math.pow(-e,1/3):Math.pow(e,1/3)}}])}(h),C=function(e){function n(e){var r;return c(this,n),(r=t(this,n)).value=e,r}return o(n,e),l(n,[{key:"execute",value:function(e){if(0===this.value)throw new Error("can't take the 0th root");if(e<0&&this.value%2==0)throw new Error("can't take an even root of a negative number");if(e<0&&this.value<0)throw new Error("can't take a negative root of a negative number");return e<0?-Math.pow(-e,1/this.value):Math.pow(e,1/this.value)}}])}(h),S=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return e/100}}])}(h),V=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){return-e}}])}(h),j=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(e){if(0===e)throw new Error("can't divide by 0");return 1/e}}])}(h),N=new WeakMap,O=function(n){function r(){var n,o,i,u;return c(this,r),o=n=t(this,r),u=function(t){return 0===t||1===t?1:t*e(N,n).call(n,t-1)},function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(o,i=N),i.set(o,u),n}return o(r,n),l(r,[{key:"execute",value:function(t){if(t-parseInt(0!==t))throw new Error("value is not an integer");if(t<0)throw new Error("factorial of a negative number is undefined");return e(N,this).call(this,t)}}])}(h),M=function(e){function n(){return c(this,n),t(this,n)}return o(n,e),l(n,[{key:"execute",value:function(){return+(new Date).getTime()%f/f}}])}(h),_=function(){return l((function e(){if(c(this,e),(this instanceof e?this.constructor:void 0)===e)throw new TypeError("cannot construct MemoryCommand instances directly")}),[{key:"execute",value:function(){throw new Error("method 'execute()' must be implemented.")}}])}(),P=function(e){function n(){return c(this,n),t(this,n,arguments)}return o(n,e),l(n,[{key:"execute",value:function(e){e.currentValue=0,e.memory.length=0}}])}(_),T=function(e){function n(){return c(this,n),t(this,n,arguments)}return o(n,e),l(n,[{key:"execute",value:function(e){if(e.memory.length>=Array.MAX_SAFE_INTEGER)throw new Error("memory is overflown");e.memory.push(e.currentValue)}}])}(_),R=function(e){function n(){return c(this,n),t(this,n,arguments)}return o(n,e),l(n,[{key:"execute",value:function(e){if(0===e.memory.length)throw new Error("memory is empty");e.memory.length--}}])}(_),A=function(e){function n(){return c(this,n),t(this,n,arguments)}return o(n,e),l(n,[{key:"execute",value:function(e){if(0===e.memory.length)throw new Error("memory is empty");e.currentValue=e.memory[e.memory.length-1]}}])}(_),F=[{icon:"(",value:"(",type:"complex"},{icon:")",value:")",type:"complex"},{icon:"mc",operation:function(){return new P},type:"complex"},{icon:"m+",operation:function(){return new T},type:"complex"},{icon:"m-",operation:function(){return new R},type:"complex"},{icon:"mr",operation:function(){return new A},type:"complex"},{icon:"2nd",type:"complex"},{icon:"x²",operation:function(){return new x},type:"complex"},{icon:"x³",operation:function(){return new b},type:"complex"},{icon:"xʸ",operation:function(e){return new d(e)},type:"complex"},{icon:"eˣ",type:"complex"},{icon:"10ˣ",operation:function(){return new E},type:"complex"},{icon:"1/x",operation:function(){return new j},type:"complex"},{icon:"²√x",operation:function(){return new k},type:"complex"},{icon:"³√x",operation:function(){return new g},type:"complex"},{icon:"ʸ√x",operation:function(e){return new C(e)},type:"complex"},{icon:"ln",type:"complex"},{icon:"log₁₀",type:"complex"},{icon:"x!",operation:function(){return new O},type:"complex"},{icon:"sin",type:"complex"},{icon:"cos",type:"complex"},{icon:"tan",type:"complex"},{icon:"e",value:2.7183,type:"complex"},{icon:"EE",type:"complex"},{icon:"Rad",type:"complex"},{icon:"sinh",type:"complex"},{icon:"cosh",type:"complex"},{icon:"tanh",type:"complex"},{icon:"π",value:3.141592653589793,type:"complex"},{icon:"Rand",operation:function(){return new M},type:"complex"},{icon:"AC",operation:"clear",type:"basic"},{icon:"+/-",operation:function(){return new V},type:"basic"},{icon:"%",operation:function(){return new S},type:"basic"},{icon:"÷",operation:function(e){return new w(e)},type:"basic"},{icon:"7",value:"7",type:"basic"},{icon:"8",value:"8",type:"basic"},{icon:"9",value:"9",type:"basic"},{icon:"×",operation:function(e){return new m(e)},type:"basic"},{icon:"4",value:"4",type:"basic"},{icon:"5",value:"5",type:"basic"},{icon:"6",value:"6",type:"basic"},{icon:"-",operation:function(e){return new v(e)},type:"basic"},{icon:"1",value:"1",type:"basic"},{icon:"2",value:"2",type:"basic"},{icon:"3",value:"3",type:"basic"},{icon:"+",operation:function(e){return new y(e)},type:"basic"},{icon:"0",value:"0",type:"basic"},{icon:".",value:".",type:"basic"},{icon:"=",operation:"equal",type:"basic"}],I=document.createElement("div");I.className="calculator-container";var q=document.createElement("div");q.className="calculator-display";var D=document.createElement("button");D.textContent="Undo",D.id="undo-btn",document.body.appendChild(D),document.body.appendChild(I),I.appendChild(q);var G=document.createElement("div");G.className="basic-calculator-container";var z=document.createElement("div");z.className="complex-operations-container",I.appendChild(z),I.appendChild(G);var B=new p,L="",X=!1,U=null;q.textContent=L;var W=function(e){L="",q.textContent="Error",console.error(e)},H=function(){B.clear(),L="",U=null,X=!1,q.textContent=""};D.addEventListener("click",(function(){try{B.undo(),L=B.currentValue.toString()||"0",X=L.includes("."),q.textContent=L}catch(e){W(e)}}));var J=function(e){var t=e.operation,n=e.value,r=e.icon;t?function(e){var t=e.operation,n=e.icon;try{if("function"==typeof t){if(!U&&L&&(B.currentValue=parseFloat(L)),q.textContent.includes("=")&&(q.textContent=B.currentValue.toString()),L)switch(n){case"ʸ√x":q.textContent+=" √ ";break;case"xʸ":q.textContent+=" ^ ";break;default:q.textContent+=" ".concat(n," ")}if(U&&L){var r=parseFloat(L),o=U(r);B.execute(o)}if(L="",U=t,X=!1,!t.length){var i=U();return B.execute(i),L=B.currentValue.toString(),X=L.includes("."),void(q.textContent=L)}}switch(t){case"clear":H();break;case"equal":!function(){try{if(U&&L){var e=parseFloat(L),t=U(e);B.execute(t),q.textContent+=" = "+B.currentValue.toString(),L=B.currentValue.toString(),X=!1,U=null}}catch(e){W(e)}}()}}catch(e){W(e)}}({operation:t,icon:r}):(n||r)&&function(e,t){if(["e","π"].includes(t))return H(),X=!0,L=e,B.currentValue=parseFloat(e),void(q.textContent=e);if("."!==e||!X){if("."===e){if(!L)return;X=!0}q.textContent.includes("=")&&(q.textContent=""),L+=e,q.textContent+=e.toString()}}(n,r)};F.map((function(e){var t=e.icon,n=e.operation,r=e.type,o=e.value,i=document.createElement("button");switch(i.textContent=t,i.className="".concat(r,"-btn"),n||o||(i.className+=" disabled"),i.addEventListener("click",(function(){return J({operation:n,value:o,icon:t})})),"0"===t&&(i.className+=" big"),r){case"complex":z.appendChild(i);break;case"basic":n&&!["clear","negate","percent"].includes(n)?i.className+=" operation":n&&(i.className+=" upper"),G.appendChild(i)}return i}))})();