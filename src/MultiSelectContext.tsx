import * as React from 'react';
import { useContext } from 'react';
import { InternalMultiSelectState, useMultiSelect } from './useMultiSelect';

export type MultiSelectContext = ReturnType<typeof useMultiSelect>;

const MultiSelectContext = React.createContext<MultiSelectContext>({
  deSelectAll: () => {},
  selectAll: () => {},
  getAllSelectedKeys: () => [],
  getSelectionState: () => ({ allSelected: false, exceptions: [] }),
  isMultiSelectActive: false,
  isSelected: (_key: string) => false,
  setMultiSelectActive: () => {},
  setSelected: (_key: string, _value: boolean) => {},
  toggleSelected: (_key: string) => {},
  getSelectedCount: (_totalItems: number) => 0,
  stateHash: '',
});

const MultiSelectContextProvider: React.FunctionComponent<{
  initialValue?: InternalMultiSelectState;
}> = (props) => {
  const value = useMultiSelect(props.initialValue);
  return <MultiSelectContext.Provider value={value}>{props.children}</MultiSelectContext.Provider>;
};
export const useMultiSelectWithProvider = (): MultiSelectContext => useContext(MultiSelectContext);
export default MultiSelectContextProvider;
