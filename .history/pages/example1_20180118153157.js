import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 1</h2>
      <p>
        Most simple render props, sending the state from the parent to the child
      </p>
      <Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>
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
