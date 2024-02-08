<template>
  <div>
    <b class="title">Elige el método de pago</b>
    <div id="radio-buttons" class="pay-methods" :disabled="disabled">
      <div
        v-for="(option, index) in payMethods"
        :key="index"
        class="radio-button"
        :class="{ selected: payMethod === option, disabled: disabled }"
        @click="handlePayMethod(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Props {
  resetAmount: boolean
  payMethods: string[]
  disabled: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['payMethod'])
const payMethodsx = {
  cash: 'Efectivo',
  handleCreditCard: 'Tarjeta de crédito',
  handleDebitCard: 'Tarjeta debito'
}
const payMethod = ref('')

function handlePayMethod(method: string) {
  payMethod.value = method
  emit('payMethod', payMethod.value)
}

watchEffect(() => {
  if (props.resetAmount) {
    payMethod.value = ''
    // $forceUpdate()
  }
})
</script>

<style scoped>
.title {
  padding-inline: 10px;
  font-weight: 600;
}
.pay-methods {
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}
.pay-methods div {
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.radio-button.selected {
  background-color: var(--color-primary);
  color: #fff;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
