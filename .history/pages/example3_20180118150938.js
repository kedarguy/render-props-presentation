import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}

function Child({ bevarge }) {
  return <button>{bevarge}</button>;
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 3</h2>
      <p>Caffeinate can send the cofee down to any kind of child</p>
      <Caffeinate>
        {bevarge => {
          return (
            <div>
              <Child bevarge={bevarge} />;
              <div>bevarge</div>
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
