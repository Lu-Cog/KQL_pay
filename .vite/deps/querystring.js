import {
  __commonJS,
  init_define_process_env_UNI_STAT_TITLE_JSON
} from "./chunk-TQKZRU5K.js";

// D:/1myProject/KQL_pay/node_modules/querystring/decode.js
var require_decode = __commonJS({
  "D:/1myProject/KQL_pay/node_modules/querystring/decode.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    module.exports = function(qs, sep, eq, options) {
      sep = sep || "&";
      eq = eq || "=";
      var obj = {};
      if (typeof qs !== "string" || qs.length === 0) {
        return obj;
      }
      var regexp = /\+/g;
      qs = qs.split(sep);
      var maxKeys = 1e3;
      if (options && typeof options.maxKeys === "number") {
        maxKeys = options.maxKeys;
      }
      var len = qs.length;
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }
      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = "";
        }
        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);
        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (Array.isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }
      return obj;
    };
  }
});

// D:/1myProject/KQL_pay/node_modules/querystring/encode.js
var require_encode = __commonJS({
  "D:/1myProject/KQL_pay/node_modules/querystring/encode.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    var stringifyPrimitive = function(v) {
      switch (typeof v) {
        case "string":
          return v;
        case "boolean":
          return v ? "true" : "false";
        case "number":
          return isFinite(v) ? v : "";
        default:
          return "";
      }
    };
    module.exports = function(obj, sep, eq, name) {
      sep = sep || "&";
      eq = eq || "=";
      if (obj === null) {
        obj = void 0;
      }
      if (typeof obj === "object") {
        return Object.keys(obj).map(function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k].map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).filter(Boolean).join(sep);
      }
      if (!name)
        return "";
      return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
    };
  }
});

// D:/1myProject/KQL_pay/node_modules/querystring/index.js
var require_querystring = __commonJS({
  "D:/1myProject/KQL_pay/node_modules/querystring/index.js"(exports) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    exports.decode = exports.parse = require_decode();
    exports.encode = exports.stringify = require_encode();
  }
});

// dep:querystring
init_define_process_env_UNI_STAT_TITLE_JSON();
var querystring_default = require_querystring();
export {
  querystring_default as default
};
//# sourceMappingURL=querystring.js.map
