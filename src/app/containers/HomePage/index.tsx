import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';

import { Person } from './Person';

let peopleList = [
  { id: '123', name: 'Thong', age: 24 },
  { id: '456', name: 'Anh', age: 25 },
  { id: '789', name: 'Luong', age: 26 },
];

const StyledPerson = styled(Person)`
  background-color: #ff007f;
  margin-top: 10px;
  color: ${props => props.textColor};
`;

const StyledButtonWrapper = styled.div<{ buttonColor: string }>`
  button {
    background-color: ${props => props.buttonColor};
    color: white;
    padding: 10px;
  }
`;

export function HomePage() {
  // React hooks
  const [peopleState, setPeopleState] = React.useState({
    people: peopleList,
    isShow: false,
    buttonColor: 'red',
  });

  const toggleShow = () => {
    setPeopleState({
      ...peopleState,
      isShow: !peopleState.isShow,
      buttonColor: peopleState.buttonColor === 'red' ? 'blue' : 'red',
    });
  };

  // Two-way binding
  const inputChange = (index, event) => {
    peopleList[index].name = event.target.value;
    setPeopleState({
      ...peopleState,
    });
  };

  const deletePerson = index => {
    let list = [...peopleState.people]; // copy, not ref
    list.splice(index, 1);
    setPeopleState({ ...peopleState, people: list });
  };

  let renderingPeople: JSX.Element | null = null;
  if (peopleState.isShow) {
    renderingPeople = (
      <div>
        {peopleState.people.map((person, index) => {
          return (
            <StyledPerson
              key={`person-${person.id}`}
              name={person.name}
              age={person.age}
              inputChange={inputChange.bind(null, index)}
              deletePerson={deletePerson.bind(null, index)}
              textColor="yellow"
            >
              Children
            </StyledPerson>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <StyledButtonWrapper buttonColor={peopleState.buttonColor}>
        <button onClick={toggleShow}>Show/Hide</button>
      </StyledButtonWrapper>
      {renderingPeople}

      <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}
