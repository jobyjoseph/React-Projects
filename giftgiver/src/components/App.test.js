import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  const app = shallow(<App />);

  it("renders correctly", () => {
    expect(app).toMatchSnapshot(); // check if a component renders correctly
  });

  it("initializes the `state` with an empty list of gifts", () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe("when clicking the `add-gift` button", () => {
    const id = 1;

    beforeEach(() => {
      app.find(".btn-add").simulate("click");
    });

    afterEach(() => {
      app.setState({ gifts: [] });
    });

    it("adds a new gift to `state`", () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });

    it("renders a new gift list item", () => {
      expect(app.find(".gift-list").children().length).toEqual(1);
    });

    it("renders `Gift` component", () => {
      expect(app.find("Gift").exists()).toBe(true);
    });

    describe("and remove the gift on remove button click", () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it("removes gift from `state`", () => {
        expect(app.state().gifts).toEqual([]);
      });
    });
  });
});
