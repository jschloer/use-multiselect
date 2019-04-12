# use-multiselect

> React hook for managing a the selection state of a set of items. Does not require full knowledge of the set of items.

[![NPM](https://img.shields.io/npm/v/use-multiselect.svg)](https://www.npmjs.com/package/use-multiselect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-multiselect
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-multiselect'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [jschloer](https://github.com/jschloer)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
