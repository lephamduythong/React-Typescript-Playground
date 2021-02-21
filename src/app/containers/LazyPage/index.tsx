/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from 'react-router-dom';

type LazyPageProps = {};

type LazyPageParams = {};

const StyledWrapper = styled.div``;

export function LazyPage(
  props: RouteComponentProps<LazyPageParams> & LazyPageProps,
) {
  console.log(props);
  return (
    <StyledWrapper>
      <h1>Lazy Page</h1>
      <p>Check in "Network" tab</p>
    </StyledWrapper>
  );
}
