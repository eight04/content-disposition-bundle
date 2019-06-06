This repository bundles [content-disposition](https://www.npmjs.com/package/content-disposition) library to a single file that can be used in the browser. You can find the bundle under `dist/` folder.

Usage:

```js
var disposition = contentDisposition.parse('attachment; filename="EURO rates.txt"; filename*=UTF-8\'\'%e2%82%ac%20rates.txt');
```

[Demo](https://codepen.io/eight04/pen/arrLrm?editors=1012)
