<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
:root {
  --color-primary: #ed6a5a;
  --color-secondary: #fbdeda;
  --color-tertiary: #fdf5f3;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

main {
  position: fixed;
  left: 0;
  width: 100%;
  top: 120px;
  padding: 0;
}

a {
  color: var(--color-primary);
}

a:hover {
  background-color: var(--color-secondary);
}
</style>
