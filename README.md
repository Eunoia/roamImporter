roamImporter
-------------

Bookmarklet for creating new roam pages from the broader internet. Supports DOIs.

## Getting Started

`npm run dev` will watch for changes and recompile bundle.js

## Testing

`node server.js` will run a simple express server for serving bundle.js and [install.html](http://localhost:3000/install.html). 

## Stuck version

On May 2nd, 2023 jsdom dropped support for browsers. This introduced a breaking bit of code in jsdom/lib/jsdom/living/nodes/HTMLInputElement-impl.js

> Error: Parsing file roamImporter/node_modules/jsdom/lib/jsdom/living/nodes/HTMLInputElement-impl.js: Unexpected token (587:26)

The issue is that node is not parsing `||=` properly in this line:

> `this[filesSymbol] ||= FileList.createImpl(this._globalObject);`

So I rewrote the function as:
```js
  get files() {
    if (this.type === "file" && value !== null) {
      this[filesSymbol] = value;
    }

    return this[filesSymbol];
  }
```

<https://github.com/jsdom/jsdom/pull/3542>