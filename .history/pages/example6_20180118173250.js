import React, { Component } from "react";
import Page from "../layouts/main";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInputProps = this.getInputProps.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert(`The value from the state is: ${this.state.value}`);
  }

  getInputProps() {
    return {
      value: this.state.value,
      onChange: this.onChange,
      placeholder: "generic placeholder",
      type: "text"
    };
  }
  render() {
    return this.props.children(this.getInputProps, this.handleSubmit);
  }
}
function TextInput(props) {
  return <input {...props} />;
}

export default () => (
  <Page>
    <div className="cont">
      <h2>Example 6</h2>
      <p>The answer is prop getters!</p>
      <LiveProvider
        code={` getInputProps() {
    return {
      value: this.state.value,
      onChange: this.onChange,
      placeholder: "generic placeholder",
      type: "text"
    };
  }`}
      >
        <LiveEditor />
      </LiveProvider>
      <br />
      <Form>
        {(getInputProps, handleSubmit) => {
          return (
            <div>
              <p>
                value from the State: <span>{getInputProps().value}</span>
              </p>
              <br />
              <TextInput {...getInputProps()} />
              <br />
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          );
        }}
      </Form>
      <br />
      <LiveProvider code="<TextInput {...getInputProps()} />">
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
