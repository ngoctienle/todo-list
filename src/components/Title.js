import React, { Component } from "react";

class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-header">
        <h1>My Todo List</h1>
      </div>
    );
  }
}

export default Title;
