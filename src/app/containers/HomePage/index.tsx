import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';

import { Person } from './Person';
import { Product } from './Product';
import { AuthContext } from './context/auth-context';
import axios from 'axios';
import { axiosInstance } from '../../config/axios';
import firebaseInstance from 'app/config/firebase';
import { Spinner } from 'app/components/Spinner';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  NavLink,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { Post } from './Post';

import { connect } from 'react-redux';

import './style.css';
import * as counterActions from '../../../store/actions/counter';
import { MyRootState } from 'index';

import { delayedIncreaseSaga } from '../../../store/sagas/counter';

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

export type HomePageStateProps = {
  counter: number;
  isCounterProcessing: boolean;
};

export type HomePageDispatchProps = {
  onIncrementCounter?: () => void;
  onDecrementCounter?: () => void;
  onAddCounter?: () => void;
  onIncrementDelayedCounterThunk?: () => void;
  onIncrementDelayedCounterSaga?: () => void;
  onIncrementDelayedCounterEpic?: () => void;
};

export type HomePageActions = {
  type: string;
  value: number;
};

type HomePageRouteParams = {};

const mapStateToProps = (state: MyRootState) => {
  const props: HomePageStateProps = {
    counter: state.counterReducer.counter,
    isCounterProcessing: state.counterReducer.isCounterProcessing,
  };
  return props;
};

const mapDisptachToProps = dispatch => {
  const props: HomePageDispatchProps = {
    onIncrementCounter: () => {
      dispatch(counterActions.increase());
    },
    onDecrementCounter: () => {
      dispatch(counterActions.decrease());
    },
    onAddCounter: () => {
      dispatch(counterActions.add(5));
    },
    onIncrementDelayedCounterThunk: () => {
      dispatch(counterActions.delayedIncreaseThunk());
    },
    onIncrementDelayedCounterSaga: () => {
      dispatch(counterActions.delayedIncreaseSaga());
    },
    onIncrementDelayedCounterEpic: () => {
      dispatch(counterActions.delayedIncreaseEpic());
    },
  };
  return props;
};

export const HomePage = withRouter(
  connect(
    mapStateToProps,
    mapDisptachToProps,
  )(
    (
      props: RouteComponentProps<HomePageRouteParams> &
        HomePageStateProps &
        HomePageDispatchProps,
    ) => {
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
        posts: [
          {
            id: 1,
            content: 'ABC',
          },
          {
            id: 2,
            content: 'XYZ',
          },
        ],
        isSubmitted: false,
      });

      // Side effects
      React.useEffect(() => {
        // console.log('HomePage');
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
        //   .then(data => // console.log(data));
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

      const redirectHandler1 = async () => {
        setState({ ...state, isSubmitted: true });
      };

      const redirectHandler2 = async () => {
        props.history.replace('/about');
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

          {/* <NavBar /> */}

          <div>
            <h3>Redux Playground</h3>
            <p>
              Counter: &nbsp;
              {props.isCounterProcessing ? 'Processing...' : props.counter}
            </p>
            <button onClick={props.onIncrementCounter}>Increase</button>
            <button onClick={props.onDecrementCounter}>Decrease</button>
            <button onClick={props.onAddCounter}>Add 5</button>
            <button
              onClick={props.onIncrementDelayedCounterThunk}
              disabled={props.isCounterProcessing ? true : false}
            >
              Increase delayed 2s using redux-thunk
            </button>
            <button
              onClick={props.onIncrementDelayedCounterSaga}
              disabled={props.isCounterProcessing ? true : false}
            >
              Increase delayed 2s using redux-saga
            </button>
            <button
              onClick={props.onIncrementDelayedCounterEpic}
              disabled={props.isCounterProcessing ? true : false}
            >
              Increase delayed 2s using redux-observable
            </button>
          </div>

          {state.isSubmitted ? <Redirect to="/about" /> : null}
          <Router>
            <div>
              <h3>Routing content inside Homepage</h3>
              <div>
                <button onClick={redirectHandler1}>
                  Redirect using "Redirect" component
                </button>
                <button onClick={redirectHandler2}>
                  Redirect using "history" prop
                </button>
              </div>
              <ul>
                <li>
                  <NavLink to="/home/post">Show lasted post</NavLink>
                </li>
                {state.posts.map(post => (
                  <li key={post.id}>
                    <NavLink
                      exact
                      to={{
                        pathname: `/home/post/${post.id}`,
                        state: post.content,
                        hash: 'position',
                        search: '?a=1',
                      }}
                    >
                      Show post {post.id}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Load single route only with Switch */}
              <Switch>
                <Route
                  path="/home/post"
                  component={() => <Post note="LASTED" />}
                />
                <Route
                  path="/home/post/:id"
                  component={() => <Post note="ID" />}
                />
              </Switch>
            </div>
          </Router>

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
            <h3>Firebase API</h3>
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

          {/* <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper> */}
        </>
      );
    },
  ),
);
