import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    setTimeout(() => {
      toggleBtnRef.current.click();
    }, 1000); 
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  },[])

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  });

  const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons) {
        btnClass = classes.Red
    }
     
    if(props.personsLength <= 2 ) {
      assignedClasses.push(classes.red)
    } 

    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold)
    }

    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <h1 className={assignedClasses.join(' ')}>This is really working</h1>
            <button
            ref = {toggleBtnRef}
            className={btnClass}
            onClick={props.toggle}>Toggle Persons</button>
            {<button onClick={authContext.login}>LogIn</button> }            
        </div>
  );
    
}

export default React.memo(cockpit);