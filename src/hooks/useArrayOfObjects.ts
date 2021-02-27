import React, { Reducer } from "react";

type AooAction<T extends HasId> =
  | { type: "add"; value: T }
  | { type: "change"; value: T }
  | { type: "changePartial"; id: string; changes: Partial<T> }
  | { type: "delete"; id: string };
type HasId = { id: string };

function aooReducer<T extends HasId>(state: T[], action: AooAction<T>) {
  switch (action.type) {
    case "add":
      // TODO: check for duplicate ids?
      return state.concat([action.value]);
    case "changePartial":
      return state.map((s) => {
        if (s.id !== action.id) return s;
        return { ...s, ...action.changes };
      });
    case "change":
      return state.map((s) => {
        if (s.id !== action.value.id) return s;
        return action.value;
      });
    case "delete":
      return state.filter((s) => s.id !== action.id);
  }
  return state;
}

export interface ArrayOfObjectsAPI<T extends HasId> {
  objects: readonly T[];
  selectedId: string | null;
  add: (newNode: T) => void;
  change: (newNode: T) => void;
  changePartial: (id: string, newNode: Partial<T>) => void;
  delete: (id: string) => void;
  select: (id: string | null) => void;
}

export function useArrayOfObjects<T extends HasId>(
  initial: () => T[],
): ArrayOfObjectsAPI<T> {
  const [objects, dispatch] = React.useReducer<
    Reducer<T[], AooAction<T>>,
    undefined
  >(aooReducer, undefined, initial);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const add = React.useCallback(
    (value: T) => {
      dispatch({ type: "add", value });
    },
    [dispatch],
  );
  const change = React.useCallback(
    (value: T) => {
      dispatch({ type: "change", value });
    },
    [dispatch],
  );
  const changePartial = React.useCallback(
    (id: string, changes: Partial<T>) => {
      dispatch({ type: "changePartial", id, changes });
    },
    [dispatch],
  );
  const del = React.useCallback(
    (id: string) => {
      dispatch({ type: "delete", id });
    },
    [dispatch],
  );

  return {
    objects,
    selectedId,
    change,
    changePartial,
    add,
    delete: del,
    select: setSelectedId,
  };
}
