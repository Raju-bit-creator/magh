import React, { Component } from "react";

export default class ClassCasedComponent extends Component {
  // initialization
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  // mounting
  componentDidMount() {
    console.log("Component did mount");
  }
  // updating
  componentDidUpdate() {
    console.log("Component did update");
  }
  //component should update
  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should component update");
  }

  // unmounting
  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Click me !!
        </button>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}

//component life cycle method
// 1 initialization
// 2 componentWillMount
// 3 componentWillUpdate
// 4 component didMount
// 5 unmounting
