# rollup-plugin-shift-header

If you have a "comment header" embedded in your source code, like this:

```js
// Copyright © 2017 Jackson Ray Hamilton

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// ...

export default function foo () {}
```

Then, normally, when you generate an IIFE bundle, you'll get this:

```js
var foo = (function () {
'use strict';

// Copyright © 2017 Jackson Ray Hamilton

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// ...

function foo () {}

return foo;

}());
```

It would be better if your "comment header" remained at the top of your
generated file, like this:

```js
// Copyright © 2017 Jackson Ray Hamilton

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// ...

var foo = (function () {
'use strict';

function foo () {}

return foo;

}());
```

This plugin ensures that a "comment header" (the first series of comments in a
file, separated by up to one empty newline) is shifted to the top of your
generated bundle.

## Usage

In `rollup.config.js`, call `shiftHeader()` and add the result to your `plugins`
array:

```js
import shiftHeader from 'rollup-plugin-shift-header';

export default [
  {
    input: 'foo.mjs',
    output: {
      file: 'foo.js',
      name: 'foo',
      format: 'iife',
    },
    plugins: [
      shiftHeader(),
    ],
  },
];
```
