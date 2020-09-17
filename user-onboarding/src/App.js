import React, { useState, useEffect } from "react";
import "./App.css";
import FriendForm from "./components/Form.js";
import DisplayForm from './components/DisplayForm.js'
import axios from "axios";
import schema from './validation/formSchema';
import * as yup from 'yup';
import uuid from 'react-uuid';

/// Initial States ///

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: "",
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  terms: "",
};

const initialFriends = [];
const initialDisabled = true;

function App() {
  //Declaring States ///
  const [friends, setFriends] = useState(initialFriends); // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // Helpers //

  const getFriends = () => {
    axios
      .get("https://reqres.in/api/users")
      .then(res => {
        console.log('res', res)
        setFriends(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewFriend = newFriend => {
    newFriend.first_name = newFriend.name
    axios.post("https://reqres.in/api/users", newFriend)
    .then(res => {
      const newFriends = [...friends, res.data]
      setFriends(newFriends) // do not do this on auto pilot
      setFormValues(initialFormValues)

    })
    .catch(err => {
      console.log(err)
    })
  }

  const validate = (name, value ) => {
    //let's validate this specific key/value
     // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(schema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => { // eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }


   //////////////// EVENT HANDLERS ////////////////
   const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newFriend = {
      id: Date.now(),
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['terms' === true]
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
  }

   //////////////// SIDE EFFECTS ////////////////
   useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
  schema.isValid(formValues)
  .then(valid => {
    setDisabled(!valid);
  });
}, [formValues]);

  console.log('friends data', friends)
  return (
    <div className="container">
      <FriendForm 
       values={formValues}
       change={inputChange}
       submit={formSubmit}
       disabled={disabled}
       errors={formErrors}
       />
      {
        friends.map(friend => {
          return (
            <DisplayForm key={friend.id} details={friend} />
          )
        })
      }
    </div>
  );
}

export default App;
