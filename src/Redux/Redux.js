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
      Maininfo[action.payload.index].information = action.payload.information;
      return { ...state, Maininfo };
    }
    case "Gether_Data": {
      console.log("Action.payload are:", action.payload.data[0].mycodes);
      let newdata = action.payload.data[0].mycodes;
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
