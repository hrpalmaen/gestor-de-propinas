<template>
  <div>
    <p class="title">Pagos</p>
    <div v-if="payments.length">
      <div v-for="(option, index) in props.payments" :key="index" class="payments">
        <div>
          {{ option.payMethod }} <span>${{ option.amount }}</span>
        </div>
        <button @click="handleRemovePayment(index)">x</button>
      </div>
    </div>
    <div v-else>Sin pagos</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore, Payment } from '@/stores/counter'

interface Props {
  payments: Payment[]
}

const props = defineProps<Props>()
function handleRemovePayment(index: number) {
  console.log('index', index)
}
// const payments = computed((): Payment => useCounterStore().payments)
</script>

<style scoped>
.title {
  padding-inline: 10px;
  font-weight: 600;
}
.payments {
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
}
.payments span {
  font-weight: 500;
  padding-inline-end: 10px;
}
</style>
