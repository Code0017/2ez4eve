import React from 'react';
import './App.css';
import 'react-bootstrap';
import './bootstrap/bootstrap-theme.min.css'
import './bootstrap/bootstrap.min.css'
import PraisalInput from './components/praisalInput/praisalInput'
import CalculationInput from './components/calculationInput/calculationInput'

class AppEvepraisal extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          allNum: 0
      }
  }

  setAllNum(num) {
      this.setState(function (state, props) {
          return {
              allNum: num
          }
      })
  }

  render() {
      return (
          <div className="container-full">
              <div className="row">
                  <div className="col-md-4">
                      <PraisalInput parentSetAllNum = { this.setAllNum.bind(this) } />
                  </div>
                  <div className="col-md-4">
                      <CalculationInput allNum={ this.state.allNum } />
              </div>
              </div>
          </div>
      );
  }
}

function App() {
  return (
    <div className="App">
      <AppEvepraisal />
    </div>
  );
}

export default App;
