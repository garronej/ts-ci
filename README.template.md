<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>#{DESC}#</i>
    <br>
    <br>
    <img src="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#/workflows/ci/badge.svg">
    <img src="https://img.shields.io/bundlephobia/minzip/#{REPO_NAME}#">
    <img src="https://img.shields.io/npm/dw/#{REPO_NAME}#">
</p>
<p align="center">
  <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#">Home</a>
  -
  <a href="https://github.com/#{USER_OR_ORG}#/#{REPO_NAME}#">Documentation</a>
  -
  <a href="https://gitter.im/#{REPO_NAME}#/">Chat</a>
</p>

---

# Install / Import

```bash
> npm install --save #{REPO_NAME}#
```
```typescript
import { myFunction, myObject } from '#{REPO_NAME}#'; 
```

Specific import

```typescript
import { myFunction } from '#{REPO_NAME}#/myFunction'
import { myObject } from '#{REPO_NAME}#/myObject'
```

## From HTML with CDN

Expose a global ( wider browser support):  

```html
<script src="//unpkg.com/#{REPO_NAME}#/umd_bundle.min.js"></script>
<script>
  var myFunction = #{REPO_NAME_NO_DASHES}#.myFunction;
</script>
```

Or import as an ES module:  

```html
<script type="module">
  import { myFunction, myObject } from '//unpkg.com/#{REPO_NAME}#/zz_esm/index.js';
</script>
```

## Contribute

```bash
npm install
npm run build
npm test
```
