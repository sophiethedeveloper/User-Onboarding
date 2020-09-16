import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function FriendForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="with a placeholder"
          onChange={onChange}
          value={values.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="with a placeholder"
          onChange={onChange}
          value={values.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password placeholder"
          onChange={onChange}
          value={values.password}
        />
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={onChange}
          />{" "}
          Do you accept the Terms and Conditions?
        </Label>
      </FormGroup>
      {/* 🔥 DISABLE THE BUTTON */}
      <Button disabled={disabled}>Submit</Button>
    </Form>
  );
}

export default FriendForm;
