import React from "react";
import { Button } from "react-bootstrap";
import Gift from "./Gift";

class App extends React.Component {
  state = {
    gifts: [],
  };

  addGift = () => {
    const { gifts } = this.state;
    const ids = gifts.map((ele) => ele.id);
    const max = Math.max(...ids, 0);
    gifts.push({ id: max + 1 });
    this.setState({ gifts });
  };

  removeGift = (id) => {
    const { gifts } = this.state;
    const newGifts = gifts.filter((gift) => gift.id !== id);
    this.setState((prevState) => {
      return {
        ...prevState,
        gifts: newGifts,
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Gift Giver</h1>
        <div className="gift-list">
          {this.state.gifts.map((gift) => (
            <Gift key={gift.id} gift={gift} removeGift={this.removeGift} />
          ))}
        </div>
        <Button className="btn-add" onClick={this.addGift}>
          Add Gift
        </Button>
      </div>
    );
  }
}

export default App;
