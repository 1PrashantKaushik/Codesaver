import { createStore } from "redux";

let initialstate = {
  Maininfo: []
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "Add_Data": {
      let { Maininfo } = state;
      Maininfo = [...Maininfo, action.payload];
      return { ...state, Maininfo };
    }
    case "Remove_Data": {
      let { Maininfo } = state;
      Maininfo = [
        ...Maininfo.slice(0, action.payload),
        ...Maininfo.slice(action.payload + 1, Maininfo.length)
      ];
      console.log("Maininfo are", Maininfo);
      return { ...state, Maininfo };
    }
    default: {
      return state;
    }
  }
};
const store = createStore(reducer);

export default store;
