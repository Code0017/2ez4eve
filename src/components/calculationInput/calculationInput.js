import React from 'react';

class CalculationInput extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <div>总价:{ this.props.allNum }</div>
        );
    }
  }

  export default CalculationInput