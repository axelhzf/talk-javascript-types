type State = {
  users: Array<{
    id: string
    name: string,
    age: number,
    phoneNumber: string,
  }>,
  value: string,
};


type FooAction = { type: "FOO", foo: string };
type BarAction = { type: "BAR", bar: string };

type Action = FooAction | BarAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FOO":
      return { ...state, value: action.foo };
    case "BAR":
      return { ...state, value: action.bar };
    default:
      return state;
  }
}