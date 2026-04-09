<script setup lang="ts">
import { DecimalColumnProps } from '~/types';
import { computed } from 'vue';

const props = defineProps<DecimalColumnProps>();

const decimalStyle = computed(() => ({
  color: props.color,
  fontSize: props.fontSize,
  lineHeight: props.fontSize,
  marginLeft: `calc(-${props.fontSize} / 10)`,
  ...props.digitStyles,
}));
</script>

<template>
  <span :style="decimalStyle">{{ isComma ? ',' : '.' }}</span>
</template>
