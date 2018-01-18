import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}

const Child

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 2</h2>
  <Caffeinate 
    render={
      (beverage) => <div>Drinking an {beverage}.</div>
    }
  />,
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
