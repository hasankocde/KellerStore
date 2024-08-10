// App.jsx (1-1)

import "./App.css";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "../src/helper/AuthContext";  // AuthProvider import edildi

// import { SpeedInsights } from '@vercel/speed-insights/react';
{/* <SpeedInsights /> */}

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
