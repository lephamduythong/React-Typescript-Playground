import * as React from 'react';
import styled from 'styled-components/macro';

import { AuthContext } from './context/auth-context';

// No need use PropsType
export type PersonProps = {
  id: string;
  name: string;
  age: number;
  children: string;
  inputChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deletePersonFunc: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

// Higher Order Component with styles
const StyledWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  background-color: green;
  color: yellow;
  padding: 10px;
  margin-top: 10px;
`;

export const Person = React.memo(
  (props: PersonProps) => {
    const lastInputElementRef = React.useRef<HTMLInputElement>(null);

    const [state, setState] = React.useState({
      a: 0,
      authenticated: false,
    });

    React.useEffect(() => {
      console.log('DidMout or DidUpdate');
      lastInputElementRef.current?.focus();
    });

    const authContext = React.useContext(AuthContext);
    console.log('authenticated: ' + authContext.authenticated);

    const test = () => {
      let x = state.a + 1;
      setState({ ...state, a: x });
    };

    console.log('Person rendered: ' + props.name);
    return (
      <StyledWrapper>
        <p>{state.a}</p>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
        <p>Characteristic: {props.children}</p>
        {/* <AuthContext.Consumer>
          {context => (
            <div style={{ color: 'aqua' }}>
              {context.authenticated && props.id === '123'
                ? 'Authenticated'
                : null}
            </div>
          )}
        </AuthContext.Consumer> */}
        {authContext.authenticated && props.id === '123' ? (
          <div style={{ color: 'aqua' }}>Authenticated</div>
        ) : null}
        <div>
          <input
            type="text"
            onChange={props.inputChangeFunc}
            value={props.name}
            ref={lastInputElementRef}
          />
        </div>
        <div>
          <button onClick={test}>Test</button>
          <button onClick={props.deletePersonFunc}>Delete</button>
        </div>
      </StyledWrapper>
    );
  },
  // shouldComponentUpdate with React.memo
  // https://viblo.asia/p/reactmemo-Ljy5VM7Glra
  (prevProps, nextProps) => {
    if (prevProps.name === nextProps.name) {
      return true;
    }
    return false;
  },
);

// React.PureComponent ~ React.memo
// export class Person extends React.Component<PersonProps, { a: number }> {
//   state = {
//     a: 0,
//   };

//   test = () => {
//     let x = this.state.a + 1;
//     this.setState({ a: x });
//   };

//   // static getDerivedStateFromProps(props, state) {
//   //   console.log('Person getDerivedStateFromProps', props);
//   //   console.log(state);
//   //   return state;
//   // }

//   // Important to optimize rendering speed
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('Person shouldComponentUpdate ' + this.props.name);
//     if (this.props.name === nextProps.name && this.state.a === nextState.a) {
//       return false;
//     }
//     return true;
//   }

//   // getSnapshotBeforeUpdate(prevProps, prevState) {
//   //   console.log('Person getSnapshotBeforeUpdate' + this.props.name);
//   //   return { message: 'Snapshot!' };
//   // }

//   render() {
//     console.log('Person render ' + this.props.name);
//     return (
//       <StyledWrapper>
//         <p>{this.state.a}</p>
//         <p>Name: {this.props.name}</p>
//         <p>Age: {this.props.age}</p>
//         <p>Characteristic: {this.props.children}</p>
//         <div>
//           <input
//             type="text"
//             onChange={this.props.inputChange}
//             value={this.props.name}
//           />
//         </div>
//         <div>
//           <button onClick={this.test}>Increment</button>
//           <button onClick={this.props.deletePerson}>Delete</button>
//         </div>
//       </StyledWrapper>
//     );
//   }

//   // componentDidMount() {
//   //   console.log('Person componentDidMount ' + this.props.name);
//   // }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log('Person componentDidUpdate ' + this.props.name);
//     console.log(snapshot); // snapshot messsage returned from getSnapshotBeforeUpdate
//   }

//   // componentDidCatch() {
//   //   console.log('Person componentDidCatch ');
//   // }
// }

// React lifecycle

/* 
  constructor()
  getDerivedStateFromProps()
  render()
  componentDidMount()

  shouldComponentUpdate()
  getSnapshotBeforeUpdate()
  componentDidUpdate()

  componentWillUnmount()

  getDerivedStateFromError()
  componentDidCatch(error, info)
*/

// styled(Person)`
//   margin-top: '100px';
// `;

// yarn lint --fix
