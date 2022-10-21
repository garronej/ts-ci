
import { assert } from "tsafe/assert";
import { removeDarkModeSpecificImageFromReadme } from "../remove_dark_mode_specific_images_from_readme";

const input = `
<div align="center">

![Logo Light](https://user-images.githubusercontent.com/6702424/172086583-2014cf56-6deb-466d-b4d4-df80b6e85a1e.png#gh-light-mode-only)

</div>

<div align="center">

![Logo Dark](https://user-images.githubusercontent.com/6702424/172086369-292a3ada-8294-4328-bbb0-336061cbf830.png#gh-dark-mode-only)

</div>

<div align="center">

![](https://user-images.githubusercontent.com/6702424/xxx#gh-dark-mode-only)

</div>

<p align="center">
    <i>Type-safe internationalization and translation React library</i>
    <br>
    <br>
    <a href="https://github.com/garronej/i18nifty/actions">
      <img src="https://github.com/garronej/i18nifty/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://bundlephobia.com/package/i18nifty">
      <img src="https://img.shields.io/bundlephobia/minzip/i18nifty">
    </a>
    <a href="https://www.npmjs.com/package/i18nifty">
      <img src="https://img.shields.io/npm/dm/i18nifty">
    </a>
    <a href="https://github.com/garronej/i18nifty/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/i18nifty">
    </a>
</p>
`;


const expected = `
<div align="center">

![Logo Light](https://user-images.githubusercontent.com/6702424/172086583-2014cf56-6deb-466d-b4d4-df80b6e85a1e.png#gh-light-mode-only)

</div>

<div align="center">



</div>

<div align="center">



</div>

<p align="center">
    <i>Type-safe internationalization and translation React library</i>
    <br>
    <br>
    <a href="https://github.com/garronej/i18nifty/actions">
      <img src="https://github.com/garronej/i18nifty/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://bundlephobia.com/package/i18nifty">
      <img src="https://img.shields.io/bundlephobia/minzip/i18nifty">
    </a>
    <a href="https://www.npmjs.com/package/i18nifty">
      <img src="https://img.shields.io/npm/dm/i18nifty">
    </a>
    <a href="https://github.com/garronej/i18nifty/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/i18nifty">
    </a>
</p>
`;

assert( expected === removeDarkModeSpecificImageFromReadme(input));

console.log("PASS!");