/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from 'react-router-dom';
import { Something } from './components/Something';

type AboutPageProps = {};

const StyledWrapper = styled.div``;

export function AboutPage(props: RouteComponentProps<AboutPageProps>) {
  console.log(props);
  return (
    <StyledWrapper>
      <h1>About</h1>
      <p>Cute lovely</p>
      {/* fix "history of undefined" */}
      {/* <Something {...props} /> if component not defined withRouter */}
      <Something />
    </StyledWrapper>
  );
}
