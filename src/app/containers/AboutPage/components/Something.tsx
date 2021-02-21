/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type SomethingProps = {};

const StyledWrapper = styled.div``;

export const Something = withRouter((props: RouteComponentProps<SomethingProps>) => {
  console.log(props);
  return (
    <StyledWrapper>
      <p>Something went wrong!</p>
    </StyledWrapper>
  );
})
