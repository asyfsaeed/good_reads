import React, { createContext } from "react";

import AppStore from "./appStore";

const initialData = {
    userData: {
        token: '',
        id: 0,
        name: '',
        email: '',
    },
};

const USER_DATA_KEY = "*&*&*GOODREAD*&098";

export const UserContext = createContext({
  data: initialData,
  setDataToStore: (data) => {
    console.log(data);
  },
  removeData: () => {},
});

const userStorage = ({ children }) => {
  const { data, dataRetrieved, setDataToStore, removeData } =
    AppStore({
      KEY: USER_DATA_KEY,
      initData: initialData,
    });

  return (
    <UserContext.Provider value={{ data, setDataToStore, removeData }}>
      {dataRetrieved && children}
    </UserContext.Provider>
  );
};

export default userStorage;
