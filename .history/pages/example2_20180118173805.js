import React, { Component } from "react";
import Page from "../layouts/main";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.render(this.state.coffee);
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 2</h2>
      <p>We can also use the explicit render prop to achieve the same result</p>
      <br />
      <LiveProvider
        code={`class Caffeinate extends Component {
          state = { coffee: "Americano" };
          render() {
            return this.props.render(this.state.coffee);
          }
        }`}
      >
        <LiveEditor />
      </LiveProvider>
      <Caffeinate render={beverage => <div>Drinking an {beverage}.</div>} />
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
