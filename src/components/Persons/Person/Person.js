import React, { Component } from 'react';
import classes from './Person.css';
import Auxilliary from '../../../hoc/Auxilliary';
// import Radium from 'radium';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated)
    }

    render() {
        console.log('[Person.js] rendering........');
        return (
            <Auxilliary>
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please LogIn</p>}
                <p onClick={this.props.click}>I am {this.props.name} and, I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type='text'
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </Auxilliary>
        );
    }
    // const style = {
    //     '@media (min-width: 500px)' : {
    //         width: '450px'
    //     }
    // };   
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);

// className={classes.Person}