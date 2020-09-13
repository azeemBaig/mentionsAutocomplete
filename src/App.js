import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      selection: null,
    };
  }

  onTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (this.state.selection !== null) {
      let word = value.slice(this.state.selection + 1).replace("/[a-z0-9]+/gi");
      suggestions = this.getLabels(word);
    }
    this.setState(() => ({
      suggestions,
      text: value,
    }));
    if (value.length == 0) {
      this.setState({ selection: null });
    }
  };

  getLabels(keyword) {
    const allLabels = ["NextActions", "Someday_Actions", "Costco", "Alexa"];
    const result = allLabels.filter(function (x) {
      return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    return result;
  }

  selectedText(value) {
    this.setState(() => ({
      text: this.state.text + value,
      suggestions: [],
    }));
  }

  handleChange = (e) => {
    if (e.key === "@") {
      this.setState({
        selection: e.target.selectionEnd,
      });
    }
  };

  renderSuggestions = () => {
    let { suggestions } = this.state;
    if (suggestions === 0) {
      return null;
    }
    return (
      <ul className="ul-style">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="li-style"
            onClick={() => this.selectedText(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { text } = this.state;
    return (
      <div className="container">
        <p>
          Below is an example scenario taken from a to-do list app. Please
          implement a text field control in React.js that can serve this
          scenario.
        </p>
        <div>
          <h2>Notes:</h2>
          <ul>
            <li>
              You do not need to implement the business logic of a to-do list
              app. the goal is to build a text input field control that
              activates a dropdown selector based on a special symbol ('@' for
              labels in this case).
            </li>
            <li>
              Please use the "<b>Fork</b>" button to start your work, so that
              you could have your private dedicated url. And please send the url
              back to the recruiter once you are done.{" "}
            </li>
            <li>
              Please use one of the two provided functions to get the label list
              by keyword. Do not modify the provided functions. Using the
              asynchronous api correctly is a bonus.
            </li>
            <li>Please implement the control using React.js.</li>
          </ul>
        </div>
        {/* <img
          src="https://media.giphy.com/media/dtM5LTpHaDniDTee9x/giphy.gif"
          width="580"
        /> */}
        <div className="input-div">
          <input
            id="query"
            type="text"
            onChange={this.onTextChange}
            value={text}
            contentEditable="true"
            onKeyDown={this.handleChange}
            onBlur={this.autocomplete}
          />
          {this.renderSuggestions()}
        </div>
      </div>
    );
  }
}

export default App;
