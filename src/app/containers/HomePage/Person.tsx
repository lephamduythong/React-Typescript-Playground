import * as React from 'react';

export function Person(props) {
  return (
    <div className={props.className}>
      <p onClick={props.nameClick}>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Characteristic: {props.children}</p>
      <div>
        <input type="text" onChange={props.inputChange} value={props.name} />
      </div>
      <div>
        <button onClick={props.deletePerson}>Delete</button>
      </div>
    </div>
  );
}

// styled(Person)`
//   margin-top: '100px';
// `;

// yarn lint --fix
