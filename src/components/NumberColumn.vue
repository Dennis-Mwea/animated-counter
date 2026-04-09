<script setup lang="ts">
import type { NumberColumnProps } from '~/types';
import { computed, CSSProperties, ref, watch } from 'vue';
import { useSpringColumnTransform } from '~/composables/useSpringColumnTransform';

const props = defineProps<NumberColumnProps>();

const DIGIT_ARRAY = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const hasHydrated = ref<boolean>(false);
const animationClass = ref<string | null>(null);

const digitValue = computed(() => Number.parseInt(props.digit, 10));
const fontSizeValue = computed(() => Number.parseFloat(props.fontSize.replace('px', '')));

const clearAnimationClass = () => {
  animationClass.value = '';
};

const columnClassName = computed(() => ['ticker-column', animationClass.value].filter(Boolean).join(' '));
const targetY = computed(() => {
  if (Number.isNaN(digitValue.value) || Number.isNaN(fontSizeValue.value)) return 0;

  return fontSizeValue.value * digitValue.value;
});

const { ref: columnRef, ssrTransformStyle } = useSpringColumnTransform(targetY, {
  layoutClassName: columnClassName.value,
  onSettled: clearAnimationClass,
});

const containerStyle = computed<CSSProperties>(() => ({
  'lineHeight': props.fontSize,
  'fontSize': props.fontSize,
  'height': 'auto' as const,
  'color': props.color,
  '--increment-color': `${props.incrementColor}`,
  '--decrement-color': `${props.decrementColor}`,
  ...props.digitStyles,
}));
const digitSpanStyle = computed(() => ({
  lineHeight: props.fontSize,
  fontSize: props.fontSize,
  ...props.digitStyles,
}));
const negativeStyle = computed(() => ({
  marginRight: `calc(${props.fontSize} / 5)`,
  lineHeight: props.fontSize,
  fontSize: props.fontSize,
  color: props.color,
  ...props.digitStyles,
}));

watch(() => [props.digit, props.delta], () => {
  if (!hasHydrated.value) {
    hasHydrated.value = true;
    return;
  }

  animationClass.value = props.delta ?? '';
});
</script>

<template>
  <!-- If digit is negative symbol, simply return an unanimated character -->
  <span v-if="digit === '-'" :style="negativeStyle">{{ digit }}</span>

  <div
    :style="containerStyle"
    class="ticker-column-container"
  >
    <div
      ref="columnRef"
      :class="columnClassName"
      :style="ssrTransformStyle"
    >
      <div
        v-for="num in DIGIT_ARRAY"
        :key="num"
        class="ticker-digit"
      >
        <span :style="digitSpanStyle">{{ num }}</span>
      </div>
    </div>

    <span class="number-placeholder">0</span>
  </div>
</template>
