import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { FabSpinner } from './fab-spinner';
import createReactClass from 'create-react-class'

const styles = {

  container: {
    position: "relative",
    display: "inline-block"
  }

};


export const SpeedDial = createReactClass({

  getInitialState() {
    return {
      internalOpen: false
    }
  },


  handleFabTouchTap(mode) {
    if(mode === 'click') {
        this.setState({
            internalOpen: !this.state.internalOpen
        });
    }

    let cb = this.props.onOpenCloseRequest;
    cb && cb();
  },


  handleCloseRequest() {
      this.setState({
        internalOpen: false
      })
  },

  render: function() {

    let { open, effect, style, mode } = this.props;

    if (open === undefined)
      open = this.state.internalOpen;

    if (effect === undefined)
      effect = "fade-staggered";

    let enhancedChildren = React.Children.map(this.props.children,
      (child, index) => React.cloneElement(child, {
        ...child.props,
        effect,
        index,
        visible: open,
        itemPosition: this.props.itemsPosition,
        onCloseRequest: this.handleCloseRequest
      })
    );

    return <div className="speed-dial" style={{...styles.container, ...style}}>

        {enhancedChildren}

      <FloatingActionButton
        {...this.props.fabProps}
        { ... ((mode === undefined || mode === 'click') && { onClick: this.handleFabTouchTap('click')})}
        { ... ((mode !== undefined) && { onHover: this.handleFabTouchTap(mode)})}
      >
        <FabSpinner
          aContent={this.props.fabContentOpen}
          bContent={this.props.fabContentClose || this.props.fabContentOpen}
          showB={open}
        />
      </FloatingActionButton>

    </div>;
  }

});

SpeedDial.defaultProps = {
  itemsPosition: 'above' // above or below
};