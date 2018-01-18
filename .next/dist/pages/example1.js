"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require("styled-jsx/style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _main = require("../layouts/main");

var _main2 = _interopRequireDefault(_main);

var _reactLive = require("react-live");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/opt/guydev/study/render-props-presentation-next/pages/example1.js?entry";


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
      return this.props.children(this.state.coffee);
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
  }, "Example 1"), _react2.default.createElement("p", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "Most simple render props, sending the state from the parent to the child"), _react2.default.createElement(_reactLive.LiveProvider, {
    code: "class Caffeinate extends Component {\n  state = { coffee: \"Americano\" };\n  render() {\n    return this.props.children(this.state.coffee);\n  }\n}",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement(_reactLive.LiveEditor, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  })), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }), _react2.default.createElement(Caffeinate, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, function (beverage) {
    return _react2.default.createElement("div", {
      className: "jsx-880604262",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      }
    }, "Drinking an ", beverage, ".");
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }), _react2.default.createElement("br", {
    className: "jsx-880604262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }), _react2.default.createElement(_reactLive.LiveProvider, {
    code: "<Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  }, _react2.default.createElement(_reactLive.LiveEditor, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }))), _react2.default.createElement(_style2.default, {
    styleId: "880604262",
    css: ".cont.jsx-880604262{background:#eee;padding:100px;text-align:center;-webkit-transition:100ms ease-in background;transition:100ms ease-in background;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2V4YW1wbGUxLmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdDZ0IsQUFHeUIsZ0JBQ0YsY0FDSSxrQkFDa0IsZ0ZBQ3RDIiwiZmlsZSI6InBhZ2VzL2V4YW1wbGUxLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9vcHQvZ3V5ZGV2L3N0dWR5L3JlbmRlci1wcm9wcy1wcmVzZW50YXRpb24tbmV4dCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9sYXlvdXRzL21haW5cIjtcbmltcG9ydCB7IExpdmVQcm92aWRlciwgTGl2ZUVkaXRvciwgTGl2ZUVycm9yLCBMaXZlUHJldmlldyB9IGZyb20gXCJyZWFjdC1saXZlXCI7XG5cbmNsYXNzIENhZmZlaW5hdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0ZSA9IHsgY29mZmVlOiBcIkFtZXJpY2Fub1wiIH07XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzLnN0YXRlLmNvZmZlZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8UGFnZT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRcIj5cbiAgICAgIDxoMj5FeGFtcGxlIDE8L2gyPlxuICAgICAgPHA+XG4gICAgICAgIE1vc3Qgc2ltcGxlIHJlbmRlciBwcm9wcywgc2VuZGluZyB0aGUgc3RhdGUgZnJvbSB0aGUgcGFyZW50IHRvIHRoZSBjaGlsZFxuICAgICAgPC9wPlxuICAgICAgPExpdmVQcm92aWRlclxuICAgICAgICBjb2RlPXtgY2xhc3MgQ2FmZmVpbmF0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0geyBjb2ZmZWU6IFwiQW1lcmljYW5vXCIgfTtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMuc3RhdGUuY29mZmVlKTtcbiAgfVxufWB9XG4gICAgICA+XG4gICAgICAgIDxMaXZlRWRpdG9yIC8+XG4gICAgICA8L0xpdmVQcm92aWRlcj5cbiAgICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgICA8Q2FmZmVpbmF0ZT57YmV2ZXJhZ2UgPT4gPGRpdj5Ecmlua2luZyBhbiB7YmV2ZXJhZ2V9LjwvZGl2Pn08L0NhZmZlaW5hdGU+XG4gICAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgPExpdmVQcm92aWRlclxuICAgICAgICBjb2RlPXtgPENhZmZlaW5hdGU+e2JldmVyYWdlID0+IDxkaXY+RHJpbmtpbmcgYW4ge2JldmVyYWdlfS48L2Rpdj59PC9DYWZmZWluYXRlPmB9XG4gICAgICA+XG4gICAgICAgIDxMaXZlRWRpdG9yIC8+XG4gICAgICA8L0xpdmVQcm92aWRlcj5cbiAgICA8L2Rpdj5cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIC5jb250IHtcbiAgICAgICAgYmFja2dyb3VuZDogI2VlZTtcbiAgICAgICAgcGFkZGluZzogMTAwcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgdHJhbnNpdGlvbjogMTAwbXMgZWFzZS1pbiBiYWNrZ3JvdW5kO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9QYWdlPlxuKTtcbiJdfQ== */\n/*@ sourceURL=pages/example1.js?entry */"
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2V4YW1wbGUxLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUGFnZSIsIkxpdmVQcm92aWRlciIsIkxpdmVFZGl0b3IiLCJMaXZlRXJyb3IiLCJMaXZlUHJldmlldyIsIkNhZmZlaW5hdGUiLCJzdGF0ZSIsImNvZmZlZSIsInByb3BzIiwiY2hpbGRyZW4iLCJiZXZlcmFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTLEFBQWMsQUFBWSxBQUFXOzs7Ozs7O0lBRXhDLEE7Ozs7Ozs7Ozs7Ozs7O29OLEFBQ0osUUFBUSxFQUFFLFFBQUYsQUFBVSxBOzs7Ozs2QkFDVCxBQUNQO2FBQU8sS0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFTLEtBQUEsQUFBSyxNQUFoQyxBQUFPLEFBQStCLEFBQ3ZDOzs7OztBQUpzQixBLEFBT3pCOztrQkFBZSxZQUFBO3lCQUNiLEFBQUM7O2dCQUFEO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsY0FBQTt1Q0FBQSxBQUFlOztnQkFBZjtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxjQUFBO2VBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQURGLEFBQ0UsQUFDQSw4QkFBQSxjQUFBO2VBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUZGLEFBRUUsQUFHQSw2RkFBQSxBQUFDO1VBQUQ7O2dCQUFBO2tCQUFBLEFBUUU7QUFSRjtBQUNFLHFCQU9BLEFBQUM7O2dCQUFEO2tCQWJKLEFBS0UsQUFRRSxBQUVGO0FBRkU7QUFBQTtlQUVGOztnQkFBQTtrQkFmRixBQWVFLEFBQ0E7QUFEQTtBQUFBO2VBQ0E7O2dCQUFBO2tCQWhCRixBQWdCRSxBQUNBO0FBREE7QUFBQSxzQkFDQyxjQUFEOztnQkFBQTtrQkFBQSxBQUFhO0FBQWI7QUFBQSx5QkFBYTsyQkFBWSxjQUFBO2lCQUFBOztrQkFBQTtvQkFBQTtBQUFBO0FBQUEsS0FBQSxFQUFrQixnQkFBbEIsVUFBWixBQUFZO0FBakIzQixBQWlCRSxBQUNBO2VBQUE7O2dCQUFBO2tCQWxCRixBQWtCRSxBQUNBO0FBREE7QUFBQTtlQUNBOztnQkFBQTtrQkFuQkYsQUFtQkUsQUFDQTtBQURBO0FBQUEsc0JBQ0EsQUFBQztVQUFEOztnQkFBQTtrQkFBQSxBQUdFO0FBSEY7QUFDRSxxQkFFQSxBQUFDOztnQkFBRDtrQkF4Qk4sQUFDRSxBQW9CRSxBQUdFO0FBQUE7QUFBQTthQXhCTjtTQURhLEFBQ2I7QUFBQTtBQURGIiwiZmlsZSI6ImV4YW1wbGUxLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9vcHQvZ3V5ZGV2L3N0dWR5L3JlbmRlci1wcm9wcy1wcmVzZW50YXRpb24tbmV4dCJ9