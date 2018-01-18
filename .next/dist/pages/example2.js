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