import * as React from "react";
import { useContext } from "react";
import { InternalMultiSelectState, useMultiSelect } from "./useMultiSelect";

export type MultiSelectContext = ReturnType<typeof useMultiSelect> | null;

const MultiSelectContext = React.createContext<MultiSelectContext>(null);

const MultiSelectContextProvider: React.FunctionComponent<{
  initialValue?: InternalMultiSelectState;
}> = props => {
  let value = useMultiSelect(props.initialValue);
  return (
    <MultiSelectContext.Provider value={value}>
      {props.children}
    </MultiSelectContext.Provider>
  );
};
export const useMultiSelectWithProvider = () => useContext(MultiSelectContext);
export default MultiSelectContextProvider;
