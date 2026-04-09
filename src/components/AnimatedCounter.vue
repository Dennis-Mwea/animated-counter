<script setup lang="ts">
import '~/assets/main.css';
import type { AnimatedCounterProps } from '~/types';
import DecimalColumn from '~/components/DecimalColumn.vue';
import NumberColumn from '~/components/NumberColumn.vue';
import { computed, ref, watch } from 'vue';
import { usePrevious } from '~/composables/usePrevious';
import formatForDisplay from '~/utils/formatForDisplay';

const props = withDefaults(defineProps<AnimatedCounterProps>(), {
  value: 0,
  color: 'black',
  fontSize: '18px',
  decimalPrecision: 2,
  includeCommas: false,
  includeDecimals: true,
  digitStyles: () => ({}),
  incrementColor: '#32cd32',
  decrementColor: '#fe6862',
  containerStyles: () => ({}),
});

const prevNumArrayRef = ref<string[]>();

const previousNumber = usePrevious(props.value);
const isNegative = computed(() => props.value < 0);
const prevFormattedDigits = computed(() => prevNumArrayRef.value);
const numArray = computed(() => {
  return formatForDisplay(Math.abs(props.value), props.includeDecimals, props.decimalPrecision, props.includeCommas);
});
const delta = computed<string | null>(() => {
  if (previousNumber.value !== null) {
    if (props.value > previousNumber.value) return 'increase';
    else if (props.value < previousNumber.value) return 'decrease';
  }

  return null;
});
const pulseDeltaAtIndex = computed(() => {
  return numArray.value.map((ch, i) => {
    if (ch === '.' || ch === ',') return null;
    if (prevFormattedDigits.value == null) return delta.value;

    return prevFormattedDigits.value[i] !== ch ? delta.value : null;
  });
});

watch(numArray, () => {
  prevNumArrayRef.value = numArray.value;
});
</script>

<template>
  <div :style="containerStyles" class="ticker-view">
    <!-- Format integer to NumberColumn components -->
    <template v-for="(number, index) in numArray" :key="index">
      <DecimalColumn
        v-if="number === '.' || number === ','"
        :font-size="fontSize"
        :color="color"
        :is-comma="number === ','"
        :digit-styles="digitStyles"
      />

      <NumberColumn
        v-else
        :color="color"
        :digit="number"
        :font-size="fontSize"
        :digit-styles="digitStyles"
        :increment-color="incrementColor"
        :decrement-color="decrementColor"
        :delta="pulseDeltaAtIndex[index] || ''"
      />
    </template>

    <!-- If number is negative, render '-' feedback -->
    <NumberColumn
      v-if="isNegative"
      key="negative-feedback"
      digit="-"
      :delta="delta"
      :color="color"
      :font-size="fontSize"
      :digit-styles="digitStyles"
      :increment-color="incrementColor"
      :decrement-color="decrementColor"
    />
  </div>
</template>
