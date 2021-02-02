import React from 'react';
import styled from 'styled-components';

// Higher Order Component with styles
const StyledWrapper = styled.div`
  color: white;
`;

export class Product extends React.PureComponent<{ v1: string; v2: string }> {
  render() {
    console.log('Product render ' + this.props.v2);
    return (
      <StyledWrapper>
        {this.props.v1} - {this.props.v2}
      </StyledWrapper>
    );
  }
}
