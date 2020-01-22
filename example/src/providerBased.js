import React from "react";

import {
  useMultiSelectWithProvider,
  MultiSelectContextProvider
} from "use-multiselect";
const ProviderWrapper = () => {
  return (
    <MultiSelectContextProvider>
      <div>
        Other stuff in here
        <ProviderConsumer />
      </div>
    </MultiSelectContextProvider>
  );
};
const ProviderConsumer = () => {
  const {
    getAllSelectedKeys,
    isSelected,
    setSelected,
    toggleSelected,
    selectAll,
    deSelectAll,
    getSelectionState,
    isMultiSelectActive,
    setMultiSelectActive
  } = useMultiSelectWithProvider();
  // setup a small array of checkboxes
  let allSelectedKeys = getAllSelectedKeys(names);
  let state = getSelectionState();
  return (
    <div style={{ display: "flex" }}>
      <div>
        <form>
          <button
            onClick={ev => {
              ev.preventDefault();
              setMultiSelectActive(!isMultiSelectActive);
            }}
          >
            Toggle MultiSelect Active
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={ev => {
              ev.preventDefault();
              selectAll();
            }}
          >
            Select all
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={ev => {
              ev.preventDefault();
              deSelectAll();
            }}
          >
            Select none
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={ev => {
              ev.preventDefault();
              names.slice(0, 3).forEach(name => setSelected(name, true));
            }}
          >
            Select Top 3
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={ev => {
              ev.preventDefault();
              names.slice(0, 3).forEach(name => toggleSelected(name, true));
            }}
          >
            Toggle Top 3
          </button>
          {names.map(name => {
            return (
              <div key={name}>
                <label>
                  {name}

                  {isMultiSelectActive && (
                    <input
                      type="checkbox"
                      name={name}
                      checked={isSelected(name)}
                      onChange={ev => setSelected(name, ev.target.checked)}
                    />
                  )}
                </label>
              </div>
            );
          })}
        </form>
      </div>
      <div>
        {allSelectedKeys.map(key => {
          return <div key={key}>{key}</div>;
        })}
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
export default ProviderWrapper;
let names = [
  "Chance",
  "Drusi",
  "Nicolis",
  "Lurlene",
  "Tarra",
  "Johnathon",
  "Hanna",
  "Valentina",
  "Vittoria",
  "Melany",
  "Erena",
  "Jayson",
  "Stacee",
  "Dominga",
  "Broddie",
  "Arden",
  "Rolando",
  "Den",
  "Juana",
  "Doti",
  "Reagan",
  "Georg",
  "Monroe",
  "Josefina",
  "Joby",
  "Timmi",
  "Mehetabel",
  "Danie",
  "Sybyl"
];
