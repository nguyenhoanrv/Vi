import { createContext,useContext } from 'react'
import { ObservableLoginStore } from './storeLogin'
import {ObservableRegisterStore} from './storeRegister'

export const rootStore = {
    loginStore : new ObservableLoginStore(),
    registerStore : new ObservableRegisterStore()
}
export type TRootStore = typeof rootStore;
const RootStoreContext = createContext<null | TRootStore>(null);

export const Provider = RootStoreContext.Provider;
export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}