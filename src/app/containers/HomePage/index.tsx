import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';

import { Person } from './Person';
import { Product } from './Product';
import { AuthContext } from './context/auth-context';

let peopleList = [
  { id: '123', name: 'Thong', age: 24 },
  { id: '456', name: 'Anh', age: 25 },
  { id: '789', name: 'Luong', age: 26 },
];

const StyledButtonWrapper = styled.div<{ buttonColor: string }>`
  button {
    background-color: ${props => props.buttonColor};
    color: white;
    padding: 10px;
  }
`;

export function HomePage() {
  // React hooks
  // Init states
  const [state, setState] = React.useState({
    people: peopleList,
    isShow: false,
    buttonColor: 'red',
    valueTest: '1',
    authenticated: false,
  });

  // Side effects
  React.useEffect(() => {
    console.log('HomePage');
  }, []);

  const toggleShow = () => {
    setState({
      ...state,
      isShow: !state.isShow,
      buttonColor: state.buttonColor === 'red' ? 'blue' : 'red',
    });
  };

  // Two-way binding
  const inputChange = (
    personId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let index = peopleList.findIndex(p => p.id === personId);
    peopleList[index].name = event.target.value;
    setState({
      ...state,
    });
  };

  const deletePerson = (
    personId: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    let index = peopleList.findIndex(p => p.id === personId);
    peopleList.splice(index, 1);
    setState({ ...state, people: peopleList });
  };

  const changeProductTest = () => {
    setState({ ...state, valueTest: 'clgt' });
  };

  const loginHandler = () => {
    setState({ ...state, authenticated: true });
  };

  let renderingPeople: JSX.Element | null = null;
  if (state.isShow) {
    renderingPeople = (
      <div>
        {state.people.map((person, index) => {
          return (
            <Person
              key={`person-${person.id}`}
              id={person.id}
              name={person.name}
              age={person.age}
              inputChangeFunc={inputChange.bind(null, person.id)}
              deletePersonFunc={deletePerson.bind(null, person.id)}
            >
              Children
            </Person>
          );
        })}
      </div>
    );
  }

  return (
    // React.Fragment short hand <>...</>, alternative for [array elements]
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <button onClick={loginHandler}>Login as name 'Thong'</button>

      <StyledButtonWrapper buttonColor={state.buttonColor}>
        <button onClick={toggleShow}>Show/Hide</button>
      </StyledButtonWrapper>

      <AuthContext.Provider
        value={{
          authenticated: state.authenticated,
        }}
      >
        {renderingPeople}
      </AuthContext.Provider>

      <br />
      <StyledButtonWrapper buttonColor="green">
        <button onClick={changeProductTest}>
          Change person name test for PureComponent and .memo
        </button>
      </StyledButtonWrapper>
      <Product v1={state.valueTest} v2="2"></Product>
      <Product v1="3" v2="4"></Product>
      <Product v1="5" v2="6"></Product>

      <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}
