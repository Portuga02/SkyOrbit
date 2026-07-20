import {
  c,
  m
} from "./chunk-OCAPVR2D.js";
import {
  e
} from "./chunk-644OHEPK.js";
import {
  H,
  P
} from "./chunk-3M66S6LA.js";
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/core/components/p-D7bSXQD3.js
var i = () => {
  const i2 = window;
  i2.addEventListener("statusTap", () => {
    H(() => {
      const o = document.elementFromPoint(i2.innerWidth / 2, i2.innerHeight / 2);
      if (!o) return;
      const n = m(o);
      n && new Promise((o2) => e(n, o2)).then(() => {
        P(() => __async(void 0, null, function* () {
          n.style.setProperty("--overflow", "hidden"), yield c(n, 300), n.style.removeProperty("--overflow");
        }));
      });
    });
  });
};
export {
  i as startStatusTap
};
/*! Bundled license information:

@ionic/core/components/p-D7bSXQD3.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=p-D7bSXQD3-5IYEX5GG.js.map
