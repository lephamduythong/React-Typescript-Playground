/* eslint-disable prettier/prettier */
import * as React from 'react';

const asyncComponent = (importComponent) => {
  return class extends React.Component {
    state = {
      component: null,
    }
    componentDidMount() {
      importComponent.call().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }
    render() {
        const C = this.state.component;
        return C ? <C {...this.props} /> : null;
    }
  }
  
  // return props => {
  //   const [state, setState] = React.useState({
  //     component: null,
  //   });
  //   React.useEffect(() => {
  //     importComponent.then(cmp => {
  //       setState({ component: cmp.default });
  //     });
  //   }, []);
  //   const C = state;
  //   return C ? <C {...props} /> : null;
  // };
};

export default asyncComponent;
