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
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert(`The value from the state is: ${this.state.value}`);
  }
  render() {
    return this.props.children(
      this.state.value,
      this.onChange,
      this.handleSubmit,
      "placeholder"
    );
  }
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 5</h2>
      <p>
        What happens when we have a lot of children that need to get the same
        props? this looks verbose{" "}
      </p>
      <Caffeinate>
        {(value, onChange, handleSubmit, placeholder) => {
          return (
            <div>
              value from the State: <span>{value}</span>
              <br />
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
              <br />
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
              <br />
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
              <br />
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
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
