export const getLSData = () => {
    const appData = JSON.parse(localStorage.getItem("appData")) || {};
    return appData;
  };

  export const setLSData = (updatedData) => {
    localStorage.setItem("appData", JSON.stringify(updatedData))
  };