import * as types from "./../constants/ActionTypes";
import * as config from "./../constants/Config";
import { remove, reject } from "lodash";
import { v4 as uuidv4 } from "uuid";

let defaultState = [];

let tasks = JSON.parse(localStorage.getItem(config.ITEMS_FROM_LOCAL_STOGARE));
defaultState = tasks !== null && tasks.length > 0 ? tasks : defaultState;

const items = (state = defaultState, action) => {
  let id = null;

  switch (action.type) {
    case types.DELETE_ITEM:
      id = action.id;
      remove(state, (item) => {
        return item.id === id;
      });
      localStorage.setItem(
        config.ITEMS_FROM_LOCAL_STOGARE,
        JSON.stringify(state)
      );
      return [...state];

    case types.SUBMIT_FORM:
      id = null;
      let { item } = action;
      if (item.id !== "") {
        //edit
        state = reject(state, { id: item.id });
        id = item.id;
      } else {
        // add
        id = uuidv4();
      }

      state.push({
        id: id,
        name: item.name,
        level: +item.level,
      });

      localStorage.setItem(
        config.ITEMS_FROM_LOCAL_STOGARE,
        JSON.stringify(state)
      );
      return [...state];
    default:
      return state;
  }
};

export default items;
