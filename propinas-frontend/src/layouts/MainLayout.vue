<template>
  <header>
    <div class="layout-header">
      <button
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="menu-header"
      >
        <img src="../assets/logo.png" />
      </button>

      <div class="title-header">{{ title }}</div>

      <div class="price-header">
        <span>Efectivo en Caja</span>
        <p>${{ cashAmount }}</p>
      </div>
    </div>
    <hr />
    <div>
      <div class="siderbar">
        <nav>
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/ingresar-propina">Ingreso de propinas</RouterLink> |
          <RouterLink to="/pago-propina">Pago de propinas</RouterLink>
        </nav>
      </div>
      <hr />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { brotliDecompress } from 'zlib'
import { RouterLink, RouterView } from 'vue-router'

interface Props {
  title: string
  cashAmount?: string
}
const props = withDefaults(defineProps<Props>(), {
  cashAmount: '50,300.00'
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// const cashAmount = computed(() => useCounterStore().cash.toLocaleString('en-US'))
</script>

<style scoped>
.layout-header {
  background: none;
  color: black;
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
}
.layout-header button {
  width: 40px;
  height: 40px;
  margin-inline-end: 1rem;
}
.layout-header .title-header {
  width: 80%;
  justify-content: center;
  align-items: center;
}
.layout-header hr {
  margin: 1rem;
  background-color: #999999;
  height: 0.4px;
}
.title-header {
  font-weight: 900;
  font-size: 25px;
}
.menu-header {
  background-color: white;
  cursor: pointer;
  border-color: var(--color-primary);
  border-radius: 17px;
}
.menu-header img {
  width: 1.7rem;
  padding: 0;
  margin: 0;
}

/* price header */
.price-header {
  color: var(--color-primary);
  text-align: end;
}
.price-header span {
  padding-inline-end: 10px;
  font-weight: 450;
  font-size: 13px;
}
.price-header p {
  border-radius: 10px;
  padding: 3px 15px;
  font-size: 2rem;
  font-weight: 600;
  background-color: var(--color-secondary);
}

/* sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}
</style>
