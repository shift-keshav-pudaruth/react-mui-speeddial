'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeedDialItem = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {

  itemContainer: {
    position: "absolute",
    right: 48,
    top: 20,

    WebkitTransform: "translateY(-50%)",
    MozTransform: "translateY(-50%)",
    MsTransform: "translateY(-50%)",
    OTransform: "translateY(-50%)",
    transform: "translateY(-50%)"
  }

};

function getYPos(index, position) {
  var newYPos = 81 + index * 56;

  if (position === 'below') {
    newYPos = -114 + index * 56;
  }

  return newYPos;
}

var SpeedDialItem = exports.SpeedDialItem = function (_React$PureComponent) {
  (0, _inherits3.default)(SpeedDialItem, _React$PureComponent);

  function SpeedDialItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SpeedDialItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SpeedDialItem.__proto__ || (0, _getPrototypeOf2.default)(SpeedDialItem)).call.apply(_ref, [this].concat(args))), _this), _this.effects = {
      "none": function none(visible, index) {
        return {
          display: visible ? "" : "none"
        };
      },

      "fade-staggered": function fadeStaggered(visible, index) {
        return {
          transition: visible ? "450ms" : "300ms",
          transitionDelay: visible ? index * 0.025 + "s" : "",
          transform: "translateY(" + (visible ? 0 : _this.props.itemPosition === 'above' ? "5px" : "-5px") + ")",
          opacity: visible ? 1 : 0
        };
      },

      "fade": function fade(visible, index) {
        return {
          transition: visible ? "450ms" : "300ms",
          opacity: visible ? 1 : 0
        };
      },

      "slide": function slide(visible, index) {
        return {
          transition: visible ? "250ms" : "300ms",
          transform: "translateY(" + (visible ? 0 : getYPos(index, _this.props.itemsPosition) + "px") + ")",
          opacity: visible ? 1 : 0
        };
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SpeedDialItem, [{
    key: 'handleTouchTap',
    value: function handleTouchTap(ev) {
      this.props.onCloseRequest();
      this.props.onTouchTap(ev);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          index = _props.index,
          visible = _props.visible,
          itemPosition = _props.itemPosition;


      var style = {
        pointerEvents: visible ? "" : "none",
        position: "absolute",
        whiteSpace: "nowrap",
        right: 8,
        bottom: getYPos(index, itemPosition)
      };

      var fx = this.effects[this.props.effect];

      if (!fx) fx = effects.none;

      style = (0, _extends3.default)({}, style, fx(visible, index));

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'div',
          { style: (0, _assign2.default)(styles.itemContainer, this.props.labelStyle) },
          this.props.label
        ),
        _react2.default.createElement(
          _FloatingActionButton2.default,
          {
            mini: true,
            secondary: this.props.secondary,
            backgroundColor: this.props.backgroundColor,
            style: this.props.style,
            iconStyle: this.props.iconStyle,
            onTouchTap: this.handleTouchTap
          },
          this.props.fabContent
        )
      );
    }
  }]);
  return SpeedDialItem;
}(_react2.default.PureComponent);

;

SpeedDialItem.propTypes = {
  label: _react2.default.PropTypes.any,
  labelStyle: _react2.default.PropTypes.object,
  backgroundColor: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  iconStyle: _react2.default.PropTypes.object,
  secondary: _react2.default.PropTypes.bool,
  index: _react2.default.PropTypes.number,
  visible: _react2.default.PropTypes.bool,
  itemPosition: _react2.default.PropTypes.string
};

SpeedDialItem.defaultProps = {
  itemPosition: 'above', // above or below
  secondary: true
};