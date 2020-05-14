import { useState } from "react";
import hash from "object-hash";

export interface InternalMultiSelectState {
  isMultiSelectActive: boolean;
  allSelected: boolean;
  exceptions: string[];
  internalHash: string;
}

const hashState = (state: Partial<InternalMultiSelectState>) => {
  return hash(
    { allSelected: state.allSelected, exceptions: state.exceptions },
    { algorithm: "sha1", encoding: "base64", unorderedArrays: true }
  );
};
export const useMultiSelect = (
  initialState?: Partial<InternalMultiSelectState>
) => {
  // Whether or not the multiSelect mode is currently active. This is just here as a convenience.
  // You can handle this on your own if desired.
  // we want to keep track of whether or not the current state is inclusive of everything or nothing
  //    and then a list of exceptions to the rule.
  // i.e. all items are selected, except for these five keys, or nothing is selected except these three keys
  // so we need to keep track of:
  //    the current state of selection
  //    the list of exceptions
  let [
    { allSelected, exceptions, isMultiSelectActive, internalHash },
    setSelectionState,
  ] = useState<InternalMultiSelectState>(
    initialState
      ? {
          isMultiSelectActive: initialState.isMultiSelectActive || false,
          allSelected: initialState.allSelected || false,
          exceptions: initialState.exceptions || [],
          internalHash: hashState(initialState),
        }
      : {
          isMultiSelectActive: false,
          allSelected: false,
          exceptions: [],
          internalHash: hashState({ allSelected: false, exceptions: [] }),
        }
  );
  // now we want to return a set of functions for the consumer.
  function setMultiSelectActive(val: boolean) {
    setSelectionState((state) => ({ ...state, isMultiSelectActive: val }));
  }
  // We need a
  //    function to set the value of a key
  function setSelected(key: string, value: boolean) {
    // because we're updating state based on existing state, we need to use the function style updates
    setSelectionState((state) => {
      // If the value we're setting to matches our default state, then just make sure
      //    that the key is not in our exceptions list
      const newState = {
        ...state,
        exceptions:
          state.allSelected === value
            ? state.exceptions.filter((f) => f === key)
            : [...state.exceptions, key],
      };
      return { ...newState, internalHash: hashState(newState) };
    });
  }
  //    function to toggle the value of a key
  function toggleSelected(key: string) {
    // basically just check to see if is in the exceptions array, and invert that
    setSelectionState((state) => {
      const newState = {
        isMultiSelectActive: state.isMultiSelectActive,
        allSelected: state.allSelected,
        exceptions: state.exceptions.includes(key)
          ? state.exceptions.filter((f) => f !== key)
          : [...state.exceptions, key],
      };
      return { ...newState, internalHash: hashState(newState) };
    });
  }
  //    function for select all
  function selectAll() {
    setSelectionState((state) => ({
      isMultiSelectActive: state.isMultiSelectActive,
      allSelected: true,
      exceptions: [],
      internalHash: hashState({ allSelected: true, exceptions: [] }),
    }));
  }
  //    function for deselect all
  function deSelectAll() {
    setSelectionState((state) => ({
      isMultiSelectActive: state.isMultiSelectActive,
      allSelected: false,
      exceptions: [],
      internalHash: hashState({ allSelected: false, exceptions: [] }),
    }));
  }
  //    function to determine if a key is currently selected
  function isSelected(key: string) {
    if (allSelected) {
      return !exceptions.includes(key);
    } else {
      return exceptions.includes(key);
    }
  }
  //    function to return all of the selected keys, given a list of keys
  function getAllSelectedKeys(keys: Array<string>) {
    let filterFunction = allSelected
      ? (item: string) => !exceptions.includes(item)
      : (item: string) => exceptions.includes(item);
    return keys.filter(filterFunction);
  }
  // would also be nice to have a way to return the actual definition for lazy loaders
  function getSelectionState() {
    return { allSelected, exceptions };
  }
  function getSelectedCount(totalItems: number) {
    // In order to calculate how many items might be selected currently, we need to know the total count
    const exceptionsCount = exceptions.length;
    if (allSelected) {
      return totalItems - exceptionsCount;
    } else {
      return exceptionsCount;
    }
  }
  return {
    setSelected,
    toggleSelected,
    selectAll,
    deSelectAll,
    isSelected,
    getAllSelectedKeys,
    getSelectionState,
    isMultiSelectActive,
    setMultiSelectActive,
    getSelectedCount,
    stateHash: internalHash,
  };
};
