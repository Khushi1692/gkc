import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import branchReducer from './slices/branchSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/orderSlice';
import contactReducer from './slices/contactSlice';

const appReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  menu: menuReducer,
  cart: cartReducer,
  orders: ordersReducer,
  contact: contactReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logoutUser/fulfilled') {
    state = undefined; // resets all slices to their initialState
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
