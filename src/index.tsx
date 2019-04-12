import * as React from "react";

export const useMultiSelect = () => {
  // we want to keep track of whether or not the current state is inclusive of everything or nothing
  //    and then a list of exceptions to the rule.
  // i.e. all items are selected, except for these five keys, or nothing is selected except these three keys
  // so we need to keep track of:
  //    the current state of selection
  //    the list of exceptions
  let [{ allSelected, exceptions }, setSelectionState] = React.useState<{
    allSelected: boolean;
    exceptions: Array<string>;
  }>({
    allSelected: false,
    exceptions: []
  });
  // now we want to return a set of functions for the consumer.
  // We need a
  //    function to set the value of a key
  function setSelected(key: string, value: boolean) {
    // logic is variable based on whether we're in allSelected or not.
    let keyIndex = exceptions.indexOf(key);
    // if allSelected and value is false, make sure it's in the exceptions
    // if !allSelected and value is true, make sure it's in the exceptions
    if ((allSelected && !value) || (!allSelected && value)) {
      if (keyIndex < 0) {
        setSelectionState({ allSelected, exceptions: [...exceptions, key] });
      }
    } else {
      // if allSelected and value is true, make sure it's not in exceptions
      // if !allSelected and value is false, make sure it's not in exceptions
      if (keyIndex >= 0) {
        setSelectionState({
          allSelected,
          exceptions: [
            ...exceptions.slice(0, keyIndex),
            ...exceptions.slice(keyIndex + 1)
          ]
        });
      }
    }
  }
  //    function to toggle the value of a key
  function toggleSelected(key: string) {
    // basically just check to see if is in the exceptions array, and invert that
    let keyIndex = exceptions.indexOf(key);
    if (keyIndex >= 0) {
      setSelectionState({
        allSelected,
        exceptions: [
          ...exceptions.slice(0, keyIndex),
          ...exceptions.slice(keyIndex + 1)
        ]
      });
    } else {
      setSelectionState({ allSelected, exceptions: [...exceptions, key] });
    }
  }
  //    function for select all
  function selectAll() {
    setSelectionState({ allSelected: true, exceptions: [] });
  }
  //    function for deselect all
  function deSelectAll() {
    setSelectionState({ allSelected: false, exceptions: [] });
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
