
          window.__NEXT_REGISTER_PAGE('/example2', function() {
            var comp = module.exports =
webpackJsonp([7],[
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(41)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(61);
var toPrimitive = __webpack_require__(38);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(36);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(127);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(90)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(37)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(63);
var enumBugKeys = __webpack_require__(42);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(54);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(92);
var enumBugKeys = __webpack_require__(42);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(50)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(31);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(91);
var setToStringTag = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(64);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(26)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(46);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(120);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(124);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(111);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(113);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(33);
  var warning = __webpack_require__(34);
  var ReactPropTypesSecret = __webpack_require__(69);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(128)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(50)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(93)(false);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(63);
var hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(38);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(61);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGetInitialProps = undefined;

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

var loadGetInitialProps = exports.loadGetInitialProps = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(Component, ctx) {
    var props, compName, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Component.getInitialProps) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {});

          case 2:
            _context.next = 4;
            return Component.getInitialProps(ctx);

          case 4:
            props = _context.sent;

            if (!(!props && (!ctx.res || !ctx.res.finished))) {
              _context.next = 9;
              break;
            }

            compName = getDisplayName(Component);
            message = '"' + compName + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
            throw new Error(message);

          case 9:
            return _context.abrupt('return', props);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadGetInitialProps(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.warn = warn;
exports.execOnce = execOnce;
exports.deprecated = deprecated;
exports.printAndExit = printAndExit;
exports.getDisplayName = getDisplayName;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warn(message) {
  if (true) {
    console.error(message);
  }
}

function execOnce(fn) {
  var _this = this;

  var used = false;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!used) {
      used = true;
      fn.apply(_this, args);
    }
  };
}

function deprecated(fn, message) {
  if (false) return fn;

  var warned = false;
  var newFn = function newFn() {
    if (!warned) {
      warned = true;
      console.error(message);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(this, args);
  };

  // copy all properties
  (0, _assign2.default)(newFn, fn);

  return newFn;
}

function printAndExit(message) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }

  process.exit(code);
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function getLocationOrigin() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname,
      port = _window$location.port;

  return protocol + '//' + hostname + (port ? ':' + port : '');
}

function getURL() {
  var href = window.location.href;

  var origin = getLocationOrigin();
  return href.substring(origin.length);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(99);
exports.encode = exports.stringify = __webpack_require__(100);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(167);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(70);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(36);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(25);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(21);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(20);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(94);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(97);
var step = __webpack_require__(65);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.createRouter = exports.withRouter = undefined;

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _withRouter = __webpack_require__(231);

Object.defineProperty(exports, 'withRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withRouter).default;
  }
});
exports._notifyBuildIdMismatch = _notifyBuildIdMismatch;
exports._rewriteUrlForNextExport = _rewriteUrlForNextExport;
exports.makePublicRouterInstance = makePublicRouterInstance;

var _router = __webpack_require__(233);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingletonRouter = {
  router: null, // holds the actual router instance
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();
    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
};

// Create public properties and methods of the router in the SingletonRouter
/* global window */
var propertyFields = ['components', 'pathname', 'route', 'query', 'asPath'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError'];

propertyFields.forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty2.default)(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});

coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});

routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    SingletonRouter.router.events.on(event, function () {
      var eventField = 'on' + event.charAt(0).toUpperCase() + event.substring(1);
      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error('Error when running the Router event: ' + eventField);
          console.error(err.message + '\n' + err.stack);
        }
      }
    });
  });
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
}

// Export the SingletonRouter and this is the public API.
exports.default = SingletonRouter;

// Reexport the withRoute HOC

// INTERNAL APIS
// -------------
// (do not use following exports inside the app)

// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.
var createRouter = exports.createRouter = function createRouter() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = new (Function.prototype.bind.apply(_router2.default, [null].concat(args)))();
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];

  return SingletonRouter.router;
};

// Export the actual Router class, which is usually used inside the server
var Router = exports.Router = _router2.default;

function _notifyBuildIdMismatch(nextRoute) {
  if (SingletonRouter.onAppUpdated) {
    SingletonRouter.onAppUpdated(nextRoute);
  } else {
    console.warn('An app update detected. Loading the SSR version of "' + nextRoute + '"');
    window.location.href = nextRoute;
  }
}

function _rewriteUrlForNextExport(url) {
  var _url$split = url.split('#'),
      _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
      hash = _url$split2[1];

  url = url.replace(/#.*/, '');

  var _url$split3 = url.split('?'),
      _url$split4 = (0, _slicedToArray3.default)(_url$split3, 2),
      path = _url$split4[0],
      qs = _url$split4[1];

  path = path.replace(/\/$/, '');

  var newPath = path;
  // Append a trailing slash if this path does not have an extension
  if (!/\.[^/]+\/?$/.test(path)) {
    newPath = path + '/';
  }

  if (qs) {
    newPath = newPath + '?' + qs;
  }

  if (hash) {
    newPath = newPath + '#' + hash;
  }

  return newPath;
}

function makePublicRouterInstance(router) {
  var instance = {};

  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty2.default)(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });

  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });

  return instance;
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(164);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(83);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(108) });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(28);
var toObject = __webpack_require__(14);
var IObject = __webpack_require__(39);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(64);

__webpack_require__(75)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(27);
module.exports = __webpack_require__(46).f('iterator');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(51);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var META = __webpack_require__(47).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(41);
var setToStringTag = __webpack_require__(21);
var uid = __webpack_require__(26);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(46);
var wksDefine = __webpack_require__(48);
var enumKeys = __webpack_require__(116);
var isArray = __webpack_require__(66);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(5);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(38);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(25);
var gOPNExt = __webpack_require__(117);
var $GOPD = __webpack_require__(68);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(20);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(28);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('asyncIterator');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('observable');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(123).set });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(25) });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(56);
var emptyObject = __webpack_require__(86);
var invariant = __webpack_require__(33);
var warning = __webpack_require__(34);
var emptyFunction = __webpack_require__(31);
var checkPropTypes = __webpack_require__(57);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(31);
var invariant = __webpack_require__(33);
var warning = __webpack_require__(34);
var assign = __webpack_require__(56);

var ReactPropTypesSecret = __webpack_require__(69);
var checkPropTypes = __webpack_require__(57);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(171);
var html = __webpack_require__(72);
var cel = __webpack_require__(50);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(23)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(78);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(25);
var redefineAll = __webpack_require__(53);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(22);
var $iterDefine = __webpack_require__(37);
var step = __webpack_require__(65);
var setSpecies = __webpack_require__(79);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(47).fastKey;
var validate = __webpack_require__(71);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(47);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(53);
var forOf = __webpack_require__(22);
var anInstance = __webpack_require__(52);
var isObject = __webpack_require__(5);
var setToStringTag = __webpack_require__(21);
var dP = __webpack_require__(4).f;
var each = __webpack_require__(136)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(39);
var toObject = __webpack_require__(14);
var toLength = __webpack_require__(30);
var asc = __webpack_require__(137);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(138);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(66);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(32);
var from = __webpack_require__(140);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(22);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(24);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(22);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(161);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(20);

__webpack_require__(75)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(18);
module.exports = __webpack_require__(163);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(54);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(18);
module.exports = __webpack_require__(166);


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(168);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(170);
__webpack_require__(173);
__webpack_require__(174);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(3);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(32);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(5);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(22);
var speciesConstructor = __webpack_require__(130);
var task = __webpack_require__(131).set;
var microtask = __webpack_require__(172)();
var newPromiseCapabilityModule = __webpack_require__(78);
var perform = __webpack_require__(132);
var promiseResolve = __webpack_require__(133);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(53)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(21)($Promise, PROMISE);
__webpack_require__(79)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(95)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(131).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(23)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(130);
var promiseResolve = __webpack_require__(133);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(78);
var perform = __webpack_require__(132);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(71);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(135)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(139)('Set') });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(141)('Set');


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(142)('Set');


/***/ }),
/* 180 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3.default)(this, EventEmitter);
    this.listeners = {};
  }

  (0, _createClass3.default)(EventEmitter, [{
    key: "on",
    value: function on(event, cb) {
      if (!this.listeners[event]) {
        this.listeners[event] = new _set2.default();
      }

      if (this.listeners[event].has(cb)) {
        throw new Error("The listener already exising in event: " + event);
      }

      this.listeners[event].add(cb);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) return;
      this.listeners[event].forEach(function (cb) {
        return cb.apply(undefined, data);
      });
    }
  }, {
    key: "off",
    value: function off(event, cb) {
      this.listeners[event].delete(cb);
    }
  }]);
  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowEquals;
function shallowEquals(a, b) {
  for (var i in a) {
    if (b[i] !== a[i]) return false;
  }

  for (var _i in b) {
    if (b[_i] !== a[_i]) return false;
  }

  return true;
}

/***/ }),
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = withRouter;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(58);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(232);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withRouter(ComposedComponent) {
  var displayName = (0, _utils.getDisplayName)(ComposedComponent);

  var WithRouteWrapper = function (_Component) {
    (0, _inherits3.default)(WithRouteWrapper, _Component);

    function WithRouteWrapper() {
      (0, _classCallCheck3.default)(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn3.default)(this, (WithRouteWrapper.__proto__ || (0, _getPrototypeOf2.default)(WithRouteWrapper)).apply(this, arguments));
    }

    (0, _createClass3.default)(WithRouteWrapper, [{
      key: 'render',
      value: function render() {
        var props = (0, _extends3.default)({
          router: this.context.router
        }, this.props);

        return _react2.default.createElement(ComposedComponent, props);
      }
    }]);
    return WithRouteWrapper;
  }(_react.Component);

  WithRouteWrapper.contextTypes = {
    router: _propTypes2.default.object
  };
  WithRouteWrapper.displayName = 'withRoute(' + displayName + ')';


  return (0, _hoistNonReactStatics2.default)(WithRouteWrapper, ComposedComponent);
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(88);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _url2 = __webpack_require__(234);

var _EventEmitter = __webpack_require__(181);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _shallowEquals = __webpack_require__(195);

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _pQueue = __webpack_require__(237);

var _pQueue2 = _interopRequireDefault(_pQueue);

var _utils = __webpack_require__(77);

var _ = __webpack_require__(101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global __NEXT_DATA__ */

var Router = function () {
  function Router(pathname, query, as) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        pageLoader = _ref.pageLoader,
        Component = _ref.Component,
        ErrorComponent = _ref.ErrorComponent,
        err = _ref.err;

    (0, _classCallCheck3.default)(this, Router);

    // represents the current component key
    this.route = toRoute(pathname);

    // set up the component cache (by route keys)
    this.components = {};
    // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.
    if (Component !== ErrorComponent) {
      this.components[this.route] = { Component: Component, err: err };
    }

    // Handling Router Events
    this.events = new _EventEmitter2.default();

    this.pageLoader = pageLoader;
    this.prefetchQueue = new _pQueue2.default({ concurrency: 2 });
    this.ErrorComponent = ErrorComponent;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.subscriptions = new _set2.default();
    this.componentLoadCancel = null;
    this.onPopState = this.onPopState.bind(this);

    if (typeof window !== 'undefined') {
      // in order for `e.state` to work on the `onpopstate` event
      // we have to register the initial route upon initialization
      this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());

      window.addEventListener('popstate', this.onPopState);
    }
  }

  (0, _createClass3.default)(Router, [{
    key: 'onPopState',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
        var pathname, query, _e$state, url, as, options;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.state) {
                  _context.next = 4;
                  break;
                }

                // We get state as undefined for two reasons.
                //  1. With older safari (< 8) and older chrome (< 34)
                //  2. When the URL changed with #
                //
                // In the both cases, we don't need to proceed and change the route.
                // (as it's already changed)
                // But we can simply replace the state with the new changes.
                // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
                // So, doing the following for (1) does no harm.
                pathname = this.pathname, query = this.query;

                this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());
                return _context.abrupt('return');

              case 4:
                _e$state = e.state, url = _e$state.url, as = _e$state.as, options = _e$state.options;

                this.replace(url, as, options);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onPopState(_x2) {
        return _ref2.apply(this, arguments);
      }

      return onPopState;
    }()
  }, {
    key: 'update',
    value: function update(route, Component) {
      var data = this.components[route];
      if (!data) {
        throw new Error('Cannot update unavailable route: ' + route);
      }

      var newData = (0, _extends3.default)({}, data, { Component: Component });
      this.components[route] = newData;

      if (route === this.route) {
        this.notify(newData);
      }
    }
  }, {
    key: 'reload',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(route) {
        var pathname, query, url, routeInfo, error;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                delete this.components[route];
                this.pageLoader.clearCache(route);

                if (!(route !== this.route)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                pathname = this.pathname, query = this.query;
                url = window.location.href;


                this.events.emit('routeChangeStart', url);
                _context2.next = 9;
                return this.getRouteInfo(route, pathname, query, url);

              case 9:
                routeInfo = _context2.sent;
                error = routeInfo.error;

                if (!(error && error.cancelled)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt('return');

              case 13:

                this.notify(routeInfo);

                if (!error) {
                  _context2.next = 17;
                  break;
                }

                this.events.emit('routeChangeError', error, url);
                throw error;

              case 17:

                this.events.emit('routeChangeComplete', url);

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reload(_x3) {
        return _ref3.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: 'back',
    value: function back() {
      window.history.back();
    }
  }, {
    key: 'push',
    value: function push(url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.change('pushState', url, as, options);
    }
  }, {
    key: 'replace',
    value: function replace(url) {
      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.change('replaceState', url, as, options);
    }
  }, {
    key: 'change',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(method, _url, _as, options) {
        var url, as, _parse, pathname, query, route, _options$shallow, shallow, routeInfo, _routeInfo, error, hash;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // If url and as provided as an object representation,
                // we'll format them into the string version here.
                url = (typeof _url === 'undefined' ? 'undefined' : (0, _typeof3.default)(_url)) === 'object' ? (0, _url2.format)(_url) : _url;
                as = (typeof _as === 'undefined' ? 'undefined' : (0, _typeof3.default)(_as)) === 'object' ? (0, _url2.format)(_as) : _as;

                // Add the ending slash to the paths. So, we can serve the
                // "<page>/index.html" directly for the SSR page.

                if (__NEXT_DATA__.nextExport) {
                  as = (0, _._rewriteUrlForNextExport)(as);
                }

                this.abortComponentLoad(as);
                _parse = (0, _url2.parse)(url, true), pathname = _parse.pathname, query = _parse.query;

                // If the url change is only related to a hash change
                // We should not proceed. We should only change the state.

                if (!this.onlyAHashChange(as)) {
                  _context3.next = 9;
                  break;
                }

                this.changeState(method, url, as);
                this.scrollToHash(as);
                return _context3.abrupt('return');

              case 9:

                // If asked to change the current URL we should reload the current page
                // (not location.reload() but reload getInitalProps and other Next.js stuffs)
                // We also need to set the method = replaceState always
                // as this should not go into the history (That's how browsers work)
                if (!this.urlIsNew(pathname, query)) {
                  method = 'replaceState';
                }

                route = toRoute(pathname);
                _options$shallow = options.shallow, shallow = _options$shallow === undefined ? false : _options$shallow;
                routeInfo = null;


                this.events.emit('routeChangeStart', as);

                // If shallow === false and other conditions met, we reuse the
                // existing routeInfo for this route.
                // Because of this, getInitialProps would not run.

                if (!(shallow && this.isShallowRoutingPossible(route))) {
                  _context3.next = 18;
                  break;
                }

                routeInfo = this.components[route];
                _context3.next = 21;
                break;

              case 18:
                _context3.next = 20;
                return this.getRouteInfo(route, pathname, query, as);

              case 20:
                routeInfo = _context3.sent;

              case 21:
                _routeInfo = routeInfo, error = _routeInfo.error;

                if (!(error && error.cancelled)) {
                  _context3.next = 24;
                  break;
                }

                return _context3.abrupt('return', false);

              case 24:

                this.events.emit('beforeHistoryChange', as);
                this.changeState(method, url, as, options);
                hash = window.location.hash.substring(1);


                this.set(route, pathname, query, as, (0, _extends3.default)({}, routeInfo, { hash: hash }));

                if (!error) {
                  _context3.next = 31;
                  break;
                }

                this.events.emit('routeChangeError', error, as);
                throw error;

              case 31:

                this.events.emit('routeChangeComplete', as);
                return _context3.abrupt('return', true);

              case 33:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function change(_x8, _x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: 'changeState',
    value: function changeState(method, url, as) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
        window.history[method]({ url: url, as: as, options: options }, null, as);
      }
    }
  }, {
    key: 'getRouteInfo',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(route, pathname, query, as) {
        var routeInfo, _routeInfo2, Component, ctx, _Component, _ctx;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                routeInfo = null;
                _context4.prev = 1;

                routeInfo = this.components[route];

                if (routeInfo) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 6;
                return this.fetchComponent(route, as);

              case 6:
                _context4.t0 = _context4.sent;
                routeInfo = {
                  Component: _context4.t0
                };

              case 8:
                _routeInfo2 = routeInfo, Component = _routeInfo2.Component;
                ctx = { pathname: pathname, query: query, asPath: as };
                _context4.next = 12;
                return this.getInitialProps(Component, ctx);

              case 12:
                routeInfo.props = _context4.sent;


                this.components[route] = routeInfo;
                _context4.next = 32;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t1 = _context4['catch'](1);

                if (!_context4.t1.cancelled) {
                  _context4.next = 20;
                  break;
                }

                return _context4.abrupt('return', { error: _context4.t1 });

              case 20:
                if (!_context4.t1.buildIdMismatched) {
                  _context4.next = 24;
                  break;
                }

                // Now we need to reload the page or do the action asked by the user
                (0, _._notifyBuildIdMismatch)(as);
                // We also need to cancel this current route change.
                // We do it like this.
                _context4.t1.cancelled = true;
                return _context4.abrupt('return', { error: _context4.t1 });

              case 24:

                if (_context4.t1.statusCode === 404) {
                  // Indicate main error display logic to
                  // ignore rendering this error as a runtime error.
                  _context4.t1.ignore = true;
                }

                _Component = this.ErrorComponent;

                routeInfo = { Component: _Component, err: _context4.t1 };
                _ctx = { err: _context4.t1, pathname: pathname, query: query };
                _context4.next = 30;
                return this.getInitialProps(_Component, _ctx);

              case 30:
                routeInfo.props = _context4.sent;


                routeInfo.error = _context4.t1;

              case 32:
                return _context4.abrupt('return', routeInfo);

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 16]]);
      }));

      function getRouteInfo(_x13, _x14, _x15, _x16) {
        return _ref5.apply(this, arguments);
      }

      return getRouteInfo;
    }()
  }, {
    key: 'set',
    value: function set(route, pathname, query, as, data) {
      this.route = route;
      this.pathname = pathname;
      this.query = query;
      this.asPath = as;
      this.notify(data);
    }
  }, {
    key: 'onlyAHashChange',
    value: function onlyAHashChange(as) {
      if (!this.asPath) return false;

      var _asPath$split = this.asPath.split('#'),
          _asPath$split2 = (0, _slicedToArray3.default)(_asPath$split, 2),
          oldUrlNoHash = _asPath$split2[0],
          oldHash = _asPath$split2[1];

      var _as$split = as.split('#'),
          _as$split2 = (0, _slicedToArray3.default)(_as$split, 2),
          newUrlNoHash = _as$split2[0],
          newHash = _as$split2[1];

      // If the urls are change, there's more than a hash change


      if (oldUrlNoHash !== newUrlNoHash) {
        return false;
      }

      // If the hash has changed, then it's a hash only change.
      // This check is necessary to handle both the enter and
      // leave hash === '' cases. The identity case falls through
      // and is treated as a next reload.
      return oldHash !== newHash;
    }
  }, {
    key: 'scrollToHash',
    value: function scrollToHash(as) {
      var _as$split3 = as.split('#'),
          _as$split4 = (0, _slicedToArray3.default)(_as$split3, 2),
          hash = _as$split4[1];

      var el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, {
    key: 'urlIsNew',
    value: function urlIsNew(pathname, query) {
      return this.pathname !== pathname || !(0, _shallowEquals2.default)(query, this.query);
    }
  }, {
    key: 'isShallowRoutingPossible',
    value: function isShallowRoutingPossible(route) {
      return (
        // If there's cached routeInfo for the route.
        Boolean(this.components[route]) &&
        // If the route is already rendered on the screen.
        this.route === route
      );
    }
  }, {
    key: 'prefetch',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(url) {
        var _this = this;

        var _parse2, pathname, route;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (false) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                _parse2 = (0, _url2.parse)(url), pathname = _parse2.pathname;
                route = toRoute(pathname);
                return _context5.abrupt('return', this.prefetchQueue.add(function () {
                  return _this.fetchRoute(route);
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function prefetch(_x17) {
        return _ref6.apply(this, arguments);
      }

      return prefetch;
    }()
  }, {
    key: 'fetchComponent',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(route, as) {
        var cancelled, cancel, Component, error;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cancelled = false;

                cancel = this.componentLoadCancel = function () {
                  cancelled = true;
                };

                _context6.prev = 2;
                _context6.next = 5;
                return this.fetchRoute(route);

              case 5:
                Component = _context6.sent;

                if (!cancelled) {
                  _context6.next = 10;
                  break;
                }

                error = new Error('Abort fetching component for route: "' + route + '"');

                error.cancelled = true;
                throw error;

              case 10:

                if (cancel === this.componentLoadCancel) {
                  this.componentLoadCancel = null;
                }

                return _context6.abrupt('return', Component);

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6['catch'](2);

                // There's an error in loading the route.
                // Usually this happens when there's a failure in the webpack build
                // So in that case, we need to load the page with full SSR
                // That'll clean the invalid exising client side information.
                // (Like cached routes)
                window.location.href = as;
                throw _context6.t0;

              case 18:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 14]]);
      }));

      function fetchComponent(_x18, _x19) {
        return _ref7.apply(this, arguments);
      }

      return fetchComponent;
    }()
  }, {
    key: 'getInitialProps',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(Component, ctx) {
        var cancelled, cancel, props, err;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cancelled = false;

                cancel = function cancel() {
                  cancelled = true;
                };

                this.componentLoadCancel = cancel;

                _context7.next = 5;
                return (0, _utils.loadGetInitialProps)(Component, ctx);

              case 5:
                props = _context7.sent;


                if (cancel === this.componentLoadCancel) {
                  this.componentLoadCancel = null;
                }

                if (!cancelled) {
                  _context7.next = 11;
                  break;
                }

                err = new Error('Loading initial props cancelled');

                err.cancelled = true;
                throw err;

              case 11:
                return _context7.abrupt('return', props);

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getInitialProps(_x20, _x21) {
        return _ref8.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: 'fetchRoute',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(route) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.pageLoader.loadPage(route);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchRoute(_x22) {
        return _ref9.apply(this, arguments);
      }

      return fetchRoute;
    }()
  }, {
    key: 'abortComponentLoad',
    value: function abortComponentLoad(as) {
      if (this.componentLoadCancel) {
        this.events.emit('routeChangeError', new Error('Route Cancelled'), as);
        this.componentLoadCancel();
        this.componentLoadCancel = null;
      }
    }
  }, {
    key: 'notify',
    value: function notify(data) {
      this.subscriptions.forEach(function (fn) {
        return fn(data);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(fn) {
      var _this2 = this;

      this.subscriptions.add(fn);
      return function () {
        return _this2.subscriptions.delete(fn);
      };
    }
  }]);
  return Router;
}();

exports.default = Router;


function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(235);
var util = __webpack_require__(236);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(84);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)(module), __webpack_require__(180)))

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(70);

var _promise2 = _interopRequireDefault(_promise);

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on https://github.com/sindresorhus/p-queue (MIT)
// modified for browser support

var Queue = function () {
  function Queue() {
    (0, _classCallCheck3.default)(this, Queue);

    this._queue = [];
  }

  (0, _createClass3.default)(Queue, [{
    key: 'enqueue',
    value: function enqueue(run) {
      this._queue.push(run);
    }
  }, {
    key: 'dequeue',
    value: function dequeue() {
      return this._queue.shift();
    }
  }, {
    key: 'size',
    get: function get() {
      return this._queue.length;
    }
  }]);
  return Queue;
}();

var PQueue = function () {
  function PQueue(opts) {
    (0, _classCallCheck3.default)(this, PQueue);

    opts = (0, _assign2.default)({
      concurrency: Infinity,
      queueClass: Queue
    }, opts);

    if (opts.concurrency < 1) {
      throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    }

    this.queue = new opts.queueClass(); // eslint-disable-line new-cap
    this._pendingCount = 0;
    this._concurrency = opts.concurrency;
    this._resolveEmpty = function () {};
  }

  (0, _createClass3.default)(PQueue, [{
    key: '_next',
    value: function _next() {
      this._pendingCount--;

      if (this.queue.size > 0) {
        this.queue.dequeue()();
      } else {
        this._resolveEmpty();
      }
    }
  }, {
    key: 'add',
    value: function add(fn, opts) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var run = function run() {
          _this._pendingCount++;

          fn().then(function (val) {
            resolve(val);
            _this._next();
          }, function (err) {
            reject(err);
            _this._next();
          });
        };

        if (_this._pendingCount < _this._concurrency) {
          run();
        } else {
          _this.queue.enqueue(run, opts);
        }
      });
    }
  }, {
    key: 'onEmpty',
    value: function onEmpty() {
      var _this2 = this;

      return new _promise2.default(function (resolve) {
        var existingResolve = _this2._resolveEmpty;
        _this2._resolveEmpty = function () {
          existingResolve();
          resolve();
        };
      });
    }
  }, {
    key: 'size',
    get: function get() {
      return this.queue.size;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this._pendingCount;
    }
  }]);
  return PQueue;
}();

exports.default = PQueue;

/***/ }),
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(382);

var _map2 = _interopRequireDefault(_map);

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.flush = flush;

var _react = __webpack_require__(17);

var _stylesheetRegistry = __webpack_require__(388);

var _stylesheetRegistry2 = _interopRequireDefault(_stylesheetRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleSheetRegistry = new _stylesheetRegistry2.default();

var JSXStyle = function (_Component) {
  (0, _inherits3.default)(JSXStyle, _Component);

  function JSXStyle() {
    (0, _classCallCheck3.default)(this, JSXStyle);
    return (0, _possibleConstructorReturn3.default)(this, (JSXStyle.__proto__ || (0, _getPrototypeOf2.default)(JSXStyle)).apply(this, arguments));
  }

  (0, _createClass3.default)(JSXStyle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      styleSheetRegistry.add(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.css !== nextProps.css;
    }

    // To avoid FOUC, we process new changes
    // on `componentWillUpdate` rather than `componentDidUpdate`.

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      styleSheetRegistry.update(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      styleSheetRegistry.remove(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'dynamic',
    value: function dynamic(info) {
      return info.map(function (tagInfo) {
        var _tagInfo = (0, _slicedToArray3.default)(tagInfo, 2),
            baseId = _tagInfo[0],
            props = _tagInfo[1];

        return styleSheetRegistry.computeId(baseId, props);
      }).join(' ');
    }
  }]);
  return JSXStyle;
}(_react.Component);

exports.default = JSXStyle;
function flush() {
  var cssRules = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return new _map2.default(cssRules);
}

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(383), __esModule: true };

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(27);
__webpack_require__(384);
__webpack_require__(385);
__webpack_require__(386);
__webpack_require__(387);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(71);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(135)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(139)('Map') });


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(141)('Map');


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(142)('Map');


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(159);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _stringHash = __webpack_require__(389);

var _stringHash2 = _interopRequireDefault(_stringHash);

var _stylesheet = __webpack_require__(390);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleSheetRegistry = function () {
  function StyleSheetRegistry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === undefined ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheetRegistry);

    this._sheet = styleSheet || new _stylesheet2.default({
      name: 'styled-jsx',
      optimizeForSpeed: optimizeForSpeed
    });
    this._sheet.inject();
    this._isBrowser = isBrowser;

    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};

    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  }

  (0, _createClass3.default)(StyleSheetRegistry, [{
    key: 'add',
    value: function add(props) {
      var _this = this;

      if (undefined === this._optimizeForSpeed) {
        this._optimizeForSpeed = Array.isArray(props.css);
        this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
        this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
      }

      if (this._isBrowser && !this._fromServer) {
        this._fromServer = this.selectFromServer();
        this._instancesCounts = (0, _keys2.default)(this._fromServer).reduce(function (acc, tagName) {
          acc[tagName] = 0;
          return acc;
        }, {});
      }

      var _getIdAndRules = this.getIdAndRules(props),
          styleId = _getIdAndRules.styleId,
          rules = _getIdAndRules.rules;

      // Deduping: just increase the instances count.


      if (styleId in this._instancesCounts) {
        this._instancesCounts[styleId] += 1;
        return;
      }

      var indices = rules.map(function (rule) {
        return _this._sheet.insertRule(rule);
      })
      // Filter out invalid rules
      .filter(function (index) {
        return index !== -1;
      });

      if (indices.length > 0) {
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
      }
    }
  }, {
    key: 'remove',
    value: function remove(props) {
      var _this2 = this;

      var _getIdAndRules2 = this.getIdAndRules(props),
          styleId = _getIdAndRules2.styleId;

      invariant(styleId in this._instancesCounts, 'styleId: `' + styleId + '` not found');
      this._instancesCounts[styleId] -= 1;

      if (this._instancesCounts[styleId] < 1) {
        var tagFromServer = this._fromServer && this._fromServer[styleId];
        if (tagFromServer) {
          tagFromServer.parentNode.removeChild(tagFromServer);
          delete this._fromServer[styleId];
        } else {
          this._indices[styleId].forEach(function (index) {
            return _this2._sheet.deleteRule(index);
          });
          delete this._indices[styleId];
        }
        delete this._instancesCounts[styleId];
      }
    }
  }, {
    key: 'update',
    value: function update(props, nextProps) {
      this.add(nextProps);
      this.remove(props);
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._sheet.flush();
      this._sheet.inject();
      this._fromServer = undefined;
      this._indices = {};
      this._instancesCounts = {};

      this.computeId = this.createComputeId();
      this.computeSelector = this.createComputeSelector();
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this3 = this;

      var fromServer = this._fromServer ? (0, _keys2.default)(this._fromServer).map(function (styleId) {
        return [styleId, _this3._fromServer[styleId]];
      }) : [];
      var cssRules = this._sheet.cssRules();

      return fromServer.concat((0, _keys2.default)(this._indices).map(function (styleId) {
        return [styleId, _this3._indices[styleId].map(function (index) {
          return cssRules[index].cssText;
        }).join('\n')];
      }));
    }

    /**
     * createComputeId
     *
     * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
     */

  }, {
    key: 'createComputeId',
    value: function createComputeId() {
      var cache = {};
      return function (baseId, props) {
        if (!props) {
          return 'jsx-' + baseId;
        }
        var propsToString = String(props);
        var key = baseId + propsToString;
        // return `jsx-${hashString(`${baseId}-${propsToString}`)}`
        if (!cache[key]) {
          cache[key] = 'jsx-' + (0, _stringHash2.default)(baseId + '-' + propsToString);
        }
        return cache[key];
      };
    }

    /**
     * createComputeSelector
     *
     * Creates a function to compute and memoize dynamic selectors.
     */

  }, {
    key: 'createComputeSelector',
    value: function createComputeSelector() {
      var selectoPlaceholderRegexp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /__jsx-style-dynamic-selector/g;

      var cache = {};
      return function (id, css) {
        var idcss = id + css;
        if (!cache[idcss]) {
          cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
        }
        return cache[idcss];
      };
    }
  }, {
    key: 'getIdAndRules',
    value: function getIdAndRules(props) {
      var _this4 = this;

      if (props.dynamic) {
        var styleId = this.computeId(props.styleId, props.dynamic);
        return {
          styleId: styleId,
          rules: Array.isArray(props.css) ? props.css.map(function (rule) {
            return _this4.computeSelector(styleId, rule);
          }) : [this.computeSelector(styleId, props.css)]
        };
      }

      return {
        styleId: this.computeId(props.styleId),
        rules: Array.isArray(props.css) ? props.css : [props.css]
      };
    }

    /**
     * selectFromServer
     *
     * Collects style tags from the document with id __jsx-XXX
     */

  }, {
    key: 'selectFromServer',
    value: function selectFromServer() {
      var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));

      return elements.reduce(function (acc, element) {
        var id = element.id.slice(2);
        acc[id] = element;
        return acc;
      }, {});
    }
  }]);
  return StyleSheetRegistry;
}();

exports.default = StyleSheetRegistry;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheetRegistry: ' + message + '.');
  }
}

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/

var isProd = process.env && "development" === 'production';
var isString = function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheet);

    invariant(isString(name), '`name` must be a string');
    this._name = name;
    this._deletedRulePlaceholder = '#' + name + '-deleted-rule____{}';

    invariant(typeof optimizeForSpeed === 'boolean', '`optimizeForSpeed` must be a boolean');
    this._optimizeForSpeed = optimizeForSpeed;
    this._isBrowser = isBrowser;

    this._serverSheet = undefined;
    this._tags = [];
    this._injected = false;
    this._rulesCount = 0;
  }

  (0, _createClass3.default)(StyleSheet, [{
    key: 'setOptimizeForSpeed',
    value: function setOptimizeForSpeed(bool) {
      invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean');

      invariant(this._rulesCount === 0, 'optimizeForSpeed cannot be when rules have already been inserted');
      this.flush();
      this._optimizeForSpeed = bool;
      this.inject();
    }
  }, {
    key: 'isOptimizeForSpeed',
    value: function isOptimizeForSpeed() {
      return this._optimizeForSpeed;
    }
  }, {
    key: 'inject',
    value: function inject() {
      var _this = this;

      invariant(!this._injected, 'sheet already injected');
      this._injected = true;
      if (this._isBrowser && this._optimizeForSpeed) {
        this._tags[0] = this.makeStyleTag(this._name);
        this._optimizeForSpeed = 'insertRule' in this.getSheet();
        if (!this._optimizeForSpeed) {
          if (!isProd) {
            console.warn('StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.'); // eslint-disable-line no-console
          }
          this.flush();
          this._injected = true;
        }
        return;
      }

      this._serverSheet = {
        cssRules: [],
        insertRule: function insertRule(rule, index) {
          if (typeof index === 'number') {
            _this._serverSheet.cssRules[index] = { cssText: rule };
          } else {
            _this._serverSheet.cssRules.push({ cssText: rule });
          }
          return index;
        },
        deleteRule: function deleteRule(index) {
          _this._serverSheet.cssRules[index] = null;
        }
      };
    }
  }, {
    key: 'getSheetForTag',
    value: function getSheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }

      // this weirdness brought to you by firefox
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }
  }, {
    key: 'getSheet',
    value: function getSheet() {
      return this.getSheetForTag(this._tags[this._tags.length - 1]);
    }
  }, {
    key: 'insertRule',
    value: function insertRule(rule, index) {
      invariant(isString(rule), '`insertRule` accepts only strings');

      if (!this._isBrowser) {
        if (typeof index !== 'number') {
          index = this._serverSheet.cssRules.length;
        }
        this._serverSheet.insertRule(rule, index);
        return this._rulesCount++;
      }

      if (this._optimizeForSpeed) {
        var sheet = this.getSheet();
        if (typeof index !== 'number') {
          index = sheet.cssRules.length;
        }
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          return -1;
        }
      } else {
        var insertionPoint = this._tags[index];
        this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
      }

      return this._rulesCount++;
    }
  }, {
    key: 'replaceRule',
    value: function replaceRule(index, rule) {
      if (this._optimizeForSpeed || !this._isBrowser) {
        var sheet = this._isBrowser ? this.getSheet() : this._serverSheet;
        if (!rule.trim()) {
          rule = this._deletedRulePlaceholder;
        }

        if (!sheet.cssRules[index]) {
          // @TBD Should we throw an error?
          return index;
        }

        sheet.deleteRule(index);

        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          // In order to preserve the indices we insert a deleteRulePlaceholder
          sheet.insertRule(this._deletedRulePlaceholder, index);
        }
      } else {
        var tag = this._tags[index];
        invariant(tag, 'old rule at index `' + index + '` not found');
        tag.textContent = rule;
      }
      return index;
    }
  }, {
    key: 'deleteRule',
    value: function deleteRule(index) {
      if (!this._isBrowser) {
        this._serverSheet.deleteRule(index);
        return;
      }

      if (this._optimizeForSpeed) {
        this.replaceRule(index, '');
      } else {
        var tag = this._tags[index];
        invariant(tag, 'rule at index `' + index + '` not found');
        tag.parentNode.removeChild(tag);
        this._tags[index] = null;
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._injected = false;
      this._rulesCount = 0;
      if (this._isBrowser) {
        this._tags.forEach(function (tag) {
          return tag && tag.parentNode.removeChild(tag);
        });
        this._tags = [];
      } else {
        // simpler on server
        this._serverSheet.cssRules = [];
      }
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this2 = this;

      if (!this._isBrowser) {
        return this._serverSheet.cssRules;
      }
      return this._tags.reduce(function (rules, tag) {
        if (tag) {
          rules = rules.concat(_this2.getSheetForTag(tag).cssRules.map(function (rule) {
            return rule.cssText === _this2._deletedRulePlaceholder ? null : rule;
          }));
        } else {
          rules.push(null);
        }
        return rules;
      }, []);
    }
  }, {
    key: 'makeStyleTag',
    value: function makeStyleTag(name, cssString, relativeToTag) {
      if (cssString) {
        invariant(isString(cssString), 'makeStyleTag acceps only strings as second parameter');
      }
      var tag = document.createElement('style');
      tag.type = 'text/css';
      tag.setAttribute('data-' + name, '');
      if (cssString) {
        tag.appendChild(document.createTextNode(cssString));
      }
      var head = document.head || document.getElementsByTagName('head')[0];
      if (relativeToTag) {
        head.insertBefore(tag, relativeToTag);
      } else {
        head.appendChild(tag);
      }
      return tag;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._rulesCount;
    }
  }]);
  return StyleSheet;
}();

exports.default = StyleSheet;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheet: ' + message + '.');
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)))

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(381)


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(393);
var foreach = __webpack_require__(407);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(406);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var keys = __webpack_require__(393);
var bind = __webpack_require__(395);
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = __webpack_require__(409)();
var toObject = Object;
var push = bind.call(Function.call, Array.prototype.push);
var propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

module.exports = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = keys(source);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if (propIsEnumerable(source, key)) {
					push(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if (propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(408);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(394);

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	// v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	// note: this does not detect the bug unless there's 20 characters
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	// which is 72% slower than our shim, and Firefox 40's native implementation.
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),
/* 397 */,
/* 398 */,
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _header = __webpack_require__(400);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/opt/guydev/study/render-props-presentation-next/layouts/main.js";

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    }
  }, _react2.default.createElement(_header2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }), children);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dHMvbWFpbi5qcyJdLCJuYW1lcyI6WyJIZWFkZXIiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBWSxBQUNuQjs7Ozs7Ozs7a0JBQWUsZ0JBQUE7TUFBQSxBQUFHLGdCQUFILEFBQUc7eUJBQ2hCLGNBQUE7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsQUFBQzs7Z0JBQUQ7a0JBREYsQUFDRSxBQUNDO0FBREQ7QUFBQSxNQUZXLEFBQ2I7QUFERiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9vcHQvZ3V5ZGV2L3N0dWR5L3JlbmRlci1wcm9wcy1wcmVzZW50YXRpb24tbmV4dCJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/opt/guydev/study/render-props-presentation-next/layouts/main.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/opt/guydev/study/render-props-presentation-next/layouts/main.js"); } } })();

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(391);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(401);

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/opt/guydev/study/render-props-presentation-next/components/header.js";


var Index = function Index() {
  return _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, _react2.default.createElement(_link2.default, { href: "/about", __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, "About Page")), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, "Hello Next.js"));
};

function Header() {
  var exampleNumbers = [];

  for (var i = 1; i <= 6; i++) {
    exampleNumbers.push(i);
  }
  return _react2.default.createElement("div", {
    className: "jsx-604253383" + " " + "cont",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement("h1", {
    className: "jsx-604253383" + " " + "hello",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, "Render props presentation"), _react2.default.createElement(_link2.default, { href: "/", __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement("button", {
    className: "jsx-604253383",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "Home")), _react2.default.createElement("h5", {
    className: "jsx-604253383" + " " + "hello",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, "examples:"), exampleNumbers.map(function (number) {
    return _react2.default.createElement(_link2.default, { href: "/example" + number, __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      }
    }, _react2.default.createElement("button", {
      className: "jsx-604253383",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    }, "Example ", number));
  }), _react2.default.createElement(_style2.default, {
    styleId: "604253383",
    css: ".cont.jsx-604253383{background:#22a0f2;padding:100px;text-align:center;-webkit-transition:100ms ease-in background;transition:100ms ease-in background;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCa0IsQUFHOEIsbUJBQ0wsY0FDSSxrQkFDa0IsZ0ZBQ3RDIiwiZmlsZSI6ImNvbXBvbmVudHMvaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9vcHQvZ3V5ZGV2L3N0dWR5L3JlbmRlci1wcm9wcy1wcmVzZW50YXRpb24tbmV4dCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuY29uc3QgSW5kZXggPSAoKSA9PiAoXG4gIDxkaXY+XG4gICAgPExpbmsgaHJlZj1cIi9hYm91dFwiPlxuICAgICAgPGE+QWJvdXQgUGFnZTwvYT5cbiAgICA8L0xpbms+XG4gICAgPHA+SGVsbG8gTmV4dC5qczwvcD5cbiAgPC9kaXY+XG4pO1xuXG5mdW5jdGlvbiBIZWFkZXIoKSB7XG4gIGxldCBleGFtcGxlTnVtYmVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDw9IDY7IGkrKykge1xuICAgIGV4YW1wbGVOdW1iZXJzLnB1c2goaSk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJoZWxsb1wiPlJlbmRlciBwcm9wcyBwcmVzZW50YXRpb248L2gxPlxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgPGJ1dHRvbj5Ib21lPC9idXR0b24+XG4gICAgICA8L0xpbms+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwiaGVsbG9cIj5leGFtcGxlczo8L2g1PlxuICAgICAge2V4YW1wbGVOdW1iZXJzLm1hcChudW1iZXIgPT4gKFxuICAgICAgICA8TGluayBocmVmPXtgL2V4YW1wbGUke251bWJlcn1gfT5cbiAgICAgICAgICA8YnV0dG9uPkV4YW1wbGUge251bWJlcn08L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgKSl9XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5jb250IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjMjJhMGYyO1xuICAgICAgICAgIHBhZGRpbmc6IDEwMHB4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICB0cmFuc2l0aW9uOiAxMDBtcyBlYXNlLWluIGJhY2tncm91bmQ7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIl19 */\n/*@ sourceURL=components/header.js */"
  }));
}

exports.default = Header;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGVhZGVyLmpzIl0sIm5hbWVzIjpbIkxpbmsiLCJJbmRleCIsIkhlYWRlciIsImV4YW1wbGVOdW1iZXJzIiwiaSIsInB1c2giLCJtYXAiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7Ozs7Ozs7O0FBRVAsSUFBTSxRQUFRLFNBQVIsQUFBUSxRQUFBO3lCQUNaLGNBQUE7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsQUFBQyxnQ0FBSyxNQUFOLEFBQVc7Z0JBQVg7a0JBQUEsQUFDRTtBQURGO3FCQUNFLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUZKLEFBQ0UsQUFDRSxBQUVGLGdDQUFBLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUxVLEFBQ1osQUFJRTtBQUxKOztBQVNBLFNBQUEsQUFBUyxTQUFTLEFBQ2hCO01BQUksaUJBQUosQUFBcUIsQUFFckI7O09BQUssSUFBSSxJQUFULEFBQWEsR0FBRyxLQUFoQixBQUFxQixHQUFyQixBQUF3QixLQUFLLEFBQzNCO21CQUFBLEFBQWUsS0FBZixBQUFvQixBQUNyQjtBQUNEO3lCQUNFLGNBQUE7dUNBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxjQUFBO3VDQUFBLEFBQWM7O2dCQUFkO2tCQUFBO0FBQUE7QUFBQSxLQURGLEFBQ0UsQUFDQSw4Q0FBQSxBQUFDLGdDQUFLLE1BQU4sQUFBVztnQkFBWDtrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQTtlQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FISixBQUVFLEFBQ0UsQUFFRiwwQkFBQSxjQUFBO3VDQUFBLEFBQWM7O2dCQUFkO2tCQUFBO0FBQUE7QUFBQSxLQUxGLEFBS0UsQUFDQyw2QkFBQSxBQUFlLElBQUksa0JBQUE7MkJBQ2xCLEFBQUMsZ0NBQUssbUJBQU4sQUFBdUI7a0JBQXZCO29CQUFBLEFBQ0U7QUFERjtLQUFBLGtCQUNFLGNBQUE7aUJBQUE7O2tCQUFBO29CQUFBO0FBQUE7QUFBQSxPQUFpQixZQUZELEFBQ2xCLEFBQ0U7QUFSTixBQU1HO2FBTkg7U0FERixBQUNFLEFBcUJIO0FBckJHO0FBdUJKOztrQkFBQSxBQUFlIiwiZmlsZSI6ImhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvb3B0L2d1eWRldi9zdHVkeS9yZW5kZXItcHJvcHMtcHJlc2VudGF0aW9uLW5leHQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/opt/guydev/study/render-props-presentation-next/components/header.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/opt/guydev/study/render-props-presentation-next/components/header.js"); } } })();

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(402);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = __webpack_require__(234);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(58);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypesExact = __webpack_require__(404);

var _propTypesExact2 = _interopRequireDefault(_propTypesExact);

var _router = __webpack_require__(101);

var _router2 = _interopRequireDefault(_router);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global __NEXT_DATA__ */

var Link = function (_Component) {
  (0, _inherits3.default)(Link, _Component);

  function Link(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, Link);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this, props].concat(rest)));

    _this.linkClicked = _this.linkClicked.bind(_this);
    _this.formatUrls(props);
    return _this;
  }

  (0, _createClass3.default)(Link, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.formatUrls(nextProps);
    }
  }, {
    key: 'linkClicked',
    value: function linkClicked(e) {
      var _this2 = this;

      if (e.currentTarget.nodeName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var shallow = this.props.shallow;
      var href = this.href,
          as = this.as;


      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      var pathname = window.location.pathname;

      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;

      e.preventDefault();

      //  avoid scroll for urls with anchor refs
      var scroll = this.props.scroll;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      }

      // replace state instead of push if prop is present
      var replace = this.props.replace;

      var changeMethod = replace ? 'replace' : 'push';

      // straight up redirect
      _router2.default[changeMethod](href, as, { shallow: shallow }).then(function (success) {
        if (!success) return;
        if (scroll) window.scrollTo(0, 0);
      }).catch(function (err) {
        if (_this2.props.onError) _this2.props.onError(err);
      });
    }
  }, {
    key: 'prefetch',
    value: function prefetch() {
      if (!this.props.prefetch) return;
      if (typeof window === 'undefined') return;

      // Prefetch the JSON page if asked (only in the client)
      var pathname = window.location.pathname;

      var href = (0, _url.resolve)(pathname, this.href);
      _router2.default.prefetch(href);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.prefetch();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify2.default)(this.props.href) !== (0, _stringify2.default)(prevProps.href)) {
        this.prefetch();
      }
    }

    // We accept both 'href' and 'as' as objects which we can pass to `url.format`.
    // We'll handle it here.

  }, {
    key: 'formatUrls',
    value: function formatUrls(props) {
      this.href = props.href && (0, _typeof3.default)(props.href) === 'object' ? (0, _url.format)(props.href) : props.href;
      this.as = props.as && (0, _typeof3.default)(props.as) === 'object' ? (0, _url.format)(props.as) : props.as;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var href = this.href,
          as = this.as;
      // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag

      if (typeof children === 'string') {
        children = _react2.default.createElement(
          'a',
          null,
          children
        );
      }

      // This will return the first child, if multiple are provided it will throw an error
      var child = _react.Children.only(children);
      var props = {
        onClick: this.linkClicked

        // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
        // defined, we specify the current 'href', so that repetition is not needed by the user
      };if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
        props.href = as || href;
      }

      // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly.
      if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
        props.href = (0, _router._rewriteUrlForNextExport)(props.href);
      }

      return _react2.default.cloneElement(child, props);
    }
  }]);
  return Link;
}(_react.Component);

Link.propTypes = (0, _propTypesExact2.default)({
  href: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  as: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  prefetch: _propTypes2.default.bool,
  replace: _propTypes2.default.bool,
  shallow: _propTypes2.default.bool,
  passHref: _propTypes2.default.bool,
  scroll: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, function (props, propName) {
    var value = props[propName];

    if (typeof value === 'string') {
      warnLink('Warning: You\'re using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>');
    }

    return null;
  }]).isRequired
});
exports.default = Link;


function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

var warnLink = (0, _utils.execOnce)(_utils.warn);

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(403), __esModule: true };

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = forbidExtraProps;

var _object = __webpack_require__(405);

var _object2 = _interopRequireDefault(_object);

var _has = __webpack_require__(411);

var _has2 = _interopRequireDefault(_has);

var _isPlainObject = __webpack_require__(412);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zeroWidthSpace = '\u200B';
var specialProperty = 'prop-types-exact: ' + zeroWidthSpace;
var semaphore = {};

function brand(fn) {
  return (0, _object2['default'])(fn, _defineProperty({}, specialProperty, semaphore));
}

function isBranded(value) {
  return value && value[specialProperty] === semaphore;
}

function forbidExtraProps(propTypes) {
  if (!(0, _isPlainObject2['default'])(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if ((0, _has2['default'])(propTypes, specialProperty) && !isBranded(propTypes[specialProperty])) {
    throw new TypeError('Against all odds, you created a propType for a prop that uses both the zero-width space and our custom string - which, sadly, conflicts with `prop-types-exact`');
  }

  return (0, _object2['default'])({}, propTypes, _defineProperty({}, specialProperty, brand(function () {
    function forbidUnknownProps(props, _, componentName) {
      var unknownProps = Object.keys(props).filter(function (prop) {
        return !(0, _has2['default'])(propTypes, prop);
      });
      if (unknownProps.length > 0) {
        return new TypeError(String(componentName) + ': unknown props found: ' + String(unknownProps.join(', ')));
      }
      return null;
    }

    return forbidUnknownProps;
  }())));
}
module.exports = exports['default'];
//# sourceMappingURL=index.js.map

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__(392);

var implementation = __webpack_require__(394);
var getPolyfill = __webpack_require__(396);
var shim = __webpack_require__(410);

var polyfill = getPolyfill();

defineProperties(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 407 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(392);
var getPolyfill = __webpack_require__(396);

module.exports = function shimAssign() {
	var polyfill = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(395);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 412 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = isPlainObject;
function isPlainObject(x) {
  return x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && !Array.isArray(x);
}
module.exports = exports['default'];
//# sourceMappingURL=isPlainObject.js.map

/***/ }),
/* 413 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveProvider", function() { return LiveProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveEditor", function() { return LiveEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveError", function() { return LiveError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivePreview", function() { return LivePreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withLive", function() { return withLive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateElement", function() { return generateElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElementAsync", function() { return renderElementAsync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var cn = function cn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(Boolean).join(' ');
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var prismCore = createCommonjsModule(function (module) {
	var _self = typeof window !== 'undefined' ? window // if in browser
	: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
	: {};

	/**
  * Prism: Lightweight, robust, elegant syntax highlighting
  * MIT license http://www.opensource.org/licenses/mit-license.php/
  * @author Lea Verou http://lea.verou.me
  */

	var Prism = function () {

		// Private helper vars
		var lang = /\blang(?:uage)?-(\w+)\b/i;
		var uniqueId = 0;

		var _ = _self.Prism = {
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
					} else if (_.util.type(tokens) === 'Array') {
						return tokens.map(_.util.encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				type: function type(o) {
					return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
				},

				objId: function objId(obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				// Deep clone a language definition (e.g. to extend it)
				clone: function clone(o) {
					var type = _.util.type(o);

					switch (type) {
						case 'Object':
							var clone = {};

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = _.util.clone(o[key]);
								}
							}

							return clone;

						case 'Array':
							// Check for existence for IE8
							return o.map && o.map(function (v) {
								return _.util.clone(v);
							});
					}

					return o;
				}
			},

			languages: {
				extend: function extend(id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
     * Insert a token before another token in a language literal
     * As this needs to recreate the object (we cannot actually insert before keys in object literals),
     * we cannot just provide an object, we need anobject and a key.
     * @param inside The key (or language id) of the parent
     * @param before The key to insert before. If not provided, the function appends instead.
     * @param insert Object with the key/value pairs to insert
     * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
     */
				insertBefore: function insertBefore(inside, before, insert, root) {
					root = root || _.languages;
					var grammar = root[inside];

					if (arguments.length == 2) {
						insert = arguments[1];

						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								grammar[newToken] = insert[newToken];
							}
						}

						return grammar;
					}

					var ret = {};

					for (var token in grammar) {

						if (grammar.hasOwnProperty(token)) {

							if (token == before) {

								for (var newToken in insert) {

									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							ret[token] = grammar[token];
						}
					}

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === root[inside] && key != inside) {
							this[key] = ret;
						}
					});

					return root[inside] = ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};
					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, null, visited);
							} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, i, visited);
							}
						}
					}
				}
			},
			plugins: {},

			highlightAll: function highlightAll(async, callback) {
				var env = {
					callback: callback,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run("before-highlightall", env);

				var elements = env.elements || document.querySelectorAll(env.selector);

				for (var i = 0, element; element = elements[i++];) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			highlightElement: function highlightElement(element, async, callback) {
				// Find language
				var language,
				    grammar,
				    parent = element;

				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
					grammar = _.languages[language];
				}

				// Set language on the element, if not present
				element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				_.hooks.run('before-sanity-check', env);

				if (!env.code || !env.grammar) {
					if (env.code) {
						env.element.textContent = env.code;
					}
					_.hooks.run('complete', env);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						env.highlightedCode = evt.data;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						callback && callback.call(env.element);
						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(element);

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				}
			},

			highlight: function highlight(text, grammar, language) {
				var tokens = _.tokenize(text, grammar);
				return Token.stringify(_.util.encode(tokens), language);
			},

			tokenize: function tokenize(text, grammar, language) {
				var Token = _.Token;

				var strarr = [text];

				var rest = grammar.rest;

				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				tokenloop: for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						var pattern = patterns[j],
						    inside = pattern.inside,
						    lookbehind = !!pattern.lookbehind,
						    greedy = !!pattern.greedy,
						    lookbehindLength = 0,
						    alias = pattern.alias;

						if (greedy && !pattern.pattern.global) {
							// Without the global flag, lastIndex won't work
							var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
							pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
						}

						pattern = pattern.pattern || pattern;

						// Don’t cache length as it changes during the loop
						for (var i = 0, pos = 0; i < strarr.length; pos += strarr[i].length, ++i) {

							var str = strarr[i];

							if (strarr.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								break tokenloop;
							}

							if (str instanceof Token) {
								continue;
							}

							pattern.lastIndex = 0;

							var match = pattern.exec(str),
							    delNum = 1;

							// Greedy patterns can override/remove up to two previously matched tokens
							if (!match && greedy && i != strarr.length - 1) {
								pattern.lastIndex = pos;
								match = pattern.exec(text);
								if (!match) {
									break;
								}

								var from = match.index + (lookbehind ? match[1].length : 0),
								    to = match.index + match[0].length,
								    k = i,
								    p = pos;

								for (var len = strarr.length; k < len && p < to; ++k) {
									p += strarr[k].length;
									// Move the index i to the element in strarr that is closest to from
									if (from >= p) {
										++i;
										pos = p;
									}
								}

								/*
         * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
         * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
         */
								if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
									continue;
								}

								// Number of tokens to delete and replace with the new match
								delNum = k - i;
								str = text.slice(pos, p);
								match.index -= pos;
							}

							if (!match) {
								continue;
							}

							if (lookbehind) {
								lookbehindLength = match[1].length;
							}

							var from = match.index + lookbehindLength,
							    match = match[0].slice(lookbehindLength),
							    to = from + match.length,
							    before = str.slice(0, from),
							    after = str.slice(to);

							var args = [i, delNum];

							if (before) {
								args.push(before);
							}

							var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

							args.push(wrapped);

							if (after) {
								args.push(after);
							}

							Array.prototype.splice.apply(strarr, args);
						}
					}
				}

				return strarr;
			},

			hooks: {
				all: {},

				add: function add(name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				run: function run(name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; callback = callbacks[i++];) {
						callback(env);
					}
				}
			}
		};

		var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
			this.type = type;
			this.content = content;
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || "").length | 0;
			this.greedy = !!greedy;
		};

		Token.stringify = function (o, language, parent) {
			if (typeof o == 'string') {
				return o;
			}

			if (_.util.type(o) === 'Array') {
				return o.map(function (element) {
					return Token.stringify(element, language, o);
				}).join('');
			}

			var env = {
				type: o.type,
				content: Token.stringify(o.content, language, parent),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language,
				parent: parent
			};

			if (env.type == 'comment') {
				env.attributes['spellcheck'] = 'true';
			}

			if (o.alias) {
				var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
				Array.prototype.push.apply(env.classes, aliases);
			}

			_.hooks.run('wrap', env);

			var attributes = Object.keys(env.attributes).map(function (name) {
				return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}).join(' ');

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
		};

		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _self.Prism;
			}
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
				    lang = message.language,
				    code = message.code,
				    immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);

			return _self.Prism;
		}

		//Get current script and highlight
		var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

		if (script) {
			_.filename = script.src;

			if (document.addEventListener && !script.hasAttribute('data-manual')) {
				if (document.readyState !== "loading") {
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(_.highlightAll);
					} else {
						window.setTimeout(_.highlightAll, 16);
					}
				} else {
					document.addEventListener('DOMContentLoaded', _.highlightAll);
				}
			}
		}

		return _self.Prism;
	}();

	if ('object' !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}
});

var prismCore_1 = prismCore.highlight;
var prismCore_2 = prismCore.languages;

Prism.languages.clike = {
	'comment': [{
		pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
		lookbehind: true
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: true
	}],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/i,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

(function (Prism) {

	var javascript = Prism.util.clone(Prism.languages.javascript);

	Prism.languages.jsx = Prism.languages.extend('markup', javascript);
	Prism.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;

	Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

	var jsxExpression = Prism.util.clone(Prism.languages.jsx);

	delete jsxExpression.punctuation;

	jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
		'punctuation': /=(?={)|[{}[\];(),.:]/
	}, { jsx: jsxExpression });

	Prism.languages.insertBefore('inside', 'attr-value', {
		'script': {
			// Allow for one level of nesting
			pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
			inside: jsxExpression,
			'alias': 'language-javascript'
		}
	}, Prism.languages.jsx.tag);
})(Prism);

var prism = function prism(code) {
  return prismCore_1(code, prismCore_2.jsx);
};

var indentRegex = /^\s+/;

var getIndent = function getIndent(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf('\n') + 1;
  var lineSlice = startSlice.slice(lastNewline);
  var matches = lineSlice.match(indentRegex);
  if (matches === null) {
    return '';
  }

  return matches[0] || '';
};

var normalizeCode = function normalizeCode(code) {
  return code.replace(/^((  )+)/mg, function (_, p1) {
    return '\t'.repeat(p1.length / 2);
  });
};

var normalizeHtml = function normalizeHtml(html) {
  return html.replace('\n', '<br>');
};

var index = createCommonjsModule(function (module) {
  'use strict';

  var cache;

  /**
   * Convert HTML entities to HTML characters.
   *
   * @param  {String} `str` String with HTML entities to un-escape.
   * @return {String}
   */

  var unescape = module.exports = function (str) {
    if (str == null) return '';

    var re = cache || (cache = new RegExp('(' + Object.keys(chars).join('|') + ')', 'g'));
    return String(str).replace(re, function (match) {
      return chars[match];
    });
  };

  var chars = unescape.chars = {
    '&apos;': '\'',
    '&#39;': '\'',
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"'
  };
});

var htmlToPlain = function htmlToPlain(html) {
  return index(html.replace(/<br>/gm, '\n').replace(/<\/?[^>]*>/gm, ''));
};

/**
 * Expose `xor`
 */

var index$2 = xor$1;

/**
 * XOR utility
 *
 * T T F
 * T F T
 * F T T
 * F F F
 *
 * @param {Boolean} a
 * @param {Boolean} b
 * @return {Boolean}
 */

function xor$1(a, b) {
  return !a != !b;
}

/**
 * Global Names
 */

var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

/**
 * Return immediate identifiers parsed from `str`.
 *
 * @param {String} str
 * @param {String|Function} map function or prefix
 * @return {Array}
 * @api public
 */

var index$4 = function index(str, fn) {
  var p = unique(props$1(str));
  if (fn && 'string' == typeof fn) fn = prefixed(fn);
  if (fn) return map(str, p, fn);
  return p;
};

/**
 * Return immediate identifiers in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function props$1(str) {
  return str.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '').replace(globals, '').match(/[a-zA-Z_]\w*/g) || [];
}

/**
 * Return `str` with `props` mapped with `fn`.
 *
 * @param {String} str
 * @param {Array} props
 * @param {Function} fn
 * @return {String}
 * @api private
 */

function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
  return str.replace(re, function (_) {
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~props.indexOf(_)) return _;
    return fn(_);
  });
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

/**
 * Map with prefix `str`.
 */

function prefixed(str) {
  return function (_) {
    return str + _;
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Module Dependencies
 */

var xor;
var props;

try {
  xor = index$2;
} catch (e) {
  xor = index$2;
}

try {
  props = index$4;
} catch (e) {
  props = index$4;
}

/**
 * Export `Iterator`
 */

var index$1 = Iterator;

/**
 * Initialize `Iterator`
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Iterator} self
 * @api public
 */

function Iterator(node, root) {
  if (!(this instanceof Iterator)) return new Iterator(node, root);
  this.node = this.start = this.peeked = node;
  this.root = root;
  this.closingTag = false;
  this._revisit = true;
  this._selects = [];
  this._rejects = [];

  if (node && this.higher(node)) {
    throw new Error('root must be a parent or ancestor to node');
  }
}

/**
 * Reset the Iterator
 *
 * @param {Node} node (optional)
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reset = function (node) {
  this.node = node || this.start;
  return this;
};

/**
 * Revisit element nodes. Defaults to `true`
 */

Iterator.prototype.revisit = function (revisit) {
  this._revisit = undefined == revisit ? true : revisit;
  return this;
};

/**
 * Jump to the opening tag
 */

Iterator.prototype.opening = function () {
  if (1 == this.node.nodeType) this.closingTag = false;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atOpening = function () {
  return !this.closingTag;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.closing = function () {
  if (1 == this.node.nodeType) this.closingTag = true;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atClosing = function () {
  return this.closingTag;
};

/**
 * Next node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.next = traverse('nextSibling', 'firstChild');

/**
 * Previous node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.previous = Iterator.prototype.prev = traverse('previousSibling', 'lastChild');

/**
 * Make traverse function
 *
 * @param {String} dir
 * @param {String} child
 * @return {Function}
 * @api private
 */

function traverse(dir, child) {
  var next = dir == 'nextSibling';
  return function walk(expr, n, peek) {
    expr = this.compile(expr);
    n = n && n > 0 ? n : 1;
    var node = this.node;
    var closing = this.closingTag;
    var revisit = this._revisit;

    while (node) {
      if (xor(next, closing) && node[child]) {
        // element with children: <em>...</em>
        node = node[child];
        closing = !next;
      } else if (1 == node.nodeType && !node[child] && xor(next, closing)) {
        // empty element tag: <em></em>
        closing = next;
        if (!revisit) continue;
      } else if (node[dir]) {
        // element has a neighbor: ...<em></em>...
        node = node[dir];
        closing = !next;
      } else {
        // done with current layer, move up.
        node = node.parentNode;
        closing = next;
        if (!revisit) continue;
      }

      if (!node || this.higher(node, this.root)) break;

      if (expr(node) && this.selects(node, peek) && this.rejects(node, peek)) {
        if (--n) continue;
        if (!peek) this.node = node;
        this.closingTag = closing;
        return node;
      }
    }

    return null;
  };
}

/**
 * Select nodes that cause `expr(node)`
 * to be truthy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.select = function (expr) {
  expr = this.compile(expr);
  this._selects.push(expr);
  return this;
};

/**
 * Run through the selects ORing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.selects = function (node, peek) {
  var exprs = this._selects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return true;
  }

  return false;
};

/**
 * Select nodes that cause `expr(node)`
 * to be falsy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reject = function (expr) {
  expr = this.compile(expr);
  this._rejects.push(expr);
  return this;
};

/**
 * Run through the reject expressions ANDing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.rejects = function (node, peek) {
  var exprs = this._rejects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return false;
  }

  return true;
};

/**
 * Check if node is higher
 * than root.
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.higher = function (node) {
  var root = this.root;
  if (!root) return false;
  node = node.parentNode;
  while (node && node != root) {
    node = node.parentNode;
  }return node != root;
};

/**
 * Compile an expression
 *
 * @param {String|Function|Number} expr
 * @return {Function}
 */

Iterator.prototype.compile = function (expr) {
  switch (typeof expr === 'undefined' ? 'undefined' : _typeof(expr)) {
    case 'number':
      return function (node) {
        return expr == node.nodeType;
      };
    case 'string':
      return new Function('node', 'return ' + props(expr, 'node.'));
    case 'function':
      return expr;
    default:
      return function () {
        return true;
      };
  }
};

/**
 * Peek in either direction
 * `n` nodes. Peek backwards
 * using negative numbers.
 *
 * @param {Number} n (optional)
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.peak = Iterator.prototype.peek = function (expr, n) {
  if (arguments.length == 1) n = expr, expr = true;
  n = undefined == n ? 1 : n;
  if (!n) return this.node;else if (n > 0) return this.next(expr, n, true);else return this.prev(expr, Math.abs(n), true);
};

/**
 * Add a plugin
 *
 * @param {Function} fn
 * @return {Iterator}
 * @api public
 */

Iterator.prototype.use = function (fn) {
  fn(this);
  return this;
};

function position(el, pos) {
  var selection = window.getSelection();

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    indexes.commonAncestorContainer = clone.commonAncestorContainer;
    indexes.endContainer = clone.endContainer;
    indexes.startContainer = clone.startContainer;
    return indexes;
  }

  var setSelection = pos.end && pos.end !== pos.start;
  var length = 0;
  var range = document.createRange();
  var it = index$1(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()) {
    var olen = length;
    length += next.textContent.length;

    // Set start point of selection
    var atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    }

    // Set end point of selection
    if (setSelection && length >= end) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

function makeSelection(el, range) {
  var selection = window.getSelection();
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

var Editor = function (_Component) {
  inherits(Editor, _Component);

  function Editor() {
    var _temp, _this, _ret;

    classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.undoStack = [], _this.undoOffset = 0, _this.undoTimestamp = 0, _this.state = {
      html: ''
    }, _this.onRef = function (node) {
      _this.ref = node;
    }, _this.getPlain = function () {
      if (_this._innerHTML === _this.ref.innerHTML) {
        return _this._plain;
      }

      var plain = htmlToPlain(normalizeHtml(_this.ref.innerHTML));

      _this._plain = plain;
      _this._innerHTML = _this.ref.innerHTML;

      return _this._plain;
    }, _this.recordChange = function (plain, selection) {
      if (plain === _this.undoStack[_this.undoStack.length - 1]) {
        return;
      }

      if (_this.undoOffset > 0) {
        _this.undoStack = _this.undoStack.slice(0, -_this.undoOffset);
        _this.undoOffset = 0;
      }

      var timestamp = Date.now();
      var record = { plain: plain, selection: selection };

      // Overwrite last record if threshold is not crossed
      if (timestamp - _this.undoTimestamp < 3000) {
        _this.undoStack[_this.undoStack.length - 1] = record;
      } else {
        _this.undoStack.push(record);

        if (_this.undoStack.length > 50) {
          _this.undoStack.shift();
        }
      }

      _this.undoTimestamp = timestamp;
    }, _this.updateContent = function (plain) {
      _this.setState({ html: prism(plain) });

      if (_this.props.onChange) {
        _this.props.onChange(plain);
      }
    }, _this.restoreStackState = function (offset) {
      var _this$undoStack = _this.undoStack[_this.undoStack.length - 1 - offset],
          plain = _this$undoStack.plain,
          selection = _this$undoStack.selection;


      _this.selection = selection;
      _this.undoOffset = offset;
      _this.updateContent(plain);
    }, _this.undo = function () {
      var offset = _this.undoOffset + 1;
      if (offset >= _this.undoStack.length) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.redo = function () {
      var offset = _this.undoOffset - 1;
      if (offset < 0) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.onKeyDown = function (evt) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(evt);
      }
      if (evt.keyCode === 9 && !_this.props.ignoreTabKey) {
        // Tab Key
        document.execCommand('insertHTML', false, '&#009');
        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        var _selectionRange = position(_this.ref),
            cursorPos = _selectionRange.start;

        var indentation = getIndent(_this.getPlain(), cursorPos);

        document.execCommand('insertHTML', false, '\n' + indentation);
        evt.preventDefault();
      } else if (
      // Undo / Redo
      evt.keyCode === 90 && evt.metaKey !== evt.ctrlKey && !evt.altKey) {
        if (evt.shiftKey) {
          _this.redo();
        } else {
          _this.undo();
        }

        evt.preventDefault();
      }
    }, _this.onKeyUp = function (evt) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(evt);
      }
      if (evt.keyCode === 91 || // left cmd
      evt.keyCode === 93 || // right cmd
      evt.ctrlKey || evt.metaKey) {
        return;
      }

      // Enter key
      if (evt.keyCode === 13) {
        _this.undoTimestamp = 0;
      }

      _this.selection = position(_this.ref);

      if (evt.keyCode !== 37 && // left
      evt.keyCode !== 38 && // up
      evt.keyCode !== 39 && // right
      evt.keyCode !== 40 // down
      ) {
          var plain = _this.getPlain();

          _this.recordChange(plain, _this.selection);
          _this.updateContent(plain);
        } else {
        _this.undoTimestamp = 0;
      }
    }, _this.onClick = function (evt) {
      if (_this.props.onClick) {
        _this.props.onClick(evt);
      }
      _this.undoTimestamp = 0; // Reset timestamp
      _this.selection = position(_this.ref);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentWillMount = function componentWillMount() {
    var html = prism(normalizeCode(this.props.code));
    this.setState({ html: html });
  };

  Editor.prototype.componentDidMount = function componentDidMount() {
    this.recordChange(this.getPlain());
    this.undoTimestamp = 0; // Reset timestamp
  };

  Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var code = _ref.code;

    if (code !== this.props.code) {
      var html = prism(normalizeCode(code));
      this.setState({ html: html });
    }
  };

  Editor.prototype.componentDidUpdate = function componentDidUpdate() {
    var selection = this.selection;

    if (selection) {
      position(this.ref, selection);
    }
  };

  Editor.prototype.render = function render() {
    var _props = this.props,
        contentEditable = _props.contentEditable,
        className = _props.className,
        style = _props.style,
        rest = objectWithoutProperties(_props, ['contentEditable', 'className', 'style']);
    var html = this.state.html;

    delete rest.code;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('pre', _extends({}, rest, {
      ref: this.onRef,
      className: cn('prism-code', className),
      style: style,
      spellCheck: 'false',
      contentEditable: contentEditable,
      onKeyDown: contentEditable && this.onKeyDown,
      onKeyUp: contentEditable && this.onKeyUp,
      onClick: contentEditable && this.onClick,
      dangerouslySetInnerHTML: { __html: html }
    }));
  };

  return Editor;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Editor.defaultProps = {
  contentEditable: true
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

var warning_1 = warning;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

{
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning_1(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index$6 = createCommonjsModule(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
});

var buble_deps = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    factory(exports);
  })(commonjsGlobal, function (exports) {
    'use strict';

    var __commonjs_global = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : this;
    function __commonjs(fn, module) {
      return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports;
    }

    var acorn = __commonjs(function (module, exports, global) {
      (function (global, factory) {
        (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  false ? undefined(['exports'], factory) : factory(global.acorn = global.acorn || {});
      })(__commonjs_global, function (exports) {
        'use strict';

        // Reserved word lists for various dialects of the language

        var reservedWords = {
          3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
          5: "class enum extends super const export import",
          6: "enum",
          7: "enum",
          strict: "implements interface let package private protected public static yield",
          strictBind: "eval arguments"
        };

        // And the keywords

        var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

        var keywords = {
          5: ecma5AndLessKeywords,
          6: ecma5AndLessKeywords + " const class extends export import super"
        };

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.
        // Generated by `bin/generate-identifier-regex.js`.

        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';

        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

        // These are a run-length and offset encoded representation of the
        // >0xffff code points that are a valid part of identifiers. The
        // offset starts at 0x10000, and each pair of numbers represents an
        // offset to the next range, and then a size of the range. They were
        // generated by bin/generate-identifier-regex.js
        var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];
        var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];

        // This has a complexity linear to the value of the code. The
        // assumption is that looking up astral identifier characters is
        // rare.
        function isInAstralSet(code, set$$1) {
          var pos = 0x10000;
          for (var i = 0; i < set$$1.length; i += 2) {
            pos += set$$1[i];
            if (pos > code) return false;
            pos += set$$1[i + 1];
            if (pos >= code) return true;
          }
        }

        // Test whether a given character code starts an identifier.

        function isIdentifierStart(code, astral) {
          if (code < 65) return code === 36;
          if (code < 91) return true;
          if (code < 97) return code === 95;
          if (code < 123) return true;
          if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
          if (astral === false) return false;
          return isInAstralSet(code, astralIdentifierStartCodes);
        }

        // Test whether a given character is part of an identifier.

        function isIdentifierChar(code, astral) {
          if (code < 48) return code === 36;
          if (code < 58) return true;
          if (code < 65) return false;
          if (code < 91) return true;
          if (code < 97) return code === 95;
          if (code < 123) return true;
          if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
          if (astral === false) return false;
          return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
        }

        // ## Token types

        // The assignment of fine-grained, information-carrying type objects
        // allows the tokenizer to store the information it has about a
        // token in a way that is very cheap for the parser to look up.

        // All token type variables start with an underscore, to make them
        // easy to recognize.

        // The `beforeExpr` property is used to disambiguate between regular
        // expressions and divisions. It is set on all token types that can
        // be followed by an expression (thus, a slash after them would be a
        // regular expression).
        //
        // The `startsExpr` property is used to check if the token ends a
        // `yield` expression. It is set on all token types that either can
        // directly start an expression (like a quotation mark) or can
        // continue an expression (like the body of a string).
        //
        // `isLoop` marks a keyword as starting a loop, which is important
        // to know when parsing a label, in order to allow or disallow
        // continue jumps to that label.

        var TokenType = function TokenType(label, conf) {
          if (conf === void 0) conf = {};

          this.label = label;
          this.keyword = conf.keyword;
          this.beforeExpr = !!conf.beforeExpr;
          this.startsExpr = !!conf.startsExpr;
          this.isLoop = !!conf.isLoop;
          this.isAssign = !!conf.isAssign;
          this.prefix = !!conf.prefix;
          this.postfix = !!conf.postfix;
          this.binop = conf.binop || null;
          this.updateContext = null;
        };

        function binop(name, prec) {
          return new TokenType(name, { beforeExpr: true, binop: prec });
        }
        var beforeExpr = { beforeExpr: true };
        var startsExpr = { startsExpr: true };
        // Map keyword names to token types.

        var keywordTypes = {};

        // Succinct definitions of keyword token types
        function kw(name, options) {
          if (options === void 0) options = {};

          options.keyword = name;
          return keywordTypes[name] = new TokenType(name, options);
        }

        var tt = {
          num: new TokenType("num", startsExpr),
          regexp: new TokenType("regexp", startsExpr),
          string: new TokenType("string", startsExpr),
          name: new TokenType("name", startsExpr),
          eof: new TokenType("eof"),

          // Punctuation token types.
          bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
          bracketR: new TokenType("]"),
          braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
          braceR: new TokenType("}"),
          parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
          parenR: new TokenType(")"),
          comma: new TokenType(",", beforeExpr),
          semi: new TokenType(";", beforeExpr),
          colon: new TokenType(":", beforeExpr),
          dot: new TokenType("."),
          question: new TokenType("?", beforeExpr),
          arrow: new TokenType("=>", beforeExpr),
          template: new TokenType("template"),
          ellipsis: new TokenType("...", beforeExpr),
          backQuote: new TokenType("`", startsExpr),
          dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

          // Operators. These carry several kinds of properties to help the
          // parser use them properly (the presence of these properties is
          // what categorizes them as operators).
          //
          // `binop`, when present, specifies that this operator is a binary
          // operator, and will refer to its precedence.
          //
          // `prefix` and `postfix` mark the operator as a prefix or postfix
          // unary operator.
          //
          // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
          // binary operators with a very low precedence, that should result
          // in AssignmentExpression nodes.

          eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
          assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
          incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
          prefix: new TokenType("prefix", { beforeExpr: true, prefix: true, startsExpr: true }),
          logicalOR: binop("||", 1),
          logicalAND: binop("&&", 2),
          bitwiseOR: binop("|", 3),
          bitwiseXOR: binop("^", 4),
          bitwiseAND: binop("&", 5),
          equality: binop("==/!=", 6),
          relational: binop("</>", 7),
          bitShift: binop("<</>>", 8),
          plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
          modulo: binop("%", 10),
          star: binop("*", 10),
          slash: binop("/", 10),
          starstar: new TokenType("**", { beforeExpr: true }),

          // Keyword token types.
          _break: kw("break"),
          _case: kw("case", beforeExpr),
          _catch: kw("catch"),
          _continue: kw("continue"),
          _debugger: kw("debugger"),
          _default: kw("default", beforeExpr),
          _do: kw("do", { isLoop: true, beforeExpr: true }),
          _else: kw("else", beforeExpr),
          _finally: kw("finally"),
          _for: kw("for", { isLoop: true }),
          _function: kw("function", startsExpr),
          _if: kw("if"),
          _return: kw("return", beforeExpr),
          _switch: kw("switch"),
          _throw: kw("throw", beforeExpr),
          _try: kw("try"),
          _var: kw("var"),
          _const: kw("const"),
          _while: kw("while", { isLoop: true }),
          _with: kw("with"),
          _new: kw("new", { beforeExpr: true, startsExpr: true }),
          _this: kw("this", startsExpr),
          _super: kw("super", startsExpr),
          _class: kw("class"),
          _extends: kw("extends", beforeExpr),
          _export: kw("export"),
          _import: kw("import"),
          _null: kw("null", startsExpr),
          _true: kw("true", startsExpr),
          _false: kw("false", startsExpr),
          _in: kw("in", { beforeExpr: true, binop: 7 }),
          _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
          _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
          _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
          _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
        };

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        var lineBreak = /\r\n?|\n|\u2028|\u2029/;
        var lineBreakG = new RegExp(lineBreak.source, "g");

        function isNewLine(code) {
          return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
        }

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

        var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

        function isArray(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        }

        // Checks if an object has a property.

        function has(obj, propName) {
          return Object.prototype.hasOwnProperty.call(obj, propName);
        }

        // These are used when `options.locations` is on, for the
        // `startLoc` and `endLoc` properties.

        var Position = function Position(line, col) {
          this.line = line;
          this.column = col;
        };

        Position.prototype.offset = function offset(n) {
          return new Position(this.line, this.column + n);
        };

        var SourceLocation = function SourceLocation(p, start, end) {
          this.start = start;
          this.end = end;
          if (p.sourceFile !== null) this.source = p.sourceFile;
        };

        // The `getLineInfo` function is mostly useful when the
        // `locations` option is off (for performance reasons) and you
        // want to find the line/column position for a given character
        // offset. `input` should be the code string that the offset refers
        // into.

        function getLineInfo(input, offset) {
          for (var line = 1, cur = 0;;) {
            lineBreakG.lastIndex = cur;
            var match = lineBreakG.exec(input);
            if (match && match.index < offset) {
              ++line;
              cur = match.index + match[0].length;
            } else {
              return new Position(line, offset - cur);
            }
          }
        }

        // A second optional argument can be given to further configure
        // the parser process. These options are recognized:

        var defaultOptions = {
          // `ecmaVersion` indicates the ECMAScript version to parse. Must
          // be either 3, or 5, or 6. This influences support for strict
          // mode, the set of reserved words, support for getters and
          // setters and other features. The default is 6.
          ecmaVersion: 6,
          // Source type ("script" or "module") for different semantics
          sourceType: "script",
          // `onInsertedSemicolon` can be a callback that will be called
          // when a semicolon is automatically inserted. It will be passed
          // th position of the comma as an offset, and if `locations` is
          // enabled, it is given the location as a `{line, column}` object
          // as second argument.
          onInsertedSemicolon: null,
          // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
          // trailing commas.
          onTrailingComma: null,
          // By default, reserved words are only enforced if ecmaVersion >= 5.
          // Set `allowReserved` to a boolean value to explicitly turn this on
          // an off. When this option has the value "never", reserved words
          // and keywords can also not be used as property names.
          allowReserved: null,
          // When enabled, a return at the top level is not considered an
          // error.
          allowReturnOutsideFunction: false,
          // When enabled, import/export statements are not constrained to
          // appearing at the top of the program.
          allowImportExportEverywhere: false,
          // When enabled, hashbang directive in the beginning of file
          // is allowed and treated as a line comment.
          allowHashBang: false,
          // When `locations` is on, `loc` properties holding objects with
          // `start` and `end` properties in `{line, column}` form (with
          // line being 1-based and column 0-based) will be attached to the
          // nodes.
          locations: false,
          // A function can be passed as `onToken` option, which will
          // cause Acorn to call that function with object in the same
          // format as tokens returned from `tokenizer().getToken()`. Note
          // that you are not allowed to call the parser from the
          // callback—that will corrupt its internal state.
          onToken: null,
          // A function can be passed as `onComment` option, which will
          // cause Acorn to call that function with `(block, text, start,
          // end)` parameters whenever a comment is skipped. `block` is a
          // boolean indicating whether this is a block (`/* */`) comment,
          // `text` is the content of the comment, and `start` and `end` are
          // character offsets that denote the start and end of the comment.
          // When the `locations` option is on, two more parameters are
          // passed, the full `{line, column}` locations of the start and
          // end of the comments. Note that you are not allowed to call the
          // parser from the callback—that will corrupt its internal state.
          onComment: null,
          // Nodes have their start and end characters offsets recorded in
          // `start` and `end` properties (directly on the node, rather than
          // the `loc` object, which holds line/column data. To also add a
          // [semi-standardized][range] `range` property holding a `[start,
          // end]` array with the same numbers, set the `ranges` option to
          // `true`.
          //
          // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
          ranges: false,
          // It is possible to parse multiple files into a single AST by
          // passing the tree produced by parsing the first file as
          // `program` option in subsequent parses. This will add the
          // toplevel forms of the parsed file to the `Program` (top) node
          // of an existing parse tree.
          program: null,
          // When `locations` is on, you can pass this to record the source
          // file in every node's `loc` object.
          sourceFile: null,
          // This value, if given, is stored in every node, whether
          // `locations` is on or off.
          directSourceFile: null,
          // When enabled, parenthesized expressions are represented by
          // (non-standard) ParenthesizedExpression nodes
          preserveParens: false,
          plugins: {}
        };

        // Interpret and default an options object

        function getOptions(opts) {
          var options = {};
          for (var opt in defaultOptions) {
            options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
          }if (options.allowReserved == null) options.allowReserved = options.ecmaVersion < 5;

          if (isArray(options.onToken)) {
            var tokens = options.onToken;
            options.onToken = function (token) {
              return tokens.push(token);
            };
          }
          if (isArray(options.onComment)) options.onComment = pushComment(options, options.onComment);

          return options;
        }

        function pushComment(options, array) {
          return function (block, text, start, end, startLoc, endLoc) {
            var comment = {
              type: block ? 'Block' : 'Line',
              value: text,
              start: start,
              end: end
            };
            if (options.locations) comment.loc = new SourceLocation(this, startLoc, endLoc);
            if (options.ranges) comment.range = [start, end];
            array.push(comment);
          };
        }

        // Registered plugins
        var plugins = {};

        function keywordRegexp(words) {
          return new RegExp("^(" + words.replace(/ /g, "|") + ")$");
        }

        var Parser = function Parser(options, input, startPos) {
          this.options = options = getOptions(options);
          this.sourceFile = options.sourceFile;
          this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
          var reserved = options.allowReserved ? "" : reservedWords[options.ecmaVersion] + (options.sourceType == "module" ? " await" : "");
          this.reservedWords = keywordRegexp(reserved);
          var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
          this.reservedWordsStrict = keywordRegexp(reservedStrict);
          this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
          this.input = String(input);

          // Used to signal to callers of `readWord1` whether the word
          // contained any escape sequences. This is needed because words with
          // escape sequences must not be interpreted as keywords.
          this.containsEsc = false;

          // Load plugins
          this.loadPlugins(options.plugins);

          // Set up token state

          // The current position of the tokenizer in the input.
          if (startPos) {
            this.pos = startPos;
            this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
            this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
          } else {
            this.pos = this.lineStart = 0;
            this.curLine = 1;
          }

          // Properties of the current token:
          // Its type
          this.type = tt.eof;
          // For tokens that include more information than their type, the value
          this.value = null;
          // Its start and end offset
          this.start = this.end = this.pos;
          // And, if locations are used, the {line, column} object
          // corresponding to those offsets
          this.startLoc = this.endLoc = this.curPosition();

          // Position information for the previous token
          this.lastTokEndLoc = this.lastTokStartLoc = null;
          this.lastTokStart = this.lastTokEnd = this.pos;

          // The context stack is used to superficially track syntactic
          // context to predict whether a regular expression is allowed in a
          // given position.
          this.context = this.initialContext();
          this.exprAllowed = true;

          // Figure out if it's a module code.
          this.strict = this.inModule = options.sourceType === "module";

          // Used to signify the start of a potential arrow function
          this.potentialArrowAt = -1;

          // Flags to track whether we are in a function, a generator.
          this.inFunction = this.inGenerator = false;
          // Labels in scope.
          this.labels = [];

          // If enabled, skip leading hashbang line.
          if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === '#!') this.skipLineComment(2);
        };

        // DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
        Parser.prototype.isKeyword = function isKeyword(word) {
          return this.keywords.test(word);
        };
        Parser.prototype.isReservedWord = function isReservedWord(word) {
          return this.reservedWords.test(word);
        };

        Parser.prototype.extend = function extend(name, f) {
          this[name] = f(this[name]);
        };

        Parser.prototype.loadPlugins = function loadPlugins(pluginConfigs) {
          var this$1 = this;

          for (var name in pluginConfigs) {
            var plugin = plugins[name];
            if (!plugin) throw new Error("Plugin '" + name + "' not found");
            plugin(this$1, pluginConfigs[name]);
          }
        };

        Parser.prototype.parse = function parse() {
          var node = this.options.program || this.startNode();
          this.nextToken();
          return this.parseTopLevel(node);
        };

        var pp = Parser.prototype;

        // ## Parser utilities

        // Test whether a statement node is the string literal `"use strict"`.

        pp.isUseStrict = function (stmt) {
          return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.raw.slice(1, -1) === "use strict";
        };

        // Predicate that tests whether the next token is of the given
        // type, and if yes, consumes it as a side effect.

        pp.eat = function (type) {
          if (this.type === type) {
            this.next();
            return true;
          } else {
            return false;
          }
        };

        // Tests whether parsed token is a contextual keyword.

        pp.isContextual = function (name) {
          return this.type === tt.name && this.value === name;
        };

        // Consumes contextual keyword if possible.

        pp.eatContextual = function (name) {
          return this.value === name && this.eat(tt.name);
        };

        // Asserts that following token is given contextual keyword.

        pp.expectContextual = function (name) {
          if (!this.eatContextual(name)) this.unexpected();
        };

        // Test whether a semicolon can be inserted at the current position.

        pp.canInsertSemicolon = function () {
          return this.type === tt.eof || this.type === tt.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };

        pp.insertSemicolon = function () {
          if (this.canInsertSemicolon()) {
            if (this.options.onInsertedSemicolon) this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
            return true;
          }
        };

        // Consume a semicolon, or, failing that, see if we are allowed to
        // pretend that there is a semicolon at this position.

        pp.semicolon = function () {
          if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected();
        };

        pp.afterTrailingComma = function (tokType) {
          if (this.type == tokType) {
            if (this.options.onTrailingComma) this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
            this.next();
            return true;
          }
        };

        // Expect a token of a given type. If found, consume it, otherwise,
        // raise an unexpected token error.

        pp.expect = function (type) {
          this.eat(type) || this.unexpected();
        };

        // Raise an unexpected token error.

        pp.unexpected = function (pos) {
          this.raise(pos != null ? pos : this.start, "Unexpected token");
        };

        var DestructuringErrors = function DestructuringErrors() {
          this.shorthandAssign = 0;
          this.trailingComma = 0;
        };

        pp.checkPatternErrors = function (refDestructuringErrors, andThrow) {
          var trailing = refDestructuringErrors && refDestructuringErrors.trailingComma;
          if (!andThrow) return !!trailing;
          if (trailing) this.raise(trailing, "Comma is not permitted after the rest element");
        };

        pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
          var pos = refDestructuringErrors && refDestructuringErrors.shorthandAssign;
          if (!andThrow) return !!pos;
          if (pos) this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns");
        };

        var pp$1 = Parser.prototype;

        // ### Statement parsing

        // Parse a program. Initializes the parser, reads any number of
        // statements, and wraps them in a Program node.  Optionally takes a
        // `program` argument.  If present, the statements will be appended
        // to its body instead of creating a new node.

        pp$1.parseTopLevel = function (node) {
          var this$1 = this;

          var first = true;
          if (!node.body) node.body = [];
          while (this.type !== tt.eof) {
            var stmt = this$1.parseStatement(true, true);
            node.body.push(stmt);
            if (first) {
              if (this$1.isUseStrict(stmt)) this$1.setStrict(true);
              first = false;
            }
          }
          this.next();
          if (this.options.ecmaVersion >= 6) {
            node.sourceType = this.options.sourceType;
          }
          return this.finishNode(node, "Program");
        };

        var loopLabel = { kind: "loop" };
        var switchLabel = { kind: "switch" };
        pp$1.isLet = function () {
          if (this.type !== tt.name || this.options.ecmaVersion < 6 || this.value != "let") return false;
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length,
              nextCh = this.input.charCodeAt(next);
          if (nextCh === 91 || nextCh == 123) return true; // '{' and '['
          if (isIdentifierStart(nextCh, true)) {
            for (var pos = next + 1; isIdentifierChar(this.input.charCodeAt(pos), true); ++pos) {}
            var ident = this.input.slice(next, pos);
            if (!this.isKeyword(ident)) return true;
          }
          return false;
        };

        // Parse a single statement.
        //
        // If expecting a statement and finding a slash operator, parse a
        // regular expression literal. This is to handle cases like
        // `if (foo) /blah/.exec(foo)`, where looking at the previous token
        // does not help.

        pp$1.parseStatement = function (declaration, topLevel) {
          var starttype = this.type,
              node = this.startNode(),
              kind;

          if (this.isLet()) {
            starttype = tt._var;
            kind = "let";
          }

          // Most types of statements are recognized by the keyword they
          // start with. Many are trivial to parse, some require a bit of
          // complexity.

          switch (starttype) {
            case tt._break:case tt._continue:
              return this.parseBreakContinueStatement(node, starttype.keyword);
            case tt._debugger:
              return this.parseDebuggerStatement(node);
            case tt._do:
              return this.parseDoStatement(node);
            case tt._for:
              return this.parseForStatement(node);
            case tt._function:
              if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
              return this.parseFunctionStatement(node);
            case tt._class:
              if (!declaration) this.unexpected();
              return this.parseClass(node, true);
            case tt._if:
              return this.parseIfStatement(node);
            case tt._return:
              return this.parseReturnStatement(node);
            case tt._switch:
              return this.parseSwitchStatement(node);
            case tt._throw:
              return this.parseThrowStatement(node);
            case tt._try:
              return this.parseTryStatement(node);
            case tt._const:case tt._var:
              kind = kind || this.value;
              if (!declaration && kind != "var") this.unexpected();
              return this.parseVarStatement(node, kind);
            case tt._while:
              return this.parseWhileStatement(node);
            case tt._with:
              return this.parseWithStatement(node);
            case tt.braceL:
              return this.parseBlock();
            case tt.semi:
              return this.parseEmptyStatement(node);
            case tt._export:
            case tt._import:
              if (!this.options.allowImportExportEverywhere) {
                if (!topLevel) this.raise(this.start, "'import' and 'export' may only appear at the top level");
                if (!this.inModule) this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
              }
              return starttype === tt._import ? this.parseImport(node) : this.parseExport(node);

            // If the statement does not start with a statement keyword or a
            // brace, it's an ExpressionStatement or LabeledStatement. We
            // simply start parsing an expression, and afterwards, if the
            // next token is a colon and the expression was a simple
            // Identifier node, we switch to interpreting it as a label.
            default:
              var maybeName = this.value,
                  expr = this.parseExpression();
              if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon)) return this.parseLabeledStatement(node, maybeName, expr);else return this.parseExpressionStatement(node, expr);
          }
        };

        pp$1.parseBreakContinueStatement = function (node, keyword) {
          var this$1 = this;

          var isBreak = keyword == "break";
          this.next();
          if (this.eat(tt.semi) || this.insertSemicolon()) node.label = null;else if (this.type !== tt.name) this.unexpected();else {
            node.label = this.parseIdent();
            this.semicolon();
          }

          // Verify that there is an actual destination to break or
          // continue to.
          for (var i = 0; i < this.labels.length; ++i) {
            var lab = this$1.labels[i];
            if (node.label == null || lab.name === node.label.name) {
              if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
              if (node.label && isBreak) break;
            }
          }
          if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
          return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
        };

        pp$1.parseDebuggerStatement = function (node) {
          this.next();
          this.semicolon();
          return this.finishNode(node, "DebuggerStatement");
        };

        pp$1.parseDoStatement = function (node) {
          this.next();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          this.expect(tt._while);
          node.test = this.parseParenExpression();
          if (this.options.ecmaVersion >= 6) this.eat(tt.semi);else this.semicolon();
          return this.finishNode(node, "DoWhileStatement");
        };

        // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
        // loop is non-trivial. Basically, we have to parse the init `var`
        // statement or expression, disallowing the `in` operator (see
        // the second parameter to `parseExpression`), and then check
        // whether the next token is `in` or `of`. When there is no init
        // part (semicolon immediately after the opening parenthesis), it
        // is a regular `for` loop.

        pp$1.parseForStatement = function (node) {
          this.next();
          this.labels.push(loopLabel);
          this.expect(tt.parenL);
          if (this.type === tt.semi) return this.parseFor(node, null);
          var isLet = this.isLet();
          if (this.type === tt._var || this.type === tt._const || isLet) {
            var init$1 = this.startNode(),
                kind = isLet ? "let" : this.value;
            this.next();
            this.parseVar(init$1, true, kind);
            this.finishNode(init$1, "VariableDeclaration");
            if ((this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1 && !(kind !== "var" && init$1.declarations[0].init)) return this.parseForIn(node, init$1);
            return this.parseFor(node, init$1);
          }
          var refDestructuringErrors = new DestructuringErrors();
          var init = this.parseExpression(true, refDestructuringErrors);
          if (this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
            this.checkPatternErrors(refDestructuringErrors, true);
            this.toAssignable(init);
            this.checkLVal(init);
            return this.parseForIn(node, init);
          } else {
            this.checkExpressionErrors(refDestructuringErrors, true);
          }
          return this.parseFor(node, init);
        };

        pp$1.parseFunctionStatement = function (node) {
          this.next();
          return this.parseFunction(node, true);
        };

        pp$1.parseIfStatement = function (node) {
          this.next();
          node.test = this.parseParenExpression();
          node.consequent = this.parseStatement(false);
          node.alternate = this.eat(tt._else) ? this.parseStatement(false) : null;
          return this.finishNode(node, "IfStatement");
        };

        pp$1.parseReturnStatement = function (node) {
          if (!this.inFunction && !this.options.allowReturnOutsideFunction) this.raise(this.start, "'return' outside of function");
          this.next();

          // In `return` (and `break`/`continue`), the keywords with
          // optional arguments, we eagerly look for a semicolon or the
          // possibility to insert one.

          if (this.eat(tt.semi) || this.insertSemicolon()) node.argument = null;else {
            node.argument = this.parseExpression();this.semicolon();
          }
          return this.finishNode(node, "ReturnStatement");
        };

        pp$1.parseSwitchStatement = function (node) {
          var this$1 = this;

          this.next();
          node.discriminant = this.parseParenExpression();
          node.cases = [];
          this.expect(tt.braceL);
          this.labels.push(switchLabel);

          // Statements under must be grouped (by label) in SwitchCase
          // nodes. `cur` is used to keep the node that we are currently
          // adding statements to.

          for (var cur, sawDefault = false; this.type != tt.braceR;) {
            if (this$1.type === tt._case || this$1.type === tt._default) {
              var isCase = this$1.type === tt._case;
              if (cur) this$1.finishNode(cur, "SwitchCase");
              node.cases.push(cur = this$1.startNode());
              cur.consequent = [];
              this$1.next();
              if (isCase) {
                cur.test = this$1.parseExpression();
              } else {
                if (sawDefault) this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses");
                sawDefault = true;
                cur.test = null;
              }
              this$1.expect(tt.colon);
            } else {
              if (!cur) this$1.unexpected();
              cur.consequent.push(this$1.parseStatement(true));
            }
          }
          if (cur) this.finishNode(cur, "SwitchCase");
          this.next(); // Closing brace
          this.labels.pop();
          return this.finishNode(node, "SwitchStatement");
        };

        pp$1.parseThrowStatement = function (node) {
          this.next();
          if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) this.raise(this.lastTokEnd, "Illegal newline after throw");
          node.argument = this.parseExpression();
          this.semicolon();
          return this.finishNode(node, "ThrowStatement");
        };

        // Reused empty array added for node fields that are always empty.

        var empty = [];

        pp$1.parseTryStatement = function (node) {
          this.next();
          node.block = this.parseBlock();
          node.handler = null;
          if (this.type === tt._catch) {
            var clause = this.startNode();
            this.next();
            this.expect(tt.parenL);
            clause.param = this.parseBindingAtom();
            this.checkLVal(clause.param, true);
            this.expect(tt.parenR);
            clause.body = this.parseBlock();
            node.handler = this.finishNode(clause, "CatchClause");
          }
          node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
          if (!node.handler && !node.finalizer) this.raise(node.start, "Missing catch or finally clause");
          return this.finishNode(node, "TryStatement");
        };

        pp$1.parseVarStatement = function (node, kind) {
          this.next();
          this.parseVar(node, false, kind);
          this.semicolon();
          return this.finishNode(node, "VariableDeclaration");
        };

        pp$1.parseWhileStatement = function (node) {
          this.next();
          node.test = this.parseParenExpression();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "WhileStatement");
        };

        pp$1.parseWithStatement = function (node) {
          if (this.strict) this.raise(this.start, "'with' in strict mode");
          this.next();
          node.object = this.parseParenExpression();
          node.body = this.parseStatement(false);
          return this.finishNode(node, "WithStatement");
        };

        pp$1.parseEmptyStatement = function (node) {
          this.next();
          return this.finishNode(node, "EmptyStatement");
        };

        pp$1.parseLabeledStatement = function (node, maybeName, expr) {
          var this$1 = this;

          for (var i = 0; i < this.labels.length; ++i) {
            if (this$1.labels[i].name === maybeName) this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
          }var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null;
          for (var i$1 = this.labels.length - 1; i$1 >= 0; i$1--) {
            var label = this$1.labels[i$1];
            if (label.statementStart == node.start) {
              label.statementStart = this$1.start;
              label.kind = kind;
            } else break;
          }
          this.labels.push({ name: maybeName, kind: kind, statementStart: this.start });
          node.body = this.parseStatement(true);
          this.labels.pop();
          node.label = expr;
          return this.finishNode(node, "LabeledStatement");
        };

        pp$1.parseExpressionStatement = function (node, expr) {
          node.expression = expr;
          this.semicolon();
          return this.finishNode(node, "ExpressionStatement");
        };

        // Parse a semicolon-enclosed block of statements, handling `"use
        // strict"` declarations when `allowStrict` is true (used for
        // function bodies).

        pp$1.parseBlock = function (allowStrict) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              oldStrict;
          node.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            var stmt = this$1.parseStatement(true);
            node.body.push(stmt);
            if (first && allowStrict && this$1.isUseStrict(stmt)) {
              oldStrict = this$1.strict;
              this$1.setStrict(this$1.strict = true);
            }
            first = false;
          }
          if (oldStrict === false) this.setStrict(false);
          return this.finishNode(node, "BlockStatement");
        };

        // Parse a regular `for` loop. The disambiguation code in
        // `parseStatement` will already have parsed the init statement or
        // expression.

        pp$1.parseFor = function (node, init) {
          node.init = init;
          this.expect(tt.semi);
          node.test = this.type === tt.semi ? null : this.parseExpression();
          this.expect(tt.semi);
          node.update = this.type === tt.parenR ? null : this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "ForStatement");
        };

        // Parse a `for`/`in` and `for`/`of` loop, which are almost
        // same from parser's perspective.

        pp$1.parseForIn = function (node, init) {
          var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement";
          this.next();
          node.left = init;
          node.right = this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, type);
        };

        // Parse a list of variable declarations.

        pp$1.parseVar = function (node, isFor, kind) {
          var this$1 = this;

          node.declarations = [];
          node.kind = kind;
          for (;;) {
            var decl = this$1.startNode();
            this$1.parseVarId(decl);
            if (this$1.eat(tt.eq)) {
              decl.init = this$1.parseMaybeAssign(isFor);
            } else if (kind === "const" && !(this$1.type === tt._in || this$1.options.ecmaVersion >= 6 && this$1.isContextual("of"))) {
              this$1.unexpected();
            } else if (decl.id.type != "Identifier" && !(isFor && (this$1.type === tt._in || this$1.isContextual("of")))) {
              this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
            } else {
              decl.init = null;
            }
            node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
            if (!this$1.eat(tt.comma)) break;
          }
          return node;
        };

        pp$1.parseVarId = function (decl) {
          decl.id = this.parseBindingAtom();
          this.checkLVal(decl.id, true);
        };

        // Parse a function declaration or literal (depending on the
        // `isStatement` parameter).

        pp$1.parseFunction = function (node, isStatement, allowExpressionBody) {
          this.initFunction(node);
          if (this.options.ecmaVersion >= 6) node.generator = this.eat(tt.star);
          var oldInGen = this.inGenerator;
          this.inGenerator = node.generator;
          if (isStatement || this.type === tt.name) node.id = this.parseIdent();
          this.parseFunctionParams(node);
          this.parseFunctionBody(node, allowExpressionBody);
          this.inGenerator = oldInGen;
          return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
        };

        pp$1.parseFunctionParams = function (node) {
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false, true);
        };

        // Parse a class declaration or literal (depending on the
        // `isStatement` parameter).

        pp$1.parseClass = function (node, isStatement) {
          var this$1 = this;

          this.next();
          this.parseClassId(node, isStatement);
          this.parseClassSuper(node);
          var classBody = this.startNode();
          var hadConstructor = false;
          classBody.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (this$1.eat(tt.semi)) continue;
            var method = this$1.startNode();
            var isGenerator = this$1.eat(tt.star);
            var isMaybeStatic = this$1.type === tt.name && this$1.value === "static";
            this$1.parsePropertyName(method);
            method.static = isMaybeStatic && this$1.type !== tt.parenL;
            if (method.static) {
              if (isGenerator) this$1.unexpected();
              isGenerator = this$1.eat(tt.star);
              this$1.parsePropertyName(method);
            }
            method.kind = "method";
            var isGetSet = false;
            if (!method.computed) {
              var key = method.key;
              if (!isGenerator && key.type === "Identifier" && this$1.type !== tt.parenL && (key.name === "get" || key.name === "set")) {
                isGetSet = true;
                method.kind = key.name;
                key = this$1.parsePropertyName(method);
              }
              if (!method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
                if (hadConstructor) this$1.raise(key.start, "Duplicate constructor in the same class");
                if (isGetSet) this$1.raise(key.start, "Constructor can't have get/set modifier");
                if (isGenerator) this$1.raise(key.start, "Constructor can't be a generator");
                method.kind = "constructor";
                hadConstructor = true;
              }
            }
            this$1.parseClassMethod(classBody, method, isGenerator);
            if (isGetSet) {
              var paramCount = method.kind === "get" ? 0 : 1;
              if (method.value.params.length !== paramCount) {
                var start = method.value.start;
                if (method.kind === "get") this$1.raiseRecoverable(start, "getter should have no params");else this$1.raiseRecoverable(start, "setter should have exactly one param");
              }
              if (method.kind === "set" && method.value.params[0].type === "RestElement") this$1.raise(method.value.params[0].start, "Setter cannot use rest params");
            }
          }
          node.body = this.finishNode(classBody, "ClassBody");
          return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        };

        pp$1.parseClassMethod = function (classBody, method, isGenerator) {
          method.value = this.parseMethod(isGenerator);
          classBody.body.push(this.finishNode(method, "MethodDefinition"));
        };

        pp$1.parseClassId = function (node, isStatement) {
          node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
        };

        pp$1.parseClassSuper = function (node) {
          node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
        };

        // Parses module export declaration.

        pp$1.parseExport = function (node) {
          var this$1 = this;

          this.next();
          // export * from '...'
          if (this.eat(tt.star)) {
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            this.semicolon();
            return this.finishNode(node, "ExportAllDeclaration");
          }
          if (this.eat(tt._default)) {
            // export default ...
            var parens = this.type == tt.parenL;
            var expr = this.parseMaybeAssign();
            var needsSemi = true;
            if (!parens && (expr.type == "FunctionExpression" || expr.type == "ClassExpression")) {
              needsSemi = false;
              if (expr.id) {
                expr.type = expr.type == "FunctionExpression" ? "FunctionDeclaration" : "ClassDeclaration";
              }
            }
            node.declaration = expr;
            if (needsSemi) this.semicolon();
            return this.finishNode(node, "ExportDefaultDeclaration");
          }
          // export var|const|let|function|class ...
          if (this.shouldParseExportStatement()) {
            node.declaration = this.parseStatement(true);
            node.specifiers = [];
            node.source = null;
          } else {
            // export { x, y as z } [from '...']
            node.declaration = null;
            node.specifiers = this.parseExportSpecifiers();
            if (this.eatContextual("from")) {
              node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            } else {
              // check for keywords used as local names
              for (var i = 0; i < node.specifiers.length; i++) {
                if (this$1.keywords.test(node.specifiers[i].local.name) || this$1.reservedWords.test(node.specifiers[i].local.name)) {
                  this$1.unexpected(node.specifiers[i].local.start);
                }
              }

              node.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(node, "ExportNamedDeclaration");
        };

        pp$1.shouldParseExportStatement = function () {
          return this.type.keyword || this.isLet();
        };

        // Parses a comma-separated list of module exports.

        pp$1.parseExportSpecifiers = function () {
          var this$1 = this;

          var nodes = [],
              first = true;
          // export { x, y as z } [from '...']
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var node = this$1.startNode();
            node.local = this$1.parseIdent(this$1.type === tt._default);
            node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
            nodes.push(this$1.finishNode(node, "ExportSpecifier"));
          }
          return nodes;
        };

        // Parses import declaration.

        pp$1.parseImport = function (node) {
          this.next();
          // import '...'
          if (this.type === tt.string) {
            node.specifiers = empty;
            node.source = this.parseExprAtom();
          } else {
            node.specifiers = this.parseImportSpecifiers();
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
          }
          this.semicolon();
          return this.finishNode(node, "ImportDeclaration");
        };

        // Parses a comma-separated list of module imports.

        pp$1.parseImportSpecifiers = function () {
          var this$1 = this;

          var nodes = [],
              first = true;
          if (this.type === tt.name) {
            // import defaultObj, { x, y as z } from '...'
            var node = this.startNode();
            node.local = this.parseIdent();
            this.checkLVal(node.local, true);
            nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
            if (!this.eat(tt.comma)) return nodes;
          }
          if (this.type === tt.star) {
            var node$1 = this.startNode();
            this.next();
            this.expectContextual("as");
            node$1.local = this.parseIdent();
            this.checkLVal(node$1.local, true);
            nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
            return nodes;
          }
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var node$2 = this$1.startNode();
            node$2.imported = this$1.parseIdent(true);
            if (this$1.eatContextual("as")) {
              node$2.local = this$1.parseIdent();
            } else {
              node$2.local = node$2.imported;
              if (this$1.isKeyword(node$2.local.name)) this$1.unexpected(node$2.local.start);
              if (this$1.reservedWordsStrict.test(node$2.local.name)) this$1.raise(node$2.local.start, "The keyword '" + node$2.local.name + "' is reserved");
            }
            this$1.checkLVal(node$2.local, true);
            nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
          }
          return nodes;
        };

        var pp$2 = Parser.prototype;

        // Convert existing expression atom to assignable pattern
        // if possible.

        pp$2.toAssignable = function (node, isBinding) {
          var this$1 = this;

          if (this.options.ecmaVersion >= 6 && node) {
            switch (node.type) {
              case "Identifier":
              case "ObjectPattern":
              case "ArrayPattern":
                break;

              case "ObjectExpression":
                node.type = "ObjectPattern";
                for (var i = 0; i < node.properties.length; i++) {
                  var prop = node.properties[i];
                  if (prop.kind !== "init") this$1.raise(prop.key.start, "Object pattern can't contain getter or setter");
                  this$1.toAssignable(prop.value, isBinding);
                }
                break;

              case "ArrayExpression":
                node.type = "ArrayPattern";
                this.toAssignableList(node.elements, isBinding);
                break;

              case "AssignmentExpression":
                if (node.operator === "=") {
                  node.type = "AssignmentPattern";
                  delete node.operator;
                  // falls through to AssignmentPattern
                } else {
                  this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                  break;
                }

              case "AssignmentPattern":
                if (node.right.type === "YieldExpression") this.raise(node.right.start, "Yield expression cannot be a default value");
                break;

              case "ParenthesizedExpression":
                node.expression = this.toAssignable(node.expression, isBinding);
                break;

              case "MemberExpression":
                if (!isBinding) break;

              default:
                this.raise(node.start, "Assigning to rvalue");
            }
          }
          return node;
        };

        // Convert list of expression atoms to binding list.

        pp$2.toAssignableList = function (exprList, isBinding) {
          var this$1 = this;

          var end = exprList.length;
          if (end) {
            var last = exprList[end - 1];
            if (last && last.type == "RestElement") {
              --end;
            } else if (last && last.type == "SpreadElement") {
              last.type = "RestElement";
              var arg = last.argument;
              this.toAssignable(arg, isBinding);
              if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") this.unexpected(arg.start);
              --end;
            }

            if (isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") this.unexpected(last.argument.start);
          }
          for (var i = 0; i < end; i++) {
            var elt = exprList[i];
            if (elt) this$1.toAssignable(elt, isBinding);
          }
          return exprList;
        };

        // Parses spread element.

        pp$2.parseSpread = function (refDestructuringErrors) {
          var node = this.startNode();
          this.next();
          node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
          return this.finishNode(node, "SpreadElement");
        };

        pp$2.parseRest = function (allowNonIdent) {
          var node = this.startNode();
          this.next();

          // RestElement inside of a function parameter must be an identifier
          if (allowNonIdent) node.argument = this.type === tt.name ? this.parseIdent() : this.unexpected();else node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();

          return this.finishNode(node, "RestElement");
        };

        // Parses lvalue (assignable) atom.

        pp$2.parseBindingAtom = function () {
          if (this.options.ecmaVersion < 6) return this.parseIdent();
          switch (this.type) {
            case tt.name:
              return this.parseIdent();

            case tt.bracketL:
              var node = this.startNode();
              this.next();
              node.elements = this.parseBindingList(tt.bracketR, true, true);
              return this.finishNode(node, "ArrayPattern");

            case tt.braceL:
              return this.parseObj(true);

            default:
              this.unexpected();
          }
        };

        pp$2.parseBindingList = function (close, allowEmpty, allowTrailingComma, allowNonIdent) {
          var this$1 = this;

          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (first) first = false;else this$1.expect(tt.comma);
            if (allowEmpty && this$1.type === tt.comma) {
              elts.push(null);
            } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
              break;
            } else if (this$1.type === tt.ellipsis) {
              var rest = this$1.parseRest(allowNonIdent);
              this$1.parseBindingListItem(rest);
              elts.push(rest);
              if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element");
              this$1.expect(close);
              break;
            } else {
              var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
              this$1.parseBindingListItem(elem);
              elts.push(elem);
            }
          }
          return elts;
        };

        pp$2.parseBindingListItem = function (param) {
          return param;
        };

        // Parses assignment pattern around given atom if possible.

        pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
          left = left || this.parseBindingAtom();
          if (this.options.ecmaVersion < 6 || !this.eat(tt.eq)) return left;
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.right = this.parseMaybeAssign();
          return this.finishNode(node, "AssignmentPattern");
        };

        // Verify that a node is an lval — something that can be assigned
        // to.

        pp$2.checkLVal = function (expr, isBinding, checkClashes) {
          var this$1 = this;

          switch (expr.type) {
            case "Identifier":
              if (this.strict && this.reservedWordsStrictBind.test(expr.name)) this.raiseRecoverable(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
              if (checkClashes) {
                if (has(checkClashes, expr.name)) this.raiseRecoverable(expr.start, "Argument name clash");
                checkClashes[expr.name] = true;
              }
              break;

            case "MemberExpression":
              if (isBinding) this.raiseRecoverable(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
              break;

            case "ObjectPattern":
              for (var i = 0; i < expr.properties.length; i++) {
                this$1.checkLVal(expr.properties[i].value, isBinding, checkClashes);
              }break;

            case "ArrayPattern":
              for (var i$1 = 0; i$1 < expr.elements.length; i$1++) {
                var elem = expr.elements[i$1];
                if (elem) this$1.checkLVal(elem, isBinding, checkClashes);
              }
              break;

            case "AssignmentPattern":
              this.checkLVal(expr.left, isBinding, checkClashes);
              break;

            case "RestElement":
              this.checkLVal(expr.argument, isBinding, checkClashes);
              break;

            case "ParenthesizedExpression":
              this.checkLVal(expr.expression, isBinding, checkClashes);
              break;

            default:
              this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
          }
        };

        var pp$3 = Parser.prototype;

        // Check if property name clashes with already added.
        // Object/class getters and setters are not allowed to clash —
        // either with each other or with an init property — and in
        // strict mode, init properties are also not allowed to be repeated.

        pp$3.checkPropClash = function (prop, propHash) {
          if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) return;
          var key = prop.key;
          var name;
          switch (key.type) {
            case "Identifier":
              name = key.name;break;
            case "Literal":
              name = String(key.value);break;
            default:
              return;
          }
          var kind = prop.kind;
          if (this.options.ecmaVersion >= 6) {
            if (name === "__proto__" && kind === "init") {
              if (propHash.proto) this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
              propHash.proto = true;
            }
            return;
          }
          name = "$" + name;
          var other = propHash[name];
          if (other) {
            var isGetSet = kind !== "init";
            if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init)) this.raiseRecoverable(key.start, "Redefinition of property");
          } else {
            other = propHash[name] = {
              init: false,
              get: false,
              set: false
            };
          }
          other[kind] = true;
        };

        // ### Expression parsing

        // These nest, from the most general expression type at the top to
        // 'atomic', nondivisible expression types at the bottom. Most of
        // the functions will simply let the function(s) below them parse,
        // and, *if* the syntactic construct they handle is present, wrap
        // the AST node that the inner parser gave them in another node.

        // Parse a full expression. The optional arguments are used to
        // forbid the `in` operator (in for loops initalization expressions)
        // and provide reference for storing '=' operator inside shorthand
        // property assignment in contexts where both object expression
        // and object pattern might appear (so it's possible to raise
        // delayed syntax error at correct position).

        pp$3.parseExpression = function (noIn, refDestructuringErrors) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
          if (this.type === tt.comma) {
            var node = this.startNodeAt(startPos, startLoc);
            node.expressions = [expr];
            while (this.eat(tt.comma)) {
              node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors));
            }return this.finishNode(node, "SequenceExpression");
          }
          return expr;
        };

        // Parse an assignment expression. This includes applications of
        // operators like `+=`.

        pp$3.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
          if (this.inGenerator && this.isContextual("yield")) return this.parseYield();

          var ownDestructuringErrors = false;
          if (!refDestructuringErrors) {
            refDestructuringErrors = new DestructuringErrors();
            ownDestructuringErrors = true;
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          if (this.type == tt.parenL || this.type == tt.name) this.potentialArrowAt = this.start;
          var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
          if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
          if (this.type.isAssign) {
            this.checkPatternErrors(refDestructuringErrors, true);
            if (!ownDestructuringErrors) DestructuringErrors.call(refDestructuringErrors);
            var node = this.startNodeAt(startPos, startLoc);
            node.operator = this.value;
            node.left = this.type === tt.eq ? this.toAssignable(left) : left;
            refDestructuringErrors.shorthandAssign = 0; // reset because shorthand default was used correctly
            this.checkLVal(left);
            this.next();
            node.right = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "AssignmentExpression");
          } else {
            if (ownDestructuringErrors) this.checkExpressionErrors(refDestructuringErrors, true);
          }
          return left;
        };

        // Parse a ternary conditional (`?:`) operator.

        pp$3.parseMaybeConditional = function (noIn, refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprOps(noIn, refDestructuringErrors);
          if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
          if (this.eat(tt.question)) {
            var node = this.startNodeAt(startPos, startLoc);
            node.test = expr;
            node.consequent = this.parseMaybeAssign();
            this.expect(tt.colon);
            node.alternate = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "ConditionalExpression");
          }
          return expr;
        };

        // Start the precedence parser.

        pp$3.parseExprOps = function (noIn, refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeUnary(refDestructuringErrors, false);
          if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
          return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
        };

        // Parse binary operators with the operator precedence parsing
        // algorithm. `left` is the left-hand side of the operator.
        // `minPrec` provides context that allows the function to stop and
        // defer further parser to one of its callers when it encounters an
        // operator that has a lower precedence than the set it is parsing.

        pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
          var prec = this.type.binop;
          if (prec != null && (!noIn || this.type !== tt._in)) {
            if (prec > minPrec) {
              var logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
              var op = this.value;
              this.next();
              var startPos = this.start,
                  startLoc = this.startLoc;
              var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
              var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
              return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
            }
          }
          return left;
        };

        pp$3.buildBinary = function (startPos, startLoc, left, right, op, logical) {
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.operator = op;
          node.right = right;
          return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
        };

        // Parse unary operators, both prefix and postfix.

        pp$3.parseMaybeUnary = function (refDestructuringErrors, sawUnary) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc,
              expr;
          if (this.type.prefix) {
            var node = this.startNode(),
                update = this.type === tt.incDec;
            node.operator = this.value;
            node.prefix = true;
            this.next();
            node.argument = this.parseMaybeUnary(null, true);
            this.checkExpressionErrors(refDestructuringErrors, true);
            if (update) this.checkLVal(node.argument);else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") this.raiseRecoverable(node.start, "Deleting local variable in strict mode");else sawUnary = true;
            expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
          } else {
            expr = this.parseExprSubscripts(refDestructuringErrors);
            if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
            while (this.type.postfix && !this.canInsertSemicolon()) {
              var node$1 = this$1.startNodeAt(startPos, startLoc);
              node$1.operator = this$1.value;
              node$1.prefix = false;
              node$1.argument = expr;
              this$1.checkLVal(expr);
              this$1.next();
              expr = this$1.finishNode(node$1, "UpdateExpression");
            }
          }

          if (!sawUnary && this.eat(tt.starstar)) return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);else return expr;
        };

        // Parse call, dot, and `[]`-subscript expressions.

        pp$3.parseExprSubscripts = function (refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprAtom(refDestructuringErrors);
          var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
          if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) return expr;
          return this.parseSubscripts(expr, startPos, startLoc);
        };

        pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
          var this$1 = this;

          for (;;) {
            if (this$1.eat(tt.dot)) {
              var node = this$1.startNodeAt(startPos, startLoc);
              node.object = base;
              node.property = this$1.parseIdent(true);
              node.computed = false;
              base = this$1.finishNode(node, "MemberExpression");
            } else if (this$1.eat(tt.bracketL)) {
              var node$1 = this$1.startNodeAt(startPos, startLoc);
              node$1.object = base;
              node$1.property = this$1.parseExpression();
              node$1.computed = true;
              this$1.expect(tt.bracketR);
              base = this$1.finishNode(node$1, "MemberExpression");
            } else if (!noCalls && this$1.eat(tt.parenL)) {
              var node$2 = this$1.startNodeAt(startPos, startLoc);
              node$2.callee = base;
              node$2.arguments = this$1.parseExprList(tt.parenR, false);
              base = this$1.finishNode(node$2, "CallExpression");
            } else if (this$1.type === tt.backQuote) {
              var node$3 = this$1.startNodeAt(startPos, startLoc);
              node$3.tag = base;
              node$3.quasi = this$1.parseTemplate();
              base = this$1.finishNode(node$3, "TaggedTemplateExpression");
            } else {
              return base;
            }
          }
        };

        // Parse an atomic expression — either a single token that is an
        // expression, an expression started by a keyword like `function` or
        // `new`, or an expression wrapped in punctuation like `()`, `[]`,
        // or `{}`.

        pp$3.parseExprAtom = function (refDestructuringErrors) {
          var node,
              canBeArrow = this.potentialArrowAt == this.start;
          switch (this.type) {
            case tt._super:
              if (!this.inFunction) this.raise(this.start, "'super' outside of function or class");

            case tt._this:
              var type = this.type === tt._this ? "ThisExpression" : "Super";
              node = this.startNode();
              this.next();
              return this.finishNode(node, type);

            case tt.name:
              var startPos = this.start,
                  startLoc = this.startLoc;
              var id = this.parseIdent(this.type !== tt.name);
              if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id]);
              return id;

            case tt.regexp:
              var value = this.value;
              node = this.parseLiteral(value.value);
              node.regex = { pattern: value.pattern, flags: value.flags };
              return node;

            case tt.num:case tt.string:
              return this.parseLiteral(this.value);

            case tt._null:case tt._true:case tt._false:
              node = this.startNode();
              node.value = this.type === tt._null ? null : this.type === tt._true;
              node.raw = this.type.keyword;
              this.next();
              return this.finishNode(node, "Literal");

            case tt.parenL:
              return this.parseParenAndDistinguishExpression(canBeArrow);

            case tt.bracketL:
              node = this.startNode();
              this.next();
              node.elements = this.parseExprList(tt.bracketR, true, true, refDestructuringErrors);
              return this.finishNode(node, "ArrayExpression");

            case tt.braceL:
              return this.parseObj(false, refDestructuringErrors);

            case tt._function:
              node = this.startNode();
              this.next();
              return this.parseFunction(node, false);

            case tt._class:
              return this.parseClass(this.startNode(), false);

            case tt._new:
              return this.parseNew();

            case tt.backQuote:
              return this.parseTemplate();

            default:
              this.unexpected();
          }
        };

        pp$3.parseLiteral = function (value) {
          var node = this.startNode();
          node.value = value;
          node.raw = this.input.slice(this.start, this.end);
          this.next();
          return this.finishNode(node, "Literal");
        };

        pp$3.parseParenExpression = function () {
          this.expect(tt.parenL);
          var val = this.parseExpression();
          this.expect(tt.parenR);
          return val;
        };

        pp$3.parseParenAndDistinguishExpression = function (canBeArrow) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc,
              val;
          if (this.options.ecmaVersion >= 6) {
            this.next();

            var innerStartPos = this.start,
                innerStartLoc = this.startLoc;
            var exprList = [],
                first = true;
            var refDestructuringErrors = new DestructuringErrors(),
                spreadStart,
                innerParenStart;
            while (this.type !== tt.parenR) {
              first ? first = false : this$1.expect(tt.comma);
              if (this$1.type === tt.ellipsis) {
                spreadStart = this$1.start;
                exprList.push(this$1.parseParenItem(this$1.parseRest()));
                break;
              } else {
                if (this$1.type === tt.parenL && !innerParenStart) {
                  innerParenStart = this$1.start;
                }
                exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
              }
            }
            var innerEndPos = this.start,
                innerEndLoc = this.startLoc;
            this.expect(tt.parenR);

            if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
              this.checkPatternErrors(refDestructuringErrors, true);
              if (innerParenStart) this.unexpected(innerParenStart);
              return this.parseParenArrowList(startPos, startLoc, exprList);
            }

            if (!exprList.length) this.unexpected(this.lastTokStart);
            if (spreadStart) this.unexpected(spreadStart);
            this.checkExpressionErrors(refDestructuringErrors, true);

            if (exprList.length > 1) {
              val = this.startNodeAt(innerStartPos, innerStartLoc);
              val.expressions = exprList;
              this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
            } else {
              val = exprList[0];
            }
          } else {
            val = this.parseParenExpression();
          }

          if (this.options.preserveParens) {
            var par = this.startNodeAt(startPos, startLoc);
            par.expression = val;
            return this.finishNode(par, "ParenthesizedExpression");
          } else {
            return val;
          }
        };

        pp$3.parseParenItem = function (item) {
          return item;
        };

        pp$3.parseParenArrowList = function (startPos, startLoc, exprList) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
        };

        // New's precedence is slightly tricky. It must allow its argument to
        // be a `[]` or dot subscript expression, but not a call — at least,
        // not without wrapping it in parentheses. Thus, it uses the noCalls
        // argument to parseSubscripts to prevent it from consuming the
        // argument list.

        var empty$1 = [];

        pp$3.parseNew = function () {
          var node = this.startNode();
          var meta = this.parseIdent(true);
          if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
            node.meta = meta;
            node.property = this.parseIdent(true);
            if (node.property.name !== "target") this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
            if (!this.inFunction) this.raiseRecoverable(node.start, "new.target can only be used in functions");
            return this.finishNode(node, "MetaProperty");
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
          if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR, false);else node.arguments = empty$1;
          return this.finishNode(node, "NewExpression");
        };

        // Parse template expression.

        pp$3.parseTemplateElement = function () {
          var elem = this.startNode();
          elem.value = {
            raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
            cooked: this.value
          };
          this.next();
          elem.tail = this.type === tt.backQuote;
          return this.finishNode(elem, "TemplateElement");
        };

        pp$3.parseTemplate = function () {
          var this$1 = this;

          var node = this.startNode();
          this.next();
          node.expressions = [];
          var curElt = this.parseTemplateElement();
          node.quasis = [curElt];
          while (!curElt.tail) {
            this$1.expect(tt.dollarBraceL);
            node.expressions.push(this$1.parseExpression());
            this$1.expect(tt.braceR);
            node.quasis.push(curElt = this$1.parseTemplateElement());
          }
          this.next();
          return this.finishNode(node, "TemplateLiteral");
        };

        // Parse an object literal or binding pattern.

        pp$3.parseObj = function (isPattern, refDestructuringErrors) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              propHash = {};
          node.properties = [];
          this.next();
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var prop = this$1.startNode(),
                isGenerator,
                startPos,
                startLoc;
            if (this$1.options.ecmaVersion >= 6) {
              prop.method = false;
              prop.shorthand = false;
              if (isPattern || refDestructuringErrors) {
                startPos = this$1.start;
                startLoc = this$1.startLoc;
              }
              if (!isPattern) isGenerator = this$1.eat(tt.star);
            }
            this$1.parsePropertyName(prop);
            this$1.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors);
            this$1.checkPropClash(prop, propHash);
            node.properties.push(this$1.finishNode(prop, "Property"));
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        };

        pp$3.parsePropertyValue = function (prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors) {
          if (this.eat(tt.colon)) {
            prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
            prop.kind = "init";
          } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
            if (isPattern) this.unexpected();
            prop.kind = "init";
            prop.method = true;
            prop.value = this.parseMethod(isGenerator);
          } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type != tt.comma && this.type != tt.braceR) {
            if (isGenerator || isPattern) this.unexpected();
            prop.kind = prop.key.name;
            this.parsePropertyName(prop);
            prop.value = this.parseMethod(false);
            var paramCount = prop.kind === "get" ? 0 : 1;
            if (prop.value.params.length !== paramCount) {
              var start = prop.value.start;
              if (prop.kind === "get") this.raiseRecoverable(start, "getter should have no params");else this.raiseRecoverable(start, "setter should have exactly one param");
            }
            if (prop.kind === "set" && prop.value.params[0].type === "RestElement") this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
          } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
            if (this.keywords.test(prop.key.name) || (this.strict ? this.reservedWordsStrictBind : this.reservedWords).test(prop.key.name) || this.inGenerator && prop.key.name == "yield") this.raiseRecoverable(prop.key.start, "'" + prop.key.name + "' can not be used as shorthand property");
            prop.kind = "init";
            if (isPattern) {
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else if (this.type === tt.eq && refDestructuringErrors) {
              if (!refDestructuringErrors.shorthandAssign) refDestructuringErrors.shorthandAssign = this.start;
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else {
              prop.value = prop.key;
            }
            prop.shorthand = true;
          } else this.unexpected();
        };

        pp$3.parsePropertyName = function (prop) {
          if (this.options.ecmaVersion >= 6) {
            if (this.eat(tt.bracketL)) {
              prop.computed = true;
              prop.key = this.parseMaybeAssign();
              this.expect(tt.bracketR);
              return prop.key;
            } else {
              prop.computed = false;
            }
          }
          return prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent(true);
        };

        // Initialize empty function node.

        pp$3.initFunction = function (node) {
          node.id = null;
          if (this.options.ecmaVersion >= 6) {
            node.generator = false;
            node.expression = false;
          }
        };

        // Parse object or class method.

        pp$3.parseMethod = function (isGenerator) {
          var node = this.startNode(),
              oldInGen = this.inGenerator;
          this.inGenerator = isGenerator;
          this.initFunction(node);
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false);
          if (this.options.ecmaVersion >= 6) node.generator = isGenerator;
          this.parseFunctionBody(node, false);
          this.inGenerator = oldInGen;
          return this.finishNode(node, "FunctionExpression");
        };

        // Parse arrow function expression with given parameters.

        pp$3.parseArrowExpression = function (node, params) {
          var oldInGen = this.inGenerator;
          this.inGenerator = false;
          this.initFunction(node);
          node.params = this.toAssignableList(params, true);
          this.parseFunctionBody(node, true);
          this.inGenerator = oldInGen;
          return this.finishNode(node, "ArrowFunctionExpression");
        };

        // Parse function body and check parameters.

        pp$3.parseFunctionBody = function (node, isArrowFunction) {
          var isExpression = isArrowFunction && this.type !== tt.braceL;

          if (isExpression) {
            node.body = this.parseMaybeAssign();
            node.expression = true;
          } else {
            // Start a new scope with regard to labels and the `inFunction`
            // flag (restore them to their old value afterwards).
            var oldInFunc = this.inFunction,
                oldLabels = this.labels;
            this.inFunction = true;this.labels = [];
            node.body = this.parseBlock(true);
            node.expression = false;
            this.inFunction = oldInFunc;this.labels = oldLabels;
          }

          // If this is a strict mode function, verify that argument names
          // are not repeated, and it does not try to bind the words `eval`
          // or `arguments`.
          var useStrict = !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0]) ? node.body.body[0] : null;
          if (this.strict || useStrict) {
            var oldStrict = this.strict;
            this.strict = true;
            if (node.id) this.checkLVal(node.id, true);
            this.checkParams(node, useStrict);
            this.strict = oldStrict;
          } else if (isArrowFunction) {
            this.checkParams(node, useStrict);
          }
        };

        // Checks function params for various disallowed patterns such as using "eval"
        // or "arguments" and duplicate parameters.

        pp$3.checkParams = function (node, useStrict) {
          var this$1 = this;

          var nameHash = {};
          for (var i = 0; i < node.params.length; i++) {
            if (useStrict && this$1.options.ecmaVersion >= 7 && node.params[i].type !== "Identifier") this$1.raiseRecoverable(useStrict.start, "Illegal 'use strict' directive in function with non-simple parameter list");
            this$1.checkLVal(node.params[i], true, nameHash);
          }
        };

        // Parses a comma-separated list of expressions, and returns them as
        // an array. `close` is the token type that ends the list, and
        // `allowEmpty` can be turned on to allow subsequent commas with
        // nothing in between them to be parsed as `null` (which is needed
        // for array literals).

        pp$3.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
          var this$1 = this;

          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (allowTrailingComma && this$1.afterTrailingComma(close)) break;
            } else first = false;

            var elt;
            if (allowEmpty && this$1.type === tt.comma) elt = null;else if (this$1.type === tt.ellipsis) {
              elt = this$1.parseSpread(refDestructuringErrors);
              if (this$1.type === tt.comma && refDestructuringErrors && !refDestructuringErrors.trailingComma) {
                refDestructuringErrors.trailingComma = this$1.lastTokStart;
              }
            } else elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
            elts.push(elt);
          }
          return elts;
        };

        // Parse the next token as an identifier. If `liberal` is true (used
        // when parsing properties), it will also convert keywords into
        // identifiers.

        pp$3.parseIdent = function (liberal) {
          var node = this.startNode();
          if (liberal && this.options.allowReserved == "never") liberal = false;
          if (this.type === tt.name) {
            if (!liberal && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(this.value) && (this.options.ecmaVersion >= 6 || this.input.slice(this.start, this.end).indexOf("\\") == -1)) this.raiseRecoverable(this.start, "The keyword '" + this.value + "' is reserved");
            if (!liberal && this.inGenerator && this.value === "yield") this.raiseRecoverable(this.start, "Can not use 'yield' as identifier inside a generator");
            node.name = this.value;
          } else if (liberal && this.type.keyword) {
            node.name = this.type.keyword;
          } else {
            this.unexpected();
          }
          this.next();
          return this.finishNode(node, "Identifier");
        };

        // Parses yield expression inside generator.

        pp$3.parseYield = function () {
          var node = this.startNode();
          this.next();
          if (this.type == tt.semi || this.canInsertSemicolon() || this.type != tt.star && !this.type.startsExpr) {
            node.delegate = false;
            node.argument = null;
          } else {
            node.delegate = this.eat(tt.star);
            node.argument = this.parseMaybeAssign();
          }
          return this.finishNode(node, "YieldExpression");
        };

        var pp$4 = Parser.prototype;

        // This function is used to raise exceptions on parse errors. It
        // takes an offset integer (into the current `input`) to indicate
        // the location of the error, attaches the position to the end
        // of the error message, and then raises a `SyntaxError` with that
        // message.

        pp$4.raise = function (pos, message) {
          var loc = getLineInfo(this.input, pos);
          message += " (" + loc.line + ":" + loc.column + ")";
          var err = new SyntaxError(message);
          err.pos = pos;err.loc = loc;err.raisedAt = this.pos;
          throw err;
        };

        pp$4.raiseRecoverable = pp$4.raise;

        pp$4.curPosition = function () {
          if (this.options.locations) {
            return new Position(this.curLine, this.pos - this.lineStart);
          }
        };

        var Node = function Node(parser, pos, loc) {
          this.type = "";
          this.start = pos;
          this.end = 0;
          if (parser.options.locations) this.loc = new SourceLocation(parser, loc);
          if (parser.options.directSourceFile) this.sourceFile = parser.options.directSourceFile;
          if (parser.options.ranges) this.range = [pos, 0];
        };

        // Start an AST node, attaching a start offset.

        var pp$5 = Parser.prototype;

        pp$5.startNode = function () {
          return new Node(this, this.start, this.startLoc);
        };

        pp$5.startNodeAt = function (pos, loc) {
          return new Node(this, pos, loc);
        };

        // Finish an AST node, adding `type` and `end` properties.

        function finishNodeAt(node, type, pos, loc) {
          node.type = type;
          node.end = pos;
          if (this.options.locations) node.loc.end = loc;
          if (this.options.ranges) node.range[1] = pos;
          return node;
        }

        pp$5.finishNode = function (node, type) {
          return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
        };

        // Finish node at given position

        pp$5.finishNodeAt = function (node, type, pos, loc) {
          return finishNodeAt.call(this, node, type, pos, loc);
        };

        var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
          this.token = token;
          this.isExpr = !!isExpr;
          this.preserveSpace = !!preserveSpace;
          this.override = override;
        };

        var types = {
          b_stat: new TokContext("{", false),
          b_expr: new TokContext("{", true),
          b_tmpl: new TokContext("${", true),
          p_stat: new TokContext("(", false),
          p_expr: new TokContext("(", true),
          q_tmpl: new TokContext("`", true, true, function (p) {
            return p.readTmplToken();
          }),
          f_expr: new TokContext("function", true)
        };

        var pp$6 = Parser.prototype;

        pp$6.initialContext = function () {
          return [types.b_stat];
        };

        pp$6.braceIsBlock = function (prevType) {
          if (prevType === tt.colon) {
            var parent = this.curContext();
            if (parent === types.b_stat || parent === types.b_expr) return !parent.isExpr;
          }
          if (prevType === tt._return) return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
          if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof || prevType === tt.parenR) return true;
          if (prevType == tt.braceL) return this.curContext() === types.b_stat;
          return !this.exprAllowed;
        };

        pp$6.updateContext = function (prevType) {
          var update,
              type = this.type;
          if (type.keyword && prevType == tt.dot) this.exprAllowed = false;else if (update = type.updateContext) update.call(this, prevType);else this.exprAllowed = type.beforeExpr;
        };

        // Token-specific context update code

        tt.parenR.updateContext = tt.braceR.updateContext = function () {
          if (this.context.length == 1) {
            this.exprAllowed = true;
            return;
          }
          var out = this.context.pop();
          if (out === types.b_stat && this.curContext() === types.f_expr) {
            this.context.pop();
            this.exprAllowed = false;
          } else if (out === types.b_tmpl) {
            this.exprAllowed = true;
          } else {
            this.exprAllowed = !out.isExpr;
          }
        };

        tt.braceL.updateContext = function (prevType) {
          this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
          this.exprAllowed = true;
        };

        tt.dollarBraceL.updateContext = function () {
          this.context.push(types.b_tmpl);
          this.exprAllowed = true;
        };

        tt.parenL.updateContext = function (prevType) {
          var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
          this.context.push(statementParens ? types.p_stat : types.p_expr);
          this.exprAllowed = true;
        };

        tt.incDec.updateContext = function () {
          // tokExprAllowed stays unchanged
        };

        tt._function.updateContext = function (prevType) {
          if (prevType.beforeExpr && prevType !== tt.semi && prevType !== tt._else && !((prevType === tt.colon || prevType === tt.braceL) && this.curContext() === types.b_stat)) this.context.push(types.f_expr);
          this.exprAllowed = false;
        };

        tt.backQuote.updateContext = function () {
          if (this.curContext() === types.q_tmpl) this.context.pop();else this.context.push(types.q_tmpl);
          this.exprAllowed = false;
        };

        // Object type used to represent tokens. Note that normally, tokens
        // simply exist as properties on the parser object. This is only
        // used for the onToken callback and the external tokenizer.

        var Token = function Token(p) {
          this.type = p.type;
          this.value = p.value;
          this.start = p.start;
          this.end = p.end;
          if (p.options.locations) this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
          if (p.options.ranges) this.range = [p.start, p.end];
        };

        // ## Tokenizer

        var pp$7 = Parser.prototype;

        // Are we running under Rhino?
        var isRhino = (typeof Packages === 'undefined' ? 'undefined' : _typeof(Packages)) == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]";

        // Move to the next token

        pp$7.next = function () {
          if (this.options.onToken) this.options.onToken(new Token(this));

          this.lastTokEnd = this.end;
          this.lastTokStart = this.start;
          this.lastTokEndLoc = this.endLoc;
          this.lastTokStartLoc = this.startLoc;
          this.nextToken();
        };

        pp$7.getToken = function () {
          this.next();
          return new Token(this);
        };

        // If we're in an ES6 environment, make parsers iterable
        if (typeof Symbol !== "undefined") pp$7[Symbol.iterator] = function () {
          var self = this;
          return { next: function next() {
              var token = self.getToken();
              return {
                done: token.type === tt.eof,
                value: token
              };
            } };
        };

        // Toggle strict mode. Re-reads the next number or string to please
        // pedantic tests (`"use strict"; 010;` should fail).

        pp$7.setStrict = function (strict) {
          var this$1 = this;

          this.strict = strict;
          if (this.type !== tt.num && this.type !== tt.string) return;
          this.pos = this.start;
          if (this.options.locations) {
            while (this.pos < this.lineStart) {
              this$1.lineStart = this$1.input.lastIndexOf("\n", this$1.lineStart - 2) + 1;
              --this$1.curLine;
            }
          }
          this.nextToken();
        };

        pp$7.curContext = function () {
          return this.context[this.context.length - 1];
        };

        // Read a single token, updating the parser object's token-related
        // properties.

        pp$7.nextToken = function () {
          var curContext = this.curContext();
          if (!curContext || !curContext.preserveSpace) this.skipSpace();

          this.start = this.pos;
          if (this.options.locations) this.startLoc = this.curPosition();
          if (this.pos >= this.input.length) return this.finishToken(tt.eof);

          if (curContext.override) return curContext.override(this);else this.readToken(this.fullCharCodeAtPos());
        };

        pp$7.readToken = function (code) {
          // Identifier or keyword. '\uXXXX' sequences are allowed in
          // identifiers, so '\' also dispatches to that.
          if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */) return this.readWord();

          return this.getTokenFromCode(code);
        };

        pp$7.fullCharCodeAtPos = function () {
          var code = this.input.charCodeAt(this.pos);
          if (code <= 0xd7ff || code >= 0xe000) return code;
          var next = this.input.charCodeAt(this.pos + 1);
          return (code << 10) + next - 0x35fdc00;
        };

        pp$7.skipBlockComment = function () {
          var this$1 = this;

          var startLoc = this.options.onComment && this.curPosition();
          var start = this.pos,
              end = this.input.indexOf("*/", this.pos += 2);
          if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
          this.pos = end + 2;
          if (this.options.locations) {
            lineBreakG.lastIndex = start;
            var match;
            while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
              ++this$1.curLine;
              this$1.lineStart = match.index + match[0].length;
            }
          }
          if (this.options.onComment) this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
        };

        pp$7.skipLineComment = function (startSkip) {
          var this$1 = this;

          var start = this.pos;
          var startLoc = this.options.onComment && this.curPosition();
          var ch = this.input.charCodeAt(this.pos += startSkip);
          while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
            ++this$1.pos;
            ch = this$1.input.charCodeAt(this$1.pos);
          }
          if (this.options.onComment) this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
        };

        // Called at the start of the parse and after every token. Skips
        // whitespace and comments, and.

        pp$7.skipSpace = function () {
          var this$1 = this;

          loop: while (this.pos < this.input.length) {
            var ch = this$1.input.charCodeAt(this$1.pos);
            switch (ch) {
              case 32:case 160:
                // ' '
                ++this$1.pos;
                break;
              case 13:
                if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
                  ++this$1.pos;
                }
              case 10:case 8232:case 8233:
                ++this$1.pos;
                if (this$1.options.locations) {
                  ++this$1.curLine;
                  this$1.lineStart = this$1.pos;
                }
                break;
              case 47:
                // '/'
                switch (this$1.input.charCodeAt(this$1.pos + 1)) {
                  case 42:
                    // '*'
                    this$1.skipBlockComment();
                    break;
                  case 47:
                    this$1.skipLineComment(2);
                    break;
                  default:
                    break loop;
                }
                break;
              default:
                if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                  ++this$1.pos;
                } else {
                  break loop;
                }
            }
          }
        };

        // Called at the end of every token. Sets `end`, `val`, and
        // maintains `context` and `exprAllowed`, and skips the space after
        // the token, so that the next one's `start` will point at the
        // right position.

        pp$7.finishToken = function (type, val) {
          this.end = this.pos;
          if (this.options.locations) this.endLoc = this.curPosition();
          var prevType = this.type;
          this.type = type;
          this.value = val;

          this.updateContext(prevType);
        };

        // ### Token reading

        // This is the function that is called to fetch the next token. It
        // is somewhat obscure, because it works in character codes rather
        // than characters, and because operator parsing has been inlined
        // into it.
        //
        // All in the name of speed.
        //
        pp$7.readToken_dot = function () {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next >= 48 && next <= 57) return this.readNumber(true);
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
            // 46 = dot '.'
            this.pos += 3;
            return this.finishToken(tt.ellipsis);
          } else {
            ++this.pos;
            return this.finishToken(tt.dot);
          }
        };

        pp$7.readToken_slash = function () {
          // '/'
          var next = this.input.charCodeAt(this.pos + 1);
          if (this.exprAllowed) {
            ++this.pos;return this.readRegexp();
          }
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.slash, 1);
        };

        pp$7.readToken_mult_modulo_exp = function (code) {
          // '%*'
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          var tokentype = code === 42 ? tt.star : tt.modulo;

          // exponentiation operator ** and **=
          if (this.options.ecmaVersion >= 7 && next === 42) {
            ++size;
            tokentype = tt.starstar;
            next = this.input.charCodeAt(this.pos + 2);
          }

          if (next === 61) return this.finishOp(tt.assign, size + 1);
          return this.finishOp(tokentype, size);
        };

        pp$7.readToken_pipe_amp = function (code) {
          // '|&'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
        };

        pp$7.readToken_caret = function () {
          // '^'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.bitwiseXOR, 1);
        };

        pp$7.readToken_plus_min = function (code) {
          // '+-'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) {
            if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 && lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
              // A `-->` line comment
              this.skipLineComment(3);
              this.skipSpace();
              return this.nextToken();
            }
            return this.finishOp(tt.incDec, 2);
          }
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.plusMin, 1);
        };

        pp$7.readToken_lt_gt = function (code) {
          // '<>'
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          if (next === code) {
            size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
            if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(tt.assign, size + 1);
            return this.finishOp(tt.bitShift, size);
          }
          if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
            if (this.inModule) this.unexpected();
            // `<!--`, an XML-style comment that should be interpreted as a line comment
            this.skipLineComment(4);
            this.skipSpace();
            return this.nextToken();
          }
          if (next === 61) size = 2;
          return this.finishOp(tt.relational, size);
        };

        pp$7.readToken_eq_excl = function (code) {
          // '=!'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
          if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
            // '=>'
            this.pos += 2;
            return this.finishToken(tt.arrow);
          }
          return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
        };

        pp$7.getTokenFromCode = function (code) {
          switch (code) {
            // The interpretation of a dot depends on whether it is followed
            // by a digit or another two dots.
            case 46:
              // '.'
              return this.readToken_dot();

            // Punctuation tokens.
            case 40:
              ++this.pos;return this.finishToken(tt.parenL);
            case 41:
              ++this.pos;return this.finishToken(tt.parenR);
            case 59:
              ++this.pos;return this.finishToken(tt.semi);
            case 44:
              ++this.pos;return this.finishToken(tt.comma);
            case 91:
              ++this.pos;return this.finishToken(tt.bracketL);
            case 93:
              ++this.pos;return this.finishToken(tt.bracketR);
            case 123:
              ++this.pos;return this.finishToken(tt.braceL);
            case 125:
              ++this.pos;return this.finishToken(tt.braceR);
            case 58:
              ++this.pos;return this.finishToken(tt.colon);
            case 63:
              ++this.pos;return this.finishToken(tt.question);

            case 96:
              // '`'
              if (this.options.ecmaVersion < 6) break;
              ++this.pos;
              return this.finishToken(tt.backQuote);

            case 48:
              // '0'
              var next = this.input.charCodeAt(this.pos + 1);
              if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
              if (this.options.ecmaVersion >= 6) {
                if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
                if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
              }
            // Anything else beginning with a digit is an integer, octal
            // number, or float.
            case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
              // 1-9
              return this.readNumber(false);

            // Quotes produce strings.
            case 34:case 39:
              // '"', "'"
              return this.readString(code);

            // Operators are parsed inline in tiny state machines. '=' (61) is
            // often referred to. `finishOp` simply skips the amount of
            // characters it is given as second argument, and returns a token
            // of the type given by its first argument.

            case 47:
              // '/'
              return this.readToken_slash();

            case 37:case 42:
              // '%*'
              return this.readToken_mult_modulo_exp(code);

            case 124:case 38:
              // '|&'
              return this.readToken_pipe_amp(code);

            case 94:
              // '^'
              return this.readToken_caret();

            case 43:case 45:
              // '+-'
              return this.readToken_plus_min(code);

            case 60:case 62:
              // '<>'
              return this.readToken_lt_gt(code);

            case 61:case 33:
              // '=!'
              return this.readToken_eq_excl(code);

            case 126:
              // '~'
              return this.finishOp(tt.prefix, 1);
          }

          this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
        };

        pp$7.finishOp = function (type, size) {
          var str = this.input.slice(this.pos, this.pos + size);
          this.pos += size;
          return this.finishToken(type, str);
        };

        // Parse a regular expression. Some context-awareness is necessary,
        // since a '/' inside a '[]' set does not end the expression.

        function tryCreateRegexp(src, flags, throwErrorAt, parser) {
          try {
            return new RegExp(src, flags);
          } catch (e) {
            if (throwErrorAt !== undefined) {
              if (e instanceof SyntaxError) parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message);
              throw e;
            }
          }
        }

        var regexpUnicodeSupport = !!tryCreateRegexp('\uFFFF', "u");

        pp$7.readRegexp = function () {
          var this$1 = this;

          var escaped,
              inClass,
              start = this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(start, "Unterminated regular expression");
            var ch = this$1.input.charAt(this$1.pos);
            if (lineBreak.test(ch)) this$1.raise(start, "Unterminated regular expression");
            if (!escaped) {
              if (ch === "[") inClass = true;else if (ch === "]" && inClass) inClass = false;else if (ch === "/" && !inClass) break;
              escaped = ch === "\\";
            } else escaped = false;
            ++this$1.pos;
          }
          var content = this.input.slice(start, this.pos);
          ++this.pos;
          // Need to use `readWord1` because '\uXXXX' sequences are allowed
          // here (don't ask).
          var mods = this.readWord1();
          var tmp = content,
              tmpFlags = "";
          if (mods) {
            var validFlags = /^[gim]*$/;
            if (this.options.ecmaVersion >= 6) validFlags = /^[gimuy]*$/;
            if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
            if (mods.indexOf("u") >= 0) {
              if (regexpUnicodeSupport) {
                tmpFlags = "u";
              } else {
                // Replace each astral symbol and every Unicode escape sequence that
                // possibly represents an astral symbol or a paired surrogate with a
                // single ASCII symbol to avoid throwing on regular expressions that
                // are only valid in combination with the `/u` flag.
                // Note: replacing with the ASCII symbol `x` might cause false
                // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
                // perfectly valid pattern that is equivalent to `[a-b]`, but it would
                // be replaced by `[x-b]` which throws an error.
                tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
                  code = Number("0x" + code);
                  if (code > 0x10FFFF) this$1.raise(start + offset + 3, "Code point out of bounds");
                  return "x";
                });
                tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
                tmpFlags = tmpFlags.replace("u", "");
              }
            }
          }
          // Detect invalid regular expressions.
          var value = null;
          // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
          // so don't do detection if we are running under Rhino
          if (!isRhino) {
            tryCreateRegexp(tmp, tmpFlags, start, this);
            // Get a regular expression object for this pattern-flag pair, or `null` in
            // case the current environment doesn't support the flags it uses.
            value = tryCreateRegexp(content, mods);
          }
          return this.finishToken(tt.regexp, { pattern: content, flags: mods, value: value });
        };

        // Read an integer in the given radix. Return null if zero digits
        // were read, the integer value otherwise. When `len` is given, this
        // will return `null` unless the integer has exactly `len` digits.

        pp$7.readInt = function (radix, len) {
          var this$1 = this;

          var start = this.pos,
              total = 0;
          for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
            var code = this$1.input.charCodeAt(this$1.pos),
                val;
            if (code >= 97) val = code - 97 + 10; // a
            else if (code >= 65) val = code - 65 + 10; // A
              else if (code >= 48 && code <= 57) val = code - 48; // 0-9
                else val = Infinity;
            if (val >= radix) break;
            ++this$1.pos;
            total = total * radix + val;
          }
          if (this.pos === start || len != null && this.pos - start !== len) return null;

          return total;
        };

        pp$7.readRadixNumber = function (radix) {
          this.pos += 2; // 0x
          var val = this.readInt(radix);
          if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
          if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");
          return this.finishToken(tt.num, val);
        };

        // Read an integer, octal integer, or floating-point number.

        pp$7.readNumber = function (startsWithDot) {
          var start = this.pos,
              isFloat = false,
              octal = this.input.charCodeAt(this.pos) === 48;
          if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
          var next = this.input.charCodeAt(this.pos);
          if (next === 46) {
            // '.'
            ++this.pos;
            this.readInt(10);
            isFloat = true;
            next = this.input.charCodeAt(this.pos);
          }
          if (next === 69 || next === 101) {
            // 'eE'
            next = this.input.charCodeAt(++this.pos);
            if (next === 43 || next === 45) ++this.pos; // '+-'
            if (this.readInt(10) === null) this.raise(start, "Invalid number");
            isFloat = true;
          }
          if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");

          var str = this.input.slice(start, this.pos),
              val;
          if (isFloat) val = parseFloat(str);else if (!octal || str.length === 1) val = parseInt(str, 10);else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number");else val = parseInt(str, 8);
          return this.finishToken(tt.num, val);
        };

        // Read a string value, interpreting backslash-escapes.

        pp$7.readCodePoint = function () {
          var ch = this.input.charCodeAt(this.pos),
              code;

          if (ch === 123) {
            if (this.options.ecmaVersion < 6) this.unexpected();
            var codePos = ++this.pos;
            code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos);
            ++this.pos;
            if (code > 0x10FFFF) this.raise(codePos, "Code point out of bounds");
          } else {
            code = this.readHexChar(4);
          }
          return code;
        };

        function codePointToString(code) {
          // UTF-16 Decoding
          if (code <= 0xFFFF) return String.fromCharCode(code);
          code -= 0x10000;
          return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
        }

        pp$7.readString = function (quote) {
          var this$1 = this;

          var out = "",
              chunkStart = ++this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated string constant");
            var ch = this$1.input.charCodeAt(this$1.pos);
            if (ch === quote) break;
            if (ch === 92) {
              // '\'
              out += this$1.input.slice(chunkStart, this$1.pos);
              out += this$1.readEscapedChar(false);
              chunkStart = this$1.pos;
            } else {
              if (isNewLine(ch)) this$1.raise(this$1.start, "Unterminated string constant");
              ++this$1.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        };

        // Reads template string tokens.

        pp$7.readTmplToken = function () {
          var this$1 = this;

          var out = "",
              chunkStart = this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated template");
            var ch = this$1.input.charCodeAt(this$1.pos);
            if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) {
              // '`', '${'
              if (this$1.pos === this$1.start && this$1.type === tt.template) {
                if (ch === 36) {
                  this$1.pos += 2;
                  return this$1.finishToken(tt.dollarBraceL);
                } else {
                  ++this$1.pos;
                  return this$1.finishToken(tt.backQuote);
                }
              }
              out += this$1.input.slice(chunkStart, this$1.pos);
              return this$1.finishToken(tt.template, out);
            }
            if (ch === 92) {
              // '\'
              out += this$1.input.slice(chunkStart, this$1.pos);
              out += this$1.readEscapedChar(true);
              chunkStart = this$1.pos;
            } else if (isNewLine(ch)) {
              out += this$1.input.slice(chunkStart, this$1.pos);
              ++this$1.pos;
              switch (ch) {
                case 13:
                  if (this$1.input.charCodeAt(this$1.pos) === 10) ++this$1.pos;
                case 10:
                  out += "\n";
                  break;
                default:
                  out += String.fromCharCode(ch);
                  break;
              }
              if (this$1.options.locations) {
                ++this$1.curLine;
                this$1.lineStart = this$1.pos;
              }
              chunkStart = this$1.pos;
            } else {
              ++this$1.pos;
            }
          }
        };

        // Used to read escaped characters

        pp$7.readEscapedChar = function (inTemplate) {
          var ch = this.input.charCodeAt(++this.pos);
          ++this.pos;
          switch (ch) {
            case 110:
              return "\n"; // 'n' -> '\n'
            case 114:
              return "\r"; // 'r' -> '\r'
            case 120:
              return String.fromCharCode(this.readHexChar(2)); // 'x'
            case 117:
              return codePointToString(this.readCodePoint()); // 'u'
            case 116:
              return "\t"; // 't' -> '\t'
            case 98:
              return "\b"; // 'b' -> '\b'
            case 118:
              return '\x0B'; // 'v' -> '\u000b'
            case 102:
              return "\f"; // 'f' -> '\f'
            case 13:
              if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
            case 10:
              // ' \n'
              if (this.options.locations) {
                this.lineStart = this.pos;++this.curLine;
              }
              return "";
            default:
              if (ch >= 48 && ch <= 55) {
                var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
                var octal = parseInt(octalStr, 8);
                if (octal > 255) {
                  octalStr = octalStr.slice(0, -1);
                  octal = parseInt(octalStr, 8);
                }
                if (octalStr !== "0" && (this.strict || inTemplate)) {
                  this.raise(this.pos - 2, "Octal literal in strict mode");
                }
                this.pos += octalStr.length - 1;
                return String.fromCharCode(octal);
              }
              return String.fromCharCode(ch);
          }
        };

        // Used to read character escape sequences ('\x', '\u', '\U').

        pp$7.readHexChar = function (len) {
          var codePos = this.pos;
          var n = this.readInt(16, len);
          if (n === null) this.raise(codePos, "Bad character escape sequence");
          return n;
        };

        // Read an identifier, and return it as a string. Sets `this.containsEsc`
        // to whether the word contained a '\u' escape.
        //
        // Incrementally adds only escaped chars, adding other chunks as-is
        // as a micro-optimization.

        pp$7.readWord1 = function () {
          var this$1 = this;

          this.containsEsc = false;
          var word = "",
              first = true,
              chunkStart = this.pos;
          var astral = this.options.ecmaVersion >= 6;
          while (this.pos < this.input.length) {
            var ch = this$1.fullCharCodeAtPos();
            if (isIdentifierChar(ch, astral)) {
              this$1.pos += ch <= 0xffff ? 1 : 2;
            } else if (ch === 92) {
              // "\"
              this$1.containsEsc = true;
              word += this$1.input.slice(chunkStart, this$1.pos);
              var escStart = this$1.pos;
              if (this$1.input.charCodeAt(++this$1.pos) != 117) // "u"
                this$1.raise(this$1.pos, 'Expecting Unicode escape sequence \\uXXXX');
              ++this$1.pos;
              var esc = this$1.readCodePoint();
              if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) this$1.raise(escStart, "Invalid Unicode escape");
              word += codePointToString(esc);
              chunkStart = this$1.pos;
            } else {
              break;
            }
            first = false;
          }
          return word + this.input.slice(chunkStart, this.pos);
        };

        // Read an identifier or keyword token. Will check for reserved
        // words when necessary.

        pp$7.readWord = function () {
          var word = this.readWord1();
          var type = tt.name;
          if ((this.options.ecmaVersion >= 6 || !this.containsEsc) && this.keywords.test(word)) type = keywordTypes[word];
          return this.finishToken(type, word);
        };

        var version = "3.3.0";

        // The main exported interface (under `self.acorn` when in the
        // browser) is a `parse` function that takes a code string and
        // returns an abstract syntax tree as specified by [Mozilla parser
        // API][api].
        //
        // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

        function parse(input, options) {
          return new Parser(options, input).parse();
        }

        // This function tries to parse a single expression at a given
        // offset in a string. Useful for parsing mixed-language formats
        // that embed JavaScript expressions.

        function parseExpressionAt(input, pos, options) {
          var p = new Parser(options, input, pos);
          p.nextToken();
          return p.parseExpression();
        }

        // Acorn is organized as a tokenizer and a recursive-descent parser.
        // The `tokenizer` export provides an interface to the tokenizer.

        function tokenizer(input, options) {
          return new Parser(options, input);
        }

        exports.version = version;
        exports.parse = parse;
        exports.parseExpressionAt = parseExpressionAt;
        exports.tokenizer = tokenizer;
        exports.Parser = Parser;
        exports.plugins = plugins;
        exports.defaultOptions = defaultOptions;
        exports.Position = Position;
        exports.SourceLocation = SourceLocation;
        exports.getLineInfo = getLineInfo;
        exports.Node = Node;
        exports.TokenType = TokenType;
        exports.tokTypes = tt;
        exports.TokContext = TokContext;
        exports.tokContexts = types;
        exports.isIdentifierChar = isIdentifierChar;
        exports.isIdentifierStart = isIdentifierStart;
        exports.Token = Token;
        exports.isNewLine = isNewLine;
        exports.lineBreak = lineBreak;
        exports.lineBreakG = lineBreakG;

        Object.defineProperty(exports, '__esModule', { value: true });
      });
    });

    var acorn$1 = acorn && (typeof acorn === 'undefined' ? 'undefined' : _typeof(acorn)) === 'object' && 'default' in acorn ? acorn['default'] : acorn;

    var xhtml = __commonjs(function (module) {
      module.exports = {
        quot: '"',
        amp: '&',
        apos: '\'',
        lt: '<',
        gt: '>',
        nbsp: '\xA0',
        iexcl: '\xA1',
        cent: '\xA2',
        pound: '\xA3',
        curren: '\xA4',
        yen: '\xA5',
        brvbar: '\xA6',
        sect: '\xA7',
        uml: '\xA8',
        copy: '\xA9',
        ordf: '\xAA',
        laquo: '\xAB',
        not: '\xAC',
        shy: '\xAD',
        reg: '\xAE',
        macr: '\xAF',
        deg: '\xB0',
        plusmn: '\xB1',
        sup2: '\xB2',
        sup3: '\xB3',
        acute: '\xB4',
        micro: '\xB5',
        para: '\xB6',
        middot: '\xB7',
        cedil: '\xB8',
        sup1: '\xB9',
        ordm: '\xBA',
        raquo: '\xBB',
        frac14: '\xBC',
        frac12: '\xBD',
        frac34: '\xBE',
        iquest: '\xBF',
        Agrave: '\xC0',
        Aacute: '\xC1',
        Acirc: '\xC2',
        Atilde: '\xC3',
        Auml: '\xC4',
        Aring: '\xC5',
        AElig: '\xC6',
        Ccedil: '\xC7',
        Egrave: '\xC8',
        Eacute: '\xC9',
        Ecirc: '\xCA',
        Euml: '\xCB',
        Igrave: '\xCC',
        Iacute: '\xCD',
        Icirc: '\xCE',
        Iuml: '\xCF',
        ETH: '\xD0',
        Ntilde: '\xD1',
        Ograve: '\xD2',
        Oacute: '\xD3',
        Ocirc: '\xD4',
        Otilde: '\xD5',
        Ouml: '\xD6',
        times: '\xD7',
        Oslash: '\xD8',
        Ugrave: '\xD9',
        Uacute: '\xDA',
        Ucirc: '\xDB',
        Uuml: '\xDC',
        Yacute: '\xDD',
        THORN: '\xDE',
        szlig: '\xDF',
        agrave: '\xE0',
        aacute: '\xE1',
        acirc: '\xE2',
        atilde: '\xE3',
        auml: '\xE4',
        aring: '\xE5',
        aelig: '\xE6',
        ccedil: '\xE7',
        egrave: '\xE8',
        eacute: '\xE9',
        ecirc: '\xEA',
        euml: '\xEB',
        igrave: '\xEC',
        iacute: '\xED',
        icirc: '\xEE',
        iuml: '\xEF',
        eth: '\xF0',
        ntilde: '\xF1',
        ograve: '\xF2',
        oacute: '\xF3',
        ocirc: '\xF4',
        otilde: '\xF5',
        ouml: '\xF6',
        divide: '\xF7',
        oslash: '\xF8',
        ugrave: '\xF9',
        uacute: '\xFA',
        ucirc: '\xFB',
        uuml: '\xFC',
        yacute: '\xFD',
        thorn: '\xFE',
        yuml: '\xFF',
        OElig: '\u0152',
        oelig: '\u0153',
        Scaron: '\u0160',
        scaron: '\u0161',
        Yuml: '\u0178',
        fnof: '\u0192',
        circ: '\u02C6',
        tilde: '\u02DC',
        Alpha: '\u0391',
        Beta: '\u0392',
        Gamma: '\u0393',
        Delta: '\u0394',
        Epsilon: '\u0395',
        Zeta: '\u0396',
        Eta: '\u0397',
        Theta: '\u0398',
        Iota: '\u0399',
        Kappa: '\u039A',
        Lambda: '\u039B',
        Mu: '\u039C',
        Nu: '\u039D',
        Xi: '\u039E',
        Omicron: '\u039F',
        Pi: '\u03A0',
        Rho: '\u03A1',
        Sigma: '\u03A3',
        Tau: '\u03A4',
        Upsilon: '\u03A5',
        Phi: '\u03A6',
        Chi: '\u03A7',
        Psi: '\u03A8',
        Omega: '\u03A9',
        alpha: '\u03B1',
        beta: '\u03B2',
        gamma: '\u03B3',
        delta: '\u03B4',
        epsilon: '\u03B5',
        zeta: '\u03B6',
        eta: '\u03B7',
        theta: '\u03B8',
        iota: '\u03B9',
        kappa: '\u03BA',
        lambda: '\u03BB',
        mu: '\u03BC',
        nu: '\u03BD',
        xi: '\u03BE',
        omicron: '\u03BF',
        pi: '\u03C0',
        rho: '\u03C1',
        sigmaf: '\u03C2',
        sigma: '\u03C3',
        tau: '\u03C4',
        upsilon: '\u03C5',
        phi: '\u03C6',
        chi: '\u03C7',
        psi: '\u03C8',
        omega: '\u03C9',
        thetasym: '\u03D1',
        upsih: '\u03D2',
        piv: '\u03D6',
        ensp: '\u2002',
        emsp: '\u2003',
        thinsp: '\u2009',
        zwnj: '\u200C',
        zwj: '\u200D',
        lrm: '\u200E',
        rlm: '\u200F',
        ndash: '\u2013',
        mdash: '\u2014',
        lsquo: '\u2018',
        rsquo: '\u2019',
        sbquo: '\u201A',
        ldquo: '\u201C',
        rdquo: '\u201D',
        bdquo: '\u201E',
        dagger: '\u2020',
        Dagger: '\u2021',
        bull: '\u2022',
        hellip: '\u2026',
        permil: '\u2030',
        prime: '\u2032',
        Prime: '\u2033',
        lsaquo: '\u2039',
        rsaquo: '\u203A',
        oline: '\u203E',
        frasl: '\u2044',
        euro: '\u20AC',
        image: '\u2111',
        weierp: '\u2118',
        real: '\u211C',
        trade: '\u2122',
        alefsym: '\u2135',
        larr: '\u2190',
        uarr: '\u2191',
        rarr: '\u2192',
        darr: '\u2193',
        harr: '\u2194',
        crarr: '\u21B5',
        lArr: '\u21D0',
        uArr: '\u21D1',
        rArr: '\u21D2',
        dArr: '\u21D3',
        hArr: '\u21D4',
        forall: '\u2200',
        part: '\u2202',
        exist: '\u2203',
        empty: '\u2205',
        nabla: '\u2207',
        isin: '\u2208',
        notin: '\u2209',
        ni: '\u220B',
        prod: '\u220F',
        sum: '\u2211',
        minus: '\u2212',
        lowast: '\u2217',
        radic: '\u221A',
        prop: '\u221D',
        infin: '\u221E',
        ang: '\u2220',
        and: '\u2227',
        or: '\u2228',
        cap: '\u2229',
        cup: '\u222A',
        'int': '\u222B',
        there4: '\u2234',
        sim: '\u223C',
        cong: '\u2245',
        asymp: '\u2248',
        ne: '\u2260',
        equiv: '\u2261',
        le: '\u2264',
        ge: '\u2265',
        sub: '\u2282',
        sup: '\u2283',
        nsub: '\u2284',
        sube: '\u2286',
        supe: '\u2287',
        oplus: '\u2295',
        otimes: '\u2297',
        perp: '\u22A5',
        sdot: '\u22C5',
        lceil: '\u2308',
        rceil: '\u2309',
        lfloor: '\u230A',
        rfloor: '\u230B',
        lang: '\u2329',
        rang: '\u232A',
        loz: '\u25CA',
        spades: '\u2660',
        clubs: '\u2663',
        hearts: '\u2665',
        diams: '\u2666'
      };
    });

    var require$$0 = xhtml && (typeof xhtml === 'undefined' ? 'undefined' : _typeof(xhtml)) === 'object' && 'default' in xhtml ? xhtml['default'] : xhtml;

    var inject = __commonjs(function (module) {
      'use strict';

      var XHTMLEntities = require$$0;

      var hexNumber = /^[\da-fA-F]+$/;
      var decimalNumber = /^\d+$/;

      module.exports = function (acorn) {
        var tt = acorn.tokTypes;
        var tc = acorn.tokContexts;

        tc.j_oTag = new acorn.TokContext('<tag', false);
        tc.j_cTag = new acorn.TokContext('</tag', false);
        tc.j_expr = new acorn.TokContext('<tag>...</tag>', true, true);

        tt.jsxName = new acorn.TokenType('jsxName');
        tt.jsxText = new acorn.TokenType('jsxText', { beforeExpr: true });
        tt.jsxTagStart = new acorn.TokenType('jsxTagStart');
        tt.jsxTagEnd = new acorn.TokenType('jsxTagEnd');

        tt.jsxTagStart.updateContext = function () {
          this.context.push(tc.j_expr); // treat as beginning of JSX expression
          this.context.push(tc.j_oTag); // start opening tag context
          this.exprAllowed = false;
        };
        tt.jsxTagEnd.updateContext = function (prevType) {
          var out = this.context.pop();
          if (out === tc.j_oTag && prevType === tt.slash || out === tc.j_cTag) {
            this.context.pop();
            this.exprAllowed = this.curContext() === tc.j_expr;
          } else {
            this.exprAllowed = true;
          }
        };

        var pp = acorn.Parser.prototype;

        // Reads inline JSX contents token.

        pp.jsx_readToken = function () {
          var out = '',
              chunkStart = this.pos;
          for (;;) {
            if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated JSX contents');
            var ch = this.input.charCodeAt(this.pos);

            switch (ch) {
              case 60: // '<'
              case 123:
                // '{'
                if (this.pos === this.start) {
                  if (ch === 60 && this.exprAllowed) {
                    ++this.pos;
                    return this.finishToken(tt.jsxTagStart);
                  }
                  return this.getTokenFromCode(ch);
                }
                out += this.input.slice(chunkStart, this.pos);
                return this.finishToken(tt.jsxText, out);

              case 38:
                // '&'
                out += this.input.slice(chunkStart, this.pos);
                out += this.jsx_readEntity();
                chunkStart = this.pos;
                break;

              default:
                if (acorn.isNewLine(ch)) {
                  out += this.input.slice(chunkStart, this.pos);
                  out += this.jsx_readNewLine(true);
                  chunkStart = this.pos;
                } else {
                  ++this.pos;
                }
            }
          }
        };

        pp.jsx_readNewLine = function (normalizeCRLF) {
          var ch = this.input.charCodeAt(this.pos);
          var out;
          ++this.pos;
          if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
            out = normalizeCRLF ? '\n' : '\r\n';
          } else {
            out = String.fromCharCode(ch);
          }
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }

          return out;
        };

        pp.jsx_readString = function (quote) {
          var out = '',
              chunkStart = ++this.pos;
          for (;;) {
            if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated string constant');
            var ch = this.input.charCodeAt(this.pos);
            if (ch === quote) break;
            if (ch === 38) {
              // '&'
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readEntity();
              chunkStart = this.pos;
            } else if (acorn.isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readNewLine(false);
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        };

        pp.jsx_readEntity = function () {
          var str = '',
              count = 0,
              entity;
          var ch = this.input[this.pos];
          if (ch !== '&') this.raise(this.pos, 'Entity must start with an ampersand');
          var startPos = ++this.pos;
          while (this.pos < this.input.length && count++ < 10) {
            ch = this.input[this.pos++];
            if (ch === ';') {
              if (str[0] === '#') {
                if (str[1] === 'x') {
                  str = str.substr(2);
                  if (hexNumber.test(str)) entity = String.fromCharCode(parseInt(str, 16));
                } else {
                  str = str.substr(1);
                  if (decimalNumber.test(str)) entity = String.fromCharCode(parseInt(str, 10));
                }
              } else {
                entity = XHTMLEntities[str];
              }
              break;
            }
            str += ch;
          }
          if (!entity) {
            this.pos = startPos;
            return '&';
          }
          return entity;
        };

        // Read a JSX identifier (valid tag or attribute name).
        //
        // Optimized version since JSX identifiers can't contain
        // escape characters and so can be read as single slice.
        // Also assumes that first character was already checked
        // by isIdentifierStart in readToken.

        pp.jsx_readWord = function () {
          var ch,
              start = this.pos;
          do {
            ch = this.input.charCodeAt(++this.pos);
          } while (acorn.isIdentifierChar(ch) || ch === 45); // '-'
          return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
        };

        // Transforms JSX element name to string.

        function getQualifiedJSXName(object) {
          if (object.type === 'JSXIdentifier') return object.name;

          if (object.type === 'JSXNamespacedName') return object.namespace.name + ':' + object.name.name;

          if (object.type === 'JSXMemberExpression') return getQualifiedJSXName(object.object) + '.' + getQualifiedJSXName(object.property);
        }

        // Parse next token as JSX identifier

        pp.jsx_parseIdentifier = function () {
          var node = this.startNode();
          if (this.type === tt.jsxName) node.name = this.value;else if (this.type.keyword) node.name = this.type.keyword;else this.unexpected();
          this.next();
          return this.finishNode(node, 'JSXIdentifier');
        };

        // Parse namespaced identifier.

        pp.jsx_parseNamespacedName = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          var name = this.jsx_parseIdentifier();
          if (!this.options.plugins.jsx.allowNamespaces || !this.eat(tt.colon)) return name;
          var node = this.startNodeAt(startPos, startLoc);
          node.namespace = name;
          node.name = this.jsx_parseIdentifier();
          return this.finishNode(node, 'JSXNamespacedName');
        };

        // Parses element name in any form - namespaced, member
        // or single identifier.

        pp.jsx_parseElementName = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          var node = this.jsx_parseNamespacedName();
          if (this.type === tt.dot && node.type === 'JSXNamespacedName' && !this.options.plugins.jsx.allowNamespacedObjects) {
            this.unexpected();
          }
          while (this.eat(tt.dot)) {
            var newNode = this.startNodeAt(startPos, startLoc);
            newNode.object = node;
            newNode.property = this.jsx_parseIdentifier();
            node = this.finishNode(newNode, 'JSXMemberExpression');
          }
          return node;
        };

        // Parses any type of JSX attribute value.

        pp.jsx_parseAttributeValue = function () {
          switch (this.type) {
            case tt.braceL:
              var node = this.jsx_parseExpressionContainer();
              if (node.expression.type === 'JSXEmptyExpression') this.raise(node.start, 'JSX attributes must only be assigned a non-empty expression');
              return node;

            case tt.jsxTagStart:
            case tt.string:
              return this.parseExprAtom();

            default:
              this.raise(this.start, 'JSX value should be either an expression or a quoted JSX text');
          }
        };

        // JSXEmptyExpression is unique type since it doesn't actually parse anything,
        // and so it should start at the end of last read token (left brace) and finish
        // at the beginning of the next one (right brace).

        pp.jsx_parseEmptyExpression = function () {
          var node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
          return this.finishNodeAt(node, 'JSXEmptyExpression', this.start, this.startLoc);
        };

        // Parses JSX expression enclosed into curly brackets.


        pp.jsx_parseExpressionContainer = function () {
          var node = this.startNode();
          this.next();
          node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
          this.expect(tt.braceR);
          return this.finishNode(node, 'JSXExpressionContainer');
        };

        // Parses following JSX attribute name-value pair.

        pp.jsx_parseAttribute = function () {
          var node = this.startNode();
          if (this.eat(tt.braceL)) {
            this.expect(tt.ellipsis);
            node.argument = this.parseMaybeAssign();
            this.expect(tt.braceR);
            return this.finishNode(node, 'JSXSpreadAttribute');
          }
          node.name = this.jsx_parseNamespacedName();
          node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
          return this.finishNode(node, 'JSXAttribute');
        };

        // Parses JSX opening tag starting after '<'.

        pp.jsx_parseOpeningElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          node.attributes = [];
          node.name = this.jsx_parseElementName();
          while (this.type !== tt.slash && this.type !== tt.jsxTagEnd) {
            node.attributes.push(this.jsx_parseAttribute());
          }node.selfClosing = this.eat(tt.slash);
          this.expect(tt.jsxTagEnd);
          return this.finishNode(node, 'JSXOpeningElement');
        };

        // Parses JSX closing tag starting after '</'.

        pp.jsx_parseClosingElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          node.name = this.jsx_parseElementName();
          this.expect(tt.jsxTagEnd);
          return this.finishNode(node, 'JSXClosingElement');
        };

        // Parses entire JSX element, including it's opening tag
        // (starting after '<'), attributes, contents and closing tag.

        pp.jsx_parseElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          var children = [];
          var openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
          var closingElement = null;

          if (!openingElement.selfClosing) {
            contents: for (;;) {
              switch (this.type) {
                case tt.jsxTagStart:
                  startPos = this.start;startLoc = this.startLoc;
                  this.next();
                  if (this.eat(tt.slash)) {
                    closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                    break contents;
                  }
                  children.push(this.jsx_parseElementAt(startPos, startLoc));
                  break;

                case tt.jsxText:
                  children.push(this.parseExprAtom());
                  break;

                case tt.braceL:
                  children.push(this.jsx_parseExpressionContainer());
                  break;

                default:
                  this.unexpected();
              }
            }
            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
              this.raise(closingElement.start, 'Expected corresponding JSX closing tag for <' + getQualifiedJSXName(openingElement.name) + '>');
            }
          }

          node.openingElement = openingElement;
          node.closingElement = closingElement;
          node.children = children;
          if (this.type === tt.relational && this.value === "<") {
            this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
          }
          return this.finishNode(node, 'JSXElement');
        };

        // Parses entire JSX element from current position.

        pp.jsx_parseElement = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          this.next();
          return this.jsx_parseElementAt(startPos, startLoc);
        };

        acorn.plugins.jsx = function (instance, opts) {
          if (!opts) {
            return;
          }

          if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
            opts = {};
          }

          instance.options.plugins.jsx = {
            allowNamespaces: opts.allowNamespaces !== false,
            allowNamespacedObjects: !!opts.allowNamespacedObjects
          };

          instance.extend('parseExprAtom', function (inner) {
            return function (refShortHandDefaultPos) {
              if (this.type === tt.jsxText) return this.parseLiteral(this.value);else if (this.type === tt.jsxTagStart) return this.jsx_parseElement();else return inner.call(this, refShortHandDefaultPos);
            };
          });

          instance.extend('readToken', function (inner) {
            return function (code) {
              var context = this.curContext();

              if (context === tc.j_expr) return this.jsx_readToken();

              if (context === tc.j_oTag || context === tc.j_cTag) {
                if (acorn.isIdentifierStart(code)) return this.jsx_readWord();

                if (code == 62) {
                  ++this.pos;
                  return this.finishToken(tt.jsxTagEnd);
                }

                if ((code === 34 || code === 39) && context == tc.j_oTag) return this.jsx_readString(code);
              }

              if (code === 60 && this.exprAllowed) {
                ++this.pos;
                return this.finishToken(tt.jsxTagStart);
              }
              return inner.call(this, code);
            };
          });

          instance.extend('updateContext', function (inner) {
            return function (prevType) {
              if (this.type == tt.braceL) {
                var curContext = this.curContext();
                if (curContext == tc.j_oTag) this.context.push(tc.b_expr);else if (curContext == tc.j_expr) this.context.push(tc.b_tmpl);else inner.call(this, prevType);
                this.exprAllowed = true;
              } else if (this.type === tt.slash && prevType === tt.jsxTagStart) {
                this.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
                this.context.push(tc.j_cTag); // reconsider as closing tag context
                this.exprAllowed = false;
              } else {
                return inner.call(this, prevType);
              }
            };
          });
        };

        return acorn;
      };
    });

    var acornJsx = inject && (typeof inject === 'undefined' ? 'undefined' : _typeof(inject)) === 'object' && 'default' in inject ? inject['default'] : inject;

    var inject$1 = __commonjs(function (module) {
      'use strict';

      module.exports = function (acorn) {
        var tt = acorn.tokTypes;
        var pp = acorn.Parser.prototype;

        // this is the same parseObj that acorn has with...
        function parseObj(isPattern, refDestructuringErrors) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              propHash = {};
          node.properties = [];
          this.next();
          while (!this$1.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var prop = this$1.startNode(),
                isGenerator,
                startPos,
                startLoc;
            if (this$1.options.ecmaVersion >= 6) {
              // ...the spread logic borrowed from babylon :)
              if (this$1.type === tt.ellipsis) {
                prop = this$1.parseSpread();
                prop.type = isPattern ? "RestProperty" : "SpreadProperty";
                node.properties.push(prop);
                continue;
              }

              prop.method = false;
              prop.shorthand = false;
              if (isPattern || refDestructuringErrors) {
                startPos = this$1.start;
                startLoc = this$1.startLoc;
              }
              if (!isPattern) isGenerator = this$1.eat(tt.star);
            }
            this$1.parsePropertyName(prop);
            this$1.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors);
            this$1.checkPropClash(prop, propHash);
            node.properties.push(this$1.finishNode(prop, "Property"));
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        }

        acorn.plugins.objectSpread = function objectSpreadPlugin(instance) {
          pp.parseObj = parseObj;
        };

        return acorn;
      };
    });

    var acornObjectSpread = inject$1 && (typeof inject$1 === 'undefined' ? 'undefined' : _typeof(inject$1)) === 'object' && 'default' in inject$1 ? inject$1['default'] : inject$1;

    var charToInteger = {};
    var integerToChar = {};

    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('').forEach(function (char, i) {
      charToInteger[char] = i;
      integerToChar[i] = char;
    });

    function encode(value) {
      var result, i;

      if (typeof value === 'number') {
        result = encodeInteger(value);
      } else {
        result = '';
        for (i = 0; i < value.length; i += 1) {
          result += encodeInteger(value[i]);
        }
      }

      return result;
    }

    function encodeInteger(num) {
      var result = '',
          clamped;

      if (num < 0) {
        num = -num << 1 | 1;
      } else {
        num <<= 1;
      }

      do {
        clamped = num & 31;
        num >>= 5;

        if (num > 0) {
          clamped |= 32;
        }

        result += integerToChar[clamped];
      } while (num > 0);

      return result;
    }

    function Chunk(start, end, content) {
      this.start = start;
      this.end = end;
      this.original = content;

      this.intro = '';
      this.outro = '';

      this.content = content;
      this.storeName = false;
      this.edited = false;

      // we make these non-enumerable, for sanity while debugging
      Object.defineProperties(this, {
        previous: { writable: true, value: null },
        next: { writable: true, value: null }
      });
    }

    Chunk.prototype = {
      append: function append(content) {
        this.outro += content;
      },

      clone: function clone() {
        var chunk = new Chunk(this.start, this.end, this.original);

        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;

        return chunk;
      },

      contains: function contains(index) {
        return this.start < index && index < this.end;
      },

      eachNext: function eachNext(fn) {
        var chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.next;
        }
      },

      eachPrevious: function eachPrevious(fn) {
        var chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.previous;
        }
      },

      edit: function edit(content, storeName) {
        this.content = content;
        this.storeName = storeName;

        this.edited = true;

        return this;
      },

      prepend: function prepend(content) {
        this.intro = content + this.intro;
      },

      split: function split(index) {
        var sliceIndex = index - this.start;

        var originalBefore = this.original.slice(0, sliceIndex);
        var originalAfter = this.original.slice(sliceIndex);

        this.original = originalBefore;

        var newChunk = new Chunk(index, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = '';

        this.end = index;

        if (this.edited) {
          // TODO is this block necessary?...
          newChunk.edit('', false);
          this.content = '';
        } else {
          this.content = originalBefore;
        }

        newChunk.next = this.next;
        if (newChunk.next) newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;

        return newChunk;
      },

      toString: function toString() {
        return this.intro + this.content + this.outro;
      },

      trimEnd: function trimEnd(rx) {
        this.outro = this.outro.replace(rx, '');
        if (this.outro.length) return true;

        var trimmed = this.content.replace(rx, '');

        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit('', false);
          }

          return true;
        } else {
          this.edit('', false);

          this.intro = this.intro.replace(rx, '');
          if (this.intro.length) return true;
        }
      },

      trimStart: function trimStart(rx) {
        this.intro = this.intro.replace(rx, '');
        if (this.intro.length) return true;

        var trimmed = this.content.replace(rx, '');

        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.end - trimmed.length);
            this.edit('', false);
          }

          return true;
        } else {
          this.edit('', false);

          this.outro = this.outro.replace(rx, '');
          if (this.outro.length) return true;
        }
      }
    };

    var _btoa;

    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      _btoa = window.btoa;
    } else if (typeof Buffer === 'function') {
      _btoa = function _btoa(str) {
        return new Buffer(str).toString('base64');
      };
    } else {
      _btoa = function _btoa() {
        throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
      };
    }

    var btoa = _btoa;

    function SourceMap(properties) {
      this.version = 3;

      this.file = properties.file;
      this.sources = properties.sources;
      this.sourcesContent = properties.sourcesContent;
      this.names = properties.names;
      this.mappings = properties.mappings;
    }

    SourceMap.prototype = {
      toString: function toString() {
        return JSON.stringify(this);
      },

      toUrl: function toUrl() {
        return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
      }
    };

    function guessIndent(code) {
      var lines = code.split('\n');

      var tabbed = lines.filter(function (line) {
        return (/^\t+/.test(line)
        );
      });
      var spaced = lines.filter(function (line) {
        return (/^ {2,}/.test(line)
        );
      });

      if (tabbed.length === 0 && spaced.length === 0) {
        return null;
      }

      // More lines tabbed than spaced? Assume tabs, and
      // default to tabs in the case of a tie (or nothing
      // to go on)
      if (tabbed.length >= spaced.length) {
        return '\t';
      }

      // Otherwise, we need to guess the multiple
      var min = spaced.reduce(function (previous, current) {
        var numSpaces = /^ +/.exec(current)[0].length;
        return Math.min(numSpaces, previous);
      }, Infinity);

      return new Array(min + 1).join(' ');
    }

    function getLocator(source) {
      var originalLines = source.split('\n');

      var start = 0;
      var lineRanges = originalLines.map(function (line, i) {
        var end = start + line.length + 1;
        var range = { start: start, end: end, line: i };

        start = end;
        return range;
      });

      var i = 0;

      function rangeContains(range, index) {
        return range.start <= index && index < range.end;
      }

      function getLocation(range, index) {
        return { line: range.line, column: index - range.start };
      }

      return function locate(index) {
        var range = lineRanges[i];

        var d = index >= range.end ? 1 : -1;

        while (range) {
          if (rangeContains(range, index)) return getLocation(range, index);

          i += d;
          range = lineRanges[i];
        }
      };
    }

    function encodeMappings(original, intro, chunk, hires, sourcemapLocations, sourceIndex, offsets, names) {
      var rawLines = [];

      var generatedCodeLine = intro.split('\n').length - 1;
      var rawSegments = rawLines[generatedCodeLine] = [];

      var generatedCodeColumn = 0;

      var locate = getLocator(original);

      function addEdit(content, original, loc, nameIndex, i) {
        if (i || content.length) {
          rawSegments.push({
            generatedCodeLine: generatedCodeLine,
            generatedCodeColumn: generatedCodeColumn,
            sourceCodeLine: loc.line,
            sourceCodeColumn: loc.column,
            sourceCodeName: nameIndex,
            sourceIndex: sourceIndex
          });
        }

        var lines = content.split('\n');
        var lastLine = lines.pop();

        if (lines.length) {
          generatedCodeLine += lines.length;
          rawLines[generatedCodeLine] = rawSegments = [];
          generatedCodeColumn = lastLine.length;
        } else {
          generatedCodeColumn += lastLine.length;
        }

        lines = original.split('\n');
        lastLine = lines.pop();

        if (lines.length) {
          loc.line += lines.length;
          loc.column = lastLine.length;
        } else {
          loc.column += lastLine.length;
        }
      }

      function addUneditedChunk(chunk, loc) {
        var originalCharIndex = chunk.start;
        var first = true;

        while (originalCharIndex < chunk.end) {
          if (hires || first || sourcemapLocations[originalCharIndex]) {
            rawSegments.push({
              generatedCodeLine: generatedCodeLine,
              generatedCodeColumn: generatedCodeColumn,
              sourceCodeLine: loc.line,
              sourceCodeColumn: loc.column,
              sourceCodeName: -1,
              sourceIndex: sourceIndex
            });
          }

          if (original[originalCharIndex] === '\n') {
            loc.line += 1;
            loc.column = 0;
            generatedCodeLine += 1;
            rawLines[generatedCodeLine] = rawSegments = [];
            generatedCodeColumn = 0;
          } else {
            loc.column += 1;
            generatedCodeColumn += 1;
          }

          originalCharIndex += 1;
          first = false;
        }
      }

      while (chunk) {
        var loc = locate(chunk.start);

        if (chunk.intro.length) {
          addEdit(chunk.intro, '', loc, -1, !!chunk.previous);
        }

        if (chunk.edited) {
          addEdit(chunk.content, chunk.original, loc, chunk.storeName ? names.indexOf(chunk.original) : -1, !!chunk.previous);
        } else {
          addUneditedChunk(chunk, loc);
        }

        if (chunk.outro.length) {
          addEdit(chunk.outro, '', loc, -1, !!chunk.previous);
        }

        var nextChunk = chunk.next;
        chunk = nextChunk;
      }

      offsets.sourceIndex = offsets.sourceIndex || 0;
      offsets.sourceCodeLine = offsets.sourceCodeLine || 0;
      offsets.sourceCodeColumn = offsets.sourceCodeColumn || 0;
      offsets.sourceCodeName = offsets.sourceCodeName || 0;

      var encoded = rawLines.map(function (segments) {
        var generatedCodeColumn = 0;

        return segments.map(function (segment) {
          var arr = [segment.generatedCodeColumn - generatedCodeColumn, segment.sourceIndex - offsets.sourceIndex, segment.sourceCodeLine - offsets.sourceCodeLine, segment.sourceCodeColumn - offsets.sourceCodeColumn];

          generatedCodeColumn = segment.generatedCodeColumn;
          offsets.sourceIndex = segment.sourceIndex;
          offsets.sourceCodeLine = segment.sourceCodeLine;
          offsets.sourceCodeColumn = segment.sourceCodeColumn;

          if (~segment.sourceCodeName) {
            arr.push(segment.sourceCodeName - offsets.sourceCodeName);
            offsets.sourceCodeName = segment.sourceCodeName;
          }

          return encode(arr);
        }).join(',');
      }).join(';');

      return encoded;
    }

    function getRelativePath(from, to) {
      var fromParts = from.split(/[\/\\]/);
      var toParts = to.split(/[\/\\]/);

      fromParts.pop(); // get dirname

      while (fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
      }

      if (fromParts.length) {
        var i = fromParts.length;
        while (i--) {
          fromParts[i] = '..';
        }
      }

      return fromParts.concat(toParts).join('/');
    }

    var toString = Object.prototype.toString;

    function isObject(thing) {
      return toString.call(thing) === '[object Object]';
    }

    function MagicString(string, options) {
      if (options === void 0) options = {};

      var chunk = new Chunk(0, string.length, string);

      Object.defineProperties(this, {
        original: { writable: true, value: string },
        outro: { writable: true, value: '' },
        intro: { writable: true, value: '' },
        firstChunk: { writable: true, value: chunk },
        lastChunk: { writable: true, value: chunk },
        lastSearchedChunk: { writable: true, value: chunk },
        byStart: { writable: true, value: {} },
        byEnd: { writable: true, value: {} },
        filename: { writable: true, value: options.filename },
        indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
        sourcemapLocations: { writable: true, value: {} },
        storedNames: { writable: true, value: {} },
        indentStr: { writable: true, value: guessIndent(string) }
      });

      this.byStart[0] = chunk;
      this.byEnd[string.length] = chunk;
    }

    MagicString.prototype = {
      addSourcemapLocation: function addSourcemapLocation(char) {
        this.sourcemapLocations[char] = true;
      },

      append: function append(content) {
        if (typeof content !== 'string') throw new TypeError('outro content must be a string');

        this.outro += content;
        return this;
      },

      clone: function clone() {
        var cloned = new MagicString(this.original, { filename: this.filename });

        var originalChunk = this.firstChunk;
        var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();

        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;

          var nextOriginalChunk = originalChunk.next;
          var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;

            clonedChunk = nextClonedChunk;
          }

          originalChunk = nextOriginalChunk;
        }

        cloned.lastChunk = clonedChunk;

        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = typeof this.indentExclusionRanges[0] === 'number' ? [this.indentExclusionRanges[0], this.indentExclusionRanges[1]] : this.indentExclusionRanges.map(function (range) {
            return [range.start, range.end];
          });
        }

        Object.keys(this.sourcemapLocations).forEach(function (loc) {
          cloned.sourcemapLocations[loc] = true;
        });

        return cloned;
      },

      generateMap: function generateMap(options) {
        options = options || {};

        var names = Object.keys(this.storedNames);

        var map = new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
          sourcesContent: options.includeContent ? [this.original] : [null],
          names: names,
          mappings: this.getMappings(options.hires, 0, {}, names)
        });
        return map;
      },

      getIndentString: function getIndentString() {
        return this.indentStr === null ? '\t' : this.indentStr;
      },

      getMappings: function getMappings(hires, sourceIndex, offsets, names) {
        return encodeMappings(this.original, this.intro, this.firstChunk, hires, this.sourcemapLocations, sourceIndex, offsets, names);
      },

      indent: function indent(indentStr, options) {
        var this$1 = this;

        var pattern = /^[^\r\n]/gm;

        if (isObject(indentStr)) {
          options = indentStr;
          indentStr = undefined;
        }

        indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

        if (indentStr === '') return this; // noop

        options = options || {};

        // Process exclusion ranges
        var isExcluded = {};

        if (options.exclude) {
          var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
          exclusions.forEach(function (exclusion) {
            for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }

        var shouldIndentNextCharacter = options.indentStart !== false;
        var replacer = function replacer(match) {
          if (shouldIndentNextCharacter) return "" + indentStr + match;
          shouldIndentNextCharacter = true;
          return match;
        };

        this.intro = this.intro.replace(pattern, replacer);

        var charIndex = 0;

        var chunk = this.firstChunk;

        while (chunk) {
          var end = chunk.end;

          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);

              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
              }
            }
          } else {
            charIndex = chunk.start;

            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                var char = this$1.original[charIndex];

                if (char === '\n') {
                  shouldIndentNextCharacter = true;
                } else if (char !== '\r' && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;

                  if (charIndex === chunk.start) {
                    chunk.prepend(indentStr);
                  } else {
                    var rhs = chunk.split(charIndex);
                    rhs.prepend(indentStr);

                    this$1.byStart[charIndex] = rhs;
                    this$1.byEnd[charIndex] = chunk;

                    chunk = rhs;
                  }
                }
              }

              charIndex += 1;
            }
          }

          charIndex = chunk.end;
          chunk = chunk.next;
        }

        this.outro = this.outro.replace(pattern, replacer);

        return this;
      },

      insert: function insert() {
        throw new Error('magicString.insert(...) is deprecated. Use insertRight(...) or insertLeft(...)');
      },

      insertLeft: function insertLeft(index, content) {
        if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

        this._split(index);

        var chunk = this.byEnd[index];

        if (chunk) {
          chunk.append(content);
        } else {
          this.intro += content;
        }

        return this;
      },

      insertRight: function insertRight(index, content) {
        if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

        this._split(index);

        var chunk = this.byStart[index];

        if (chunk) {
          chunk.prepend(content);
        } else {
          this.outro += content;
        }

        return this;
      },

      move: function move(start, end, index) {
        if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');

        this._split(start);
        this._split(end);
        this._split(index);

        var first = this.byStart[start];
        var last = this.byEnd[end];

        var oldLeft = first.previous;
        var oldRight = last.next;

        var newRight = this.byStart[index];
        if (!newRight && last === this.lastChunk) return this;
        var newLeft = newRight ? newRight.previous : this.lastChunk;

        if (oldLeft) oldLeft.next = oldRight;
        if (oldRight) oldRight.previous = oldLeft;

        if (newLeft) newLeft.next = first;
        if (newRight) newRight.previous = last;

        if (!first.previous) this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }

        first.previous = newLeft;
        last.next = newRight;

        if (!newLeft) this.firstChunk = first;
        if (!newRight) this.lastChunk = last;

        return this;
      },

      overwrite: function overwrite(start, end, content, storeName) {
        var this$1 = this;

        if (typeof content !== 'string') throw new TypeError('replacement content must be a string');

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }if (end > this.original.length) throw new Error('end is out of bounds');
        if (start === end) throw new Error('Cannot overwrite a zero-length range – use insertLeft or insertRight instead');

        this._split(start);
        this._split(end);

        if (storeName) {
          var original = this.original.slice(start, end);
          this.storedNames[original] = true;
        }

        var first = this.byStart[start];
        var last = this.byEnd[end];

        if (first) {
          first.edit(content, storeName);

          if (first !== last) {
            first.outro = '';

            var chunk = first.next;
            while (chunk !== last) {
              chunk.edit('', false);
              chunk.intro = chunk.outro = '';
              chunk = chunk.next;
            }

            chunk.edit('', false);
            chunk.intro = '';
          }
        } else {
          // must be inserting at the end
          var newChunk = new Chunk(start, end, '').edit(content, storeName);

          // TODO last chunk in the array may not be the last chunk, if it's moved...
          last.next = newChunk;
          newChunk.previous = last;
        }

        return this;
      },

      prepend: function prepend(content) {
        if (typeof content !== 'string') throw new TypeError('outro content must be a string');

        this.intro = content + this.intro;
        return this;
      },

      remove: function remove(start, end) {
        var this$1 = this;

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }if (start === end) return this;

        if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
        if (start > end) throw new Error('end must be greater than start');

        return this.overwrite(start, end, '', false);
      },

      slice: function slice(start, end) {
        var this$1 = this;
        if (start === void 0) start = 0;
        if (end === void 0) end = this.original.length;

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }var result = '';

        // find start chunk
        var chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {

          // found end chunk before start
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }

          chunk = chunk.next;
        }

        if (chunk && chunk.edited && chunk.start !== start) throw new Error("Cannot use replaced character " + start + " as slice start anchor.");

        var startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }

          var containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end) throw new Error("Cannot use replaced character " + end + " as slice end anchor.");

          var sliceStart = startChunk === chunk ? start - chunk.start : 0;
          var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

          result += chunk.content.slice(sliceStart, sliceEnd);

          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }

          if (containsEnd) {
            break;
          }

          chunk = chunk.next;
        }

        return result;
      },

      // TODO deprecate this? not really very useful
      snip: function snip(start, end) {
        var clone = this.clone();
        clone.remove(0, start);
        clone.remove(end, clone.original.length);

        return clone;
      },

      _split: function _split(index) {
        var this$1 = this;

        if (this.byStart[index] || this.byEnd[index]) return;

        var chunk = this.lastSearchedChunk;
        var searchForward = index > chunk.end;

        while (true) {
          if (chunk.contains(index)) return this$1._splitChunk(chunk, index);

          chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
        }
      },

      _splitChunk: function _splitChunk(chunk, index) {
        if (chunk.edited && chunk.content.length) {
          // zero-length edited chunks are a special case (overlapping replacements)
          var loc = getLocator(this.original)(index);
          throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + " – \"" + chunk.original + "\")");
        }

        var newChunk = chunk.split(index);

        this.byEnd[index] = chunk;
        this.byStart[index] = newChunk;
        this.byEnd[newChunk.end] = newChunk;

        if (chunk === this.lastChunk) this.lastChunk = newChunk;

        this.lastSearchedChunk = chunk;
        return true;
      },

      toString: function toString() {
        var str = this.intro;

        var chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }

        return str + this.outro;
      },

      trimLines: function trimLines() {
        return this.trim('[\\r\\n]');
      },

      trim: function trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },

      trimEnd: function trimEnd(charType) {
        var this$1 = this;

        var rx = new RegExp((charType || '\\s') + '+$');

        this.outro = this.outro.replace(rx, '');
        if (this.outro.length) return this;

        var chunk = this.lastChunk;

        do {
          var end = chunk.end;
          var aborted = chunk.trimEnd(rx);

          // if chunk was trimmed, we have a new lastChunk
          if (chunk.end !== end) {
            this$1.lastChunk = chunk.next;

            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }

          if (aborted) return this$1;
          chunk = chunk.previous;
        } while (chunk);

        return this;
      },

      trimStart: function trimStart(charType) {
        var this$1 = this;

        var rx = new RegExp('^' + (charType || '\\s') + '+');

        this.intro = this.intro.replace(rx, '');
        if (this.intro.length) return this;

        var chunk = this.firstChunk;

        do {
          var end = chunk.end;
          var aborted = chunk.trimStart(rx);

          if (chunk.end !== end) {
            // special case...
            if (chunk === this$1.lastChunk) this$1.lastChunk = chunk.next;

            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }

          if (aborted) return this$1;
          chunk = chunk.next;
        } while (chunk);

        return this;
      }
    };

    var hasOwnProp = Object.prototype.hasOwnProperty;

    function Bundle(options) {
      if (options === void 0) options = {};

      this.intro = options.intro || '';
      this.separator = options.separator !== undefined ? options.separator : '\n';

      this.sources = [];

      this.uniqueSources = [];
      this.uniqueSourceIndexByFilename = {};
    }

    Bundle.prototype = {
      addSource: function addSource(source) {
        if (source instanceof MagicString) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }

        if (!isObject(source) || !source.content) {
          throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
        }

        ['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
          if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
        });

        if (source.separator === undefined) {
          // TODO there's a bunch of this sort of thing, needs cleaning up
          source.separator = this.separator;
        }

        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
            }
          }
        }

        this.sources.push(source);
        return this;
      },

      append: function append(str, options) {
        this.addSource({
          content: new MagicString(str),
          separator: options && options.separator || ''
        });

        return this;
      },

      clone: function clone() {
        var bundle = new Bundle({
          intro: this.intro,
          separator: this.separator
        });

        this.sources.forEach(function (source) {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });

        return bundle;
      },

      generateMap: function generateMap(options) {
        var this$1 = this;

        var offsets = {};

        var names = [];
        this.sources.forEach(function (source) {
          Object.keys(source.content.storedNames).forEach(function (name) {
            if (!~names.indexOf(name)) names.push(name);
          });
        });

        var encoded = getSemis(this.intro) + this.sources.map(function (source, i) {
          var prefix = i > 0 ? getSemis(source.separator) || ',' : '';
          var mappings;

          // we don't bother encoding sources without a filename
          if (!source.filename) {
            mappings = getSemis(source.content.toString());
          } else {
            var sourceIndex = this$1.uniqueSourceIndexByFilename[source.filename];
            mappings = source.content.getMappings(options.hires, sourceIndex, offsets, names);
          }

          return prefix + mappings;
        }).join('');

        return new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: this.uniqueSources.map(function (source) {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map(function (source) {
            return options.includeContent ? source.content : null;
          }),
          names: names,
          mappings: encoded
        });
      },

      getIndentString: function getIndentString() {
        var indentStringCounts = {};

        this.sources.forEach(function (source) {
          var indentStr = source.content.indentStr;

          if (indentStr === null) return;

          if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });

        return Object.keys(indentStringCounts).sort(function (a, b) {
          return indentStringCounts[a] - indentStringCounts[b];
        })[0] || '\t';
      },

      indent: function indent(indentStr) {
        var this$1 = this;

        if (!arguments.length) {
          indentStr = this.getIndentString();
        }

        if (indentStr === '') return this; // noop

        var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';

        this.sources.forEach(function (source, i) {
          var separator = source.separator !== undefined ? source.separator : this$1.separator;
          var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);

          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });

          // TODO this is a very slow way to determine this
          trailingNewline = source.content.toString().slice(0, -1) === '\n';
        });

        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function (match, index) {
            return index > 0 ? indentStr + match : match;
          });
        }

        return this;
      },

      prepend: function prepend(str) {
        this.intro = str + this.intro;
        return this;
      },

      toString: function toString() {
        var this$1 = this;

        var body = this.sources.map(function (source, i) {
          var separator = source.separator !== undefined ? source.separator : this$1.separator;
          var str = (i > 0 ? separator : '') + source.content.toString();

          return str;
        }).join('');

        return this.intro + body;
      },

      trimLines: function trimLines() {
        return this.trim('[\\r\\n]');
      },

      trim: function trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },

      trimStart: function trimStart(charType) {
        var this$1 = this;

        var rx = new RegExp('^' + (charType || '\\s') + '+');
        this.intro = this.intro.replace(rx, '');

        if (!this.intro) {
          var source;
          var i = 0;

          do {
            source = this$1.sources[i];

            if (!source) {
              break;
            }

            source.content.trimStart(charType);
            i += 1;
          } while (source.content.toString() === ''); // TODO faster way to determine non-empty source?
        }

        return this;
      },

      trimEnd: function trimEnd(charType) {
        var this$1 = this;

        var rx = new RegExp((charType || '\\s') + '+$');

        var source;
        var i = this.sources.length - 1;

        do {
          source = this$1.sources[i];

          if (!source) {
            this$1.intro = this$1.intro.replace(rx, '');
            break;
          }

          source.content.trimEnd(charType);
          i -= 1;
        } while (source.content.toString() === ''); // TODO faster way to determine non-empty source?

        return this;
      }
    };

    function getSemis(str) {
      return new Array(str.split('\n').length).join(';');
    }

    MagicString.Bundle = Bundle;

    var keys = {
      Program: ['body'],
      Literal: []
    };

    // used for debugging, without the noise created by
    // circular references
    function toJSON(node) {
      var obj = {};

      Object.keys(node).forEach(function (key) {
        if (key === 'parent' || key === 'program' || key === 'keys' || key === '__wrapped') return;

        if (Array.isArray(node[key])) {
          obj[key] = node[key].map(toJSON);
        } else if (node[key] && node[key].toJSON) {
          obj[key] = node[key].toJSON();
        } else {
          obj[key] = node[key];
        }
      });

      return obj;
    }

    var Node = function Node(raw, parent) {
      raw.parent = parent;
      raw.program = parent.program || parent;
      raw.depth = parent.depth + 1;
      raw.keys = keys[raw.type];
      raw.indentation = undefined;

      for (var i = 0, list = keys[raw.type]; i < list.length; i += 1) {
        var key = list[i];

        wrap(raw[key], raw);
      }

      raw.program.magicString.addSourcemapLocation(raw.start);
      raw.program.magicString.addSourcemapLocation(raw.end);
    };

    Node.prototype.ancestor = function ancestor(level) {
      var node = this;
      while (level--) {
        node = node.parent;
        if (!node) return null;
      }

      return node;
    };

    Node.prototype.contains = function contains(node) {
      var this$1 = this;

      while (node) {
        if (node === this$1) return true;
        node = node.parent;
      }

      return false;
    };

    Node.prototype.findLexicalBoundary = function findLexicalBoundary() {
      return this.parent.findLexicalBoundary();
    };

    Node.prototype.findNearest = function findNearest(type) {
      if (typeof type === 'string') type = new RegExp("^" + type + "$");
      if (type.test(this.type)) return this;
      return this.parent.findNearest(type);
    };

    Node.prototype.unparenthesizedParent = function unparenthesizedParent() {
      var node = this.parent;
      while (node && node.type === 'ParenthesizedExpression') {
        node = node.parent;
      }
      return node;
    };

    Node.prototype.unparenthesize = function unparenthesize() {
      var node = this;
      while (node.type === 'ParenthesizedExpression') {
        node = node.expression;
      }
      return node;
    };

    Node.prototype.findScope = function findScope(functionScope) {
      return this.parent.findScope(functionScope);
    };

    Node.prototype.getIndentation = function getIndentation() {
      return this.parent.getIndentation();
    };

    Node.prototype.initialise = function initialise(transforms) {
      for (var i = 0, list = this.keys; i < list.length; i += 1) {
        var key = list[i];

        var value = this[key];

        if (Array.isArray(value)) {
          value.forEach(function (node) {
            return node && node.initialise(transforms);
          });
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value.initialise(transforms);
        }
      }
    };

    Node.prototype.toJSON = function toJSON$1() {
      return toJSON(this);
    };

    Node.prototype.toString = function toString() {
      return this.program.magicString.original.slice(this.start, this.end);
    };

    Node.prototype.transpile = function transpile(code, transforms) {
      for (var i = 0, list = this.keys; i < list.length; i += 1) {
        var key = list[i];

        var value = this[key];

        if (Array.isArray(value)) {
          value.forEach(function (node) {
            return node && node.transpile(code, transforms);
          });
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value.transpile(code, transforms);
        }
      }
    };

    function isArguments(node) {
      return node.type === 'Identifier' && node.name === 'arguments';
    }

    function spread(code, elements, start, argumentsArrayAlias, isNew) {
      var i = elements.length;
      var firstSpreadIndex = -1;

      while (i--) {
        var element$1 = elements[i];
        if (element$1 && element$1.type === 'SpreadElement') {
          if (isArguments(element$1.argument)) {
            code.overwrite(element$1.argument.start, element$1.argument.end, argumentsArrayAlias);
          }

          firstSpreadIndex = i;
        }
      }

      if (firstSpreadIndex === -1) return false; // false indicates no spread elements

      if (isNew) {
        for (i = 0; i < elements.length; i += 1) {
          var element$2 = elements[i];
          if (element$2.type === 'SpreadElement') {
            code.remove(element$2.start, element$2.argument.start);
          } else {
            code.insertRight(element$2.start, '[');
            code.insertRight(element$2.end, ']');
          }
        }

        return true; // true indicates some spread elements
      }

      var element = elements[firstSpreadIndex];
      var previousElement = elements[firstSpreadIndex - 1];

      if (!previousElement) {
        code.remove(start, element.start);
        code.overwrite(element.end, elements[1].start, '.concat( ');
      } else {
        code.overwrite(previousElement.end, element.start, ' ].concat( ');
      }

      for (i = firstSpreadIndex; i < elements.length; i += 1) {
        element = elements[i];

        if (element) {
          if (element.type === 'SpreadElement') {
            code.remove(element.start, element.argument.start);
          } else {
            code.insertLeft(element.start, '[');
            code.insertLeft(element.end, ']');
          }
        }
      }

      return true; // true indicates some spread elements
    }

    var ArrayExpression = function (Node) {
      function ArrayExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ArrayExpression.__proto__ = Node;
      ArrayExpression.prototype = Object.create(Node && Node.prototype);
      ArrayExpression.prototype.constructor = ArrayExpression;

      ArrayExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.elements.length) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.elements.length;
          while (i--) {
            var element = this$1.elements[i];
            if (element && element.type === 'SpreadElement' && isArguments(element.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      ArrayExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest) {
          // erase trailing comma after last array element if not an array hole
          if (this.elements.length) {
            var lastElement = this.elements[this.elements.length - 1];
            if (lastElement && /\s*,/.test(code.original.slice(lastElement.end, this.end))) {
              code.overwrite(lastElement.end, this.end - 1, ' ');
            }
          }

          if (this.elements.length === 1) {
            var element = this.elements[0];

            if (element && element.type === 'SpreadElement') {
              // special case – [ ...arguments ]
              if (isArguments(element.argument)) {
                code.overwrite(this.start, this.end, "[].concat( " + this.argumentsArrayAlias + " )"); // TODO if this is the only use of argsArray, don't bother concating
              } else {
                code.overwrite(this.start, element.argument.start, '[].concat( ');
                code.overwrite(element.end, this.end, ' )');
              }
            }
          } else {
            var hasSpreadElements = spread(code, this.elements, this.start, this.argumentsArrayAlias);

            if (hasSpreadElements) {
              code.overwrite(this.end - 1, this.end, ')');
            }
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ArrayExpression;
    }(Node);

    var ArrowFunctionExpression = function (Node) {
      function ArrowFunctionExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ArrowFunctionExpression.__proto__ = Node;
      ArrowFunctionExpression.prototype = Object.create(Node && Node.prototype);
      ArrowFunctionExpression.prototype.constructor = ArrowFunctionExpression;

      ArrowFunctionExpression.prototype.initialise = function initialise(transforms) {
        this.body.createScope();
        Node.prototype.initialise.call(this, transforms);
      };

      ArrowFunctionExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.arrow) {
          // remove arrow
          var charIndex = this.body.start;
          while (code.original[charIndex] !== '=') {
            charIndex -= 1;
          }
          code.remove(charIndex, this.body.start);

          // wrap naked parameter
          if (this.params.length === 1 && this.start === this.params[0].start) {
            code.insertRight(this.params[0].start, '(');
            code.insertLeft(this.params[0].end, ')');
          }

          // add function
          if (this.parent && this.parent.type === 'ExpressionStatement') {
            // standalone expression statement
            code.insertRight(this.start, '(function');
            code.insertRight(this.end, ')');
          } else {
            code.insertRight(this.start, 'function ');
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ArrowFunctionExpression;
    }(Node);

    function locate(source, index) {
      var lines = source.split('\n');
      var len = lines.length;

      var lineStart = 0;
      var i;

      for (i = 0; i < len; i += 1) {
        var line = lines[i];
        var lineEnd = lineStart + line.length + 1; // +1 for newline

        if (lineEnd > index) {
          return { line: i + 1, column: index - lineStart, char: i };
        }

        lineStart = lineEnd;
      }

      throw new Error('Could not determine location of character');
    }

    function pad(num, len) {
      var result = String(num);
      return result + repeat(' ', len - result.length);
    }

    function repeat(str, times) {
      var result = '';
      while (times--) {
        result += str;
      }return result;
    }

    function getSnippet(source, loc, length) {
      if (length === void 0) length = 1;

      var first = Math.max(loc.line - 5, 0);
      var last = loc.line;

      var numDigits = String(last).length;

      var lines = source.split('\n').slice(first, last);

      var lastLine = lines[lines.length - 1];
      var offset = lastLine.slice(0, loc.column).replace(/\t/g, '  ').length;

      var snippet = lines.map(function (line, i) {
        return pad(i + first + 1, numDigits) + " : " + line.replace(/\t/g, '  ');
      }).join('\n');

      snippet += '\n' + repeat(' ', numDigits + 3 + offset) + repeat('^', length);

      return snippet;
    }

    var CompileError = function (Error) {
      function CompileError(node, message) {
        Error.call(this);

        var source = node.program.magicString.original;
        var loc = locate(source, node.start);

        this.name = 'CompileError';
        this.message = message + " (" + loc.line + ":" + loc.column + ")";

        this.stack = new Error().stack.replace(new RegExp(".+new " + this.name + ".+\\n", 'm'), '');

        this.loc = loc;
        this.snippet = getSnippet(source, loc, node.end - node.start);
      }

      if (Error) CompileError.__proto__ = Error;
      CompileError.prototype = Object.create(Error && Error.prototype);
      CompileError.prototype.constructor = CompileError;

      CompileError.prototype.toString = function toString() {
        return this.name + ": " + this.message + "\n" + this.snippet;
      };

      return CompileError;
    }(Error);

    var AssignmentExpression = function (Node) {
      function AssignmentExpression() {
        Node.apply(this, arguments);
      }

      if (Node) AssignmentExpression.__proto__ = Node;
      AssignmentExpression.prototype = Object.create(Node && Node.prototype);
      AssignmentExpression.prototype.constructor = AssignmentExpression;

      AssignmentExpression.prototype.initialise = function initialise(transforms) {
        if (this.left.type === 'Identifier') {
          var declaration = this.findScope(false).findDeclaration(this.left.name);
          if (declaration && declaration.kind === 'const') {
            throw new CompileError(this.left, this.left.name + " is read-only");
          }

          // special case – https://gitlab.com/Rich-Harris/buble/issues/11
          var statement = declaration && declaration.node.ancestor(3);
          if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
            statement.reassigned[this.left.name] = true;
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      AssignmentExpression.prototype.transpile = function transpile(code, transforms) {
        if (this.operator === '**=' && transforms.exponentiation) {
          this.transpileExponentiation(code, transforms);
        } else if (/Pattern/.test(this.left.type) && transforms.destructuring) {
          this.transpileDestructuring(code, transforms);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      AssignmentExpression.prototype.transpileDestructuring = function transpileDestructuring(code) {
        var scope = this.findScope(true);
        var assign = scope.createIdentifier('assign');
        var temporaries = [assign];

        var start = this.start;

        // We need to pick out some elements from the original code,
        // interleaved with generated code. These helpers are used to
        // easily do that while keeping the order of the output
        // predictable.
        var text = '';
        function use(node) {
          code.insertRight(node.start, text);
          code.move(node.start, node.end, start);
          text = '';
        }
        function write(string) {
          text += string;
        }

        write("(" + assign + " = ");
        use(this.right);

        // Walk `pattern`, generating code that assigns the value in
        // `ref` to it. When `mayDuplicate` is false, the function
        // must take care to only output `ref` once.
        function destructure(pattern, ref, mayDuplicate) {
          if (pattern.type === 'Identifier' || pattern.type === 'MemberExpression') {
            write(', ');
            use(pattern);
            write(" = " + ref);
          } else if (pattern.type === 'AssignmentPattern') {
            if (pattern.left.type === 'Identifier') {
              var target = pattern.left.name;
              var source = ref;
              if (!mayDuplicate) {
                write(", " + target + " = " + ref);
                source = target;
              }
              write(", " + target + " = " + source + " === void 0 ? ");
              use(pattern.right);
              write(" : " + source);
            } else {
              var target$1 = scope.createIdentifier('temp');
              var source$1 = ref;
              temporaries.push(target$1);
              if (!mayDuplicate) {
                write(", " + target$1 + " = " + ref);
                source$1 = target$1;
              }
              write(", " + target$1 + " = " + source$1 + " === void 0 ? ");
              use(pattern.right);
              write(" : " + source$1);
              destructure(pattern.left, target$1, true);
            }
          } else if (pattern.type === 'ArrayPattern') {
            var elements = pattern.elements;
            if (elements.length === 1) {
              destructure(elements[0], ref + "[0]", false);
            } else {
              if (!mayDuplicate) {
                var temp = scope.createIdentifier('array');
                temporaries.push(temp);
                write(", " + temp + " = " + ref);
                ref = temp;
              }
              elements.forEach(function (element, i) {
                if (element) {
                  if (element.type === 'RestElement') {
                    destructure(element.argument, ref + ".slice(" + i + ")", false);
                  } else {
                    destructure(element, ref + "[" + i + "]", false);
                  }
                }
              });
            }
          } else if (pattern.type === 'ObjectPattern') {
            var props = pattern.properties;
            if (props.length == 1) {
              var prop = props[0];
              var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
              destructure(prop.value, value, false);
            } else {
              if (!mayDuplicate) {
                var temp$1 = scope.createIdentifier('obj');
                temporaries.push(temp$1);
                write(", " + temp$1 + " = " + ref);
                ref = temp$1;
              }
              props.forEach(function (prop) {
                var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
                destructure(prop.value, value, false);
              });
            }
          } else {
            throw new Error("Unexpected node type in destructuring assignment (" + pattern.type + ")");
          }
        }
        destructure(this.left, assign, true);

        if (this.unparenthesizedParent().type === 'ExpressionStatement') {
          // no rvalue needed for expression statement
          code.insertRight(start, text + ")");
        } else {
          // destructuring is part of an expression - need an rvalue
          code.insertRight(start, text + ", " + assign + ")");
        }

        code.remove(start, this.right.start);

        var statement = this.findNearest(/(?:Statement|Declaration)$/);
        code.insertLeft(statement.start, "var " + temporaries.join(', ') + ";\n" + statement.getIndentation());
      };

      AssignmentExpression.prototype.transpileExponentiation = function transpileExponentiation(code) {
        var scope = this.findScope(false);
        var getAlias = function getAlias(name) {
          var declaration = scope.findDeclaration(name);
          return declaration ? declaration.name : name;
        };

        // first, the easy part – `**=` -> `=`
        var charIndex = this.left.end;
        while (code.original[charIndex] !== '*') {
          charIndex += 1;
        }code.remove(charIndex, charIndex + 2);

        // how we do the next part depends on a number of factors – whether
        // this is a top-level statement, and whether we're updating a
        // simple or complex reference
        var base;

        var left = this.left.unparenthesize();

        if (left.type === 'Identifier') {
          base = getAlias(left.name);
        } else if (left.type === 'MemberExpression') {
          var object;
          var needsObjectVar = false;
          var property;
          var needsPropertyVar = false;

          var statement = this.findNearest(/(?:Statement|Declaration)$/);
          var i0 = statement.getIndentation();

          if (left.property.type === 'Identifier') {
            property = left.computed ? getAlias(left.property.name) : left.property.name;
          } else {
            property = scope.createIdentifier('property');
            needsPropertyVar = true;
          }

          if (left.object.type === 'Identifier') {
            object = getAlias(left.object.name);
          } else {
            object = scope.createIdentifier('object');
            needsObjectVar = true;
          }

          if (left.start === statement.start) {
            if (needsObjectVar && needsPropertyVar) {
              code.insertRight(statement.start, "var " + object + " = ");
              code.overwrite(left.object.end, left.property.start, ";\n" + i0 + "var " + property + " = ");
              code.overwrite(left.property.end, left.end, ";\n" + i0 + object + "[" + property + "]");
            } else if (needsObjectVar) {
              code.insertRight(statement.start, "var " + object + " = ");
              code.insertLeft(left.object.end, ";\n" + i0);
              code.insertLeft(left.object.end, object);
            } else if (needsPropertyVar) {
              code.insertRight(left.property.start, "var " + property + " = ");
              code.insertLeft(left.property.end, ";\n" + i0);
              code.move(left.property.start, left.property.end, this.start);

              code.insertLeft(left.object.end, "[" + property + "]");
              code.remove(left.object.end, left.property.start);
              code.remove(left.property.end, left.end);
            }
          } else {
            var declarators = [];
            if (needsObjectVar) declarators.push(object);
            if (needsPropertyVar) declarators.push(property);

            if (declarators.length) {
              code.insertRight(statement.start, "var " + declarators.join(', ') + ";\n" + i0);
            }

            if (needsObjectVar && needsPropertyVar) {
              code.insertRight(left.start, "( " + object + " = ");
              code.overwrite(left.object.end, left.property.start, ", " + property + " = ");
              code.overwrite(left.property.end, left.end, ", " + object + "[" + property + "]");
            } else if (needsObjectVar) {
              code.insertRight(left.start, "( " + object + " = ");
              code.insertLeft(left.object.end, ", " + object);
            } else if (needsPropertyVar) {
              code.insertRight(left.property.start, "( " + property + " = ");
              code.insertLeft(left.property.end, ", ");
              code.move(left.property.start, left.property.end, left.start);

              code.overwrite(left.object.end, left.property.start, "[" + property + "]");
              code.remove(left.property.end, left.end);
            }

            if (needsPropertyVar) {
              code.insertLeft(this.end, " )");
            }
          }

          base = object + (left.computed || needsPropertyVar ? "[" + property + "]" : "." + property);
        }

        code.insertRight(this.right.start, "Math.pow( " + base + ", ");
        code.insertLeft(this.right.end, " )");
      };

      return AssignmentExpression;
    }(Node);

    var BinaryExpression = function (Node) {
      function BinaryExpression() {
        Node.apply(this, arguments);
      }

      if (Node) BinaryExpression.__proto__ = Node;
      BinaryExpression.prototype = Object.create(Node && Node.prototype);
      BinaryExpression.prototype.constructor = BinaryExpression;

      BinaryExpression.prototype.transpile = function transpile(code, transforms) {
        if (this.operator === '**' && transforms.exponentiation) {
          code.insertRight(this.start, "Math.pow( ");
          code.overwrite(this.left.end, this.right.start, ", ");
          code.insertLeft(this.end, " )");
        }
        Node.prototype.transpile.call(this, code, transforms);
      };

      return BinaryExpression;
    }(Node);

    var loopStatement = /(?:For(?:In|Of)?|While)Statement/;

    var BreakStatement = function (Node) {
      function BreakStatement() {
        Node.apply(this, arguments);
      }

      if (Node) BreakStatement.__proto__ = Node;
      BreakStatement.prototype = Object.create(Node && Node.prototype);
      BreakStatement.prototype.constructor = BreakStatement;

      BreakStatement.prototype.initialise = function initialise() {
        var loop = this.findNearest(loopStatement);
        var switchCase = this.findNearest('SwitchCase');

        if (loop && (!switchCase || loop.depth > switchCase.depth)) {
          loop.canBreak = true;
          this.loop = loop;
        }
      };

      BreakStatement.prototype.transpile = function transpile(code) {
        if (this.loop && this.loop.shouldRewriteAsFunction) {
          if (this.label) throw new CompileError(this, 'Labels are not currently supported in a loop with locally-scoped variables');
          code.overwrite(this.start, this.start + 5, "return 'break'");
        }
      };

      return BreakStatement;
    }(Node);

    var CallExpression = function (Node) {
      function CallExpression() {
        Node.apply(this, arguments);
      }

      if (Node) CallExpression.__proto__ = Node;
      CallExpression.prototype = Object.create(Node && Node.prototype);
      CallExpression.prototype.constructor = CallExpression;

      CallExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.arguments.length > 1) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.arguments.length;
          while (i--) {
            var arg = this$1.arguments[i];
            if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      CallExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest && this.arguments.length) {
          var hasSpreadElements = false;
          var context;

          var firstArgument = this.arguments[0];

          if (this.arguments.length === 1) {
            if (firstArgument.type === 'SpreadElement') {
              code.remove(firstArgument.start, firstArgument.argument.start);
              hasSpreadElements = true;
            }
          } else {
            hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias);
          }

          if (hasSpreadElements) {

            // we need to handle super() and super.method() differently
            // due to its instance
            var _super = null;
            if (this.callee.type === 'Super') {
              _super = this.callee;
            } else if (this.callee.type === 'MemberExpression' && this.callee.object.type === 'Super') {
              _super = this.callee.object;
            }

            if (!_super && this.callee.type === 'MemberExpression') {
              if (this.callee.object.type === 'Identifier') {
                context = this.callee.object.name;
              } else {
                context = this.findScope(true).createIdentifier('ref');
                var callExpression = this.callee.object;
                var enclosure = callExpression.findNearest(/Function/);
                var block = enclosure ? enclosure.body.body : callExpression.findNearest(/^Program$/).body;
                var lastStatementInBlock = block[block.length - 1];
                var i0 = lastStatementInBlock.getIndentation();
                code.insertRight(callExpression.start, "(" + context + " = ");
                code.insertLeft(callExpression.end, ")");
                code.insertLeft(lastStatementInBlock.end, "\n" + i0 + "var " + context + ";");
              }
            } else {
              context = 'void 0';
            }

            code.insertLeft(this.callee.end, '.apply');

            if (_super) {
              _super.noCall = true; // bit hacky...

              if (this.arguments.length > 1) {
                if (firstArgument.type !== 'SpreadElement') {
                  code.insertRight(firstArgument.start, "[ ");
                }

                code.insertLeft(this.arguments[this.arguments.length - 1].end, ' )');
              }
            } else if (this.arguments.length === 1) {
              code.insertRight(firstArgument.start, context + ", ");
            } else {
              if (firstArgument.type === 'SpreadElement') {
                code.insertLeft(firstArgument.start, context + ", ");
              } else {
                code.insertLeft(firstArgument.start, context + ", [ ");
              }

              code.insertLeft(this.arguments[this.arguments.length - 1].end, ' )');
            }
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return CallExpression;
    }(Node);

    function findIndex(array, fn) {
      for (var i = 0; i < array.length; i += 1) {
        if (fn(array[i], i)) return i;
      }

      return -1;
    }

    var reserved = Object.create(null);
    'do if in for let new try var case else enum eval null this true void with await break catch class const false super throw while yield delete export import public return static switch typeof default extends finally package private continue debugger function arguments interface protected implements instanceof'.split(' ').forEach(function (word) {
      return reserved[word] = true;
    });

    // TODO this code is pretty wild, tidy it up
    var ClassBody = function (Node) {
      function ClassBody() {
        Node.apply(this, arguments);
      }

      if (Node) ClassBody.__proto__ = Node;
      ClassBody.prototype = Object.create(Node && Node.prototype);
      ClassBody.prototype.constructor = ClassBody;

      ClassBody.prototype.transpile = function transpile(code, transforms, inFunctionExpression, superName) {
        var this$1 = this;

        if (transforms.classes) {
          var name = this.parent.name;

          var indentStr = code.getIndentString();
          var i0 = this.getIndentation() + (inFunctionExpression ? indentStr : '');
          var i1 = i0 + indentStr;

          var constructorIndex = findIndex(this.body, function (node) {
            return node.kind === 'constructor';
          });
          var constructor = this.body[constructorIndex];

          var introBlock = '';
          var outroBlock = '';

          if (this.body.length) {
            code.remove(this.start, this.body[0].start);
            code.remove(this.body[this.body.length - 1].end, this.end);
          } else {
            code.remove(this.start, this.end);
          }

          if (constructor) {
            constructor.value.body.isConstructorBody = true;

            var previousMethod = this.body[constructorIndex - 1];
            var nextMethod = this.body[constructorIndex + 1];

            // ensure constructor is first
            if (constructorIndex > 0) {
              code.remove(previousMethod.end, constructor.start);
              code.move(constructor.start, nextMethod ? nextMethod.start : this.end - 1, this.body[0].start);
            }

            if (!inFunctionExpression) code.insertLeft(constructor.end, ';');
          }

          var namedFunctions = this.program.options.namedFunctionExpressions !== false;
          var namedConstructor = namedFunctions || this.parent.superClass || this.parent.type !== 'ClassDeclaration';
          if (this.parent.superClass) {
            var inheritanceBlock = "if ( " + superName + " ) " + name + ".__proto__ = " + superName + ";\n" + i0 + name + ".prototype = Object.create( " + superName + " && " + superName + ".prototype );\n" + i0 + name + ".prototype.constructor = " + name + ";";

            if (constructor) {
              introBlock += "\n\n" + i0 + inheritanceBlock;
            } else {
              var fn = "function " + name + " () {" + (superName ? "\n" + i1 + superName + ".apply(this, arguments);\n" + i0 + "}" : "}") + (inFunctionExpression ? '' : ';') + (this.body.length ? "\n\n" + i0 : '');

              inheritanceBlock = fn + inheritanceBlock;
              introBlock += inheritanceBlock + "\n\n" + i0;
            }
          } else if (!constructor) {
            var fn$1 = 'function ' + (namedConstructor ? name + ' ' : '') + '() {}';
            if (this.parent.type === 'ClassDeclaration') fn$1 += ';';
            if (this.body.length) fn$1 += "\n\n" + i0;

            introBlock += fn$1;
          }

          var scope = this.findScope(false);

          var prototypeGettersAndSetters = [];
          var staticGettersAndSetters = [];
          var prototypeAccessors;
          var staticAccessors;

          this.body.forEach(function (method, i) {
            if (method.kind === 'constructor') {
              var constructorName = namedConstructor ? ' ' + name : '';
              code.overwrite(method.key.start, method.key.end, "function" + constructorName);
              return;
            }

            if (method.static) {
              var len = code.original[method.start + 6] == ' ' ? 7 : 6;
              code.remove(method.start, method.start + len);
            }

            var isAccessor = method.kind !== 'method';
            var lhs;

            var methodName = method.key.name;
            if (reserved[methodName] || method.value.body.scope.references[methodName]) {
              methodName = scope.createIdentifier(methodName);
            }

            // when method name is a string or a number let's pretend it's a computed method

            var fake_computed = false;
            if (!method.computed && method.key.type === 'Literal') {
              fake_computed = true;
              method.computed = true;
            }

            if (isAccessor) {
              if (method.computed) {
                throw new Error('Computed accessor properties are not currently supported');
              }

              code.remove(method.start, method.key.start);

              if (method.static) {
                if (!~staticGettersAndSetters.indexOf(method.key.name)) staticGettersAndSetters.push(method.key.name);
                if (!staticAccessors) staticAccessors = scope.createIdentifier('staticAccessors');

                lhs = "" + staticAccessors;
              } else {
                if (!~prototypeGettersAndSetters.indexOf(method.key.name)) prototypeGettersAndSetters.push(method.key.name);
                if (!prototypeAccessors) prototypeAccessors = scope.createIdentifier('prototypeAccessors');

                lhs = "" + prototypeAccessors;
              }
            } else {
              lhs = method.static ? "" + name : name + ".prototype";
            }

            if (!method.computed) lhs += '.';

            var insertNewlines = constructorIndex > 0 && i === constructorIndex + 1 || i === 0 && constructorIndex === this$1.body.length - 1;

            if (insertNewlines) lhs = "\n\n" + i0 + lhs;

            var c = method.key.end;
            if (method.computed) {
              if (fake_computed) {
                code.insertRight(method.key.start, '[');
                code.insertLeft(method.key.end, ']');
              } else {
                while (code.original[c] !== ']') {
                  c += 1;
                }c += 1;
              }
            }

            code.insertRight(method.start, lhs);

            var funcName = method.computed || isAccessor || !namedFunctions ? '' : methodName + " ";
            var rhs = (isAccessor ? "." + method.kind : '') + " = function" + (method.value.generator ? '* ' : ' ') + funcName;
            code.remove(c, method.value.start);
            code.insertRight(method.value.start, rhs);
            code.insertLeft(method.end, ';');

            if (method.value.generator) code.remove(method.start, method.key.start);
          });

          if (prototypeGettersAndSetters.length || staticGettersAndSetters.length) {
            var intro = [];
            var outro = [];

            if (prototypeGettersAndSetters.length) {
              intro.push("var " + prototypeAccessors + " = { " + prototypeGettersAndSetters.map(function (name) {
                return name + ": {}";
              }).join(',') + " };");
              outro.push("Object.defineProperties( " + name + ".prototype, " + prototypeAccessors + " );");
            }

            if (staticGettersAndSetters.length) {
              intro.push("var " + staticAccessors + " = { " + staticGettersAndSetters.map(function (name) {
                return name + ": {}";
              }).join(',') + " };");
              outro.push("Object.defineProperties( " + name + ", " + staticAccessors + " );");
            }

            if (constructor) introBlock += "\n\n" + i0;
            introBlock += intro.join("\n" + i0);
            if (!constructor) introBlock += "\n\n" + i0;

            outroBlock += "\n\n" + i0 + outro.join("\n" + i0);
          }

          if (constructor) {
            code.insertLeft(constructor.end, introBlock);
          } else {
            code.insertRight(this.start, introBlock);
          }

          code.insertLeft(this.end, outroBlock);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ClassBody;
    }(Node);

    // TODO this function is slightly flawed – it works on the original string,
    // not its current edited state.
    // That's not a problem for the way that it's currently used, but it could
    // be in future...
    function deindent(node, code) {
      var start = node.start;
      var end = node.end;

      var indentStr = code.getIndentString();
      var indentStrLen = indentStr.length;
      var indentStart = start - indentStrLen;

      if (!node.program.indentExclusions[indentStart] && code.original.slice(indentStart, start) === indentStr) {
        code.remove(indentStart, start);
      }

      var pattern = new RegExp(indentStr + '\\S', 'g');
      var slice = code.original.slice(start, end);
      var match;

      while (match = pattern.exec(slice)) {
        var removeStart = start + match.index;
        if (!node.program.indentExclusions[removeStart]) {
          code.remove(removeStart, removeStart + indentStrLen);
        }
      }
    }

    var ClassDeclaration = function (Node) {
      function ClassDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ClassDeclaration.__proto__ = Node;
      ClassDeclaration.prototype = Object.create(Node && Node.prototype);
      ClassDeclaration.prototype.constructor = ClassDeclaration;

      ClassDeclaration.prototype.initialise = function initialise(transforms) {
        this.name = this.id.name;
        this.findScope(true).addDeclaration(this.id, 'class');

        Node.prototype.initialise.call(this, transforms);
      };

      ClassDeclaration.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          if (!this.superClass) deindent(this.body, code);

          var superName = this.superClass && (this.superClass.name || 'superclass');

          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          // if this is an export default statement, we have to move the export to
          // after the declaration, because `export default var Foo = ...` is illegal
          var syntheticDefaultExport = this.parent.type === 'ExportDefaultDeclaration' ? "\n\n" + i0 + "export default " + this.id.name + ";" : '';

          if (syntheticDefaultExport) code.remove(this.parent.start, this.start);

          code.overwrite(this.start, this.id.start, 'var ');

          if (this.superClass) {
            if (this.superClass.end === this.body.start) {
              code.remove(this.id.end, this.superClass.start);
              code.insertLeft(this.id.end, " = (function (" + superName + ") {\n" + i1);
            } else {
              code.overwrite(this.id.end, this.superClass.start, ' = ');
              code.overwrite(this.superClass.end, this.body.start, "(function (" + superName + ") {\n" + i1);
            }
          } else {
            if (this.id.end === this.body.start) {
              code.insertLeft(this.id.end, ' = ');
            } else {
              code.overwrite(this.id.end, this.body.start, ' = ');
            }
          }

          this.body.transpile(code, transforms, !!this.superClass, superName);

          if (this.superClass) {
            code.insertLeft(this.end, "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}(");
            code.move(this.superClass.start, this.superClass.end, this.end);
            code.insertRight(this.end, "));" + syntheticDefaultExport);
          } else if (syntheticDefaultExport) {
            code.insertRight(this.end, syntheticDefaultExport);
          }
        } else {
          this.body.transpile(code, transforms, false, null);
        }
      };

      return ClassDeclaration;
    }(Node);

    var ClassExpression = function (Node) {
      function ClassExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ClassExpression.__proto__ = Node;
      ClassExpression.prototype = Object.create(Node && Node.prototype);
      ClassExpression.prototype.constructor = ClassExpression;

      ClassExpression.prototype.initialise = function initialise(transforms) {
        this.name = this.id ? this.id.name : this.parent.type === 'VariableDeclarator' ? this.parent.id.name : this.parent.type === 'AssignmentExpression' ? this.parent.left.name : this.findScope(true).createIdentifier('anonymous');

        Node.prototype.initialise.call(this, transforms);
      };

      ClassExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          var superName = this.superClass && (this.superClass.name || 'superclass');

          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          if (this.superClass) {
            code.remove(this.start, this.superClass.start);
            code.remove(this.superClass.end, this.body.start);
            code.insertLeft(this.start, "(function (" + superName + ") {\n" + i1);
          } else {
            code.overwrite(this.start, this.body.start, "(function () {\n" + i1);
          }

          this.body.transpile(code, transforms, true, superName);

          var outro = "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}(";

          if (this.superClass) {
            code.insertLeft(this.end, outro);
            code.move(this.superClass.start, this.superClass.end, this.end);
            code.insertRight(this.end, '))');
          } else {
            code.insertLeft(this.end, "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}())");
          }
        } else {
          this.body.transpile(code, transforms, false);
        }
      };

      return ClassExpression;
    }(Node);

    var ContinueStatement = function (Node) {
      function ContinueStatement() {
        Node.apply(this, arguments);
      }

      if (Node) ContinueStatement.__proto__ = Node;
      ContinueStatement.prototype = Object.create(Node && Node.prototype);
      ContinueStatement.prototype.constructor = ContinueStatement;

      ContinueStatement.prototype.transpile = function transpile(code) {
        var loop = this.findNearest(loopStatement);
        if (loop.shouldRewriteAsFunction) {
          if (this.label) throw new CompileError(this, 'Labels are not currently supported in a loop with locally-scoped variables');
          code.overwrite(this.start, this.start + 8, 'return');
        }
      };

      return ContinueStatement;
    }(Node);

    var ExportDefaultDeclaration = function (Node) {
      function ExportDefaultDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ExportDefaultDeclaration.__proto__ = Node;
      ExportDefaultDeclaration.prototype = Object.create(Node && Node.prototype);
      ExportDefaultDeclaration.prototype.constructor = ExportDefaultDeclaration;

      ExportDefaultDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleExport) throw new CompileError(this, 'export is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ExportDefaultDeclaration;
    }(Node);

    var ExportNamedDeclaration = function (Node) {
      function ExportNamedDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ExportNamedDeclaration.__proto__ = Node;
      ExportNamedDeclaration.prototype = Object.create(Node && Node.prototype);
      ExportNamedDeclaration.prototype.constructor = ExportNamedDeclaration;

      ExportNamedDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleExport) throw new CompileError(this, 'export is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ExportNamedDeclaration;
    }(Node);

    var LoopStatement = function (Node) {
      function LoopStatement() {
        Node.apply(this, arguments);
      }

      if (Node) LoopStatement.__proto__ = Node;
      LoopStatement.prototype = Object.create(Node && Node.prototype);
      LoopStatement.prototype.constructor = LoopStatement;

      LoopStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      LoopStatement.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        this.body.createScope();
        this.createdScope = true;

        // this is populated as and when reassignments occur
        this.reassigned = Object.create(null);
        this.aliases = Object.create(null);

        Node.prototype.initialise.call(this, transforms);

        if (transforms.letConst) {
          // see if any block-scoped declarations are referenced
          // inside function expressions
          var names = Object.keys(this.body.scope.declarations);

          var i = names.length;
          while (i--) {
            var name = names[i];
            var declaration = this$1.body.scope.declarations[name];

            var j = declaration.instances.length;
            while (j--) {
              var instance = declaration.instances[j];
              var nearestFunctionExpression = instance.findNearest(/Function/);

              if (nearestFunctionExpression && nearestFunctionExpression.depth > this$1.depth) {
                this$1.shouldRewriteAsFunction = true;
                break;
              }
            }

            if (this$1.shouldRewriteAsFunction) break;
          }
        }
      };

      LoopStatement.prototype.transpile = function transpile(code, transforms) {
        var needsBlock = this.type != 'ForOfStatement' && (this.body.type !== 'BlockStatement' || this.body.type === 'BlockStatement' && this.body.synthetic);

        if (this.shouldRewriteAsFunction) {
          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          var argString = this.args ? " " + this.args.join(', ') + " " : '';
          var paramString = this.params ? " " + this.params.join(', ') + " " : '';

          var functionScope = this.findScope(true);
          var loop = functionScope.createIdentifier('loop');

          var before = "var " + loop + " = function (" + paramString + ") " + (this.body.synthetic ? "{\n" + i0 + code.getIndentString() : '');
          var after = (this.body.synthetic ? "\n" + i0 + "}" : '') + ";\n\n" + i0;

          code.insertRight(this.body.start, before);
          code.insertLeft(this.body.end, after);
          code.move(this.start, this.body.start, this.body.end);

          if (this.canBreak || this.canReturn) {
            var returned = functionScope.createIdentifier('returned');

            var insert = "{\n" + i1 + "var " + returned + " = " + loop + "(" + argString + ");\n";
            if (this.canBreak) insert += "\n" + i1 + "if ( " + returned + " === 'break' ) break;";
            if (this.canReturn) insert += "\n" + i1 + "if ( " + returned + " ) return " + returned + ".v;";
            insert += "\n" + i0 + "}";

            code.insertRight(this.body.end, insert);
          } else {
            var callExpression = loop + "(" + argString + ");";

            if (this.type === 'DoWhileStatement') {
              code.overwrite(this.start, this.body.start, "do {\n" + i1 + callExpression + "\n" + i0 + "}");
            } else {
              code.insertRight(this.body.end, callExpression);
            }
          }
        } else if (needsBlock) {
          code.insertLeft(this.body.start, '{ ');
          code.insertRight(this.body.end, ' }');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return LoopStatement;
    }(Node);

    function extractNames(node) {
      var names = [];
      extractors[node.type](names, node);
      return names;
    }

    var extractors = {
      Identifier: function Identifier(names, node) {
        names.push(node);
      },

      ObjectPattern: function ObjectPattern(names, node) {
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];

          extractors[prop.value.type](names, prop.value);
        }
      },

      ArrayPattern: function ArrayPattern(names, node) {
        for (var i = 0, list = node.elements; i < list.length; i += 1) {
          var element = list[i];

          if (element) extractors[element.type](names, element);
        }
      },

      RestElement: function RestElement(names, node) {
        extractors[node.argument.type](names, node.argument);
      },

      AssignmentPattern: function AssignmentPattern(names, node) {
        extractors[node.left.type](names, node.left);
      }
    };

    var ForStatement = function (LoopStatement) {
      function ForStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForStatement.__proto__ = LoopStatement;
      ForStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForStatement.prototype.constructor = ForStatement;

      ForStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      ForStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var i1 = this.getIndentation() + code.getIndentString();

        if (this.shouldRewriteAsFunction) {
          // which variables are declared in the init statement?
          var names = this.init.type === 'VariableDeclaration' ? [].concat.apply([], this.init.declarations.map(function (declarator) {
            return extractNames(declarator.id);
          })) : [];

          var aliases = this.aliases;

          this.args = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].outer : name;
          });
          this.params = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].inner : name;
          });

          var updates = Object.keys(this.reassigned).map(function (name) {
            return aliases[name].outer + " = " + aliases[name].inner + ";";
          });

          if (updates.length) {
            if (this.body.synthetic) {
              code.insertLeft(this.body.body[0].end, "; " + updates.join(" "));
            } else {
              var lastStatement = this.body.body[this.body.body.length - 1];
              code.insertLeft(lastStatement.end, "\n\n" + i1 + updates.join("\n" + i1));
            }
          }
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForStatement;
    }(LoopStatement);

    var ForInStatement = function (LoopStatement) {
      function ForInStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForInStatement.__proto__ = LoopStatement;
      ForInStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForInStatement.prototype.constructor = ForInStatement;

      ForInStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      ForInStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        if (this.shouldRewriteAsFunction) {
          // which variables are declared in the init statement?
          var names = this.left.type === 'VariableDeclaration' ? [].concat.apply([], this.left.declarations.map(function (declarator) {
            return extractNames(declarator.id);
          })) : [];

          this.args = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].outer : name;
          });
          this.params = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].inner : name;
          });
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForInStatement;
    }(LoopStatement);

    var handlers = {
      Identifier: destructureIdentifier,
      AssignmentPattern: destructureAssignmentPattern,
      ArrayPattern: destructureArrayPattern,
      ObjectPattern: destructureObjectPattern
    };

    function destructure(code, scope, node, ref, inline, statementGenerators) {
      handlers[node.type](code, scope, node, ref, inline, statementGenerators);
    }

    function destructureIdentifier(code, scope, node, ref, inline, statementGenerators) {
      statementGenerators.push(function (start, prefix, suffix) {
        code.insertRight(node.start, inline ? prefix : prefix + "var ");
        code.insertLeft(node.end, " = " + ref + suffix);
        code.move(node.start, node.end, start);
      });
    }

    function destructureAssignmentPattern(code, scope, node, ref, inline, statementGenerators) {
      var isIdentifier = node.left.type === 'Identifier';
      var name = isIdentifier ? node.left.name : ref;

      if (!inline) {
        statementGenerators.push(function (start, prefix, suffix) {
          code.insertRight(node.left.end, prefix + "if ( " + name + " === void 0 ) " + name);
          code.move(node.left.end, node.right.end, start);
          code.insertLeft(node.right.end, suffix);
        });
      }

      if (!isIdentifier) {
        destructure(code, scope, node.left, ref, inline, statementGenerators);
      }
    }

    function destructureArrayPattern(code, scope, node, ref, inline, statementGenerators) {
      var c = node.start;

      node.elements.forEach(function (element, i) {
        if (!element) return;

        if (element.type === 'RestElement') {
          handleProperty(code, scope, c, element.argument, ref + ".slice(" + i + ")", inline, statementGenerators);
        } else {
          handleProperty(code, scope, c, element, ref + "[" + i + "]", inline, statementGenerators);
        }
        c = element.end;
      });

      code.remove(c, node.end);
    }

    function destructureObjectPattern(code, scope, node, ref, inline, statementGenerators) {
      var c = node.start;

      node.properties.forEach(function (prop) {
        var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
        handleProperty(code, scope, c, prop.value, value, inline, statementGenerators);
        c = prop.end;
      });

      code.remove(c, node.end);
    }

    function handleProperty(code, scope, c, node, value, inline, statementGenerators) {
      switch (node.type) {
        case 'Identifier':
          {
            code.remove(c, node.start);
            destructureIdentifier(code, scope, node, value, inline, statementGenerators);
            break;
          }

        case 'AssignmentPattern':
          {
            var name;

            var isIdentifier = node.left.type === 'Identifier';

            if (isIdentifier) {
              name = node.left.name;
              var declaration = scope.findDeclaration(name);
              if (declaration) name = declaration.name;
            } else {
              name = scope.createIdentifier(value);
            }

            statementGenerators.push(function (start, prefix, suffix) {
              if (inline) {
                code.insertRight(node.right.start, name + " = " + value + " === undefined ? ");
                code.insertLeft(node.right.end, " : " + value);
              } else {
                code.insertRight(node.right.start, prefix + "var " + name + " = " + value + "; if ( " + name + " === void 0 ) " + name + " = ");
                code.insertLeft(node.right.end, suffix);
              }

              code.move(node.right.start, node.right.end, start);
            });

            if (isIdentifier) {
              code.remove(c, node.right.start);
            } else {
              code.remove(c, node.left.start);
              code.remove(node.left.end, node.right.start);
              handleProperty(code, scope, c, node.left, name, inline, statementGenerators);
            }

            break;
          }

        case 'ObjectPattern':
          {
            code.remove(c, c = node.start);

            if (node.properties.length > 1) {
              var ref = scope.createIdentifier(value);

              statementGenerators.push(function (start, prefix, suffix) {
                // this feels a tiny bit hacky, but we can't do a
                // straightforward insertLeft and keep correct order...
                code.insertRight(node.start, prefix + "var " + ref + " = ");
                code.overwrite(node.start, c = node.start + 1, value);
                code.insertLeft(c, suffix);

                code.move(node.start, c, start);
              });

              node.properties.forEach(function (prop) {
                var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
                handleProperty(code, scope, c, prop.value, value, inline, statementGenerators);
                c = prop.end;
              });
            } else {
              var prop = node.properties[0];
              var value_suffix = prop.computed || prop.key.type !== 'Identifier' ? "[" + code.slice(prop.key.start, prop.key.end) + "]" : "." + prop.key.name;
              handleProperty(code, scope, c, prop.value, "" + value + value_suffix, inline, statementGenerators);
              c = prop.end;
            }

            code.remove(c, node.end);
            break;
          }

        case 'ArrayPattern':
          {
            code.remove(c, c = node.start);

            if (node.elements.filter(Boolean).length > 1) {
              var ref$1 = scope.createIdentifier(value);

              statementGenerators.push(function (start, prefix, suffix) {
                code.insertRight(node.start, prefix + "var " + ref$1 + " = ");
                code.overwrite(node.start, c = node.start + 1, value);
                code.insertLeft(c, suffix);

                code.move(node.start, c, start);
              });

              node.elements.forEach(function (element, i) {
                if (!element) return;

                if (element.type === 'RestElement') {
                  handleProperty(code, scope, c, element.argument, ref$1 + ".slice(" + i + ")", inline, statementGenerators);
                } else {
                  handleProperty(code, scope, c, element, ref$1 + "[" + i + "]", inline, statementGenerators);
                }
                c = element.end;
              });
            } else {
              var index = findIndex(node.elements, Boolean);
              var element = node.elements[index];
              if (element.type === 'RestElement') {
                handleProperty(code, scope, c, element.argument, value + ".slice(" + index + ")", inline, statementGenerators);
              } else {
                handleProperty(code, scope, c, element, value + "[" + index + "]", inline, statementGenerators);
              }
              c = element.end;
            }

            code.remove(c, node.end);
            break;
          }

        default:
          {
            throw new Error("Unexpected node type in destructuring (" + node.type + ")");
          }
      }
    }

    var ForOfStatement = function (LoopStatement) {
      function ForOfStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForOfStatement.__proto__ = LoopStatement;
      ForOfStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForOfStatement.prototype.constructor = ForOfStatement;

      ForOfStatement.prototype.initialise = function initialise(transforms) {
        if (transforms.forOf && !transforms.dangerousForOf) throw new CompileError(this, 'for...of statements are not supported. Use `transforms: { forOf: false }` to skip transformation and disable this error, or `transforms: { dangerousForOf: true }` if you know what you\'re doing');
        LoopStatement.prototype.initialise.call(this, transforms);
      };

      ForOfStatement.prototype.transpile = function transpile(code, transforms) {
        if (!transforms.dangerousForOf) {
          LoopStatement.prototype.transpile.call(this, code, transforms);
          return;
        }

        // edge case (#80)
        if (!this.body.body[0]) {
          if (this.left.type === 'VariableDeclaration' && this.left.kind === 'var') {
            code.remove(this.start, this.left.start);
            code.insertLeft(this.left.end, ';');
            code.remove(this.left.end, this.end);
          } else {
            code.remove(this.start, this.end);
          }

          return;
        }

        var scope = this.findScope(true);
        var i0 = this.getIndentation();
        var i1 = i0 + code.getIndentString();

        var key = scope.createIdentifier('i');
        var list = scope.createIdentifier('list');

        if (this.body.synthetic) {
          code.insertRight(this.left.start, "{\n" + i1);
          code.insertLeft(this.body.body[0].end, "\n" + i0 + "}");
        }

        var bodyStart = this.body.body[0].start;

        code.remove(this.left.end, this.right.start);
        code.move(this.left.start, this.left.end, bodyStart);

        code.insertRight(this.right.start, "var " + key + " = 0, " + list + " = ");
        code.insertLeft(this.right.end, "; " + key + " < " + list + ".length; " + key + " += 1");

        // destructuring. TODO non declaration destructuring
        var declarator = this.left.type === 'VariableDeclaration' && this.left.declarations[0];
        if (declarator && declarator.id.type !== 'Identifier') {
          var statementGenerators = [];
          var ref = scope.createIdentifier('ref');
          destructure(code, scope, declarator.id, ref, false, statementGenerators);

          var suffix = ";\n" + i1;
          statementGenerators.forEach(function (fn, i) {
            if (i === statementGenerators.length - 1) {
              suffix = ";\n\n" + i1;
            }

            fn(bodyStart, '', suffix);
          });

          code.insertLeft(this.left.start + this.left.kind.length + 1, ref);
          code.insertLeft(this.left.end, " = " + list + "[" + key + "];\n" + i1);
        } else {
          code.insertLeft(this.left.end, " = " + list + "[" + key + "];\n\n" + i1);
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForOfStatement;
    }(LoopStatement);

    var FunctionDeclaration = function (Node) {
      function FunctionDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) FunctionDeclaration.__proto__ = Node;
      FunctionDeclaration.prototype = Object.create(Node && Node.prototype);
      FunctionDeclaration.prototype.constructor = FunctionDeclaration;

      FunctionDeclaration.prototype.initialise = function initialise(transforms) {
        if (this.generator && transforms.generator) {
          throw new CompileError(this, 'Generators are not supported');
        }

        this.body.createScope();

        this.findScope(true).addDeclaration(this.id, 'function');
        Node.prototype.initialise.call(this, transforms);
      };

      return FunctionDeclaration;
    }(Node);

    var FunctionExpression = function (Node) {
      function FunctionExpression() {
        Node.apply(this, arguments);
      }

      if (Node) FunctionExpression.__proto__ = Node;
      FunctionExpression.prototype = Object.create(Node && Node.prototype);
      FunctionExpression.prototype.constructor = FunctionExpression;

      FunctionExpression.prototype.initialise = function initialise(transforms) {
        if (this.generator && transforms.generator) {
          throw new CompileError(this, 'Generators are not supported');
        }

        this.body.createScope();

        if (this.id) {
          // function expression IDs belong to the child scope...
          this.body.scope.addDeclaration(this.id, 'function');
        }

        Node.prototype.initialise.call(this, transforms);

        var parent = this.parent;
        var methodName;

        if (transforms.conciseMethodProperty && parent.type === 'Property' && parent.kind === 'init' && parent.method && parent.key.type === 'Identifier') {
          // object literal concise method
          methodName = parent.key.name;
        } else if (transforms.classes && parent.type === 'MethodDefinition' && parent.kind === 'method' && parent.key.type === 'Identifier') {
          // method definition in a class
          methodName = parent.key.name;
        } else if (this.id && this.id.type === 'Identifier') {
          // naked function expression
          methodName = this.id.alias || this.id.name;
        }

        if (methodName) {
          for (var i = 0, list = this.params; i < list.length; i += 1) {
            var param = list[i];

            if (param.type === 'Identifier' && methodName === param.name) {
              // workaround for Safari 9/WebKit bug:
              // https://gitlab.com/Rich-Harris/buble/issues/154
              // change parameter name when same as method name

              var scope = this.body.scope;
              var declaration = scope.declarations[methodName];

              var alias = scope.createIdentifier(methodName);
              param.alias = alias;

              for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
                var identifier = list$1[i$1];

                identifier.alias = alias;
              }

              break;
            }
          }
        }
      };

      return FunctionExpression;
    }(Node);

    function isReference(node, parent) {
      if (node.type === 'MemberExpression') {
        return !node.computed && isReference(node.object, node);
      }

      if (node.type === 'Identifier') {
        // the only time we could have an identifier node without a parent is
        // if it's the entire body of a function without a block statement –
        // i.e. an arrow function expression like `a => a`
        if (!parent) return true;

        if (/(Function|Class)Expression/.test(parent.type)) return false;

        if (parent.type === 'VariableDeclarator') return node === parent.init;

        // TODO is this right?
        if (parent.type === 'MemberExpression' || parent.type === 'MethodDefinition') {
          return parent.computed || node === parent.object;
        }

        if (parent.type === 'ArrayPattern') return false;

        // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
        if (parent.type === 'Property') {
          if (parent.parent.type === 'ObjectPattern') return false;
          return parent.computed || node === parent.value;
        }

        // disregard the `bar` in `class Foo { bar () {...} }`
        if (parent.type === 'MethodDefinition') return false;

        // disregard the `bar` in `export { foo as bar }`
        if (parent.type === 'ExportSpecifier' && node !== parent.local) return false;

        return true;
      }
    }

    var Identifier = function (Node) {
      function Identifier() {
        Node.apply(this, arguments);
      }

      if (Node) Identifier.__proto__ = Node;
      Identifier.prototype = Object.create(Node && Node.prototype);
      Identifier.prototype.constructor = Identifier;

      Identifier.prototype.findScope = function findScope(functionScope) {
        if (this.parent.params && ~this.parent.params.indexOf(this)) {
          return this.parent.body.scope;
        }

        if (this.parent.type === 'FunctionExpression' && this === this.parent.id) {
          return this.parent.body.scope;
        }

        return this.parent.findScope(functionScope);
      };

      Identifier.prototype.initialise = function initialise(transforms) {
        if (transforms.arrow && isReference(this, this.parent)) {
          if (this.name === 'arguments' && !this.findScope(false).contains(this.name)) {
            var lexicalBoundary = this.findLexicalBoundary();
            var arrowFunction = this.findNearest('ArrowFunctionExpression');
            var loop = this.findNearest(loopStatement);

            if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
              this.alias = lexicalBoundary.getArgumentsAlias();
            }

            if (loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth) {
              this.alias = lexicalBoundary.getArgumentsAlias();
            }
          }

          this.findScope(false).addReference(this);
        }
      };

      Identifier.prototype.transpile = function transpile(code) {
        if (this.alias) {
          code.overwrite(this.start, this.end, this.alias, true);
        }
      };

      return Identifier;
    }(Node);

    var IfStatement = function (Node) {
      function IfStatement() {
        Node.apply(this, arguments);
      }

      if (Node) IfStatement.__proto__ = Node;
      IfStatement.prototype = Object.create(Node && Node.prototype);
      IfStatement.prototype.constructor = IfStatement;

      IfStatement.prototype.initialise = function initialise(transforms) {
        Node.prototype.initialise.call(this, transforms);
      };

      IfStatement.prototype.transpile = function transpile(code, transforms) {
        if (this.consequent.type !== 'BlockStatement' || this.consequent.type === 'BlockStatement' && this.consequent.synthetic) {
          code.insertLeft(this.consequent.start, '{ ');
          code.insertRight(this.consequent.end, ' }');
        }

        if (this.alternate && this.alternate.type !== 'IfStatement' && (this.alternate.type !== 'BlockStatement' || this.alternate.type === 'BlockStatement' && this.alternate.synthetic)) {
          code.insertLeft(this.alternate.start, '{ ');
          code.insertRight(this.alternate.end, ' }');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return IfStatement;
    }(Node);

    var ImportDeclaration = function (Node) {
      function ImportDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ImportDeclaration.__proto__ = Node;
      ImportDeclaration.prototype = Object.create(Node && Node.prototype);
      ImportDeclaration.prototype.constructor = ImportDeclaration;

      ImportDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleImport) throw new CompileError(this, 'import is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportDeclaration;
    }(Node);

    var ImportDefaultSpecifier = function (Node) {
      function ImportDefaultSpecifier() {
        Node.apply(this, arguments);
      }

      if (Node) ImportDefaultSpecifier.__proto__ = Node;
      ImportDefaultSpecifier.prototype = Object.create(Node && Node.prototype);
      ImportDefaultSpecifier.prototype.constructor = ImportDefaultSpecifier;

      ImportDefaultSpecifier.prototype.initialise = function initialise(transforms) {
        this.findScope(true).addDeclaration(this.local, 'import');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportDefaultSpecifier;
    }(Node);

    var ImportSpecifier = function (Node) {
      function ImportSpecifier() {
        Node.apply(this, arguments);
      }

      if (Node) ImportSpecifier.__proto__ = Node;
      ImportSpecifier.prototype = Object.create(Node && Node.prototype);
      ImportSpecifier.prototype.constructor = ImportSpecifier;

      ImportSpecifier.prototype.initialise = function initialise(transforms) {
        this.findScope(true).addDeclaration(this.local, 'import');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportSpecifier;
    }(Node);

    var IS_DATA_ATTRIBUTE = /-/;

    var JSXAttribute = function (Node) {
      function JSXAttribute() {
        Node.apply(this, arguments);
      }

      if (Node) JSXAttribute.__proto__ = Node;
      JSXAttribute.prototype = Object.create(Node && Node.prototype);
      JSXAttribute.prototype.constructor = JSXAttribute;

      JSXAttribute.prototype.transpile = function transpile(code, transforms) {
        if (this.value) {
          code.overwrite(this.name.end, this.value.start, ': ');
        } else {
          // tag without value
          code.overwrite(this.name.start, this.name.end, this.name.name + ": true");
        }

        if (IS_DATA_ATTRIBUTE.test(this.name.name)) {
          code.overwrite(this.name.start, this.name.end, "'" + this.name.name + "'");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXAttribute;
    }(Node);

    function containsNewLine(node) {
      return node.type === 'Literal' && !/\S/.test(node.value) && /\n/.test(node.value);
    }

    var JSXClosingElement = function (Node) {
      function JSXClosingElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXClosingElement.__proto__ = Node;
      JSXClosingElement.prototype = Object.create(Node && Node.prototype);
      JSXClosingElement.prototype.constructor = JSXClosingElement;

      JSXClosingElement.prototype.transpile = function transpile(code) {
        var spaceBeforeParen = true;

        var lastChild = this.parent.children[this.parent.children.length - 1];

        // omit space before closing paren if
        //   a) this is on a separate line, or
        //   b) there are no children but there are attributes
        if (lastChild && containsNewLine(lastChild) || this.parent.openingElement.attributes.length) {
          spaceBeforeParen = false;
        }

        code.overwrite(this.start, this.end, spaceBeforeParen ? ' )' : ')');
      };

      return JSXClosingElement;
    }(Node);

    function normalise(str, removeTrailingWhitespace) {
      if (removeTrailingWhitespace && /\n/.test(str)) {
        str = str.replace(/\s+$/, '');
      }

      str = str.replace(/^\n\r?\s+/, '') // remove leading newline + space
      .replace(/\s*\n\r?\s*/gm, ' '); // replace newlines with spaces

      // TODO prefer single quotes?
      return JSON.stringify(str);
    }

    var JSXElement = function (Node) {
      function JSXElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXElement.__proto__ = Node;
      JSXElement.prototype = Object.create(Node && Node.prototype);
      JSXElement.prototype.constructor = JSXElement;

      JSXElement.prototype.transpile = function transpile(code, transforms) {
        Node.prototype.transpile.call(this, code, transforms);

        var children = this.children.filter(function (child) {
          if (child.type !== 'Literal') return true;

          // remove whitespace-only literals, unless on a single line
          return (/\S/.test(child.value) || !/\n/.test(child.value)
          );
        });

        if (children.length) {
          var c = this.openingElement.end;

          var i;
          for (i = 0; i < children.length; i += 1) {
            var child = children[i];

            if (child.type === 'JSXExpressionContainer' && child.expression.type === 'JSXEmptyExpression') {
              // empty block is a no op
            } else {
              var tail = code.original[c] === '\n' && child.type !== 'Literal' ? '' : ' ';
              code.insertLeft(c, "," + tail);
            }

            if (child.type === 'Literal') {
              var str = normalise(child.value, i === children.length - 1);
              code.overwrite(child.start, child.end, str);
            }

            c = child.end;
          }
        }
      };

      return JSXElement;
    }(Node);

    var JSXExpressionContainer = function (Node) {
      function JSXExpressionContainer() {
        Node.apply(this, arguments);
      }

      if (Node) JSXExpressionContainer.__proto__ = Node;
      JSXExpressionContainer.prototype = Object.create(Node && Node.prototype);
      JSXExpressionContainer.prototype.constructor = JSXExpressionContainer;

      JSXExpressionContainer.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.expression.start);
        code.remove(this.expression.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXExpressionContainer;
    }(Node);

    var JSXOpeningElement = function (Node) {
      function JSXOpeningElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXOpeningElement.__proto__ = Node;
      JSXOpeningElement.prototype = Object.create(Node && Node.prototype);
      JSXOpeningElement.prototype.constructor = JSXOpeningElement;

      JSXOpeningElement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        code.overwrite(this.start, this.name.start, this.program.jsx + "( ");

        var html = this.name.type === 'JSXIdentifier' && this.name.name[0] === this.name.name[0].toLowerCase();
        if (html) code.insertRight(this.name.start, "'");

        var len = this.attributes.length;
        var c = this.name.end;

        if (len) {
          var i;

          var hasSpread = false;
          for (i = 0; i < len; i += 1) {
            if (this$1.attributes[i].type === 'JSXSpreadAttribute') {
              hasSpread = true;
              break;
            }
          }

          c = this.attributes[0].end;

          for (i = 0; i < len; i += 1) {
            var attr = this$1.attributes[i];

            if (i > 0) {
              code.overwrite(c, attr.start, ', ');
            }

            if (hasSpread && attr.type !== 'JSXSpreadAttribute') {
              var lastAttr = this$1.attributes[i - 1];
              var nextAttr = this$1.attributes[i + 1];

              if (!lastAttr || lastAttr.type === 'JSXSpreadAttribute') {
                code.insertRight(attr.start, '{ ');
              }

              if (!nextAttr || nextAttr.type === 'JSXSpreadAttribute') {
                code.insertLeft(attr.end, ' }');
              }
            }

            c = attr.end;
          }

          var after;
          var before;
          if (hasSpread) {
            if (len === 1) {
              before = html ? "'," : ',';
            } else {
              if (!this.program.options.objectAssign) {
                throw new CompileError(this, 'Mixed JSX attributes ending in spread requires specified objectAssign option with \'Object.assign\' or polyfill helper.');
              }
              before = html ? "', " + this.program.options.objectAssign + "({}," : ", " + this.program.options.objectAssign + "({},";
              after = ')';
            }
          } else {
            before = html ? "', {" : ', {';
            after = ' }';
          }

          code.insertRight(this.name.end, before);

          if (after) {
            code.insertLeft(this.attributes[len - 1].end, after);
          }
        } else {
          code.insertLeft(this.name.end, html ? "', null" : ", null");
          c = this.name.end;
        }

        Node.prototype.transpile.call(this, code, transforms);

        if (this.selfClosing) {
          code.overwrite(c, this.end, this.attributes.length ? ")" : " )");
        } else {
          code.remove(c, this.end);
        }
      };

      return JSXOpeningElement;
    }(Node);

    var JSXSpreadAttribute = function (Node) {
      function JSXSpreadAttribute() {
        Node.apply(this, arguments);
      }

      if (Node) JSXSpreadAttribute.__proto__ = Node;
      JSXSpreadAttribute.prototype = Object.create(Node && Node.prototype);
      JSXSpreadAttribute.prototype.constructor = JSXSpreadAttribute;

      JSXSpreadAttribute.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.argument.start);
        code.remove(this.argument.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXSpreadAttribute;
    }(Node);

    var regenerate = __commonjs(function (module, exports, global) {
      /*! https://mths.be/regenerate v1.3.1 by @mathias | MIT license */
      (function (root) {

        // Detect free variables `exports`.
        var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports;

        // Detect free variable `module`.
        var freeModule = (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && module.exports == freeExports && module;

        // Detect free variable `global`, from Node.js/io.js or Browserified code,
        // and use it as `root`.
        var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
          root = freeGlobal;
        }

        /*--------------------------------------------------------------------------*/

        var ERRORS = {
          'rangeOrder': 'A range\u2019s `stop` value must be greater than or equal ' + 'to the `start` value.',
          'codePointRange': 'Invalid code point value. Code points range from ' + 'U+000000 to U+10FFFF.'
        };

        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
        var HIGH_SURROGATE_MIN = 0xD800;
        var HIGH_SURROGATE_MAX = 0xDBFF;
        var LOW_SURROGATE_MIN = 0xDC00;
        var LOW_SURROGATE_MAX = 0xDFFF;

        // In Regenerate output, `\0` is never preceded by `\` because we sort by
        // code point value, so let’s keep this regular expression simple.
        var regexNull = /\\x00([^0123456789]|$)/g;

        var object = {};
        var hasOwnProperty = object.hasOwnProperty;
        var extend = function extend(destination, source) {
          var key;
          for (key in source) {
            if (hasOwnProperty.call(source, key)) {
              destination[key] = source[key];
            }
          }
          return destination;
        };

        var forEach = function forEach(array, callback) {
          var index = -1;
          var length = array.length;
          while (++index < length) {
            callback(array[index], index);
          }
        };

        var toString = object.toString;
        var isArray = function isArray(value) {
          return toString.call(value) == '[object Array]';
        };
        var isNumber = function isNumber(value) {
          return typeof value == 'number' || toString.call(value) == '[object Number]';
        };

        // This assumes that `number` is a positive integer that `toString()`s nicely
        // (which is the case for all code point values).
        var zeroes = '0000';
        var pad = function pad(number, totalCharacters) {
          var string = String(number);
          return string.length < totalCharacters ? (zeroes + string).slice(-totalCharacters) : string;
        };

        var hex = function hex(number) {
          return Number(number).toString(16).toUpperCase();
        };

        var slice = [].slice;

        /*--------------------------------------------------------------------------*/

        var dataFromCodePoints = function dataFromCodePoints(codePoints) {
          var index = -1;
          var length = codePoints.length;
          var max = length - 1;
          var result = [];
          var isStart = true;
          var tmp;
          var previous = 0;
          while (++index < length) {
            tmp = codePoints[index];
            if (isStart) {
              result.push(tmp);
              previous = tmp;
              isStart = false;
            } else {
              if (tmp == previous + 1) {
                if (index != max) {
                  previous = tmp;
                  continue;
                } else {
                  isStart = true;
                  result.push(tmp + 1);
                }
              } else {
                // End the previous range and start a new one.
                result.push(previous + 1, tmp);
                previous = tmp;
              }
            }
          }
          if (!isStart) {
            result.push(tmp + 1);
          }
          return result;
        };

        var dataRemove = function dataRemove(data, codePoint) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            if (codePoint >= start && codePoint < end) {
              // Modify this pair.
              if (codePoint == start) {
                if (end == start + 1) {
                  // Just remove `start` and `end`.
                  data.splice(index, 2);
                  return data;
                } else {
                  // Just replace `start` with a new value.
                  data[index] = codePoint + 1;
                  return data;
                }
              } else if (codePoint == end - 1) {
                // Just replace `end` with a new value.
                data[index + 1] = codePoint;
                return data;
              } else {
                // Replace `[start, end]` with `[startA, endA, startB, endB]`.
                data.splice(index, 2, start, codePoint, codePoint + 1, end);
                return data;
              }
            }
            index += 2;
          }
          return data;
        };

        var dataRemoveRange = function dataRemoveRange(data, rangeStart, rangeEnd) {
          if (rangeEnd < rangeStart) {
            throw Error(ERRORS.rangeOrder);
          }
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          while (index < data.length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

            // Exit as soon as no more matching pairs can be found.
            if (start > rangeEnd) {
              return data;
            }

            // Check if this range pair is equal to, or forms a subset of, the range
            // to be removed.
            // E.g. we have `[0, 11, 40, 51]` and want to remove 0-10 → `[40, 51]`.
            // E.g. we have `[40, 51]` and want to remove 0-100 → `[]`.
            if (rangeStart <= start && rangeEnd >= end) {
              // Remove this pair.
              data.splice(index, 2);
              continue;
            }

            // Check if both `rangeStart` and `rangeEnd` are within the bounds of
            // this pair.
            // E.g. we have `[0, 11]` and want to remove 4-6 → `[0, 4, 7, 11]`.
            if (rangeStart >= start && rangeEnd < end) {
              if (rangeStart == start) {
                // Replace `[start, end]` with `[startB, endB]`.
                data[index] = rangeEnd + 1;
                data[index + 1] = end + 1;
                return data;
              }
              // Replace `[start, end]` with `[startA, endA, startB, endB]`.
              data.splice(index, 2, start, rangeStart, rangeEnd + 1, end + 1);
              return data;
            }

            // Check if only `rangeStart` is within the bounds of this pair.
            // E.g. we have `[0, 11]` and want to remove 4-20 → `[0, 4]`.
            if (rangeStart >= start && rangeStart <= end) {
              // Replace `end` with `rangeStart`.
              data[index + 1] = rangeStart;
              // Note: we cannot `return` just yet, in case any following pairs still
              // contain matching code points.
              // E.g. we have `[0, 11, 14, 31]` and want to remove 4-20
              // → `[0, 4, 21, 31]`.
            }

            // Check if only `rangeEnd` is within the bounds of this pair.
            // E.g. we have `[14, 31]` and want to remove 4-20 → `[21, 31]`.
            else if (rangeEnd >= start && rangeEnd <= end) {
                // Just replace `start`.
                data[index] = rangeEnd + 1;
                return data;
              }

            index += 2;
          }
          return data;
        };

        var dataAdd = function dataAdd(data, codePoint) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var lastIndex = null;
          var length = data.length;
          if (codePoint < 0x0 || codePoint > 0x10FFFF) {
            throw RangeError(ERRORS.codePointRange);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1];

            // Check if the code point is already in the set.
            if (codePoint >= start && codePoint < end) {
              return data;
            }

            if (codePoint == start - 1) {
              // Just replace `start` with a new value.
              data[index] = codePoint;
              return data;
            }

            // At this point, if `start` is `greater` than `codePoint`, insert a new
            // `[start, end]` pair before the current pair, or after the current pair
            // if there is a known `lastIndex`.
            if (start > codePoint) {
              data.splice(lastIndex != null ? lastIndex + 2 : 0, 0, codePoint, codePoint + 1);
              return data;
            }

            if (codePoint == end) {
              // Check if adding this code point causes two separate ranges to become
              // a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
              if (codePoint + 1 == data[index + 2]) {
                data.splice(index, 4, start, data[index + 3]);
                return data;
              }
              // Else, just replace `end` with a new value.
              data[index + 1] = codePoint + 1;
              return data;
            }
            lastIndex = index;
            index += 2;
          }
          // The loop has finished; add the new pair to the end of the data set.
          data.push(codePoint, codePoint + 1);
          return data;
        };

        var dataAddData = function dataAddData(dataA, dataB) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var data = dataA.slice();
          var length = dataB.length;
          while (index < length) {
            start = dataB[index];
            end = dataB[index + 1] - 1;
            if (start == end) {
              data = dataAdd(data, start);
            } else {
              data = dataAddRange(data, start, end);
            }
            index += 2;
          }
          return data;
        };

        var dataRemoveData = function dataRemoveData(dataA, dataB) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var data = dataA.slice();
          var length = dataB.length;
          while (index < length) {
            start = dataB[index];
            end = dataB[index + 1] - 1;
            if (start == end) {
              data = dataRemove(data, start);
            } else {
              data = dataRemoveRange(data, start, end);
            }
            index += 2;
          }
          return data;
        };

        var dataAddRange = function dataAddRange(data, rangeStart, rangeEnd) {
          if (rangeEnd < rangeStart) {
            throw Error(ERRORS.rangeOrder);
          }
          if (rangeStart < 0x0 || rangeStart > 0x10FFFF || rangeEnd < 0x0 || rangeEnd > 0x10FFFF) {
            throw RangeError(ERRORS.codePointRange);
          }
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var added = false;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];

            if (added) {
              // The range has already been added to the set; at this point, we just
              // need to get rid of the following ranges in case they overlap.

              // Check if this range can be combined with the previous range.
              if (start == rangeEnd + 1) {
                data.splice(index - 1, 2);
                return data;
              }

              // Exit as soon as no more possibly overlapping pairs can be found.
              if (start > rangeEnd) {
                return data;
              }

              // E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
              // `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
              // `0,16` range that was previously added.
              if (start >= rangeStart && start <= rangeEnd) {
                // `start` lies within the range that was previously added.

                if (end > rangeStart && end - 1 <= rangeEnd) {
                  // `end` lies within the range that was previously added as well,
                  // so remove this pair.
                  data.splice(index, 2);
                  index -= 2;
                  // Note: we cannot `return` just yet, as there may still be other
                  // overlapping pairs.
                } else {
                  // `start` lies within the range that was previously added, but
                  // `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
                  // now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
                  // Remove the previously added `end` and the current `start`.
                  data.splice(index - 1, 2);
                  index -= 2;
                }

                // Note: we cannot return yet.
              }
            } else if (start == rangeEnd + 1) {
              data[index] = rangeStart;
              return data;
            }

            // Check if a new pair must be inserted *before* the current one.
            else if (start > rangeEnd) {
                data.splice(index, 0, rangeStart, rangeEnd + 1);
                return data;
              } else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
                // The new range lies entirely within an existing range pair. No action
                // needed.
                return data;
              } else if (
              // E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
              rangeStart >= start && rangeStart < end ||
              // E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
              end == rangeStart) {
                // Replace `end` with the new value.
                data[index + 1] = rangeEnd + 1;
                // Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
                // and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.
                added = true;
                // Note: we cannot `return` just yet.
              } else if (rangeStart <= start && rangeEnd + 1 >= end) {
                // The new range is a superset of the old range.
                data[index] = rangeStart;
                data[index + 1] = rangeEnd + 1;
                added = true;
              }

            index += 2;
          }
          // The loop has finished without doing anything; add the new pair to the end
          // of the data set.
          if (!added) {
            data.push(rangeStart, rangeEnd + 1);
          }
          return data;
        };

        var dataContains = function dataContains(data, codePoint) {
          var index = 0;
          var length = data.length;
          // Exit early if `codePoint` is not within `data`’s overall range.
          var start = data[index];
          var end = data[length - 1];
          if (length >= 2) {
            if (codePoint < start || codePoint > end) {
              return false;
            }
          }
          // Iterate over the data per `(start, end)` pair.
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            if (codePoint >= start && codePoint < end) {
              return true;
            }
            index += 2;
          }
          return false;
        };

        var dataIntersection = function dataIntersection(data, codePoints) {
          var index = 0;
          var length = codePoints.length;
          var codePoint;
          var result = [];
          while (index < length) {
            codePoint = codePoints[index];
            if (dataContains(data, codePoint)) {
              result.push(codePoint);
            }
            ++index;
          }
          return dataFromCodePoints(result);
        };

        var dataIsEmpty = function dataIsEmpty(data) {
          return !data.length;
        };

        var dataIsSingleton = function dataIsSingleton(data) {
          // Check if the set only represents a single code point.
          return data.length == 2 && data[0] + 1 == data[1];
        };

        var dataToArray = function dataToArray(data) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var result = [];
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            while (start < end) {
              result.push(start);
              ++start;
            }
            index += 2;
          }
          return result;
        };

        /*--------------------------------------------------------------------------*/

        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var floor = Math.floor;
        var highSurrogate = function highSurrogate(codePoint) {
          return parseInt(floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN, 10);
        };

        var lowSurrogate = function lowSurrogate(codePoint) {
          return parseInt((codePoint - 0x10000) % 0x400 + LOW_SURROGATE_MIN, 10);
        };

        var stringFromCharCode = String.fromCharCode;
        var codePointToString = function codePointToString(codePoint) {
          var string;
          // https://mathiasbynens.be/notes/javascript-escapes#single
          // Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
          // different meaning in regular expressions (word boundary), so it cannot
          // be used here.
          if (codePoint == 0x09) {
            string = '\\t';
          }
          // Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
          // else if (codePoint == 0x0B) {
          // 	string = '\\v';
          // }
          else if (codePoint == 0x0A) {
              string = '\\n';
            } else if (codePoint == 0x0C) {
              string = '\\f';
            } else if (codePoint == 0x0D) {
              string = '\\r';
            } else if (codePoint == 0x5C) {
              string = '\\\\';
            } else if (codePoint == 0x24 || codePoint >= 0x28 && codePoint <= 0x2B || codePoint == 0x2D || codePoint == 0x2E || codePoint == 0x3F || codePoint >= 0x5B && codePoint <= 0x5E || codePoint >= 0x7B && codePoint <= 0x7D) {
              // The code point maps to an unsafe printable ASCII character;
              // backslash-escape it. Here’s the list of those symbols:
              //
              //     $()*+-.?[\]^{|}
              //
              // See #7 for more info.
              string = '\\' + stringFromCharCode(codePoint);
            } else if (codePoint >= 0x20 && codePoint <= 0x7E) {
              // The code point maps to one of these printable ASCII symbols
              // (including the space character):
              //
              //      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
              //     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
              //
              // These can safely be used directly.
              string = stringFromCharCode(codePoint);
            } else if (codePoint <= 0xFF) {
              // https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
              string = '\\x' + pad(hex(codePoint), 2);
            } else {
              // `codePoint <= 0xFFFF` holds true.
              // https://mathiasbynens.be/notes/javascript-escapes#unicode
              string = '\\u' + pad(hex(codePoint), 4);
            }

          // There’s no need to account for astral symbols / surrogate pairs here,
          // since `codePointToString` is private and only used for BMP code points.
          // But if that’s what you need, just add an `else` block with this code:
          //
          //     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
          //     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

          return string;
        };

        var codePointToStringUnicode = function codePointToStringUnicode(codePoint) {
          if (codePoint <= 0xFFFF) {
            return codePointToString(codePoint);
          }
          return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
        };

        var symbolToCodePoint = function symbolToCodePoint(symbol) {
          var length = symbol.length;
          var first = symbol.charCodeAt(0);
          var second;
          if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > 1 // There is a next code unit.
          ) {
              // `first` is a high surrogate, and there is a next character. Assume
              // it’s a low surrogate (else it’s invalid usage of Regenerate anyway).
              second = symbol.charCodeAt(1);
              // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
            }
          return first;
        };

        var createBMPCharacterClasses = function createBMPCharacterClasses(data) {
          // Iterate over the data per `(start, end)` pair.
          var result = '';
          var index = 0;
          var start;
          var end;
          var length = data.length;
          if (dataIsSingleton(data)) {
            return codePointToString(data[0]);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
            if (start == end) {
              result += codePointToString(start);
            } else if (start + 1 == end) {
              result += codePointToString(start) + codePointToString(end);
            } else {
              result += codePointToString(start) + '-' + codePointToString(end);
            }
            index += 2;
          }
          return '[' + result + ']';
        };

        var createUnicodeCharacterClasses = function createUnicodeCharacterClasses(data) {
          // Iterate over the data per `(start, end)` pair.
          var result = '';
          var index = 0;
          var start;
          var end;
          var length = data.length;
          if (dataIsSingleton(data)) {
            return codePointToStringUnicode(data[0]);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
            if (start == end) {
              result += codePointToStringUnicode(start);
            } else if (start + 1 == end) {
              result += codePointToStringUnicode(start) + codePointToStringUnicode(end);
            } else {
              result += codePointToStringUnicode(start) + '-' + codePointToStringUnicode(end);
            }
            index += 2;
          }
          return '[' + result + ']';
        };

        var splitAtBMP = function splitAtBMP(data) {
          // Iterate over the data per `(start, end)` pair.
          var loneHighSurrogates = [];
          var loneLowSurrogates = [];
          var bmp = [];
          var astral = [];
          var index = 0;
          var start;
          var end;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

            if (start < HIGH_SURROGATE_MIN) {

              // The range starts and ends before the high surrogate range.
              // E.g. (0, 0x10).
              if (end < HIGH_SURROGATE_MIN) {
                bmp.push(start, end + 1);
              }

              // The range starts before the high surrogate range and ends within it.
              // E.g. (0, 0xD855).
              if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
              }

              // The range starts before the high surrogate range and ends in the low
              // surrogate range. E.g. (0, 0xDCFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
              }

              // The range starts before the high surrogate range and ends after the
              // low surrogate range. E.g. (0, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {

              // The range starts and ends in the high surrogate range.
              // E.g. (0xD855, 0xD866).
              if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
                loneHighSurrogates.push(start, end + 1);
              }

              // The range starts in the high surrogate range and ends in the low
              // surrogate range. E.g. (0xD855, 0xDCFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
              }

              // The range starts in the high surrogate range and ends after the low
              // surrogate range. E.g. (0xD855, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {

              // The range starts and ends in the low surrogate range.
              // E.g. (0xDCFF, 0xDDFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                loneLowSurrogates.push(start, end + 1);
              }

              // The range starts in the low surrogate range and ends after the low
              // surrogate range. E.g. (0xDCFF, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start > LOW_SURROGATE_MAX && start <= 0xFFFF) {

              // The range starts and ends after the low surrogate range.
              // E.g. (0xFFAA, 0x10FFFF).
              if (end <= 0xFFFF) {
                bmp.push(start, end + 1);
              } else {
                bmp.push(start, 0xFFFF + 1);
                astral.push(0xFFFF + 1, end + 1);
              }
            } else {

              // The range starts and ends in the astral range.
              astral.push(start, end + 1);
            }

            index += 2;
          }
          return {
            'loneHighSurrogates': loneHighSurrogates,
            'loneLowSurrogates': loneLowSurrogates,
            'bmp': bmp,
            'astral': astral
          };
        };

        var optimizeSurrogateMappings = function optimizeSurrogateMappings(surrogateMappings) {
          var result = [];
          var tmpLow = [];
          var addLow = false;
          var mapping;
          var nextMapping;
          var highSurrogates;
          var lowSurrogates;
          var nextHighSurrogates;
          var nextLowSurrogates;
          var index = -1;
          var length = surrogateMappings.length;
          while (++index < length) {
            mapping = surrogateMappings[index];
            nextMapping = surrogateMappings[index + 1];
            if (!nextMapping) {
              result.push(mapping);
              continue;
            }
            highSurrogates = mapping[0];
            lowSurrogates = mapping[1];
            nextHighSurrogates = nextMapping[0];
            nextLowSurrogates = nextMapping[1];

            // Check for identical high surrogate ranges.
            tmpLow = lowSurrogates;
            while (nextHighSurrogates && highSurrogates[0] == nextHighSurrogates[0] && highSurrogates[1] == nextHighSurrogates[1]) {
              // Merge with the next item.
              if (dataIsSingleton(nextLowSurrogates)) {
                tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
              } else {
                tmpLow = dataAddRange(tmpLow, nextLowSurrogates[0], nextLowSurrogates[1] - 1);
              }
              ++index;
              mapping = surrogateMappings[index];
              highSurrogates = mapping[0];
              lowSurrogates = mapping[1];
              nextMapping = surrogateMappings[index + 1];
              nextHighSurrogates = nextMapping && nextMapping[0];
              nextLowSurrogates = nextMapping && nextMapping[1];
              addLow = true;
            }
            result.push([highSurrogates, addLow ? tmpLow : lowSurrogates]);
            addLow = false;
          }
          return optimizeByLowSurrogates(result);
        };

        var optimizeByLowSurrogates = function optimizeByLowSurrogates(surrogateMappings) {
          if (surrogateMappings.length == 1) {
            return surrogateMappings;
          }
          var index = -1;
          var innerIndex = -1;
          while (++index < surrogateMappings.length) {
            var mapping = surrogateMappings[index];
            var lowSurrogates = mapping[1];
            var lowSurrogateStart = lowSurrogates[0];
            var lowSurrogateEnd = lowSurrogates[1];
            innerIndex = index; // Note: the loop starts at the next index.
            while (++innerIndex < surrogateMappings.length) {
              var otherMapping = surrogateMappings[innerIndex];
              var otherLowSurrogates = otherMapping[1];
              var otherLowSurrogateStart = otherLowSurrogates[0];
              var otherLowSurrogateEnd = otherLowSurrogates[1];
              if (lowSurrogateStart == otherLowSurrogateStart && lowSurrogateEnd == otherLowSurrogateEnd) {
                // Add the code points in the other item to this one.
                if (dataIsSingleton(otherMapping[0])) {
                  mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
                } else {
                  mapping[0] = dataAddRange(mapping[0], otherMapping[0][0], otherMapping[0][1] - 1);
                }
                // Remove the other, now redundant, item.
                surrogateMappings.splice(innerIndex, 1);
                --innerIndex;
              }
            }
          }
          return surrogateMappings;
        };

        var surrogateSet = function surrogateSet(data) {
          // Exit early if `data` is an empty set.
          if (!data.length) {
            return [];
          }

          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var startHigh;
          var startLow;
          var prevStartHigh = 0;
          var prevEndHigh = 0;
          var tmpLow = [];
          var endHigh;
          var endLow;
          var surrogateMappings = [];
          var length = data.length;
          var dataHigh = [];
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1;

            startHigh = highSurrogate(start);
            startLow = lowSurrogate(start);
            endHigh = highSurrogate(end);
            endLow = lowSurrogate(end);

            var startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
            var endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
            var complete = false;

            // Append the previous high-surrogate-to-low-surrogate mappings.
            // Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.
            if (startHigh == endHigh || startsWithLowestLowSurrogate && endsWithHighestLowSurrogate) {
              surrogateMappings.push([[startHigh, endHigh + 1], [startLow, endLow + 1]]);
              complete = true;
            } else {
              surrogateMappings.push([[startHigh, startHigh + 1], [startLow, LOW_SURROGATE_MAX + 1]]);
            }

            // Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
            // `(endHigh - 1, LOW_SURROGATE_MAX)`.
            if (!complete && startHigh + 1 < endHigh) {
              if (endsWithHighestLowSurrogate) {
                // Combine step 2 and step 3.
                surrogateMappings.push([[startHigh + 1, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
                complete = true;
              } else {
                surrogateMappings.push([[startHigh + 1, endHigh], [LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1]]);
              }
            }

            // Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.
            if (!complete) {
              surrogateMappings.push([[endHigh, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
            }

            prevStartHigh = startHigh;
            prevEndHigh = endHigh;

            index += 2;
          }

          // The format of `surrogateMappings` is as follows:
          //
          //     [ surrogateMapping1, surrogateMapping2 ]
          //
          // i.e.:
          //
          //     [
          //       [ highSurrogates1, lowSurrogates1 ],
          //       [ highSurrogates2, lowSurrogates2 ]
          //     ]
          return optimizeSurrogateMappings(surrogateMappings);
        };

        var createSurrogateCharacterClasses = function createSurrogateCharacterClasses(surrogateMappings) {
          var result = [];
          forEach(surrogateMappings, function (surrogateMapping) {
            var highSurrogates = surrogateMapping[0];
            var lowSurrogates = surrogateMapping[1];
            result.push(createBMPCharacterClasses(highSurrogates) + createBMPCharacterClasses(lowSurrogates));
          });
          return result.join('|');
        };

        var createCharacterClassesFromData = function createCharacterClassesFromData(data, bmpOnly, hasUnicodeFlag) {
          if (hasUnicodeFlag) {
            return createUnicodeCharacterClasses(data);
          }
          var result = [];

          var parts = splitAtBMP(data);
          var loneHighSurrogates = parts.loneHighSurrogates;
          var loneLowSurrogates = parts.loneLowSurrogates;
          var bmp = parts.bmp;
          var astral = parts.astral;
          var hasAstral = !dataIsEmpty(parts.astral);
          var hasLoneHighSurrogates = !dataIsEmpty(loneHighSurrogates);
          var hasLoneLowSurrogates = !dataIsEmpty(loneLowSurrogates);

          var surrogateMappings = surrogateSet(astral);

          if (bmpOnly) {
            bmp = dataAddData(bmp, loneHighSurrogates);
            hasLoneHighSurrogates = false;
            bmp = dataAddData(bmp, loneLowSurrogates);
            hasLoneLowSurrogates = false;
          }

          if (!dataIsEmpty(bmp)) {
            // The data set contains BMP code points that are not high surrogates
            // needed for astral code points in the set.
            result.push(createBMPCharacterClasses(bmp));
          }
          if (surrogateMappings.length) {
            // The data set contains astral code points; append character classes
            // based on their surrogate pairs.
            result.push(createSurrogateCharacterClasses(surrogateMappings));
          }
          // https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
          if (hasLoneHighSurrogates) {
            result.push(createBMPCharacterClasses(loneHighSurrogates) +
            // Make sure the high surrogates aren’t part of a surrogate pair.
            '(?![\\uDC00-\\uDFFF])');
          }
          if (hasLoneLowSurrogates) {
            result.push(
            // It is not possible to accurately assert the low surrogates aren’t
            // part of a surrogate pair, since JavaScript regular expressions do
            // not support lookbehind.
            '(?:[^\\uD800-\\uDBFF]|^)' + createBMPCharacterClasses(loneLowSurrogates));
          }
          return result.join('|');
        };

        /*--------------------------------------------------------------------------*/

        // `regenerate` can be used as a constructor (and new methods can be added to
        // its prototype) but also as a regular function, the latter of which is the
        // documented and most common usage. For that reason, it’s not capitalized.
        var regenerate = function regenerate(value) {
          if (arguments.length > 1) {
            value = slice.call(arguments);
          }
          if (this instanceof regenerate) {
            this.data = [];
            return value ? this.add(value) : this;
          }
          return new regenerate().add(value);
        };

        regenerate.version = '1.3.1';

        var proto = regenerate.prototype;
        extend(proto, {
          'add': function add(value) {
            var $this = this;
            if (value == null) {
              return $this;
            }
            if (value instanceof regenerate) {
              // Allow passing other Regenerate instances.
              $this.data = dataAddData($this.data, value.data);
              return $this;
            }
            if (arguments.length > 1) {
              value = slice.call(arguments);
            }
            if (isArray(value)) {
              forEach(value, function (item) {
                $this.add(item);
              });
              return $this;
            }
            $this.data = dataAdd($this.data, isNumber(value) ? value : symbolToCodePoint(value));
            return $this;
          },
          'remove': function remove(value) {
            var $this = this;
            if (value == null) {
              return $this;
            }
            if (value instanceof regenerate) {
              // Allow passing other Regenerate instances.
              $this.data = dataRemoveData($this.data, value.data);
              return $this;
            }
            if (arguments.length > 1) {
              value = slice.call(arguments);
            }
            if (isArray(value)) {
              forEach(value, function (item) {
                $this.remove(item);
              });
              return $this;
            }
            $this.data = dataRemove($this.data, isNumber(value) ? value : symbolToCodePoint(value));
            return $this;
          },
          'addRange': function addRange(start, end) {
            var $this = this;
            $this.data = dataAddRange($this.data, isNumber(start) ? start : symbolToCodePoint(start), isNumber(end) ? end : symbolToCodePoint(end));
            return $this;
          },
          'removeRange': function removeRange(start, end) {
            var $this = this;
            var startCodePoint = isNumber(start) ? start : symbolToCodePoint(start);
            var endCodePoint = isNumber(end) ? end : symbolToCodePoint(end);
            $this.data = dataRemoveRange($this.data, startCodePoint, endCodePoint);
            return $this;
          },
          'intersection': function intersection(argument) {
            var $this = this;
            // Allow passing other Regenerate instances.
            // TODO: Optimize this by writing and using `dataIntersectionData()`.
            var array = argument instanceof regenerate ? dataToArray(argument.data) : argument;
            $this.data = dataIntersection($this.data, array);
            return $this;
          },
          'contains': function contains(codePoint) {
            return dataContains(this.data, isNumber(codePoint) ? codePoint : symbolToCodePoint(codePoint));
          },
          'clone': function clone() {
            var set$$1 = new regenerate();
            set$$1.data = this.data.slice(0);
            return set$$1;
          },
          'toString': function toString(options) {
            var result = createCharacterClassesFromData(this.data, options ? options.bmpOnly : false, options ? options.hasUnicodeFlag : false);
            if (!result) {
              // For an empty set, return something that can be inserted `/here/` to
              // form a valid regular expression. Avoid `(?:)` since that matches the
              // empty string.
              return '[]';
            }
            // Use `\0` instead of `\x00` where possible.
            return result.replace(regexNull, '\\0$1');
          },
          'toRegExp': function toRegExp(flags) {
            var pattern = this.toString(flags && flags.indexOf('u') != -1 ? { 'hasUnicodeFlag': true } : null);
            return RegExp(pattern, flags || '');
          },
          'valueOf': function valueOf() {
            // Note: `valueOf` is aliased as `toArray`.
            return dataToArray(this.data);
          }
        });

        proto.toArray = proto.valueOf;

        // Some AMD build optimizers, like r.js, check for specific condition patterns
        // like the following:
        if (false) {
          undefined(function () {
            return regenerate;
          });
        } else if (freeExports && !freeExports.nodeType) {
          if (freeModule) {
            // in Node.js, io.js, or RingoJS v0.8.0+
            freeModule.exports = regenerate;
          } else {
            // in Narwhal or RingoJS v0.7.0-
            freeExports.regenerate = regenerate;
          }
        } else {
          // in Rhino or a web browser
          root.regenerate = regenerate;
        }
      })(__commonjs_global);
    });

    var require$$0$2 = regenerate && (typeof regenerate === 'undefined' ? 'undefined' : _typeof(regenerate)) === 'object' && 'default' in regenerate ? regenerate['default'] : regenerate;

    var characterClassEscapeSets = __commonjs(function (module, exports) {
      // Generated by `/scripts/character-class-escape-sets.js`. Do not edit.
      var regenerate = require$$0$2;

      exports.REGULAR = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0xFFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0xFFFF),
        'w': regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0xFFFF)
      };

      exports.UNICODE = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF),
        'w': regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)
      };

      exports.UNICODE_IGNORE_CASE = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF),
        'w': regenerate(0x5F, 0x17F, 0x212A).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x4B, 0x53, 0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)
      };
    });

    var require$$0$1 = characterClassEscapeSets && (typeof characterClassEscapeSets === 'undefined' ? 'undefined' : _typeof(characterClassEscapeSets)) === 'object' && 'default' in characterClassEscapeSets ? characterClassEscapeSets['default'] : characterClassEscapeSets;

    var require$$1 = {
      "75": 8490,
      "83": 383,
      "107": 8490,
      "115": 383,
      "181": 924,
      "197": 8491,
      "383": 83,
      "452": 453,
      "453": 452,
      "455": 456,
      "456": 455,
      "458": 459,
      "459": 458,
      "497": 498,
      "498": 497,
      "837": 8126,
      "914": 976,
      "917": 1013,
      "920": 1012,
      "921": 8126,
      "922": 1008,
      "924": 181,
      "928": 982,
      "929": 1009,
      "931": 962,
      "934": 981,
      "937": 8486,
      "962": 931,
      "976": 914,
      "977": 1012,
      "981": 934,
      "982": 928,
      "1008": 922,
      "1009": 929,
      "1012": [920, 977],
      "1013": 917,
      "7776": 7835,
      "7835": 7776,
      "8126": [837, 921],
      "8486": 937,
      "8490": 75,
      "8491": 197,
      "66560": 66600,
      "66561": 66601,
      "66562": 66602,
      "66563": 66603,
      "66564": 66604,
      "66565": 66605,
      "66566": 66606,
      "66567": 66607,
      "66568": 66608,
      "66569": 66609,
      "66570": 66610,
      "66571": 66611,
      "66572": 66612,
      "66573": 66613,
      "66574": 66614,
      "66575": 66615,
      "66576": 66616,
      "66577": 66617,
      "66578": 66618,
      "66579": 66619,
      "66580": 66620,
      "66581": 66621,
      "66582": 66622,
      "66583": 66623,
      "66584": 66624,
      "66585": 66625,
      "66586": 66626,
      "66587": 66627,
      "66588": 66628,
      "66589": 66629,
      "66590": 66630,
      "66591": 66631,
      "66592": 66632,
      "66593": 66633,
      "66594": 66634,
      "66595": 66635,
      "66596": 66636,
      "66597": 66637,
      "66598": 66638,
      "66599": 66639,
      "66600": 66560,
      "66601": 66561,
      "66602": 66562,
      "66603": 66563,
      "66604": 66564,
      "66605": 66565,
      "66606": 66566,
      "66607": 66567,
      "66608": 66568,
      "66609": 66569,
      "66610": 66570,
      "66611": 66571,
      "66612": 66572,
      "66613": 66573,
      "66614": 66574,
      "66615": 66575,
      "66616": 66576,
      "66617": 66577,
      "66618": 66578,
      "66619": 66579,
      "66620": 66580,
      "66621": 66581,
      "66622": 66582,
      "66623": 66583,
      "66624": 66584,
      "66625": 66585,
      "66626": 66586,
      "66627": 66587,
      "66628": 66588,
      "66629": 66589,
      "66630": 66590,
      "66631": 66591,
      "66632": 66592,
      "66633": 66593,
      "66634": 66594,
      "66635": 66595,
      "66636": 66596,
      "66637": 66597,
      "66638": 66598,
      "66639": 66599,
      "68736": 68800,
      "68737": 68801,
      "68738": 68802,
      "68739": 68803,
      "68740": 68804,
      "68741": 68805,
      "68742": 68806,
      "68743": 68807,
      "68744": 68808,
      "68745": 68809,
      "68746": 68810,
      "68747": 68811,
      "68748": 68812,
      "68749": 68813,
      "68750": 68814,
      "68751": 68815,
      "68752": 68816,
      "68753": 68817,
      "68754": 68818,
      "68755": 68819,
      "68756": 68820,
      "68757": 68821,
      "68758": 68822,
      "68759": 68823,
      "68760": 68824,
      "68761": 68825,
      "68762": 68826,
      "68763": 68827,
      "68764": 68828,
      "68765": 68829,
      "68766": 68830,
      "68767": 68831,
      "68768": 68832,
      "68769": 68833,
      "68770": 68834,
      "68771": 68835,
      "68772": 68836,
      "68773": 68837,
      "68774": 68838,
      "68775": 68839,
      "68776": 68840,
      "68777": 68841,
      "68778": 68842,
      "68779": 68843,
      "68780": 68844,
      "68781": 68845,
      "68782": 68846,
      "68783": 68847,
      "68784": 68848,
      "68785": 68849,
      "68786": 68850,
      "68800": 68736,
      "68801": 68737,
      "68802": 68738,
      "68803": 68739,
      "68804": 68740,
      "68805": 68741,
      "68806": 68742,
      "68807": 68743,
      "68808": 68744,
      "68809": 68745,
      "68810": 68746,
      "68811": 68747,
      "68812": 68748,
      "68813": 68749,
      "68814": 68750,
      "68815": 68751,
      "68816": 68752,
      "68817": 68753,
      "68818": 68754,
      "68819": 68755,
      "68820": 68756,
      "68821": 68757,
      "68822": 68758,
      "68823": 68759,
      "68824": 68760,
      "68825": 68761,
      "68826": 68762,
      "68827": 68763,
      "68828": 68764,
      "68829": 68765,
      "68830": 68766,
      "68831": 68767,
      "68832": 68768,
      "68833": 68769,
      "68834": 68770,
      "68835": 68771,
      "68836": 68772,
      "68837": 68773,
      "68838": 68774,
      "68839": 68775,
      "68840": 68776,
      "68841": 68777,
      "68842": 68778,
      "68843": 68779,
      "68844": 68780,
      "68845": 68781,
      "68846": 68782,
      "68847": 68783,
      "68848": 68784,
      "68849": 68785,
      "68850": 68786,
      "71840": 71872,
      "71841": 71873,
      "71842": 71874,
      "71843": 71875,
      "71844": 71876,
      "71845": 71877,
      "71846": 71878,
      "71847": 71879,
      "71848": 71880,
      "71849": 71881,
      "71850": 71882,
      "71851": 71883,
      "71852": 71884,
      "71853": 71885,
      "71854": 71886,
      "71855": 71887,
      "71856": 71888,
      "71857": 71889,
      "71858": 71890,
      "71859": 71891,
      "71860": 71892,
      "71861": 71893,
      "71862": 71894,
      "71863": 71895,
      "71864": 71896,
      "71865": 71897,
      "71866": 71898,
      "71867": 71899,
      "71868": 71900,
      "71869": 71901,
      "71870": 71902,
      "71871": 71903,
      "71872": 71840,
      "71873": 71841,
      "71874": 71842,
      "71875": 71843,
      "71876": 71844,
      "71877": 71845,
      "71878": 71846,
      "71879": 71847,
      "71880": 71848,
      "71881": 71849,
      "71882": 71850,
      "71883": 71851,
      "71884": 71852,
      "71885": 71853,
      "71886": 71854,
      "71887": 71855,
      "71888": 71856,
      "71889": 71857,
      "71890": 71858,
      "71891": 71859,
      "71892": 71860,
      "71893": 71861,
      "71894": 71862,
      "71895": 71863,
      "71896": 71864,
      "71897": 71865,
      "71898": 71866,
      "71899": 71867,
      "71900": 71868,
      "71901": 71869,
      "71902": 71870,
      "71903": 71871
    };

    var parser = __commonjs(function (module) {
      // regjsparser
      //
      // ==================================================================
      //
      // See ECMA-262 Standard: 15.10.1
      //
      // NOTE: The ECMA-262 standard uses the term "Assertion" for /^/. Here the
      //   term "Anchor" is used.
      //
      // Pattern ::
      //      Disjunction
      //
      // Disjunction ::
      //      Alternative
      //      Alternative | Disjunction
      //
      // Alternative ::
      //      [empty]
      //      Alternative Term
      //
      // Term ::
      //      Anchor
      //      Atom
      //      Atom Quantifier
      //
      // Anchor ::
      //      ^
      //      $
      //      \ b
      //      \ B
      //      ( ? = Disjunction )
      //      ( ? ! Disjunction )
      //
      // Quantifier ::
      //      QuantifierPrefix
      //      QuantifierPrefix ?
      //
      // QuantifierPrefix ::
      //      *
      //      +
      //      ?
      //      { DecimalDigits }
      //      { DecimalDigits , }
      //      { DecimalDigits , DecimalDigits }
      //
      // Atom ::
      //      PatternCharacter
      //      .
      //      \ AtomEscape
      //      CharacterClass
      //      ( Disjunction )
      //      ( ? : Disjunction )
      //
      // PatternCharacter ::
      //      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
      //
      // AtomEscape ::
      //      DecimalEscape
      //      CharacterEscape
      //      CharacterClassEscape
      //
      // CharacterEscape[U] ::
      //      ControlEscape
      //      c ControlLetter
      //      HexEscapeSequence
      //      RegExpUnicodeEscapeSequence[?U] (ES6)
      //      IdentityEscape[?U]
      //
      // ControlEscape ::
      //      one of f n r t v
      // ControlLetter ::
      //      one of
      //          a b c d e f g h i j k l m n o p q r s t u v w x y z
      //          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
      //
      // IdentityEscape ::
      //      SourceCharacter but not IdentifierPart
      //      <ZWJ>
      //      <ZWNJ>
      //
      // DecimalEscape ::
      //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
      //
      // CharacterClassEscape ::
      //      one of d D s S w W
      //
      // CharacterClass ::
      //      [ [lookahead ∉ {^}] ClassRanges ]
      //      [ ^ ClassRanges ]
      //
      // ClassRanges ::
      //      [empty]
      //      NonemptyClassRanges
      //
      // NonemptyClassRanges ::
      //      ClassAtom
      //      ClassAtom NonemptyClassRangesNoDash
      //      ClassAtom - ClassAtom ClassRanges
      //
      // NonemptyClassRangesNoDash ::
      //      ClassAtom
      //      ClassAtomNoDash NonemptyClassRangesNoDash
      //      ClassAtomNoDash - ClassAtom ClassRanges
      //
      // ClassAtom ::
      //      -
      //      ClassAtomNoDash
      //
      // ClassAtomNoDash ::
      //      SourceCharacter but not one of \ or ] or -
      //      \ ClassEscape
      //
      // ClassEscape ::
      //      DecimalEscape
      //      b
      //      CharacterEscape
      //      CharacterClassEscape

      (function () {

        function parse(str, flags) {
          function addRaw(node) {
            node.raw = str.substring(node.range[0], node.range[1]);
            return node;
          }

          function updateRawStart(node, start) {
            node.range[0] = start;
            return addRaw(node);
          }

          function createAnchor(kind, rawLength) {
            return addRaw({
              type: 'anchor',
              kind: kind,
              range: [pos - rawLength, pos]
            });
          }

          function createValue(kind, codePoint, from, to) {
            return addRaw({
              type: 'value',
              kind: kind,
              codePoint: codePoint,
              range: [from, to]
            });
          }

          function createEscaped(kind, codePoint, value, fromOffset) {
            fromOffset = fromOffset || 0;
            return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
          }

          function createCharacter(matches) {
            var _char = matches[0];
            var first = _char.charCodeAt(0);
            if (hasUnicodeFlag) {
              var second;
              if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
                second = lookahead().charCodeAt(0);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                  // Unicode surrogate pair
                  pos++;
                  return createValue('symbol', (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000, pos - 2, pos);
                }
              }
            }
            return createValue('symbol', first, pos - 1, pos);
          }

          function createDisjunction(alternatives, from, to) {
            return addRaw({
              type: 'disjunction',
              body: alternatives,
              range: [from, to]
            });
          }

          function createDot() {
            return addRaw({
              type: 'dot',
              range: [pos - 1, pos]
            });
          }

          function createCharacterClassEscape(value) {
            return addRaw({
              type: 'characterClassEscape',
              value: value,
              range: [pos - 2, pos]
            });
          }

          function createReference(matchIndex) {
            return addRaw({
              type: 'reference',
              matchIndex: parseInt(matchIndex, 10),
              range: [pos - 1 - matchIndex.length, pos]
            });
          }

          function createGroup(behavior, disjunction, from, to) {
            return addRaw({
              type: 'group',
              behavior: behavior,
              body: disjunction,
              range: [from, to]
            });
          }

          function createQuantifier(min, max, from, to) {
            if (to == null) {
              from = pos - 1;
              to = pos;
            }

            return addRaw({
              type: 'quantifier',
              min: min,
              max: max,
              greedy: true,
              body: null, // set later on
              range: [from, to]
            });
          }

          function createAlternative(terms, from, to) {
            return addRaw({
              type: 'alternative',
              body: terms,
              range: [from, to]
            });
          }

          function createCharacterClass(classRanges, negative, from, to) {
            return addRaw({
              type: 'characterClass',
              body: classRanges,
              negative: negative,
              range: [from, to]
            });
          }

          function createClassRange(min, max, from, to) {
            // See 15.10.2.15:
            if (min.codePoint > max.codePoint) {
              bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
            }

            return addRaw({
              type: 'characterClassRange',
              min: min,
              max: max,
              range: [from, to]
            });
          }

          function flattenBody(body) {
            if (body.type === 'alternative') {
              return body.body;
            } else {
              return [body];
            }
          }

          function incr(amount) {
            amount = amount || 1;
            var res = str.substring(pos, pos + amount);
            pos += amount || 1;
            return res;
          }

          function skip(value) {
            if (!match(value)) {
              bail('character', value);
            }
          }

          function match(value) {
            if (str.indexOf(value, pos) === pos) {
              return incr(value.length);
            }
          }

          function lookahead() {
            return str[pos];
          }

          function current(value) {
            return str.indexOf(value, pos) === pos;
          }

          function next(value) {
            return str[pos + 1] === value;
          }

          function matchReg(regExp) {
            var subStr = str.substring(pos);
            var res = subStr.match(regExp);
            if (res) {
              res.range = [];
              res.range[0] = pos;
              incr(res[0].length);
              res.range[1] = pos;
            }
            return res;
          }

          function parseDisjunction() {
            // Disjunction ::
            //      Alternative
            //      Alternative | Disjunction
            var res = [],
                from = pos;
            res.push(parseAlternative());

            while (match('|')) {
              res.push(parseAlternative());
            }

            if (res.length === 1) {
              return res[0];
            }

            return createDisjunction(res, from, pos);
          }

          function parseAlternative() {
            var res = [],
                from = pos;
            var term;

            // Alternative ::
            //      [empty]
            //      Alternative Term
            while (term = parseTerm()) {
              res.push(term);
            }

            if (res.length === 1) {
              return res[0];
            }

            return createAlternative(res, from, pos);
          }

          function parseTerm() {
            // Term ::
            //      Anchor
            //      Atom
            //      Atom Quantifier

            if (pos >= str.length || current('|') || current(')')) {
              return null; /* Means: The term is empty */
            }

            var anchor = parseAnchor();

            if (anchor) {
              return anchor;
            }

            var atom = parseAtom();
            if (!atom) {
              bail('Expected atom');
            }
            var quantifier = parseQuantifier() || false;
            if (quantifier) {
              quantifier.body = flattenBody(atom);
              // The quantifier contains the atom. Therefore, the beginning of the
              // quantifier range is given by the beginning of the atom.
              updateRawStart(quantifier, atom.range[0]);
              return quantifier;
            }
            return atom;
          }

          function parseGroup(matchA, typeA, matchB, typeB) {
            var type = null,
                from = pos;

            if (match(matchA)) {
              type = typeA;
            } else if (match(matchB)) {
              type = typeB;
            } else {
              return false;
            }

            var body = parseDisjunction();
            if (!body) {
              bail('Expected disjunction');
            }
            skip(')');
            var group = createGroup(type, flattenBody(body), from, pos);

            if (type == 'normal') {
              // Keep track of the number of closed groups. This is required for
              // parseDecimalEscape(). In case the string is parsed a second time the
              // value already holds the total count and no incrementation is required.
              if (firstIteration) {
                closedCaptureCounter++;
              }
            }
            return group;
          }

          function parseAnchor() {
            // Anchor ::
            //      ^
            //      $
            //      \ b
            //      \ B
            //      ( ? = Disjunction )
            //      ( ? ! Disjunction )
            var res,
                from = pos;

            if (match('^')) {
              return createAnchor('start', 1 /* rawLength */);
            } else if (match('$')) {
              return createAnchor('end', 1 /* rawLength */);
            } else if (match('\\b')) {
              return createAnchor('boundary', 2 /* rawLength */);
            } else if (match('\\B')) {
              return createAnchor('not-boundary', 2 /* rawLength */);
            } else {
              return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
            }
          }

          function parseQuantifier() {
            // Quantifier ::
            //      QuantifierPrefix
            //      QuantifierPrefix ?
            //
            // QuantifierPrefix ::
            //      *
            //      +
            //      ?
            //      { DecimalDigits }
            //      { DecimalDigits , }
            //      { DecimalDigits , DecimalDigits }

            var res,
                from = pos;
            var quantifier;
            var min, max;

            if (match('*')) {
              quantifier = createQuantifier(0);
            } else if (match('+')) {
              quantifier = createQuantifier(1);
            } else if (match('?')) {
              quantifier = createQuantifier(0, 1);
            } else if (res = matchReg(/^\{([0-9]+)\}/)) {
              min = parseInt(res[1], 10);
              quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
            } else if (res = matchReg(/^\{([0-9]+),\}/)) {
              min = parseInt(res[1], 10);
              quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
            } else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
              min = parseInt(res[1], 10);
              max = parseInt(res[2], 10);
              if (min > max) {
                bail('numbers out of order in {} quantifier', '', from, pos);
              }
              quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
            }

            if (quantifier) {
              if (match('?')) {
                quantifier.greedy = false;
                quantifier.range[1] += 1;
              }
            }

            return quantifier;
          }

          function parseAtom() {
            // Atom ::
            //      PatternCharacter
            //      .
            //      \ AtomEscape
            //      CharacterClass
            //      ( Disjunction )
            //      ( ? : Disjunction )

            var res;

            // jviereck: allow ']', '}' here as well to be compatible with browser's
            //   implementations: ']'.match(/]/);
            // if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
            if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
              //      PatternCharacter
              return createCharacter(res);
            } else if (match('.')) {
              //      .
              return createDot();
            } else if (match('\\')) {
              //      \ AtomEscape
              res = parseAtomEscape();
              if (!res) {
                bail('atomEscape');
              }
              return res;
            } else if (res = parseCharacterClass()) {
              return res;
            } else {
              //      ( Disjunction )
              //      ( ? : Disjunction )
              return parseGroup('(?:', 'ignore', '(', 'normal');
            }
          }

          function parseUnicodeSurrogatePairEscape(firstEscape) {
            if (hasUnicodeFlag) {
              var first, second;
              if (firstEscape.kind == 'unicodeEscape' && (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF && current('\\') && next('u')) {
                var prevPos = pos;
                pos++;
                var secondEscape = parseClassEscape();
                if (secondEscape.kind == 'unicodeEscape' && (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
                  // Unicode surrogate pair
                  firstEscape.range[1] = secondEscape.range[1];
                  firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                  firstEscape.type = 'value';
                  firstEscape.kind = 'unicodeCodePointEscape';
                  addRaw(firstEscape);
                } else {
                  pos = prevPos;
                }
              }
            }
            return firstEscape;
          }

          function parseClassEscape() {
            return parseAtomEscape(true);
          }

          function parseAtomEscape(insideCharacterClass) {
            // AtomEscape ::
            //      DecimalEscape
            //      CharacterEscape
            //      CharacterClassEscape

            var res,
                from = pos;

            res = parseDecimalEscape();
            if (res) {
              return res;
            }

            // For ClassEscape
            if (insideCharacterClass) {
              if (match('b')) {
                // 15.10.2.19
                // The production ClassEscape :: b evaluates by returning the
                // CharSet containing the one character <BS> (Unicode value 0008).
                return createEscaped('singleEscape', 0x0008, '\\b');
              } else if (match('B')) {
                bail('\\B not possible inside of CharacterClass', '', from);
              }
            }

            res = parseCharacterEscape();

            return res;
          }

          function parseDecimalEscape() {
            // DecimalEscape ::
            //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
            //      CharacterClassEscape :: one of d D s S w W

            var res, match;

            if (res = matchReg(/^(?!0)\d+/)) {
              match = res[0];
              var refIdx = parseInt(res[0], 10);
              if (refIdx <= closedCaptureCounter) {
                // If the number is smaller than the normal-groups found so
                // far, then it is a reference...
                return createReference(res[0]);
              } else {
                // ... otherwise it needs to be interpreted as a octal (if the
                // number is in an octal format). If it is NOT octal format,
                // then the slash is ignored and the number is matched later
                // as normal characters.

                // Recall the negative decision to decide if the input must be parsed
                // a second time with the total normal-groups.
                backrefDenied.push(refIdx);

                // Reset the position again, as maybe only parts of the previous
                // matched numbers are actual octal numbers. E.g. in '019' only
                // the '01' should be matched.
                incr(-res[0].length);
                if (res = matchReg(/^[0-7]{1,3}/)) {
                  return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
                } else {
                  // If we end up here, we have a case like /\91/. Then the
                  // first slash is to be ignored and the 9 & 1 to be treated
                  // like ordinary characters. Create a character for the
                  // first number only here - other number-characters
                  // (if available) will be matched later.
                  res = createCharacter(matchReg(/^[89]/));
                  return updateRawStart(res, res.range[0] - 1);
                }
              }
            }
            // Only allow octal numbers in the following. All matched numbers start
            // with a zero (if the do not, the previous if-branch is executed).
            // If the number is not octal format and starts with zero (e.g. `091`)
            // then only the zeros `0` is treated here and the `91` are ordinary
            // characters.
            // Example:
            //   /\091/.exec('\091')[0].length === 3
            else if (res = matchReg(/^[0-7]{1,3}/)) {
                match = res[0];
                if (/^0{1,3}$/.test(match)) {
                  // If they are all zeros, then only take the first one.
                  return createEscaped('null', 0x0000, '0', match.length + 1);
                } else {
                  return createEscaped('octal', parseInt(match, 8), match, 1);
                }
              } else if (res = matchReg(/^[dDsSwW]/)) {
                return createCharacterClassEscape(res[0]);
              }
            return false;
          }

          function parseCharacterEscape() {
            // CharacterEscape ::
            //      ControlEscape
            //      c ControlLetter
            //      HexEscapeSequence
            //      UnicodeEscapeSequence
            //      IdentityEscape

            var res;
            if (res = matchReg(/^[fnrtv]/)) {
              // ControlEscape
              var codePoint = 0;
              switch (res[0]) {
                case 't':
                  codePoint = 0x009;break;
                case 'n':
                  codePoint = 0x00A;break;
                case 'v':
                  codePoint = 0x00B;break;
                case 'f':
                  codePoint = 0x00C;break;
                case 'r':
                  codePoint = 0x00D;break;
              }
              return createEscaped('singleEscape', codePoint, '\\' + res[0]);
            } else if (res = matchReg(/^c([a-zA-Z])/)) {
              // c ControlLetter
              return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
            } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
              // HexEscapeSequence
              return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
            } else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
              // UnicodeEscapeSequence
              return parseUnicodeSurrogatePairEscape(createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2));
            } else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
              // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
              return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
            } else {
              // IdentityEscape
              return parseIdentityEscape();
            }
          }

          // Taken from the Esprima parser.
          function isIdentifierPart(ch) {
            // Generated by `tools/generate-identifier-regex.js`.
            var NonAsciiIdentifierPart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

            return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
            ch >= 65 && ch <= 90 || // A..Z
            ch >= 97 && ch <= 122 || // a..z
            ch >= 48 && ch <= 57 || // 0..9
            ch === 92 || // \ (backslash)
            ch >= 0x80 && NonAsciiIdentifierPart.test(String.fromCharCode(ch));
          }

          function parseIdentityEscape() {
            // IdentityEscape ::
            //      SourceCharacter but not IdentifierPart
            //      <ZWJ>
            //      <ZWNJ>

            var ZWJ = '\u200C';
            var ZWNJ = '\u200D';

            var tmp;

            if (!isIdentifierPart(lookahead())) {
              tmp = incr();
              return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
            }

            if (match(ZWJ)) {
              // <ZWJ>
              return createEscaped('identifier', 0x200C, ZWJ);
            } else if (match(ZWNJ)) {
              // <ZWNJ>
              return createEscaped('identifier', 0x200D, ZWNJ);
            }

            return null;
          }

          function parseCharacterClass() {
            // CharacterClass ::
            //      [ [lookahead ∉ {^}] ClassRanges ]
            //      [ ^ ClassRanges ]

            var res,
                from = pos;
            if (res = matchReg(/^\[\^/)) {
              res = parseClassRanges();
              skip(']');
              return createCharacterClass(res, true, from, pos);
            } else if (match('[')) {
              res = parseClassRanges();
              skip(']');
              return createCharacterClass(res, false, from, pos);
            }

            return null;
          }

          function parseClassRanges() {
            // ClassRanges ::
            //      [empty]
            //      NonemptyClassRanges

            var res;
            if (current(']')) {
              // Empty array means nothing insinde of the ClassRange.
              return [];
            } else {
              res = parseNonemptyClassRanges();
              if (!res) {
                bail('nonEmptyClassRanges');
              }
              return res;
            }
          }

          function parseHelperClassRanges(atom) {
            var from, to, res;
            if (current('-') && !next(']')) {
              // ClassAtom - ClassAtom ClassRanges
              skip('-');

              res = parseClassAtom();
              if (!res) {
                bail('classAtom');
              }
              to = pos;
              var classRanges = parseClassRanges();
              if (!classRanges) {
                bail('classRanges');
              }
              from = atom.range[0];
              if (classRanges.type === 'empty') {
                return [createClassRange(atom, res, from, to)];
              }
              return [createClassRange(atom, res, from, to)].concat(classRanges);
            }

            res = parseNonemptyClassRangesNoDash();
            if (!res) {
              bail('nonEmptyClassRangesNoDash');
            }

            return [atom].concat(res);
          }

          function parseNonemptyClassRanges() {
            // NonemptyClassRanges ::
            //      ClassAtom
            //      ClassAtom NonemptyClassRangesNoDash
            //      ClassAtom - ClassAtom ClassRanges

            var atom = parseClassAtom();
            if (!atom) {
              bail('classAtom');
            }

            if (current(']')) {
              // ClassAtom
              return [atom];
            }

            // ClassAtom NonemptyClassRangesNoDash
            // ClassAtom - ClassAtom ClassRanges
            return parseHelperClassRanges(atom);
          }

          function parseNonemptyClassRangesNoDash() {
            // NonemptyClassRangesNoDash ::
            //      ClassAtom
            //      ClassAtomNoDash NonemptyClassRangesNoDash
            //      ClassAtomNoDash - ClassAtom ClassRanges

            var res = parseClassAtom();
            if (!res) {
              bail('classAtom');
            }
            if (current(']')) {
              //      ClassAtom
              return res;
            }

            // ClassAtomNoDash NonemptyClassRangesNoDash
            // ClassAtomNoDash - ClassAtom ClassRanges
            return parseHelperClassRanges(res);
          }

          function parseClassAtom() {
            // ClassAtom ::
            //      -
            //      ClassAtomNoDash
            if (match('-')) {
              return createCharacter('-');
            } else {
              return parseClassAtomNoDash();
            }
          }

          function parseClassAtomNoDash() {
            // ClassAtomNoDash ::
            //      SourceCharacter but not one of \ or ] or -
            //      \ ClassEscape

            var res;
            if (res = matchReg(/^[^\\\]-]/)) {
              return createCharacter(res[0]);
            } else if (match('\\')) {
              res = parseClassEscape();
              if (!res) {
                bail('classEscape');
              }

              return parseUnicodeSurrogatePairEscape(res);
            }
          }

          function bail(message, details, from, to) {
            from = from == null ? pos : from;
            to = to == null ? from : to;

            var contextStart = Math.max(0, from - 10);
            var contextEnd = Math.min(to + 10, str.length);

            // Output a bit of context and a line pointing to where our error is.
            //
            // We are assuming that there are no actual newlines in the content as this is a regular expression.
            var context = '    ' + str.substring(contextStart, contextEnd);
            var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';

            throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
          }

          var backrefDenied = [];
          var closedCaptureCounter = 0;
          var firstIteration = true;
          var hasUnicodeFlag = (flags || "").indexOf("u") !== -1;
          var pos = 0;

          // Convert the input to a string and treat the empty string special.
          str = String(str);
          if (str === '') {
            str = '(?:)';
          }

          var result = parseDisjunction();

          if (result.range[1] !== str.length) {
            bail('Could not parse entire input - got stuck', '', result.range[1]);
          }

          // The spec requires to interpret the `\2` in `/\2()()/` as backreference.
          // As the parser collects the number of capture groups as the string is
          // parsed it is impossible to make these decisions at the point when the
          // `\2` is handled. In case the local decision turns out to be wrong after
          // the parsing has finished, the input string is parsed a second time with
          // the total number of capture groups set.
          //
          // SEE: https://github.com/jviereck/regjsparser/issues/70
          for (var i = 0; i < backrefDenied.length; i++) {
            if (backrefDenied[i] <= closedCaptureCounter) {
              // Parse the input a second time.
              pos = 0;
              firstIteration = false;
              return parseDisjunction();
            }
          }

          return result;
        }

        var regjsparser = {
          parse: parse
        };

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = regjsparser;
        } else {
          window.regjsparser = regjsparser;
        }
      })();
    });

    var require$$3 = parser && (typeof parser === 'undefined' ? 'undefined' : _typeof(parser)) === 'object' && 'default' in parser ? parser['default'] : parser;

    var regjsgen = __commonjs(function (module, exports, global) {
      /*!
       * RegJSGen
       * Copyright 2014 Benjamin Tan <https://d10.github.io/>
       * Available under MIT license <http://d10.mit-license.org/>
       */
      (function () {
        'use strict';

        /** Used to determine if values are of the language type `Object` */

        var objectTypes = {
          'function': true,
          'object': true
        };

        /** Used as a reference to the global object */
        var root = objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window || this;

        /** Backup possible global object */
        var oldRoot = root;

        /** Detect free variable `exports` */
        var freeExports = objectTypes[typeof exports === 'undefined' ? 'undefined' : _typeof(exports)] && exports;

        /** Detect free variable `module` */
        var freeModule = objectTypes[typeof module === 'undefined' ? 'undefined' : _typeof(module)] && module && !module.nodeType && module;

        /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
        var freeGlobal = freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
          root = freeGlobal;
        }

        /*--------------------------------------------------------------------------*/

        /*! Based on https://mths.be/fromcodepoint v0.2.0 by @mathias */

        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        function fromCodePoint() {
          var MAX_SIZE = 0x4000;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return '';
          }
          var result = '';
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) != codePoint // not an integer
            ) {
                throw RangeError('Invalid code point: ' + codePoint);
              }
            if (codePoint <= 0xFFFF) {
              // BMP code point
              codeUnits.push(codePoint);
            } else {
              // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = codePoint % 0x400 + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        }

        function assertType(type, expected) {
          if (expected.indexOf('|') == -1) {
            if (type == expected) {
              return;
            }

            throw Error('Invalid node type: ' + type);
          }

          expected = assertType.hasOwnProperty(expected) ? assertType[expected] : assertType[expected] = RegExp('^(?:' + expected + ')$');

          if (expected.test(type)) {
            return;
          }

          throw Error('Invalid node type: ' + type);
        }

        /*--------------------------------------------------------------------------*/

        function generate(node) {
          var type = node.type;

          if (generate.hasOwnProperty(type) && typeof generate[type] == 'function') {
            return generate[type](node);
          }

          throw Error('Invalid node type: ' + type);
        }

        /*--------------------------------------------------------------------------*/

        function generateAlternative(node) {
          assertType(node.type, 'alternative');

          var terms = node.body,
              length = terms ? terms.length : 0;

          if (length == 1) {
            return generateTerm(terms[0]);
          } else {
            var i = -1,
                result = '';

            while (++i < length) {
              result += generateTerm(terms[i]);
            }

            return result;
          }
        }

        function generateAnchor(node) {
          assertType(node.type, 'anchor');

          switch (node.kind) {
            case 'start':
              return '^';
            case 'end':
              return '$';
            case 'boundary':
              return '\\b';
            case 'not-boundary':
              return '\\B';
            default:
              throw Error('Invalid assertion');
          }
        }

        function generateAtom(node) {
          assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

          return generate(node);
        }

        function generateCharacterClass(node) {
          assertType(node.type, 'characterClass');

          var classRanges = node.body,
              length = classRanges ? classRanges.length : 0;

          var i = -1,
              result = '[';

          if (node.negative) {
            result += '^';
          }

          while (++i < length) {
            result += generateClassAtom(classRanges[i]);
          }

          result += ']';

          return result;
        }

        function generateCharacterClassEscape(node) {
          assertType(node.type, 'characterClassEscape');

          return '\\' + node.value;
        }

        function generateCharacterClassRange(node) {
          assertType(node.type, 'characterClassRange');

          var min = node.min,
              max = node.max;

          if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
            throw Error('Invalid character class range');
          }

          return generateClassAtom(min) + '-' + generateClassAtom(max);
        }

        function generateClassAtom(node) {
          assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

          return generate(node);
        }

        function generateDisjunction(node) {
          assertType(node.type, 'disjunction');

          var body = node.body,
              length = body ? body.length : 0;

          if (length == 0) {
            throw Error('No body');
          } else if (length == 1) {
            return generate(body[0]);
          } else {
            var i = -1,
                result = '';

            while (++i < length) {
              if (i != 0) {
                result += '|';
              }
              result += generate(body[i]);
            }

            return result;
          }
        }

        function generateDot(node) {
          assertType(node.type, 'dot');

          return '.';
        }

        function generateGroup(node) {
          assertType(node.type, 'group');

          var result = '(';

          switch (node.behavior) {
            case 'normal':
              break;
            case 'ignore':
              result += '?:';
              break;
            case 'lookahead':
              result += '?=';
              break;
            case 'negativeLookahead':
              result += '?!';
              break;
            default:
              throw Error('Invalid behaviour: ' + node.behaviour);
          }

          var body = node.body,
              length = body ? body.length : 0;

          if (length == 1) {
            result += generate(body[0]);
          } else {
            var i = -1;

            while (++i < length) {
              result += generate(body[i]);
            }
          }

          result += ')';

          return result;
        }

        function generateQuantifier(node) {
          assertType(node.type, 'quantifier');

          var quantifier = '',
              min = node.min,
              max = node.max;

          switch (max) {
            case undefined:
            case null:
              switch (min) {
                case 0:
                  quantifier = '*';
                  break;
                case 1:
                  quantifier = '+';
                  break;
                default:
                  quantifier = '{' + min + ',}';
                  break;
              }
              break;
            default:
              if (min == max) {
                quantifier = '{' + min + '}';
              } else if (min == 0 && max == 1) {
                quantifier = '?';
              } else {
                quantifier = '{' + min + ',' + max + '}';
              }
              break;
          }

          if (!node.greedy) {
            quantifier += '?';
          }

          return generateAtom(node.body[0]) + quantifier;
        }

        function generateReference(node) {
          assertType(node.type, 'reference');

          return '\\' + node.matchIndex;
        }

        function generateTerm(node) {
          assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|value');

          return generate(node);
        }

        function generateValue(node) {
          assertType(node.type, 'value');

          var kind = node.kind,
              codePoint = node.codePoint;

          switch (kind) {
            case 'controlLetter':
              return '\\c' + fromCodePoint(codePoint + 64);
            case 'hexadecimalEscape':
              return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
            case 'identifier':
              return '\\' + fromCodePoint(codePoint);
            case 'null':
              return '\\' + codePoint;
            case 'octal':
              return '\\' + codePoint.toString(8);
            case 'singleEscape':
              switch (codePoint) {
                case 0x0008:
                  return '\\b';
                case 0x009:
                  return '\\t';
                case 0x00A:
                  return '\\n';
                case 0x00B:
                  return '\\v';
                case 0x00C:
                  return '\\f';
                case 0x00D:
                  return '\\r';
                default:
                  throw Error('Invalid codepoint: ' + codePoint);
              }
            case 'symbol':
              return fromCodePoint(codePoint);
            case 'unicodeEscape':
              return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
            case 'unicodeCodePointEscape':
              return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
            default:
              throw Error('Unsupported node kind: ' + kind);
          }
        }

        /*--------------------------------------------------------------------------*/

        generate.alternative = generateAlternative;
        generate.anchor = generateAnchor;
        generate.characterClass = generateCharacterClass;
        generate.characterClassEscape = generateCharacterClassEscape;
        generate.characterClassRange = generateCharacterClassRange;
        generate.disjunction = generateDisjunction;
        generate.dot = generateDot;
        generate.group = generateGroup;
        generate.quantifier = generateQuantifier;
        generate.reference = generateReference;
        generate.value = generateValue;

        /*--------------------------------------------------------------------------*/

        // export regjsgen
        // some AMD build optimizers, like r.js, check for condition patterns like the following:
        if (false) {
          // define as an anonymous module so, through path mapping, it can be aliased
          undefined(function () {
            return {
              'generate': generate
            };
          });
        }
        // check for `exports` after `define` in case a build optimizer adds an `exports` object
        else if (freeExports && freeModule) {
            // in Narwhal, Node.js, Rhino -require, or RingoJS
            freeExports.generate = generate;
          }
          // in a browser or Rhino
          else {
              root.regjsgen = {
                'generate': generate
              };
            }
      }).call(__commonjs_global);
    });

    var require$$4 = regjsgen && (typeof regjsgen === 'undefined' ? 'undefined' : _typeof(regjsgen)) === 'object' && 'default' in regjsgen ? regjsgen['default'] : regjsgen;

    var rewritePattern = __commonjs(function (module) {
      var generate = require$$4.generate;
      var parse = require$$3.parse;
      var regenerate = require$$0$2;
      var iuMappings = require$$1;
      var ESCAPE_SETS = require$$0$1;

      function getCharacterClassEscapeSet(character) {
        if (unicode) {
          if (ignoreCase) {
            return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
          }
          return ESCAPE_SETS.UNICODE[character];
        }
        return ESCAPE_SETS.REGULAR[character];
      }

      var object = {};
      var hasOwnProperty = object.hasOwnProperty;
      function has(object, property) {
        return hasOwnProperty.call(object, property);
      }

      // Prepare a Regenerate set containing all code points, used for negative
      // character classes (if any).
      var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
      // Without the `u` flag, the range stops at 0xFFFF.
      // https://mths.be/es6#sec-pattern-semantics
      var BMP_SET = regenerate().addRange(0x0, 0xFFFF);

      // Prepare a Regenerate set containing all code points that are supposed to be
      // matched by `/./u`. https://mths.be/es6#sec-atom
      var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
      .remove(
      // minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
      0x000A, // Line Feed <LF>
      0x000D, // Carriage Return <CR>
      0x2028, // Line Separator <LS>
      0x2029 // Paragraph Separator <PS>
      );
      // Prepare a Regenerate set containing all code points that are supposed to be
      // matched by `/./` (only BMP code points).
      var DOT_SET = DOT_SET_UNICODE.clone().intersection(BMP_SET);

      // Add a range of code points + any case-folded code points in that range to a
      // set.
      regenerate.prototype.iuAddRange = function (min, max) {
        var $this = this;
        do {
          var folded = caseFold(min);
          if (folded) {
            $this.add(folded);
          }
        } while (++min <= max);
        return $this;
      };

      function assign(target, source) {
        for (var key in source) {
          // Note: `hasOwnProperty` is not needed here.
          target[key] = source[key];
        }
      }

      function update(item, pattern) {
        // TODO: Test if memoizing `pattern` here is worth the effort.
        if (!pattern) {
          return;
        }
        var tree = parse(pattern, '');
        switch (tree.type) {
          case 'characterClass':
          case 'group':
          case 'value':
            // No wrapping needed.
            break;
          default:
            // Wrap the pattern in a non-capturing group.
            tree = wrap(tree, pattern);
        }
        assign(item, tree);
      }

      function wrap(tree, pattern) {
        // Wrap the pattern in a non-capturing group.
        return {
          'type': 'group',
          'behavior': 'ignore',
          'body': [tree],
          'raw': '(?:' + pattern + ')'
        };
      }

      function caseFold(codePoint) {
        return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
      }

      var ignoreCase = false;
      var unicode = false;
      function processCharacterClass(characterClassItem) {
        var set$$1 = regenerate();
        var body = characterClassItem.body.forEach(function (item) {
          switch (item.type) {
            case 'value':
              set$$1.add(item.codePoint);
              if (ignoreCase && unicode) {
                var folded = caseFold(item.codePoint);
                if (folded) {
                  set$$1.add(folded);
                }
              }
              break;
            case 'characterClassRange':
              var min = item.min.codePoint;
              var max = item.max.codePoint;
              set$$1.addRange(min, max);
              if (ignoreCase && unicode) {
                set$$1.iuAddRange(min, max);
              }
              break;
            case 'characterClassEscape':
              set$$1.add(getCharacterClassEscapeSet(item.value));
              break;
            // The `default` clause is only here as a safeguard; it should never be
            // reached. Code coverage tools should ignore it.
            /* istanbul ignore next */
            default:
              throw Error('Unknown term type: ' + item.type);
          }
        });
        if (characterClassItem.negative) {
          set$$1 = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set$$1);
        }
        update(characterClassItem, set$$1.toString());
        return characterClassItem;
      }

      function processTerm(item) {
        switch (item.type) {
          case 'dot':
            update(item, (unicode ? DOT_SET_UNICODE : DOT_SET).toString());
            break;
          case 'characterClass':
            item = processCharacterClass(item);
            break;
          case 'characterClassEscape':
            update(item, getCharacterClassEscapeSet(item.value).toString());
            break;
          case 'alternative':
          case 'disjunction':
          case 'group':
          case 'quantifier':
            item.body = item.body.map(processTerm);
            break;
          case 'value':
            var codePoint = item.codePoint;
            var set$$1 = regenerate(codePoint);
            if (ignoreCase && unicode) {
              var folded = caseFold(codePoint);
              if (folded) {
                set$$1.add(folded);
              }
            }
            update(item, set$$1.toString());
            break;
          case 'anchor':
          case 'empty':
          case 'group':
          case 'reference':
            // Nothing to do here.
            break;
          // The `default` clause is only here as a safeguard; it should never be
          // reached. Code coverage tools should ignore it.
          /* istanbul ignore next */
          default:
            throw Error('Unknown term type: ' + item.type);
        }
        return item;
      }

      module.exports = function (pattern, flags) {
        var tree = parse(pattern, flags);
        ignoreCase = flags ? flags.indexOf('i') > -1 : false;
        unicode = flags ? flags.indexOf('u') > -1 : false;
        assign(tree, processTerm(tree));
        return generate(tree);
      };
    });

    var rewritePattern$1 = rewritePattern && (typeof rewritePattern === 'undefined' ? 'undefined' : _typeof(rewritePattern)) === 'object' && 'default' in rewritePattern ? rewritePattern['default'] : rewritePattern;

    var Literal = function (Node) {
      function Literal() {
        Node.apply(this, arguments);
      }

      if (Node) Literal.__proto__ = Node;
      Literal.prototype = Object.create(Node && Node.prototype);
      Literal.prototype.constructor = Literal;

      Literal.prototype.initialise = function initialise() {
        if (typeof this.value === 'string') {
          this.program.indentExclusionElements.push(this);
        }
      };

      Literal.prototype.transpile = function transpile(code, transforms) {
        if (transforms.numericLiteral) {
          var leading = this.raw.slice(0, 2);
          if (leading === '0b' || leading === '0o') {
            code.overwrite(this.start, this.end, String(this.value), true);
          }
        }

        if (this.regex) {
          var ref = this.regex;
          var pattern = ref.pattern;
          var flags = ref.flags;

          if (transforms.stickyRegExp && /y/.test(flags)) throw new CompileError(this, 'Regular expression sticky flag is not supported');
          if (transforms.unicodeRegExp && /u/.test(flags)) {
            code.overwrite(this.start, this.end, "/" + rewritePattern$1(pattern, flags) + "/" + flags.replace('u', ''));
          }
        }
      };

      return Literal;
    }(Node);

    var MemberExpression = function (Node) {
      function MemberExpression() {
        Node.apply(this, arguments);
      }

      if (Node) MemberExpression.__proto__ = Node;
      MemberExpression.prototype = Object.create(Node && Node.prototype);
      MemberExpression.prototype.constructor = MemberExpression;

      MemberExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.reservedProperties && reserved[this.property.name]) {
          code.overwrite(this.object.end, this.property.start, "['");
          code.insertLeft(this.property.end, "']");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return MemberExpression;
    }(Node);

    var NewExpression = function (Node) {
      function NewExpression() {
        Node.apply(this, arguments);
      }

      if (Node) NewExpression.__proto__ = Node;
      NewExpression.prototype = Object.create(Node && Node.prototype);
      NewExpression.prototype.constructor = NewExpression;

      NewExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.arguments.length) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.arguments.length;
          while (i--) {
            var arg = this$1.arguments[i];
            if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
              break;
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      NewExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest && this.arguments.length) {
          var firstArgument = this.arguments[0];
          var isNew = true;
          var hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias, isNew);

          if (hasSpreadElements) {
            code.insertRight(this.start + 'new'.length, ' (Function.prototype.bind.apply(');
            code.overwrite(this.callee.end, firstArgument.start, ', [ null ].concat( ');
            code.insertLeft(this.end, ' ))');
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return NewExpression;
    }(Node);

    var ObjectExpression = function (Node) {
      function ObjectExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ObjectExpression.__proto__ = Node;
      ObjectExpression.prototype = Object.create(Node && Node.prototype);
      ObjectExpression.prototype.constructor = ObjectExpression;

      ObjectExpression.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        Node.prototype.transpile.call(this, code, transforms);

        var firstPropertyStart = this.start + 1;
        var regularPropertyCount = 0;
        var spreadPropertyCount = 0;
        var computedPropertyCount = 0;

        for (var i$2 = 0, list = this.properties; i$2 < list.length; i$2 += 1) {
          var prop = list[i$2];

          if (prop.type === 'SpreadProperty') {
            spreadPropertyCount += 1;
          } else if (prop.computed) {
            computedPropertyCount += 1;
          } else if (prop.type === 'Property') {
            regularPropertyCount += 1;
          }
        }

        if (spreadPropertyCount) {
          if (!this.program.options.objectAssign) {
            throw new CompileError(this, 'Object spread operator requires specified objectAssign option with \'Object.assign\' or polyfill helper.');
          }
          // enclose run of non-spread properties in curlies
          var i = this.properties.length;
          if (regularPropertyCount) {
            while (i--) {
              var prop$1 = this$1.properties[i];

              if (prop$1.type === 'Property' && !prop$1.computed) {
                var lastProp = this$1.properties[i - 1];
                var nextProp = this$1.properties[i + 1];

                if (!lastProp || lastProp.type !== 'Property' || lastProp.computed) {
                  code.insertRight(prop$1.start, '{');
                }

                if (!nextProp || nextProp.type !== 'Property' || nextProp.computed) {
                  code.insertLeft(prop$1.end, '}');
                }
              }
            }
          }

          // wrap the whole thing in Object.assign
          firstPropertyStart = this.properties[0].start;
          code.overwrite(this.start, firstPropertyStart, this.program.options.objectAssign + "({}, ");
          code.overwrite(this.properties[this.properties.length - 1].end, this.end, ')');
        }

        if (computedPropertyCount && transforms.computedProperty) {
          var i0 = this.getIndentation();

          var isSimpleAssignment;
          var name;

          if (this.parent.type === 'VariableDeclarator' && this.parent.parent.declarations.length === 1) {
            isSimpleAssignment = true;
            name = this.parent.id.alias || this.parent.id.name; // TODO is this right?
          } else if (this.parent.type === 'AssignmentExpression' && this.parent.parent.type === 'ExpressionStatement' && this.parent.left.type === 'Identifier') {
            isSimpleAssignment = true;
            name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
          } else if (this.parent.type === 'AssignmentPattern' && this.parent.left.type === 'Identifier') {
            isSimpleAssignment = true;
            name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
          }

          // handle block scoping
          var declaration = this.findScope(false).findDeclaration(name);
          if (declaration) name = declaration.name;

          var start = firstPropertyStart;
          var end = this.end;

          if (isSimpleAssignment) {
            // ???
          } else {
            name = this.findScope(true).createIdentifier('obj');

            var statement = this.findNearest(/(?:Statement|Declaration)$/);
            code.insertLeft(statement.end, "\n" + i0 + "var " + name + ";");

            code.insertRight(this.start, "( " + name + " = ");
          }

          var len = this.properties.length;
          var lastComputedProp;
          var sawNonComputedProperty = false;

          for (var i$1 = 0; i$1 < len; i$1 += 1) {
            var prop$2 = this$1.properties[i$1];

            if (prop$2.computed) {
              lastComputedProp = prop$2;
              var moveStart = i$1 > 0 ? this$1.properties[i$1 - 1].end : start;

              var propId = isSimpleAssignment ? ";\n" + i0 + name : ", " + name;

              if (moveStart < prop$2.start) {
                code.overwrite(moveStart, prop$2.start, propId);
              } else {
                code.insertRight(prop$2.start, propId);
              }

              var c = prop$2.key.end;
              while (code.original[c] !== ']') {
                c += 1;
              }c += 1;

              if (prop$2.value.start > c) code.remove(c, prop$2.value.start);
              code.insertLeft(c, ' = ');
              code.move(moveStart, prop$2.end, end);

              if (i$1 < len - 1 && !sawNonComputedProperty) {
                // remove trailing comma
                c = prop$2.end;
                while (code.original[c] !== ',') {
                  c += 1;
                }code.remove(prop$2.end, c + 1);
              }

              if (prop$2.method && transforms.conciseMethodProperty) {
                code.insertRight(prop$2.value.start, 'function ');
              }
            } else {
              sawNonComputedProperty = true;
            }
          }

          // special case
          if (computedPropertyCount === len) {
            code.remove(this.properties[len - 1].end, this.end - 1);
          }

          if (!isSimpleAssignment) {
            code.insertLeft(lastComputedProp.end, ", " + name + " )");
          }
        }
      };

      return ObjectExpression;
    }(Node);

    var Property = function (Node) {
      function Property() {
        Node.apply(this, arguments);
      }

      if (Node) Property.__proto__ = Node;
      Property.prototype = Object.create(Node && Node.prototype);
      Property.prototype.constructor = Property;

      Property.prototype.transpile = function transpile(code, transforms) {
        if (transforms.conciseMethodProperty && !this.computed && this.parent.type !== 'ObjectPattern') {
          if (this.shorthand) {
            code.insertRight(this.start, this.key.name + ": ");
          } else if (this.method) {
            var name = '';
            if (this.program.options.namedFunctionExpressions !== false) {
              if (this.key.type === 'Literal' && typeof this.key.value === 'number') {
                name = "";
              } else if (this.key.type === 'Identifier') {
                if (reserved[this.key.name] || !/^[a-z_$][a-z0-9_$]*$/i.test(this.key.name) || this.value.body.scope.references[this.key.name]) {
                  name = this.findScope(true).createIdentifier(this.key.name);
                } else {
                  name = this.key.name;
                }
              } else {
                name = this.findScope(true).createIdentifier(this.key.value);
              }
              name = ' ' + name;
            }

            if (this.value.generator) code.remove(this.start, this.key.start);
            code.insertLeft(this.key.end, ": function" + (this.value.generator ? '*' : '') + name);
          }
        }

        if (transforms.reservedProperties && reserved[this.key.name]) {
          code.insertRight(this.key.start, "'");
          code.insertLeft(this.key.end, "'");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return Property;
    }(Node);

    var ReturnStatement = function (Node) {
      function ReturnStatement() {
        Node.apply(this, arguments);
      }

      if (Node) ReturnStatement.__proto__ = Node;
      ReturnStatement.prototype = Object.create(Node && Node.prototype);
      ReturnStatement.prototype.constructor = ReturnStatement;

      ReturnStatement.prototype.initialise = function initialise(transforms) {
        this.loop = this.findNearest(loopStatement);
        this.nearestFunction = this.findNearest(/Function/);

        if (this.loop && (!this.nearestFunction || this.loop.depth > this.nearestFunction.depth)) {
          this.loop.canReturn = true;
          this.shouldWrap = true;
        }

        if (this.argument) this.argument.initialise(transforms);
      };

      ReturnStatement.prototype.transpile = function transpile(code, transforms) {
        var shouldWrap = this.shouldWrap && this.loop && this.loop.shouldRewriteAsFunction;

        if (this.argument) {
          if (shouldWrap) code.insertRight(this.argument.start, "{ v: ");
          this.argument.transpile(code, transforms);
          if (shouldWrap) code.insertLeft(this.argument.end, " }");
        } else if (shouldWrap) {
          code.insertLeft(this.start + 6, ' {}');
        }
      };

      return ReturnStatement;
    }(Node);

    var SpreadProperty = function (Node) {
      function SpreadProperty() {
        Node.apply(this, arguments);
      }

      if (Node) SpreadProperty.__proto__ = Node;
      SpreadProperty.prototype = Object.create(Node && Node.prototype);
      SpreadProperty.prototype.constructor = SpreadProperty;

      SpreadProperty.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.argument.start);
        code.remove(this.argument.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return SpreadProperty;
    }(Node);

    var Super = function (Node) {
      function Super() {
        Node.apply(this, arguments);
      }

      if (Node) Super.__proto__ = Node;
      Super.prototype = Object.create(Node && Node.prototype);
      Super.prototype.constructor = Super;

      Super.prototype.initialise = function initialise(transforms) {
        if (transforms.classes) {
          this.method = this.findNearest('MethodDefinition');
          if (!this.method) throw new CompileError(this, 'use of super outside class method');

          var parentClass = this.findNearest('ClassBody').parent;
          this.superClassName = parentClass.superClass && (parentClass.superClass.name || 'superclass');

          if (!this.superClassName) throw new CompileError(this, 'super used in base class');

          this.isCalled = this.parent.type === 'CallExpression' && this === this.parent.callee;

          if (this.method.kind !== 'constructor' && this.isCalled) {
            throw new CompileError(this, 'super() not allowed outside class constructor');
          }

          this.isMember = this.parent.type === 'MemberExpression';

          if (!this.isCalled && !this.isMember) {
            throw new CompileError(this, 'Unexpected use of `super` (expected `super(...)` or `super.*`)');
          }
        }

        if (transforms.arrow) {
          var lexicalBoundary = this.findLexicalBoundary();
          var arrowFunction = this.findNearest('ArrowFunctionExpression');
          var loop = this.findNearest(loopStatement);

          if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
            this.thisAlias = lexicalBoundary.getThisAlias();
          }

          if (loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth) {
            this.thisAlias = lexicalBoundary.getThisAlias();
          }
        }
      };

      Super.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          var expression = this.isCalled || this.method.static ? this.superClassName : this.superClassName + ".prototype";

          code.overwrite(this.start, this.end, expression, true);

          var callExpression = this.isCalled ? this.parent : this.parent.parent;

          if (callExpression && callExpression.type === 'CallExpression') {
            if (!this.noCall) {
              // special case – `super( ...args )`
              code.insertLeft(callExpression.callee.end, '.call');
            }

            var thisAlias = this.thisAlias || 'this';

            if (callExpression.arguments.length) {
              code.insertLeft(callExpression.arguments[0].start, thisAlias + ", ");
            } else {
              code.insertLeft(callExpression.end - 1, "" + thisAlias);
            }
          }
        }
      };

      return Super;
    }(Node);

    var TaggedTemplateExpression = function (Node) {
      function TaggedTemplateExpression() {
        Node.apply(this, arguments);
      }

      if (Node) TaggedTemplateExpression.__proto__ = Node;
      TaggedTemplateExpression.prototype = Object.create(Node && Node.prototype);
      TaggedTemplateExpression.prototype.constructor = TaggedTemplateExpression;

      TaggedTemplateExpression.prototype.initialise = function initialise(transforms) {
        if (transforms.templateString && !transforms.dangerousTaggedTemplateString) {
          throw new CompileError(this, 'Tagged template strings are not supported. Use `transforms: { templateString: false }` to skip transformation and disable this error, or `transforms: { dangerousTaggedTemplateString: true }` if you know what you\'re doing');
        }

        Node.prototype.initialise.call(this, transforms);
      };

      TaggedTemplateExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.templateString && transforms.dangerousTaggedTemplateString) {
          var ordered = this.quasi.expressions.concat(this.quasi.quasis).sort(function (a, b) {
            return a.start - b.start;
          });

          // insert strings at start
          var templateStrings = this.quasi.quasis.map(function (quasi) {
            return JSON.stringify(quasi.value.cooked);
          });
          code.overwrite(this.tag.end, ordered[0].start, "([" + templateStrings.join(', ') + "]");

          var lastIndex = ordered[0].start;
          ordered.forEach(function (node) {
            if (node.type === 'TemplateElement') {
              code.remove(lastIndex, node.end);
            } else {
              code.overwrite(lastIndex, node.start, ', ');
            }

            lastIndex = node.end;
          });

          code.overwrite(lastIndex, this.end, ')');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return TaggedTemplateExpression;
    }(Node);

    var TemplateElement = function (Node) {
      function TemplateElement() {
        Node.apply(this, arguments);
      }

      if (Node) TemplateElement.__proto__ = Node;
      TemplateElement.prototype = Object.create(Node && Node.prototype);
      TemplateElement.prototype.constructor = TemplateElement;

      TemplateElement.prototype.initialise = function initialise() {
        this.program.indentExclusionElements.push(this);
      };

      return TemplateElement;
    }(Node);

    var TemplateLiteral = function (Node) {
      function TemplateLiteral() {
        Node.apply(this, arguments);
      }

      if (Node) TemplateLiteral.__proto__ = Node;
      TemplateLiteral.prototype = Object.create(Node && Node.prototype);
      TemplateLiteral.prototype.constructor = TemplateLiteral;

      TemplateLiteral.prototype.transpile = function transpile(code, transforms) {
        if (transforms.templateString && this.parent.type !== 'TaggedTemplateExpression') {
          var ordered = this.expressions.concat(this.quasis).sort(function (a, b) {
            return a.start - b.start || a.end - b.end;
          }).filter(function (node, i) {
            // include all expressions
            if (node.type !== 'TemplateElement') return true;

            // include all non-empty strings
            if (node.value.raw) return true;

            // exclude all empty strings not at the head
            return !i;
          });

          // special case – we may be able to skip the first element,
          // if it's the empty string, but only if the second and
          // third elements aren't both expressions (since they maybe
          // be numeric, and `1 + 2 + '3' === '33'`)
          if (ordered.length >= 3) {
            var first = ordered[0];
            var third = ordered[2];
            if (first.type === 'TemplateElement' && first.value.raw === '' && third.type === 'TemplateElement') {
              ordered.shift();
            }
          }

          var parenthesise = (this.quasis.length !== 1 || this.expressions.length !== 0) && this.parent.type !== 'AssignmentExpression' && this.parent.type !== 'AssignmentPattern' && this.parent.type !== 'VariableDeclarator' && (this.parent.type !== 'BinaryExpression' || this.parent.operator !== '+');

          if (parenthesise) code.insertRight(this.start, '(');

          var lastIndex = this.start;

          ordered.forEach(function (node, i) {
            if (node.type === 'TemplateElement') {
              var replacement = '';
              if (i) replacement += ' + ';
              replacement += JSON.stringify(node.value.cooked);

              code.overwrite(lastIndex, node.end, replacement);
            } else {
              var parenthesise = node.type !== 'Identifier'; // TODO other cases where it's safe

              var replacement$1 = '';
              if (i) replacement$1 += ' + ';
              if (parenthesise) replacement$1 += '(';

              code.overwrite(lastIndex, node.start, replacement$1);

              if (parenthesise) code.insertLeft(node.end, ')');
            }

            lastIndex = node.end;
          });

          var close = '';
          if (parenthesise) close += ')';

          code.overwrite(lastIndex, this.end, close);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return TemplateLiteral;
    }(Node);

    var ThisExpression = function (Node) {
      function ThisExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ThisExpression.__proto__ = Node;
      ThisExpression.prototype = Object.create(Node && Node.prototype);
      ThisExpression.prototype.constructor = ThisExpression;

      ThisExpression.prototype.initialise = function initialise(transforms) {
        if (transforms.arrow) {
          var lexicalBoundary = this.findLexicalBoundary();
          var arrowFunction = this.findNearest('ArrowFunctionExpression');
          var loop = this.findNearest(loopStatement);

          if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth || loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth || loop && loop.right && loop.right.contains(this)) {
            this.alias = lexicalBoundary.getThisAlias();
          }
        }
      };

      ThisExpression.prototype.transpile = function transpile(code) {
        if (this.alias) {
          code.overwrite(this.start, this.end, this.alias, true);
        }
      };

      return ThisExpression;
    }(Node);

    var UpdateExpression = function (Node) {
      function UpdateExpression() {
        Node.apply(this, arguments);
      }

      if (Node) UpdateExpression.__proto__ = Node;
      UpdateExpression.prototype = Object.create(Node && Node.prototype);
      UpdateExpression.prototype.constructor = UpdateExpression;

      UpdateExpression.prototype.initialise = function initialise(transforms) {
        if (this.argument.type === 'Identifier') {
          var declaration = this.findScope(false).findDeclaration(this.argument.name);
          if (declaration && declaration.kind === 'const') {
            throw new CompileError(this, this.argument.name + " is read-only");
          }

          // special case – https://gitlab.com/Rich-Harris/buble/issues/150
          var statement = declaration && declaration.node.ancestor(3);
          if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
            statement.reassigned[this.argument.name] = true;
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      return UpdateExpression;
    }(Node);

    var VariableDeclaration = function (Node) {
      function VariableDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) VariableDeclaration.__proto__ = Node;
      VariableDeclaration.prototype = Object.create(Node && Node.prototype);
      VariableDeclaration.prototype.constructor = VariableDeclaration;

      VariableDeclaration.prototype.initialise = function initialise(transforms) {
        this.scope = this.findScope(this.kind === 'var');
        this.declarations.forEach(function (declarator) {
          return declarator.initialise(transforms);
        });
      };

      VariableDeclaration.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var i0 = this.getIndentation();
        var kind = this.kind;

        if (transforms.letConst && kind !== 'var') {
          kind = 'var';
          code.overwrite(this.start, this.start + this.kind.length, kind, true);
        }

        if (transforms.destructuring && this.parent.type !== 'ForOfStatement') {
          var c = this.start;
          var lastDeclaratorIsPattern;

          this.declarations.forEach(function (declarator, i) {
            if (declarator.id.type === 'Identifier') {
              if (i > 0 && this$1.declarations[i - 1].id.type !== 'Identifier') {
                code.overwrite(c, declarator.id.start, "var ");
              }
            } else {
              var inline = loopStatement.test(this$1.parent.type);

              if (i === 0) {
                code.remove(c, declarator.id.start);
              } else {
                code.overwrite(c, declarator.id.start, ";\n" + i0);
              }

              var simple = declarator.init.type === 'Identifier' && !declarator.init.rewritten;

              var name = simple ? declarator.init.name : declarator.findScope(true).createIdentifier('ref');

              var c$1 = declarator.start;

              var statementGenerators = [];

              if (simple) {
                code.remove(declarator.id.end, declarator.end);
              } else {
                statementGenerators.push(function (start, prefix, suffix) {
                  code.insertRight(declarator.id.end, "var " + name);
                  code.insertLeft(declarator.init.end, "" + suffix);
                  code.move(declarator.id.end, declarator.end, start);
                });
              }

              destructure(code, declarator.findScope(false), declarator.id, name, inline, statementGenerators);

              var prefix = inline ? 'var ' : '';
              var suffix = inline ? ", " : ";\n" + i0;
              statementGenerators.forEach(function (fn, j) {
                if (i === this$1.declarations.length - 1 && j === statementGenerators.length - 1) {
                  suffix = inline ? '' : ';';
                }

                fn(declarator.start, j === 0 ? prefix : '', suffix);
              });
            }

            declarator.transpile(code, transforms);

            c = declarator.end;
            lastDeclaratorIsPattern = declarator.id.type !== 'Identifier';
          });

          if (lastDeclaratorIsPattern) {
            code.remove(c, this.end);
          }
        } else {
          this.declarations.forEach(function (declarator) {
            declarator.transpile(code, transforms);
          });
        }
      };

      return VariableDeclaration;
    }(Node);

    var VariableDeclarator = function (Node) {
      function VariableDeclarator() {
        Node.apply(this, arguments);
      }

      if (Node) VariableDeclarator.__proto__ = Node;
      VariableDeclarator.prototype = Object.create(Node && Node.prototype);
      VariableDeclarator.prototype.constructor = VariableDeclarator;

      VariableDeclarator.prototype.initialise = function initialise(transforms) {
        var kind = this.parent.kind;
        if (kind === 'let' && this.parent.parent.type === 'ForStatement') {
          kind = 'for.let'; // special case...
        }

        this.parent.scope.addDeclaration(this.id, kind);
        Node.prototype.initialise.call(this, transforms);
      };

      VariableDeclarator.prototype.transpile = function transpile(code, transforms) {
        if (!this.init && transforms.letConst && this.parent.kind !== 'var') {
          var inLoop = this.findNearest(/Function|^For(In|Of)?Statement|^(?:Do)?WhileStatement/);
          if (inLoop && !/Function/.test(inLoop.type) && !this.isLeftDeclaratorOfLoop()) {
            code.insertLeft(this.id.end, ' = (void 0)');
          }
        }

        if (this.id) this.id.transpile(code, transforms);
        if (this.init) this.init.transpile(code, transforms);
      };

      VariableDeclarator.prototype.isLeftDeclaratorOfLoop = function isLeftDeclaratorOfLoop() {
        return this.parent && this.parent.type === 'VariableDeclaration' && this.parent.parent && (this.parent.parent.type === 'ForInStatement' || this.parent.parent.type === 'ForOfStatement') && this.parent.parent.left && this.parent.parent.left.declarations[0] === this;
      };

      return VariableDeclarator;
    }(Node);

    var types = {
      ArrayExpression: ArrayExpression,
      ArrowFunctionExpression: ArrowFunctionExpression,
      AssignmentExpression: AssignmentExpression,
      BinaryExpression: BinaryExpression,
      BreakStatement: BreakStatement,
      CallExpression: CallExpression,
      ClassBody: ClassBody,
      ClassDeclaration: ClassDeclaration,
      ClassExpression: ClassExpression,
      ContinueStatement: ContinueStatement,
      DoWhileStatement: LoopStatement,
      ExportNamedDeclaration: ExportNamedDeclaration,
      ExportDefaultDeclaration: ExportDefaultDeclaration,
      ForStatement: ForStatement,
      ForInStatement: ForInStatement,
      ForOfStatement: ForOfStatement,
      FunctionDeclaration: FunctionDeclaration,
      FunctionExpression: FunctionExpression,
      Identifier: Identifier,
      IfStatement: IfStatement,
      ImportDeclaration: ImportDeclaration,
      ImportDefaultSpecifier: ImportDefaultSpecifier,
      ImportSpecifier: ImportSpecifier,
      JSXAttribute: JSXAttribute,
      JSXClosingElement: JSXClosingElement,
      JSXElement: JSXElement,
      JSXExpressionContainer: JSXExpressionContainer,
      JSXOpeningElement: JSXOpeningElement,
      JSXSpreadAttribute: JSXSpreadAttribute,
      Literal: Literal,
      MemberExpression: MemberExpression,
      NewExpression: NewExpression,
      ObjectExpression: ObjectExpression,
      Property: Property,
      ReturnStatement: ReturnStatement,
      SpreadProperty: SpreadProperty,
      Super: Super,
      TaggedTemplateExpression: TaggedTemplateExpression,
      TemplateElement: TemplateElement,
      TemplateLiteral: TemplateLiteral,
      ThisExpression: ThisExpression,
      UpdateExpression: UpdateExpression,
      VariableDeclaration: VariableDeclaration,
      VariableDeclarator: VariableDeclarator,
      WhileStatement: LoopStatement
    };

    var statementsWithBlocks = {
      IfStatement: 'consequent',
      ForStatement: 'body',
      ForInStatement: 'body',
      ForOfStatement: 'body',
      WhileStatement: 'body',
      DoWhileStatement: 'body',
      ArrowFunctionExpression: 'body'
    };

    function wrap(raw, parent) {
      if (!raw) return;

      if ('length' in raw) {
        var i = raw.length;
        while (i--) {
          wrap(raw[i], parent);
        }return;
      }

      // with e.g. shorthand properties, key and value are
      // the same node. We don't want to wrap an object twice
      if (raw.__wrapped) return;
      raw.__wrapped = true;

      if (!keys[raw.type]) {
        keys[raw.type] = Object.keys(raw).filter(function (key) {
          return _typeof(raw[key]) === 'object';
        });
      }

      // special case – body-less if/for/while statements. TODO others?
      var bodyType = statementsWithBlocks[raw.type];
      if (bodyType && raw[bodyType].type !== 'BlockStatement') {
        var expression = raw[bodyType];

        // create a synthetic block statement, otherwise all hell
        // breaks loose when it comes to block scoping
        raw[bodyType] = {
          start: expression.start,
          end: expression.end,
          type: 'BlockStatement',
          body: [expression],
          synthetic: true
        };
      }

      new Node(raw, parent);

      var type = (raw.type === 'BlockStatement' ? BlockStatement : types[raw.type]) || Node;
      raw.__proto__ = type.prototype;
    }

    var letConst = /^(?:let|const)$/;

    function Scope(options) {
      options = options || {};

      this.parent = options.parent;
      this.isBlockScope = !!options.block;

      var scope = this;
      while (scope.isBlockScope) {
        scope = scope.parent;
      }this.functionScope = scope;

      this.identifiers = [];
      this.declarations = Object.create(null);
      this.references = Object.create(null);
      this.blockScopedDeclarations = this.isBlockScope ? null : Object.create(null);
      this.aliases = this.isBlockScope ? null : Object.create(null);
    }

    Scope.prototype = {
      addDeclaration: function addDeclaration(node, kind) {
        for (var i = 0, list = extractNames(node); i < list.length; i += 1) {
          var identifier = list[i];

          var name = identifier.name;
          var existingDeclaration = this.declarations[name];
          if (existingDeclaration && (letConst.test(kind) || letConst.test(existingDeclaration.kind))) {
            // TODO warn about double var declarations?
            throw new CompileError(identifier, name + " is already declared");
          }

          var declaration = { name: name, node: identifier, kind: kind, instances: [] };
          this.declarations[name] = declaration;

          if (this.isBlockScope) {
            if (!this.functionScope.blockScopedDeclarations[name]) this.functionScope.blockScopedDeclarations[name] = [];
            this.functionScope.blockScopedDeclarations[name].push(declaration);
          }
        }
      },

      addReference: function addReference(identifier) {
        if (this.consolidated) {
          this.consolidateReference(identifier);
        } else {
          this.identifiers.push(identifier);
        }
      },

      consolidate: function consolidate() {
        var this$1 = this;

        for (var i = 0; i < this$1.identifiers.length; i += 1) {
          // we might push to the array during consolidation, so don't cache length
          var identifier = this$1.identifiers[i];
          this$1.consolidateReference(identifier);
        }

        this.consolidated = true; // TODO understand why this is necessary... seems bad
      },

      consolidateReference: function consolidateReference(identifier) {
        var declaration = this.declarations[identifier.name];
        if (declaration) {
          declaration.instances.push(identifier);
        } else {
          this.references[identifier.name] = true;
          if (this.parent) this.parent.addReference(identifier);
        }
      },

      contains: function contains(name) {
        return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
      },

      createIdentifier: function createIdentifier(base) {
        var this$1 = this;

        if (typeof base === 'number') base = base.toString();

        base = base.replace(/\s/g, '').replace(/\[([^\]]+)\]/g, '_$1').replace(/[^a-zA-Z0-9_$]/g, '_').replace(/_{2,}/, '_');

        var name = base;
        var counter = 1;

        while (this$1.declarations[name] || this$1.references[name] || this$1.aliases[name] || name in reserved) {
          name = base + "$" + counter++;
        }

        this.aliases[name] = true;
        return name;
      },

      findDeclaration: function findDeclaration(name) {
        return this.declarations[name] || this.parent && this.parent.findDeclaration(name);
      }
    };

    function isUseStrict(node) {
      if (!node) return false;
      if (node.type !== 'ExpressionStatement') return false;
      if (node.expression.type !== 'Literal') return false;
      return node.expression.value === 'use strict';
    }

    var BlockStatement = function (Node) {
      function BlockStatement() {
        Node.apply(this, arguments);
      }

      if (Node) BlockStatement.__proto__ = Node;
      BlockStatement.prototype = Object.create(Node && Node.prototype);
      BlockStatement.prototype.constructor = BlockStatement;

      BlockStatement.prototype.createScope = function createScope() {
        var this$1 = this;

        this.parentIsFunction = /Function/.test(this.parent.type);
        this.isFunctionBlock = this.parentIsFunction || this.parent.type === 'Root';
        this.scope = new Scope({
          block: !this.isFunctionBlock,
          parent: this.parent.findScope(false)
        });

        if (this.parentIsFunction) {
          this.parent.params.forEach(function (node) {
            this$1.scope.addDeclaration(node, 'param');
          });
        }
      };

      BlockStatement.prototype.initialise = function initialise(transforms) {
        this.thisAlias = null;
        this.argumentsAlias = null;
        this.defaultParameters = [];

        // normally the scope gets created here, during initialisation,
        // but in some cases (e.g. `for` statements), we need to create
        // the scope early, as it pertains to both the init block and
        // the body of the statement
        if (!this.scope) this.createScope();

        this.body.forEach(function (node) {
          return node.initialise(transforms);
        });

        this.scope.consolidate();
      };

      BlockStatement.prototype.findLexicalBoundary = function findLexicalBoundary() {
        if (this.type === 'Program') return this;
        if (/^Function/.test(this.parent.type)) return this;

        return this.parent.findLexicalBoundary();
      };

      BlockStatement.prototype.findScope = function findScope(functionScope) {
        if (functionScope && !this.isFunctionBlock) return this.parent.findScope(functionScope);
        return this.scope;
      };

      BlockStatement.prototype.getArgumentsAlias = function getArgumentsAlias() {
        if (!this.argumentsAlias) {
          this.argumentsAlias = this.scope.createIdentifier('arguments');
        }

        return this.argumentsAlias;
      };

      BlockStatement.prototype.getArgumentsArrayAlias = function getArgumentsArrayAlias() {
        if (!this.argumentsArrayAlias) {
          this.argumentsArrayAlias = this.scope.createIdentifier('argsArray');
        }

        return this.argumentsArrayAlias;
      };

      BlockStatement.prototype.getThisAlias = function getThisAlias() {
        if (!this.thisAlias) {
          this.thisAlias = this.scope.createIdentifier('this');
        }

        return this.thisAlias;
      };

      BlockStatement.prototype.getIndentation = function getIndentation() {
        var this$1 = this;

        if (this.indentation === undefined) {
          var source = this.program.magicString.original;

          var useOuter = this.synthetic || !this.body.length;
          var c = useOuter ? this.start : this.body[0].start;

          while (c && source[c] !== '\n') {
            c -= 1;
          }this.indentation = '';

          while (true) {
            // eslint-disable-line no-constant-condition
            c += 1;
            var char = source[c];

            if (char !== ' ' && char !== '\t') break;

            this$1.indentation += char;
          }

          var indentString = this.program.magicString.getIndentString();

          // account for dedented class constructors
          var parent = this.parent;
          while (parent) {
            if (parent.kind === 'constructor' && !parent.parent.parent.superClass) {
              this$1.indentation = this$1.indentation.replace(indentString, '');
            }

            parent = parent.parent;
          }

          if (useOuter) this.indentation += indentString;
        }

        return this.indentation;
      };

      BlockStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var indentation = this.getIndentation();

        var introStatementGenerators = [];

        if (this.argumentsAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var assignment = prefix + "var " + this$1.argumentsAlias + " = arguments" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (this.thisAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var assignment = prefix + "var " + this$1.thisAlias + " = this" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (this.argumentsArrayAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var i = this$1.scope.createIdentifier('i');
            var assignment = prefix + "var " + i + " = arguments.length, " + this$1.argumentsArrayAlias + " = Array(" + i + ");\n" + indentation + "while ( " + i + "-- ) " + this$1.argumentsArrayAlias + "[" + i + "] = arguments[" + i + "]" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (/Function/.test(this.parent.type)) {
          this.transpileParameters(code, transforms, indentation, introStatementGenerators);
        }

        if (transforms.letConst && this.isFunctionBlock) {
          this.transpileBlockScopedIdentifiers(code);
        }

        Node.prototype.transpile.call(this, code, transforms);

        if (this.synthetic) {
          if (this.parent.type === 'ArrowFunctionExpression') {
            var expr = this.body[0];

            if (introStatementGenerators.length) {
              code.insertLeft(this.start, "{").insertRight(this.end, this.parent.getIndentation() + "}");

              code.insertRight(expr.start, "\n" + indentation + "return ");
              code.insertLeft(expr.end, ";\n");
            } else if (transforms.arrow) {
              code.insertLeft(expr.start, "{ return ");
              code.insertLeft(expr.end, "; }");
            }
          } else if (introStatementGenerators.length) {
            code.insertLeft(this.start, "{").insertRight(this.end, "}");
          }
        }

        var start;
        if (isUseStrict(this.body[0])) {
          start = this.body[0].end;
        } else if (this.synthetic || this.parent.type === 'Root') {
          start = this.start;
        } else {
          start = this.start + 1;
        }

        var prefix = "\n" + indentation;
        var suffix = ';';
        introStatementGenerators.forEach(function (fn, i) {
          if (i === introStatementGenerators.length - 1) suffix = ";\n";
          fn(start, prefix, suffix);
        });
      };

      BlockStatement.prototype.transpileParameters = function transpileParameters(code, transforms, indentation, introStatementGenerators) {
        var this$1 = this;

        var params = this.parent.params;

        params.forEach(function (param) {
          if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
            if (transforms.defaultParameter) {
              introStatementGenerators.push(function (start, prefix, suffix) {
                var lhs = prefix + "if ( " + param.left.name + " === void 0 ) " + param.left.name;

                code.insertRight(param.left.end, lhs).move(param.left.end, param.right.end, start).insertLeft(param.right.end, suffix);
              });
            }
          } else if (param.type === 'RestElement') {
            if (transforms.spreadRest) {
              introStatementGenerators.push(function (start, prefix, suffix) {
                var penultimateParam = params[params.length - 2];

                if (penultimateParam) {
                  code.remove(penultimateParam ? penultimateParam.end : param.start, param.end);
                } else {
                  var start$1 = param.start,
                      end = param.end; // TODO https://gitlab.com/Rich-Harris/buble/issues/8

                  while (/\s/.test(code.original[start$1 - 1])) {
                    start$1 -= 1;
                  }while (/\s/.test(code.original[end])) {
                    end += 1;
                  }code.remove(start$1, end);
                }

                var name = param.argument.name;
                var len = this$1.scope.createIdentifier('len');
                var count = params.length - 1;

                if (count) {
                  code.insertLeft(start, prefix + "var " + name + " = [], " + len + " = arguments.length - " + count + ";\n" + indentation + "while ( " + len + "-- > 0 ) " + name + "[ " + len + " ] = arguments[ " + len + " + " + count + " ]" + suffix);
                } else {
                  code.insertLeft(start, prefix + "var " + name + " = [], " + len + " = arguments.length;\n" + indentation + "while ( " + len + "-- ) " + name + "[ " + len + " ] = arguments[ " + len + " ]" + suffix);
                }
              });
            }
          } else if (param.type !== 'Identifier') {
            if (transforms.parameterDestructuring) {
              var ref = this$1.scope.createIdentifier('ref');
              destructure(code, this$1.scope, param, ref, false, introStatementGenerators);
              code.insertLeft(param.start, ref);
            }
          }
        });
      };

      BlockStatement.prototype.transpileBlockScopedIdentifiers = function transpileBlockScopedIdentifiers(code) {
        var this$1 = this;

        Object.keys(this.scope.blockScopedDeclarations).forEach(function (name) {
          var declarations = this$1.scope.blockScopedDeclarations[name];

          for (var i = 0, list = declarations; i < list.length; i += 1) {
            var declaration = list[i];

            var cont = false; // TODO implement proper continue...

            if (declaration.kind === 'for.let') {
              // special case
              var forStatement = declaration.node.findNearest('ForStatement');

              if (forStatement.shouldRewriteAsFunction) {
                var outerAlias = this$1.scope.createIdentifier(name);
                var innerAlias = forStatement.reassigned[name] ? this$1.scope.createIdentifier(name) : name;

                declaration.name = outerAlias;
                code.overwrite(declaration.node.start, declaration.node.end, outerAlias, true);

                forStatement.aliases[name] = {
                  outer: outerAlias,
                  inner: innerAlias
                };

                for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
                  var identifier = list$1[i$1];

                  var alias = forStatement.body.contains(identifier) ? innerAlias : outerAlias;

                  if (name !== alias) {
                    code.overwrite(identifier.start, identifier.end, alias, true);
                  }
                }

                cont = true;
              }
            }

            if (!cont) {
              var alias$1 = this$1.scope.createIdentifier(name);

              if (name !== alias$1) {
                declaration.name = alias$1;
                code.overwrite(declaration.node.start, declaration.node.end, alias$1, true);

                for (var i$2 = 0, list$2 = declaration.instances; i$2 < list$2.length; i$2 += 1) {
                  var identifier$1 = list$2[i$2];

                  identifier$1.rewritten = true;
                  code.overwrite(identifier$1.start, identifier$1.end, alias$1, true);
                }
              }
            }
          }
        });
      };

      return BlockStatement;
    }(Node);

    function Program(source, ast, transforms, options) {
      var this$1 = this;

      this.type = 'Root';

      // options
      this.jsx = options.jsx || 'React.createElement';
      this.options = options;

      this.source = source;
      this.magicString = new MagicString(source);

      this.ast = ast;
      this.depth = 0;

      wrap(this.body = ast, this);
      this.body.__proto__ = BlockStatement.prototype;

      this.indentExclusionElements = [];
      this.body.initialise(transforms);

      this.indentExclusions = Object.create(null);
      for (var i$1 = 0, list = this.indentExclusionElements; i$1 < list.length; i$1 += 1) {
        var node = list[i$1];

        for (var i = node.start; i < node.end; i += 1) {
          this$1.indentExclusions[i] = true;
        }
      }

      this.body.transpile(this.magicString, transforms);
    }

    Program.prototype = {
      export: function export$1(options) {
        if (options === void 0) options = {};

        return {
          code: this.magicString.toString(),
          map: this.magicString.generateMap({
            file: options.file,
            source: options.source,
            includeContent: options.includeContent !== false
          })
        };
      },

      findNearest: function findNearest() {
        return null;
      },

      findScope: function findScope() {
        return null;
      }
    };

    var matrix = {
      chrome: {
        48: 1333689725,
        49: 1342078975,
        50: 1610514431,
        51: 1610514431,
        52: 2147385343
      },
      firefox: {
        43: 1207307741,
        44: 1207307741,
        45: 1207307741,
        46: 1476267485,
        47: 1476296671,
        48: 1476296671
      },
      safari: {
        8: 1073741824,
        9: 1328940894
      },
      ie: {
        8: 0,
        9: 1073741824,
        10: 1073741824,
        11: 1073770592
      },
      edge: {
        12: 1591620701,
        13: 1608400479
      },
      node: {
        '0.10': 1075052608,
        '0.12': 1091830852,
        4: 1327398527,
        5: 1327398527,
        6: 1610514431
      }
    };

    var features = ['arrow', 'classes', 'collections', 'computedProperty', 'conciseMethodProperty', 'constLoop', 'constRedef', 'defaultParameter', 'destructuring', 'extendNatives', 'forOf', 'generator', 'letConst', 'letLoop', 'letLoopScope', 'moduleExport', 'moduleImport', 'numericLiteral', 'objectProto', 'objectSuper', 'oldOctalLiteral', 'parameterDestructuring', 'spreadRest', 'stickyRegExp', 'symbol', 'templateString', 'unicodeEscape', 'unicodeIdentifier', 'unicodeRegExp',

    // ES2016
    'exponentiation',

    // additional transforms, not from
    // https://featuretests.io
    'reservedProperties'];

    var version = "0.15.2";

    var ref = [acornObjectSpread, acornJsx].reduce(function (final, plugin) {
      return plugin(final);
    }, acorn$1);
    var parse = ref.parse;

    var dangerousTransforms = ['dangerousTaggedTemplateString', 'dangerousForOf'];

    function target(target) {
      var targets = Object.keys(target);
      var bitmask = targets.length ? 2147483647 : 1073741824;

      Object.keys(target).forEach(function (environment) {
        var versions = matrix[environment];
        if (!versions) throw new Error("Unknown environment '" + environment + "'. Please raise an issue at https://gitlab.com/Rich-Harris/buble/issues");

        var targetVersion = target[environment];
        if (!(targetVersion in versions)) throw new Error("Support data exists for the following versions of " + environment + ": " + Object.keys(versions).join(', ') + ". Please raise an issue at https://gitlab.com/Rich-Harris/buble/issues");
        var support = versions[targetVersion];

        bitmask &= support;
      });

      var transforms = Object.create(null);
      features.forEach(function (name, i) {
        transforms[name] = !(bitmask & 1 << i);
      });

      dangerousTransforms.forEach(function (name) {
        transforms[name] = false;
      });

      return transforms;
    }

    function transform(source, options) {
      if (options === void 0) options = {};

      var ast;

      try {
        ast = parse(source, {
          ecmaVersion: 7,
          preserveParens: true,
          sourceType: 'module',
          plugins: {
            jsx: true,
            objectSpread: true
          }
        });
      } catch (err) {
        err.snippet = getSnippet(source, err.loc);
        err.toString = function () {
          return err.name + ": " + err.message + "\n" + err.snippet;
        };
        throw err;
      }

      var transforms = target(options.target || {});
      Object.keys(options.transforms || {}).forEach(function (name) {
        if (name === 'modules') {
          if (!('moduleImport' in options.transforms)) transforms.moduleImport = options.transforms.modules;
          if (!('moduleExport' in options.transforms)) transforms.moduleExport = options.transforms.modules;
          return;
        }

        if (!(name in transforms)) throw new Error("Unknown transform '" + name + "'");
        transforms[name] = options.transforms[name];
      });

      return new Program(source, ast, transforms, options).export(options);
    }

    exports.target = target;
    exports.transform = transform;
    exports.VERSION = version;

    Object.defineProperty(exports, '__esModule', { value: true });
  });
  
});

var buble_deps_1 = buble_deps.transform;

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.4.0' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src'),
      TO_STRING = 'toString',
      $toString = Function[TO_STRING],
      TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else {
      if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else {
        if (O[key]) O[key] = val;else _hide(O, key, val);
      }
    }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
var _export = $export;

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toIndex = function _toIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this),
        length = _toLength(O.length),
        index = _toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {},
      B = {},
      S = Symbol(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = _toObject(target),
      aLen = arguments.length,
      index = 1,
      getSymbols = _objectGops.f,
      isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]),
        keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var _poly = { assign: assign };

var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var transform$$1 = (function (code) {
  return buble_deps_1(code, opts).code;
});

var errorBoundary = function errorBoundary(element, errorCallback) {
  var isEvalFunc = typeof element === 'function';

  if (isEvalFunc && __WEBPACK_IMPORTED_MODULE_0_react__["Component"].isPrototypeOf(element)) {
    var originalRender = element.prototype.render;
    element.prototype.render = function render() {
      try {
        return originalRender.apply(this, arguments);
      } catch (err) {
        setTimeout(function () {
          errorCallback(err);
        });

        return null;
      }
    };
  } else if (isEvalFunc) {
    return function wrappedPFC() {
      try {
        return element();
      } catch (err) {
        setTimeout(function () {
          errorCallback(err);
        });

        return null;
      }
    };
  }

  return element;
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, __WEBPACK_IMPORTED_MODULE_0_react___default.a].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope;

  // NOTE: Workaround for classes, since buble doesn't allow `return` without a function
  var transformed = transform$$1(code).trim().replace(/^var \w+ =/, '').replace(/;$/, '');

  return errorBoundary(evalCode('return (' + transformed + ')', scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    resultCallback(errorBoundary(element, errorCallback));
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform$$1(code), _extends({}, scope, { render: render }));
};

var css = "\n.prism-code {\n  display: block;\n  white-space: pre;\n\n  background-color: #1D1F21;\n  color: #C5C8C6;\n\n  padding: 0.5rem;\n  margin: 0;\n\n  box-sizing: border-box;\n  vertical-align: baseline;\n  outline: none;\n  text-shadow: none;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  word-wrap: normal;\n  word-break: normal;\n  text-align: left;\n  word-spacing: normal;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: hsl(30, 20%, 50%);\n}\n\n.token.punctuation {\n  opacity: .7;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: hsl(75, 70%, 60%);\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n  color: hsl(40, 90%, 60%);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.regex,\n.token.important {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\n.token.deleted {\n  color: red;\n}\n";

var prismStyling = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: { __html: css } });

var Style = (function () {
  return prismStyling;
});

var LiveContextTypes = {
  live: index$6.shape({
    code: index$6.string,
    error: index$6.string,

    onError: index$6.func,
    onChange: index$6.func,

    element: index$6.oneOfType([index$6.string, index$6.number, index$6.element, index$6.func])
  })
};

var LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }, _this.onError = function (error) {
      _this.setState({ error: error.toString() });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline;

      // Transpilation arguments
      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };
      var errorCallback = function errorCallback(err) {
        return _this.setState({ element: undefined, error: err.toString() });
      };
      var renderElement = function renderElement(element) {
        return _this.setState(_extends({}, state, { element: element }));
      };

      // State reset object
      var state = { unsafeWrapperError: undefined, error: undefined };

      try {
        if (noInline) {
          _this.setState(_extends({}, state, { element: null })); // Reset output for async (no inline) evaluation
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(_extends({}, state, { error: error.toString() }));
      }
    }, _this.getChildContext = function () {
      return {
        live: _extends({}, _this.state, {
          code: _this.props.code,
          onError: _this.onError,
          onChange: _this.onChange
        })
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  LiveProvider.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;


    this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
  };

  LiveProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
    var code = _ref2.code,
        scope = _ref2.scope,
        noInline = _ref2.noInline,
        transformCode = _ref2.transformCode;

    if (code !== this.props.code || scope !== this.props.scope || noInline !== this.props.noInline || transformCode !== this.props.transformCode) {
      this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        code = _props2.code,
        mountStylesheet = _props2.mountStylesheet,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode,
        rest = objectWithoutProperties(_props2, ['children', 'className', 'code', 'mountStylesheet', 'noInline', 'transformCode']);


    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: cn('react-live', className)
      }, rest),
      mountStylesheet && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Style, null),
      children
    );
  };

  return LiveProvider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

LiveProvider.childContextTypes = LiveContextTypes;
LiveProvider.defaultProps = {
  code: '',
  mountStylesheet: true,
  noInline: false
};
LiveProvider.propTypes = {
  className: index$6.string,
  code: index$6.string,
  scope: index$6.object,
  mountStylesheet: index$6.bool,
  noInline: index$6.bool,
  transformCode: index$6.func
};

var LiveEditor = function LiveEditor(props, _ref) {
  var live = _ref.live;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Editor, _extends({}, props, {
    code: live.code,
    onChange: function onChange(code) {
      live.onChange(code);

      if (typeof props.onChange === 'function') {
        props.onChange(code);
      }
    }
  }));
};

LiveEditor.contextTypes = LiveContextTypes;
LiveEditor.propTypes = { onChange: index$6.func };

var LiveError = function LiveError(_ref, _ref2) {
  var live = _ref2.live;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);
  return live.error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-error', className)
    }),
    live.error
  ) : null;
};

LiveError.contextTypes = LiveContextTypes;

var LivePreview = function LivePreview(_ref, _ref2) {
  var element = _ref2.live.element;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-preview', className)
    }),
    typeof element === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(element) : element
  );
};

LivePreview.contextTypes = LiveContextTypes;

var withLive = function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var live = this.context.live;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, { live: live });
    };

    return WithLive;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  WithLive.contextTypes = LiveContextTypes;


  return WithLive;
};



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(180), __webpack_require__(414).Buffer))

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(415)
var ieee754 = __webpack_require__(416)
var isArray = __webpack_require__(417)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(180)))

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 416 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 417 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 418 */,
/* 419 */,
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(421);


/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(391);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _main = __webpack_require__(399);

var _main2 = _interopRequireDefault(_main);

var _reactLive = __webpack_require__(413);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/opt/guydev/study/render-props-presentation-next/pages/example2.js?entry";


var Caffeinate = function (_Component) {
  (0, _inherits3.default)(Caffeinate, _Component);

  function Caffeinate() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Caffeinate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Caffeinate.__proto__ || (0, _getPrototypeOf2.default)(Caffeinate)).call.apply(_ref, [this].concat(args))), _this), _this.state = { coffee: "Americano" }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Caffeinate, [{
    key: "render",
    value: function render() {
      return this.props.render(this.state.coffee);
    }
  }]);

  return Caffeinate;
}(_react.Component);

exports.default = function () {
  return _react2.default.createElement(_main2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement("div", {
    className: "jsx-880604262" + " " + "cont",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement("h2", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, "Example 2"), _react2.default.createElement("p", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "We can also use the explicit render prop to achieve the same result"), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), _react2.default.createElement(_reactLive.LiveProvider, {
    code: "class Caffeinate extends Component {\n          state = { coffee: \"Americano\" };\n          render() {\n            return this.props.render(this.state.coffee);\n          }\n        }",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement(_reactLive.LiveEditor, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }), _react2.default.createElement(Caffeinate, { render: function render(beverage) {
      return _react2.default.createElement("div", {
        className: "jsx-880604262",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, "Drinking an ", beverage, ".");
    }, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }), _react2.default.createElement(_reactLive.LiveProvider, {
    code: " <Caffeinate render={beverage => <div>Drinking an {beverage}.</div>} />",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }, _react2.default.createElement(_reactLive.LiveEditor, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }))), _react2.default.createElement(_style2.default, {
    styleId: "880604262",
    css: ".cont.jsx-880604262{background:#eee;padding:100px;text-align:center;-webkit-transition:100ms ease-in background;transition:100ms ease-in background;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2V4YW1wbGUyLmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDZ0IsQUFHeUIsZ0JBQ0YsY0FDSSxrQkFDa0IsZ0ZBQ3RDIiwiZmlsZSI6InBhZ2VzL2V4YW1wbGUyLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9vcHQvZ3V5ZGV2L3N0dWR5L3JlbmRlci1wcm9wcy1wcmVzZW50YXRpb24tbmV4dCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9sYXlvdXRzL21haW5cIjtcbmltcG9ydCB7IExpdmVQcm92aWRlciwgTGl2ZUVkaXRvciwgTGl2ZUVycm9yLCBMaXZlUHJldmlldyB9IGZyb20gXCJyZWFjdC1saXZlXCI7XG5cbmNsYXNzIENhZmZlaW5hdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0ZSA9IHsgY29mZmVlOiBcIkFtZXJpY2Fub1wiIH07XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXIodGhpcy5zdGF0ZS5jb2ZmZWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPFBhZ2U+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250XCI+XG4gICAgICA8aDI+RXhhbXBsZSAyPC9oMj5cbiAgICAgIDxwPldlIGNhbiBhbHNvIHVzZSB0aGUgZXhwbGljaXQgcmVuZGVyIHByb3AgdG8gYWNoaWV2ZSB0aGUgc2FtZSByZXN1bHQ8L3A+XG4gICAgICA8YnIgLz5cbiAgICAgIDxMaXZlUHJvdmlkZXJcbiAgICAgICAgY29kZT17YGNsYXNzIENhZmZlaW5hdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICAgIHN0YXRlID0geyBjb2ZmZWU6IFwiQW1lcmljYW5vXCIgfTtcbiAgICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXIodGhpcy5zdGF0ZS5jb2ZmZWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIDxMaXZlRWRpdG9yIC8+XG4gICAgICA8L0xpdmVQcm92aWRlcj5cbiAgICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgICA8Q2FmZmVpbmF0ZSByZW5kZXI9e2JldmVyYWdlID0+IDxkaXY+RHJpbmtpbmcgYW4ge2JldmVyYWdlfS48L2Rpdj59IC8+XG4gICAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgPExpdmVQcm92aWRlclxuICAgICAgICBjb2RlPXtgIDxDYWZmZWluYXRlIHJlbmRlcj17YmV2ZXJhZ2UgPT4gPGRpdj5Ecmlua2luZyBhbiB7YmV2ZXJhZ2V9LjwvZGl2Pn0gLz5gfVxuICAgICAgPlxuICAgICAgICA8TGl2ZUVkaXRvciAvPlxuICAgICAgPC9MaXZlUHJvdmlkZXI+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLmNvbnQge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgICAgICBwYWRkaW5nOiAxMDBweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiAxMDBtcyBlYXNlLWluIGJhY2tncm91bmQ7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L1BhZ2U+XG4pO1xuIl19 */\n/*@ sourceURL=pages/example2.js?entry */"
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2V4YW1wbGUyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUGFnZSIsIkxpdmVQcm92aWRlciIsIkxpdmVFZGl0b3IiLCJMaXZlRXJyb3IiLCJMaXZlUHJldmlldyIsIkNhZmZlaW5hdGUiLCJzdGF0ZSIsImNvZmZlZSIsInByb3BzIiwicmVuZGVyIiwiYmV2ZXJhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBUyxBQUFjLEFBQVksQUFBVzs7Ozs7OztJLEFBRXhDOzs7Ozs7Ozs7Ozs7OztvTkFDSixBLFFBQVEsRUFBRSxRQUFGLEFBQVUsQTs7Ozs7NkJBQ1QsQUFDUDthQUFPLEtBQUEsQUFBSyxNQUFMLEFBQVcsT0FBTyxLQUFBLEFBQUssTUFBOUIsQUFBTyxBQUE2QixBQUNyQzs7Ozs7QSxBQUpzQixBQU96Qjs7a0JBQWUsWUFBQTt5QkFDYixBQUFDOztnQkFBRDtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLGNBQUE7dUNBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTtlQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FERixBQUNFLEFBQ0EsOEJBQUEsY0FBQTtlQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FGRixBQUVFLEFBQ0E7ZUFBQTs7Z0JBQUE7a0JBSEYsQUFHRSxBQUNBO0FBREE7QUFBQSxzQkFDQSxBQUFDO1VBQUQ7O2dCQUFBO2tCQUFBLEFBUUU7QUFSRjtBQUNFLHFCQU9BLEFBQUM7O2dCQUFEO2tCQVpKLEFBSUUsQUFRRSxBQUVGO0FBRkU7QUFBQTtlQUVGOztnQkFBQTtrQkFkRixBQWNFLEFBQ0E7QUFEQTtBQUFBO2VBQ0E7O2dCQUFBO2tCQWZGLEFBZUUsQUFDQTtBQURBO0FBQUEsb0NBQ0EsQUFBQyxjQUFXLFFBQVEsMEJBQUE7NkJBQVksY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLE9BQUEsRUFBa0IsZ0JBQWxCLFVBQVosQUFBWTtBQUFoQztnQkFBQTtrQkFoQkYsQUFnQkUsQUFDQTtBQURBOztlQUNBOztnQkFBQTtrQkFqQkYsQUFpQkUsQUFDQTtBQURBO0FBQUE7ZUFDQTs7Z0JBQUE7a0JBbEJGLEFBa0JFLEFBQ0E7QUFEQTtBQUFBLHNCQUNBLEFBQUM7VUFBRDs7Z0JBQUE7a0JBQUEsQUFHRTtBQUhGO0FBQ0UscUJBRUEsQUFBQzs7Z0JBQUQ7a0JBdkJOLEFBQ0UsQUFtQkUsQUFHRTtBQUFBO0FBQUE7YUF2Qk47U0FEYSxBQUNiO0FBQUE7QUFERiIsImZpbGUiOiJleGFtcGxlMi5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvb3B0L2d1eWRldi9zdHVkeS9yZW5kZXItcHJvcHMtcHJlc2VudGF0aW9uLW5leHQifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/opt/guydev/study/render-props-presentation-next/pages/example2.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/opt/guydev/study/render-props-presentation-next/pages/example2.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/example2")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })
],[420]);
            return { page: comp.default }
          })
        