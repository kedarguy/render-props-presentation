import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }
  render() {
    return this.props.children(this.state.coffee, this.onChange);
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 4</h2>
      <p>Manipulating the parent state</p>
      <Caffeinate>
        {(value, onChange) => {
          return (
            <div>
              value from the State: {value}
              <br />
              <input type="text" value={value} onChange={onChange} />
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
