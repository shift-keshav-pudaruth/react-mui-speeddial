import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { FabSpinner } from './fab-spinner';

const styles = {

  container: {
    position: "relative",
    display: "inline-block"
  }

};


class SpeedDial extends React.Component{

    constructor(props) {

        super(props);
        this.state = {
            internalOpen: false
        };

        this.handleCloseRequest = this.handleCloseRequest.bind(this);
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    handleInteraction(mode) {
        if(mode === 'click') {
            this.setState({
                internalOpen: !this.state.internalOpen
            });
        }

        let cb = this.props.onOpenCloseRequest;
        cb && cb();
    }


  handleCloseRequest() {
      this.setState({
        internalOpen: false
      })
  }

  render() {

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

    return (<div className="speed-dial" style={{...styles.container, ...style}}>

        {enhancedChildren}

      <FloatingActionButton
        {...this.props.fabProps}
        { ... ((mode === undefined || mode === 'click') && { onClick: this.handleInteraction('click')})}
        { ... ((mode !== undefined) && { onHover: this.handleInteraction(mode)})}
      >
        <FabSpinner
          aContent={this.props.fabContentOpen}
          bContent={this.props.fabContentClose || this.props.fabContentOpen}
          showB={open}
        />
      </FloatingActionButton>

    </div>
    );
  }
}

SpeedDial.defaultProps = {
  itemsPosition: 'above' // above or below
};

export default SpeedDial;