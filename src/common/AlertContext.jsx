import React, { createContext, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
        variant='outlined'
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: '100%',borderWidth:'3px', bgcolor: 'background.paper' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
