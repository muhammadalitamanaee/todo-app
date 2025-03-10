import "./App.css";
import { Provider } from "react-redux";
import UserTasks from "./modules/userTasks";

import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <UserTasks />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
