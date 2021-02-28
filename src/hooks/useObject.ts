import React, { Reducer } from "react";

type ObjectAction<T> =
  | { type: "replace"; newObject: T }
  | { type: "change"; changes: Partial<T> };

function objectReducer<T>(state: T, action: ObjectAction<T>) {
  switch (action.type) {
    case "replace":
      return { ...action.newObject };
    case "change":
      return { ...state, ...action.changes };
  }
  return state;
}

export interface ObjectAPI<T> {
  object: T;
  change: (changes: Partial<T>) => void;
  replace: (newObject: T) => void;
}

export function useObject<T>(initial: () => T): ObjectAPI<T> {
  const [object, dispatch] = React.useReducer<
    Reducer<T, ObjectAction<T>>,
    undefined
  >(objectReducer, undefined, initial);

  const change = React.useCallback(
    (changes: Partial<T>) => {
      dispatch({ type: "change", changes });
    },
    [dispatch],
  );
  const replace = React.useCallback(
    (newObject: T) => {
      dispatch({ type: "replace", newObject });
    },
    [dispatch],
  );

  return {
    object,
    change,
    replace,
  };
}
