import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// import Radium, { StyleRoot } from 'radium';
import withClass from '../hoc/withClass';
import Auxilliary from '../hoc/Auxilliary';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  state = {
    persons: [
      { id: 'q', name: 'Max', age: 28 },
      { id: 'a', name: 'Manu', age: 29 },
      { id: 'z', name: 'Stephanie', age: 30 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    counter: 0,
    isAuthenticated: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 33 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1
      };
    });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); // without argument slice copy the whole array and return new array
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  LoginHandler = () => {
    this.setState({ isAuthenticated: true })
  }

  render() {
    let persons = null;
    console.log('[App.js] render')
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.isAuthenticated} />
        </div>
      );
    }

    return (
      <Auxilliary>
        <button onClick={() => this.setState({ showCockpit: false })}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.isAuthenticated, login:this.LoginHandler}}>
          {this.state.showCockpit ? (<Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            toggle={this.togglePersonHandler}
            login={this.LoginHandler} />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Auxilliary>

    );
  }
}
export default withClass(App, classes.App);
