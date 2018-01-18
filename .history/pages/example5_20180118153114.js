import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "initial value"
    };
    this.onChange = this.onChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert(`The value from the state is: ${this.state.value}`);
  }
  render() {
    return this.props.children(this.state.value, this.onChange);
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 4</h2>
      <p />
      <Caffeinate>
        {(value, onChange, handleSubmit) => {
          return (
            <div>
              value from the State: <span>{value}</span>
              <br />
              <input type="text" value={value} onChange={onChange} />
              <br />
              <button onClick={handleSubmit}>Submit</button>
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
