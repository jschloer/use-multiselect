import * as React from "react";

export const useMultiSelect = (initialState?: {
  allSelected: boolean;
  exceptions: {
    [index: string]: boolean;
  };
}) => {
  // we want to keep track of whether or not the current state is inclusive of everything or nothing
  //    and then a list of exceptions to the rule.
  // i.e. all items are selected, except for these five keys, or nothing is selected except these three keys
  // so we need to keep track of:
  //    the current state of selection
  //    the list of exceptions
  let [{ allSelected, exceptions }, setSelectionState] = React.useState<{
    allSelected: boolean;
    exceptions: { [index: string]: boolean };
  }>(
    initialState || {
      allSelected: false,
      exceptions: {}
    }
  );
  // now we want to return a set of functions for the consumer.
  // We need a
  //    function to set the value of a key
  function setSelected(key: string, value: boolean) {
    // because we're updating state based on existing state, we need to use the function style updates
    setSelectionState(state => {
      // If the value we're setting too matches our default state, then just make sure
      //    that the key is not in our exceptions list
      if (state.allSelected === value) {
        return {
          allSelected: state.allSelected,
          exceptions: { ...state.exceptions, [key]: !value }
        };
      } else {
        // If the item should be in the exceptions list, then add it if it's missing
        if (!state.exceptions[key]) {
          return {
            allSelected: state.allSelected,
            exceptions: { ...state.exceptions, [key]: true }
          };
        }
      }
      return state;
    });
  }
  //    function to toggle the value of a key
  function toggleSelected(key: string) {
    // basically just check to see if is in the exceptions array, and invert that
    setSelectionState(state => {
      if (state.exceptions[key]) {
        return {
          allSelected: state.allSelected,
          exceptions: { ...state.exceptions, [key]: !state.exceptions[key] }
        };
      } else {
        return {
          allSelected: state.allSelected,
          exceptions: { ...state.exceptions, [key]: true }
        };
      }
    });
  }
  //    function for select all
  function selectAll() {
    setSelectionState({ allSelected: true, exceptions: {} });
  }
  //    function for deselect all
  function deSelectAll() {
    setSelectionState({ allSelected: false, exceptions: {} });
  }
  //    function to determine if a key is currently selected
  function isSelected(key: string) {
    if (allSelected) {
      return !exceptions[key];
    } else {
      return exceptions[key];
    }
  }
  //    function to return all of the selected keys, given a list of keys
  function getAllSelectedKeys(keys: Array<string>) {
    let filterFunction = allSelected
      ? (item: string) => !exceptions[item]
      : (item: string) => exceptions[item];
    return keys.filter(filterFunction);
  }
  // would also be nice to have a way to return the actual definition for lazy loaders
  function getSelectionState() {
    return { allSelected, exceptions };
  }
  return {
    setSelected,
    toggleSelected,
    selectAll,
    deSelectAll,
    isSelected,
    getAllSelectedKeys,
    getSelectionState
  };
};
