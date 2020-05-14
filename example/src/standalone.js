import React from "react";

import { useMultiSelect } from "use-multiselect";

const Standalone = () => {
  const {
    getAllSelectedKeys,
    isSelected,
    setSelected,
    toggleSelected,
    selectAll,
    deSelectAll,
    getSelectionState,
    isMultiSelectActive,
    setMultiSelectActive,
    getSelectedCount,
    stateHash,
  } = useMultiSelect({ allSelected: true, exceptions: ["Jayson"] });
  // setup a small array of checkboxes
  let allSelectedKeys = getAllSelectedKeys(names);
  let state = getSelectionState();
  return (
    <div style={{ display: "flex" }}>
      Selected Count: {getSelectedCount(names.length)}
      <br />
      Hash: {stateHash}
      <div>
        <form>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              setMultiSelectActive(!isMultiSelectActive);
            }}
          >
            Toggle MultiSelect Active
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={(ev) => {
              ev.preventDefault();
              selectAll();
            }}
          >
            Select all
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={(ev) => {
              ev.preventDefault();
              deSelectAll();
            }}
          >
            Select none
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={(ev) => {
              ev.preventDefault();
              names.slice(0, 3).forEach((name) => setSelected(name, true));
            }}
          >
            Select Top 3
          </button>
          <button
            disabled={!isMultiSelectActive}
            onClick={(ev) => {
              ev.preventDefault();
              names.slice(0, 3).forEach((name) => toggleSelected(name, true));
            }}
          >
            Toggle Top 3
          </button>
          {names.map((name) => {
            return (
              <div key={name}>
                <label>
                  {name}

                  {isMultiSelectActive && (
                    <input
                      type="checkbox"
                      name={name}
                      checked={isSelected(name)}
                      onChange={(ev) => setSelected(name, ev.target.checked)}
                    />
                  )}
                </label>
              </div>
            );
          })}
        </form>
      </div>
      <div>
        {allSelectedKeys.map((key) => {
          return <div key={key}>{key}</div>;
        })}
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
export default Standalone;
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
  "Sybyl",
];
