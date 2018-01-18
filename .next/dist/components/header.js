"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require("styled-jsx/style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

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