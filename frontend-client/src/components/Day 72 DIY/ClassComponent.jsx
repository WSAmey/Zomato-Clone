import React, { Component } from 'react';

class ComponentB extends Component {
  constructor(props) {
    super(props);
    console.log('Component B - getDerivedStateFromProps() method');
  }

  componentDidMount() {
    console.log('Component B - shouldComponentUpdate() method');
  }

  render() {
    console.log('Component B - render() method');
    return <div>Component B</div>;
  }
}

class ComponentA extends Component {
  constructor(props) {
    super(props);
    console.log('Component A - getDerivedStateFromProps() method');
  }

  componentDidMount() {
    console.log('Component A - shouldComponentUpdate() method');
  }

  render() {
    console.log('Component A - render() method');
    return (
      <div>
        <h1>Component A</h1>
        <ComponentB />
      </div>
    );
  }
}

class ClassApp extends Component {
  constructor(props) {
    super(props);
    console.log('Component A - getSnapShotBeforeUpdate()');
  }

  componentDidMount() {
    console.log('Component A - getSnapShotBeforeUpdate()');
  }

  render() {
    console.log('Component B - ComponentDidUpdate() method');
    console.log('Component A - ComponentDidUpdate() method');

    return (
      <div>
        <h1>App</h1>
        <ComponentA />
      </div>
    );
  }
}

export default ClassApp;