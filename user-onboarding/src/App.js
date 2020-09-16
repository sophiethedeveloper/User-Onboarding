import React, { useState, useEffect } from "react";
import "./App.css";
import FriendForm from "./components/Form.js";
import DisplayForm from './components/DisplayForm.js'
import axios from "axios";

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
      .get("https://reqres.in/api/users?page=2")
      .then(res => {
        setFriends(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewFriend = newFriend => {
    axios.post("https://reqres.in/api/users?page=2", newFriend)
    .then(res => {
      console.log('res', res)
      setFriends([...friends, res.data]) // do not do this on auto pilot
      setFormValues(initialFormValues)

    })
    .catch(err => {
      console.log(err)
    })
  }

   //////////////// EVENT HANDLERS ////////////////
   const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    // validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newFriend = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms.trim(),
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
  }

   //////////////// SIDE EFFECTS ////////////////
   useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className="container">
      <FriendForm 
       values={formValues}
       change={inputChange}
       submit={formSubmit}
       disabled={disabled}
       errors={formErrors}
       />

      {/* {
        friends.map(friend => {
          return (
            <DisplayForm key={friend.id} details={friend} />
          )
        })
      } */}
    </div>
  );
}

export default App;
