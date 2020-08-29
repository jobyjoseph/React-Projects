This application is created using create-react-app.

```sh
npx create-react-app <app-name>

cd <app-name>

yarn add --dev enzyme jest-cli
```

Test files are written as <component>.test.js next to <component>.js. To run all tests:

```sh
yarn test
```

To shallow render a React component using enzyme:

```javascript
import { shallow } from "enzyme";
//...
const app = shallow(<App />);
```

To write a unit test, use global `it` function from Jest.
To check for some conditions inside unit test, use `expect` function from Jest.

```javascript
it("renders correctly", () => {
  expect(app).toMatchSnapshot(); // check if a component renders correctly
});
```

To use enzyme with React v16, install adapter.

```sh
yarn add --dev enzyme-adapter-react-16
```

then, add following code in `src/setupTests.js`

```javascript
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
```

In order to properly update the snapshot JSON we have to use a serializer for Jest: Refer: https://backbencher.dev/blog/empty-shallowwrapper-snapshot-jest-enzyme

### Get state of a component from enzyme wrapper

```javascript
app.state().gifts;
```

Here is a sample use:

```javascript
expect(app.state().gifts).toEqual([]);
```

### Simulate a click event after finding an element using enzyme

`.find()` method on component wrapper can search for a node. `.simulate()` can trigger a click event.

```javascript
app.find(".btn-add").simulate("click");
expect(app.state().gifts).toEqual([{ id: 1 }]);
```

### Execute some actions before and after each tests

```javascript
beforeEach(() => {
  app.find(".btn-add").simulate("click");
});

afterEach(() => {
  app.setState({ gifts: [] });
});
```

Above code should be inside a `describe()` block

### To simulate typing to a textbox using enzyme

```javascript
gift.find(".input-person").simulate("change", { target: { value: "Uncle" } });
```

### To check if a JSX component exists

```javascript
it("renders `Gift` component", () => {
  expect(app.find("Gift").exists()).toBe(true);
});
```

Here if at least one instance of `Gift` is rendered, the test case clears.

### Testing callbacks and attributes in react components

```javascript
const mockRemove = jest.fn();
const id = 1;
const props = {
  gift: { id },
  removeGift: mockRemove,
};
const gift = shallow(<Gift {...props} />);
```

In the above code `removeGift` is a callback function passed by parent to `Gift` attribute. We mock that callback function using `jest.fn()`. Now `mockRemove` can tell if that function is called or not, if called, with what arguments and so on.

Testing if `mockRemove` has been called with the `id` passed:

```javascript
expect(mockRemove).toHaveBeenCalledWith(id);
```
