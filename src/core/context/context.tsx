import React from 'react';
import { CoreStateType, initialState } from './state';
import { CoreDispatchType, reducer } from './reducer';

export interface ContextType {
  children: React.ReactNode;
  api: string;
}

const Context = React.createContext<CoreStateType | undefined>(undefined);
const Dispatch = React.createContext<CoreDispatchType | undefined>(undefined);

export function CoreContextProvider({ children, api }: ContextType): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, initialState(api));
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

export function useCoreContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useState must be used within a Context.Provider');
  }
  return context;
}

export function useCoreDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Dispatch.Provider');
  }
  return context;
}
