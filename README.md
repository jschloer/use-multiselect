# use-multiselect

> React hook for managing the selection state of a set of items. Does not require the full list of items, so can therefore be used for lazy loaded lists.

[![NPM](https://img.shields.io/npm/v/use-multiselect.svg)](https://www.npmjs.com/package/use-multiselect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-multiselect
```

## Usage

useMultiSelect manages the set of items that are currently selected. We try to be a little clever by only keeping track of the items that are different from the default selection state. The way this works is we keep track of whether the default state of items is selected or not selected, and then keep a list of the exceptions to the default state. This means it can be used to manage a large list of objects that aren't necessarily fully known. You could then, for instance, use select all on a lazy loaded list where not all items have been downloaded. Basic usage is shown below:

```tsx
import * as React from "react";

import { useMultiSelect } from "use-multiselect";

const Example = () => {
  const { isSelected, setSelected } = useMultiSelect();
  return (
    <div>
      {items.map(item => {
        return (
          <div>
            <label key={item}>
              {item}
              <input
                type="checkbox"
                item={item}
                checked={isSelected(item)}
                onChange={ev => setSelected(item, ev.target.checked)}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
```

## useMultiSelect (allSelected: boolean, exceptions: Array<string>) => {...Returned functions}

useMultiSelect takes an initial state object defining which items are currently selected. allSelected defines whether the default state is selected or not, and exceptions is a list of keys that are set to the opposite of the default state. This is the same structure as returned by getSelectionState()

## Returned functions

### function setSelected(key: string, value: boolean) => void

Takes a key and value and sets the item to the given value.

### function toggleSelected(key: string) => void

Takes a key and toggles the current selected value of that key

### function selectAll() => void

Marks all keys as selected.

### function deSelectAll() => void

Marks all keys as not selected.

### function isSelected(key: string) => boolean

Returns true or false based on whether the given item iscurrently selected

### function getAllSelectedKeys(keys: Array<string>) => Array<string>

Filters the given array of keys, returning just the selected ones.

### function getSelectionState() => {allSelected: boolean, exceptions: Array<string>}

Returns the internal selection state used by useMultiSelect. This can be used, for instance, to support multiSelect with lazy loaded items. The returned object has enough information to recreate teh selection set elsewhere for processing of commands.

## License

MIT © [jschloer](https://github.com/jschloer)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
