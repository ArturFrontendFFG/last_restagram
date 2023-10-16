import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as userActions from "../store/User/user.actions";
import { userSlice } from "../store/User/user.slice";
const allReducers = {
  ...userSlice.actions,
  ...userActions,
};

export const useActions = (params) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(allReducers, dispatch);
  }, [dispatch]);
};
