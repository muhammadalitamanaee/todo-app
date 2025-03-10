import taskReducers from "./slices/taskSlice";
import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { userTasksApi } from "../services/tasks";

import storage from "../utils/localStorage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

const rootPersistConfig = {
  timeout: 100,
  key: "root",
  storage,
  whitelist: [],
};
const userTasksPersistConfig = {
  key: "tasks",
  storage,
};

const rtkQueryErrorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payloadData = action.payload;
    if (payloadData) {
      if (payloadData.originalStatus === 500) {
        alert("مشکلی در ارتباط با سرور پیش آمده است، بعدا تلاش کنید.");
      } else if (payloadData.originalStatus === 429) {
        alert("در هر دقیقه مجاز به ارسال یک درخواست هستید.");
      } else if (payloadData.status === 401) {
        alert("زمان توکن شما منقضی شده دوباره وارد شوید");
      } else {
        alert(payloadData.data.message);
      }
    }
  }

  return next(action);
};

const rootReducer = combineReducers({
  userTasks: persistReducer(userTasksPersistConfig, taskReducers),

  [userTasksApi.reducerPath]: userTasksApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkQueryErrorLogger, userTasksApi.middleware),
});

export const persistor = persistStore(store);

export default store;
