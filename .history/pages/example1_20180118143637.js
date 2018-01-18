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
    <div>
      <h2>Example 1</h2>
      <Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>,
    </div>
  </Page>
);
