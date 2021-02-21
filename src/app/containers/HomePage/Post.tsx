/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components/macro';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type PostProps = {
  location: {
    state: string; // as post's content
  };
  note: string;
};

type PostRouteParams = {
  id: string;
};

const StyledWrapper = styled.div``;

export const Post = withRouter(
  (props: RouteComponentProps<PostRouteParams> & PostProps) => {
    console.log(props);
    return (
      <StyledWrapper>
        <p>{'Post id: ' + props.match.params.id}</p>
        <p>{'Content: ' + props.location.state}</p>
        <p>{'Search: ' + props.location.search}</p>
        <p>{'Hash: ' + props.location.hash}</p>
        <p>{'Note: ' + props.note}</p>
      </StyledWrapper>
    );
  },
);
