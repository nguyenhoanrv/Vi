import { createContext, useContext } from "react";
import { ObservableLoginStore } from '../store/storeLogin';
import { ObservableTodoStore } from '../store/storeTodo';
import { ObservableTodoDetailStore} from '../store/storeTodoDetail'

export const rootStore = {
  todoStore: new ObservableTodoStore(),
  loginStore : new ObservableLoginStore(),
  todoDetailStore : new ObservableTodoDetailStore()
};

export type TRootStore = typeof rootStore;
const RootStoreContext = createContext<null | TRootStore>(null);

// Tạo ra provider để cung cấp store cho toàn bộ app
// dung trong file index.tsx
export const Provider = RootStoreContext.Provider;

/** tra lai store, chi dung o function component */
export function useStore() {
  /** store này sẽ chứa toàn bộ data */
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}