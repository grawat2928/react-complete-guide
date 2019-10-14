import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[Persons.js]  ShouldComponentUpdate');
  //   if(nextProps.persons !== this.props.persons ||
  //      nextProps.changed !== this.props.changed ||
  //      nextProps.clicked !== this.props.clicked
  //     ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message: 'SnapShot!!'};
  }

  componentDidUpdate(prevProps,prevState,message){
    console.log('[Persons.js] componentDidUpdate');
    console.log(message);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  

  render() {
  console.log('[Persons.js] rendering.........');
    return this.props.persons.map((person, index) => {
        return (
        <Person             
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          ref={this.inputElementRef}
          changed={(event) => this.props.changed(event, person.id)}
          isAuth={this.props.isAuthenticated}
        />
      )
   })
  }
}

export default Persons;