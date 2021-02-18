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
import axios from 'axios';
import { axiosInstance } from '../../config/axios';
import firebaseInstance from 'app/config/firebase';
import { Spinner } from 'app/components/Spinner';

let peopleList = [
  { id: '123', name: 'Thong', age: 24, postId: '1' },
  { id: '456', name: 'Anh', age: 25, postId: '2' },
  { id: '789', name: 'Luong', age: 26, postId: '3' },
];

const StyledButtonWrapper = styled.div<{ buttonColor: string }>`
  button {
    background-color: ${props => props.buttonColor};
    color: white;
    padding: 10px;
  }
`;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function HomePage() {
  // React hooks
  // Init states
  const [state, setState] = React.useState({
    people: peopleList,
    isShow: false,
    buttonColor: 'red',
    valueTest: '1',
    authenticated: false,
    showSpinner: false,
    processingText: 'READY',
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

  const fetchHandler = async () => {
    // fetch('https://jsonplaceholder.typicode.com/posts/1')
    //   .then(res => res.json())
    //   .then(data => console.log(data));
    let resquest1 = axios.get('posts/1'); // Use default baseURL config
    let resquest2 = axiosInstance.get(
      'https://jsonplaceholder.typicode.com/posts/2',
    );
    await Promise.all([resquest1, resquest2]);
    resquest1.then(data => console.log(data.data));
    resquest2.then(data => console.log(data.data));
  };

  // https://firebase.google.com/docs/reference/rest/database
  const firebaseGetHandler = async () => {
    firebaseInstance
      .get('shit.json')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  const firebasePostHandler = async () => {
    firebaseInstance
      .post('shit.json', { a: [1, 2, 3], b: 'clgt' })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const firebasePutHandler = async () => {
    firebaseInstance
      .put('shit.json', { a: [1, 2, 3], b: 'clgt' })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const firebasePatchHandler = async () => {
    firebaseInstance
      .patch('shit.json', { b: 'vcc ' })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const firebaseDeleteHandler = async () => {
    firebaseInstance
      .delete('shit.json')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const spinnerHandler = async () => {
    // wait and fire success
    setState({ ...state, showSpinner: true });
    await delay(2000); // http request takes 2 seconds
    setState({ ...state, showSpinner: false, processingText: 'DONE!' });
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
              postId={person.postId}
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

      <div style={{ margin: '10px' }}>
        <button onClick={loginHandler}>Login as name 'Thong'</button>
        <button onClick={fetchHandler}>Axios test</button>
        <button onClick={spinnerHandler}>Spinner test</button>
        {state.showSpinner ? (
          <Spinner size={16} marginLeft={15}></Spinner>
        ) : (
          state.processingText
        )}
      </div>

      <div>
        <h1>Firebase API</h1>
        <button onClick={firebaseGetHandler}>GET</button>
        <button onClick={firebasePostHandler}>POST</button>
        <button onClick={firebasePutHandler}>PUT</button>
        <button onClick={firebasePatchHandler}>PATCH</button>
        <button onClick={firebaseDeleteHandler}>DELETE</button>
      </div>
      <br />

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
