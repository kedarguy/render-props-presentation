import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}

function Child({ beverage }) {
  return <button>{beverage}</button>;
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 3</h2>
      <p>Caffeinate can send the cofee down to any kind of child</p>
      <Caffeinate>
        {beverage => {
          return (
            <div>
              <Child beverage={beverage} />;
              <br />
              <div>Im just a div rendering the {beverage}</div>
              <br />
              passing the prop to an input as its placeholder:
              <input type="text" placeholder={beverage} />
            </div>
          );
        }}
      </Caffeinate>,
    </div>
    <style jsx>{`
      .cont {
        background: #eee;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
      }
    `}</style>
  </Page>
);
