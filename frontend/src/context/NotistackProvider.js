"use client";

import { SnackbarProvider } from "notistack";
import { useRef } from "react";

export function NotistackProvider({ children }) {
  const snackbarRef = useRef(null);

  return (
    <SnackbarProvider
      ref={snackbarRef}
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
