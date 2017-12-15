'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeedDial = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _fabSpinner = require('./fab-spinner');

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {

  container: {
    position: "relative",
    display: "inline-block"
  }

};

var SpeedDial = exports.SpeedDial = (0, _createReactClass2.default)({
  displayName: 'SpeedDial',
  getInitialState: function getInitialState() {
    return {
      internalOpen: false
    };
  },
  handleFabTouchTap: function handleFabTouchTap(mode) {
    if (mode === 'click') {
      this.setState({
        internalOpen: !this.state.internalOpen
      });
    }

    var cb = this.props.onOpenCloseRequest;
    cb && cb();
  },
  handleCloseRequest: function handleCloseRequest() {
    this.setState({
      internalOpen: false
    });
  },


  render: function render() {
    var _this = this;

    var _props = this.props,
        open = _props.open,
        effect = _props.effect,
        style = _props.style,
        mode = _props.mode;


    if (open === undefined) open = this.state.internalOpen;

    if (effect === undefined) effect = "fade-staggered";

    var enhancedChildren = _react2.default.Children.map(this.props.children, function (child, index) {
      return _react2.default.cloneElement(child, (0, _extends3.default)({}, child.props, {
        effect: effect,
        index: index,
        visible: open,
        itemPosition: _this.props.itemsPosition,
        onCloseRequest: _this.handleCloseRequest
      }));
    });

    return _react2.default.createElement(
      'div',
      { className: 'speed-dial', style: (0, _extends3.default)({}, styles.container, style) },
      enhancedChildren,
      _react2.default.createElement(
        _FloatingActionButton2.default,
        (0, _extends3.default)({}, this.props.fabProps, (mode === undefined || mode === 'click') && { onClick: this.handleFabTouchTap('click') }, mode !== undefined && { onHover: this.handleFabTouchTap(mode) }),
        _react2.default.createElement(_fabSpinner.FabSpinner, {
          aContent: this.props.fabContentOpen,
          bContent: this.props.fabContentClose || this.props.fabContentOpen,
          showB: open
        })
      )
    );
  }

});

SpeedDial.defaultProps = {
  itemsPosition: 'above' // above or below
};