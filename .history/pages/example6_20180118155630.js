import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputPropGetter = this.inputPropGetter.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert(`The value from the state is: ${this.state.value}`);
  }

  inputPropGetter(userProps) {
    return {
      value: this.state.value,
      onChange: this.onChange,
      placeholder: "generic placeholder",
      type: "text",
      ...userProps
    };
  }
  render() {
    return this.props.children(this.inputPropGetter, this.handleSubmit);
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 6</h2>
      <p>The answer is prop getters!</p>
      <Caffeinate>
        {(inputPropGetter, handleSubmit) => {
          return (
            <div>
              value from the State: <span>{inputPropGetter().value}</span>
              <br />
              <input
                {...inputPropGetter({ "aria-label": "example user prop" })}
              />
              <br />
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          );
        }}
      </Caffeinate>
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
