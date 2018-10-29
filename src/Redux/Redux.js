import { createStore } from "redux";
import { addtodb } from "../utils";

let initialstate = {
  Maininfo: []
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "Add_Data": {
      let { Maininfo } = state;
      Maininfo = [...Maininfo, action.payload];
      console.log("[[[[", Maininfo);
      addtodb(action.payload);
      return { ...state, Maininfo };
    }
    case "Remove_Data": {
      let { Maininfo } = state;
      Maininfo = [
        ...Maininfo.slice(0, action.payload),
        ...Maininfo.slice(action.payload + 1, Maininfo.length)
      ];
      return { ...state, Maininfo };
    }
    case "Edit_Data": {
      console.log("===...,,>>", action.payload);
      let { Maininfo } = state;
      Maininfo[action.payload.index].Information = action.payload.Information;
      return { ...state, Maininfo };
    }
    case "Gether_Data": {
      // console.log("Action.payload are:", action.payload);
      let newdata = action.payload;
      let { Maininfo } = state;
      Maininfo.length = 0;
      Maininfo = [...Maininfo, ...newdata];
      return { state, Maininfo };
    }
    case "CLEAR": {
      let { Maininfo } = state;
      Maininfo = [...Maininfo, action.payload];
      return { ...state, Maininfo };
    }
    default: {
      return state;
    }
  }
};
const store = createStore(reducer);

export default store;
