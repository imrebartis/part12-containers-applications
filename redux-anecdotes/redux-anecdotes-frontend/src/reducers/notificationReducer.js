import { createSlice } from "@reduxjs/toolkit";

export const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setInstantNotification: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

export const setNotification = (notificationText, notificationDuration) => {
  return async (dispatch) => {
    try {
      dispatch(setInstantNotification(notificationText));
      dispatch(clearNotificationWithTimeout(notificationDuration));
    } catch (error) {
      console.error("Error setting notification:", error);
    }
  };
};

export const clearNotificationWithTimeout = (notificationDuration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, notificationDuration * 1000);
  };
};

export const {
  clearNotification,
  setInstantNotification,
} = notificationReducer.actions;
export default notificationReducer.reducer;
