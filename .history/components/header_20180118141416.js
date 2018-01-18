import React, { Component } from "react";

function Header() {
  let exampleNumbers = [];

  for (var i = 1; i <= 5; i++) {
    exampleNumbers.push(i);
  }
  return (
    <div>
      <h1>Hello Header Component2</h1>
      <h5>examples:</h5>
      {exampleNumbers.map(number => <button>{number}</button>)}
    </div>
  );
}

export default Header;
