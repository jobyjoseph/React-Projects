import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";

export class Gift extends Component {
  state = { person: "", present: "" };

  onInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        [inputName]: inputValue,
      };
    });
  };

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <FormLabel>Person:</FormLabel>
            <FormControl
              className="input-person"
              name="person"
              value={this.state.person}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Present:</FormLabel>
            <FormControl
              className="input-present"
              name="present"
              value={this.state.present}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              className="btn-remove"
              onClick={() => this.props.removeGift(this.props.gift.id)}
            >
              Remove Gift
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Gift;
