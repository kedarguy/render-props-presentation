import React, { Component } from "react";
import Page from "../layouts/main";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

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
      <LiveProvider
        code={`class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}`}
      >
        <LiveEditor />
      </LiveProvider>
      <br />
      <br />
      <Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>
      <br />
      <br />
      <LiveProvider
        code={`<Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>`}
      >
        <LiveEditor />
      </LiveProvider>
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
