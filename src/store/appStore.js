import { useEffect, useState } from "react";

const useStore = ({ KEY, initData }) => {
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [data, setData] = useState(initData);

  const getDataFromAsync = async () => {
    let asyncData;
    try {
      const dataString = await localStorage.getItem(KEY);
      asyncData = dataString && (await JSON.parse(JSON.stringify(dataString)));
      console.log("Data fetched from async", asyncData);
      if (asyncData) {
        setData({
          ...asyncData,
          userData : {
            ...asyncData.userData,
          }
        });
      }
      setDataRetrieved(true);
    } catch (error) {
      console.error(error);
    }
    return asyncData;
  };

  const setDataToStore = async (newData) => {
    try {
      const updatedData = { ...data, ...newData };
      setData(updatedData);
      const dataString = JSON.stringify(updatedData);
      await localStorage.setItem(KEY, dataString);
      console.log("Data updated", updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const setAbsoluteDataToStore = async (newData) => {
    try {
      const updatedData = newData;
      setData(updatedData);
      const dataString = JSON.stringify(updatedData);
      await localStorage.setItem(KEY, dataString);
    } catch (error) {
      console.error(error);
    }
  };

  const removeData = async () => {
    try {
      const updatedData = { ...initData };
      setData(updatedData);
      const dataString = JSON.stringify(updatedData);
      await localStorage.setItem(KEY, dataString);
      console.log("Data updated", updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromAsync();
  }, []);

  return {
    data,
    dataRetrieved,
    getDataFromAsync,
    setAbsoluteDataToStore,
    setDataToStore,
    removeData,
  };
};

export default useStore;
