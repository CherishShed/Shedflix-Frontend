import { create } from "zustand";
import { produce } from "immer";
import { userType } from "../pages/Home/home";
import * as React from "react";

type userStoreType = {
  user: userType | null;
  isAuthenticated: boolean;
  loginUser: (user: userType) => void;
  logoutUser: () => void;
};

export const userStore = create<userStoreType>()((set) => ({
  isAuthenticated: false,
  user: null,
  loginUser: (user) => {
    set(
      produce((store) => {
        store.isAuthenticated = true;
        store.user = user;
      })
    );
  },
  logoutUser: () => {
    set(
      produce((store) => {
        store.isAuthenticated = false;
        store.user = null;
      })
    );
  },
}));

type snackBarType = {
  open: boolean;
  message: string;
  severity: string;
  openSnackBar: (message: string, severity: string) => void;
  closeSnackBar: (event: React.SyntheticEvent | Event, reason?: string) => void;
};

export const snackBarStore = create<snackBarType>()((set) => ({
  open: false,
  message: "",
  severity: "",
  openSnackBar: (message, severity) => {
    set(
      produce((store) => {
        store.message = message;
        store.open = true;
        store.severity = severity;
      })
    );
  },
  closeSnackBar: (event, reason) => {
    set(
      produce((store) => {
        if (reason === "clickaway") {
          return;
        }
        store.message = "";
        store.open = false;
      })
    );
  },
}));
