import React from "react";

import { useMultiSelect } from "use-multiselect";

const App = () => {
  const {
    getAllSelectedKeys,
    isSelected,
    setSelected,
    selectAll,
    deSelectAll
  } = useMultiSelect();
  // setup a small array of checkboxes
  let allSelectedKeys = getAllSelectedKeys(names);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <form>
          <button
            onClick={ev => {
              ev.preventDefault();
              selectAll();
            }}
          >
            Select all
          </button>
          <button
            onClick={ev => {
              ev.preventDefault();
              deSelectAll();
            }}
          >
            Select none
          </button>
          {names.map(name => {
            return (
              <div key={name}>
                <label>
                  {name}
                  <input
                    type="checkbox"
                    name={name}
                    checked={isSelected(name)}
                    onChange={ev => setSelected(name, ev.target.checked)}
                  />
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
    </div>
  );
};
export default App;
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
