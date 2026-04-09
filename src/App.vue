<script setup lang="ts">
import AnimatedCounter from '~/components/AnimatedCounter.vue';
import { ref } from 'vue';

const value = ref(50);
</script>

<template>
  <main>
    <div class="row">
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
      font-size="64px"
      increment-color="currentColor"
      decrement-color="currentColor"
    />
    </div>

    <div class="row">
      <button class="increment" @click="value--">- Decrement</button>

      <button class="increment" @click="value++">+ Increment</button>
    </div>
  </main>
</template>

<style>
main {
  gap: 16px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
}

.row {
  gap: 12px;
  display: flex;
  justify-content: center;
}
</style>
