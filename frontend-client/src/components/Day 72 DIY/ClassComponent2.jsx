import React, { Component } from 'react';

class ComponentB extends Component {
  constructor(props) {
    super(props);
    console.log('Component B - constructor');
  }

  componentDidMount() {
    console.log('Component B - componentDidMount');
  }

  componentDidUpdate() {
    console.log('Component B - componentDidUpdate');
  }

  render() {
    console.log('Component B - render');
    return <div>Component B</div>;
  }
}

class ComponentA extends Component {
  constructor(props) {
    super(props);
    console.log('Component A - constructor');
    this.state = { value: 0 };
  }

  componentDidMount() {
    console.log('Component A - componentDidMount');
  }

  componentDidUpdate() {
    console.log('Component A - componentDidUpdate');
  }

  updateState = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  render() {
    console.log('Component A - render');
    return (
      <div>
        <h1>Component A</h1>
        <p>Value: {this.state.value}</p>
        <button onClick={this.updateState}>Update State</button>
        <ComponentB />
      </div>
    );
  }
}

class ClassApp1 extends Component {
  constructor(props) {
    super(props);
    console.log('App - constructor');
  }

  componentDidMount() {
    console.log('App - componentDidMount');
  }

  componentDidUpdate() {
    console.log('App - componentDidUpdate');
  }

  render() {
    console.log('App - render');
    return (
      <div>
        <h1>App</h1>
        <ComponentA />
      </div>
    );
  }
}

export default ClassApp1;
