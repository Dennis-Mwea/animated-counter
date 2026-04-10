# Vue Animated Counter

A lightweight React component for beautifully animated incrementation & decrementation of a state integer value. Inspired by [react-animated-counter](https://github.com/TuckerMassad/react-animated-counter/tree/main) counter.

![animated-counter-vue demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2N4ZG5mcXE1ZWdsZzQ4bnlxdXlvcGcwamQzcWhmNGNvaGNoem14aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6qomEsKHcyf6R1YmBs/source.gif)

Powering today's most innovative web applications like [https://kalshi.com](https://kalshi.com), [https://financhle.com](https://financhle.com), and others.

## Installation

```shell
yarn add animated-counter-vue
```

## Usage

**Props:**

|     Name         |     Type        |             Description                                                                                                     |     Default    |
|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------|----------------|
|   `value`        | `integer`       | The state integer value                                                                                                     | `0`            |
|   `fontSize`     | `string`        | Applied css `font-size`                                                                                                     | `18px`         |
|   `color`        | `string`        | Applied css `color`                                                                                                         | `black`        |
| `incrementColor` | `string`        | Animation color when `value` increases                                                                                      | `#32cd32`      |
| `decrementColor` | `string`        | Animation color when `value` decreases                                                                                      | `#fe6862`      |
|`includeDecimals` | `boolean`       | Includes or removes decimal point values in provided `value` (rounds to nearest hundredth by default)                       | `true`         |
|`decimalPrecision`| `boolean`       | The nth decimal place of precision (ex. `5` will calculate number to the nearest hundred thousandth)                        | `2`            |
|`includeCommas`   | `boolean`       | Adds comma separators to every third digit to the left of the decimal point used in numbers with four or more digits        | `false`        |
|`containerStyles` | `CSSProperties` | Styles to apply to the parent element of the main component. Used in same fashion as react `styles`                         | `{}`           |
|`digitStyles`     | `CSSProperties` | Styles to apply to individual digit elements. Used in same fashion as react `styles`                                        | `{}`           |

**Basic Demo:**

Codesandbox Link: https://codesandbox.io/p/sandbox/clever-water-v5nwwx

```vue
<script setup lang="ts">
import AnimatedCounter from 'animated-counter-vue';
import { ref } from 'vue';
  
const value = ref(50);
</script>

<template>
  <main>
    <AnimatedCounter
      :value="value"
      :include-commas="false"
      :include-decimals="false"
      :digit-styles="{
        fontWeight: 600,
        lineHeight: '1',
        display: 'inline-block',
        letterSpacing: '-0.02em',
      }"
      :container-styles="{
        gap: '0.05em',
        lineHeight: '1',
        alignItems: 'center',
        display: 'inline-flex',
        flexDirection: 'row-reverse',
      }"
      color="currentColor"
      font-size="24px"
      increment-color="currentColor"
      decrement-color="currentColor"
    ></AnimatedCounter>

    <div>
      <button @click="value--">Decrement</button>
      
      <button @click="value++">Increment</button>
    </div>
  </main>
</template>
```

**Output:**

![animated-counter-vue demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhwbnF0NDU1ZmhsMHRnZnFwdzVycXU5b2MzYnpxZ3ZtZzFhNG0xNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N3Xsj09Gp9GbrKF86E/giphy.gif)

**With `recharts` Demo:**

Codesandbox Link: https://codesandbox.io/s/suspicious-morning-rx60sm?file=/src/App.js

**Output:**

![animated-counter-vue recharts demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXFoaHkzOG5oMG05aTF6dHo0NHRmOGxmdjQ0Zm1xdGdvNWprNDcyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IJP2ng53lyeF5QXi5T/giphy.gif)
