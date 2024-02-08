<template>
  <div
    :class="{
      calculatorInactive: !amount,
      calculatorActive: amount,
      calculator: true
    }"
  >
    <div class="display">
      <span class="symbol-display">{{ amount && '$' }}</span>
      <span class="value-display">{{ amount ? amountFormatted : '' }}</span>
      <button class="delete-display" @click="handleDeleteNumber">X</button>
    </div>
    <hr />
    <div class="numeric-keyboard">
      <button
        :disabled="props.disabled"
        class="value-key"
        v-for="key in keys"
        :key="key"
        @click="handleNumberClick(key)"
      >
        {{ key }}
      </button>
      <div class="check-amount-key">
        <button @click="increment" :disabled="!amount" icon="material-icons-outlined">ck</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

interface Props {
  resetAmount: boolean
  disabled?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['amount'])
const keys = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'])
const amount = ref<string>('')

function handleNumberClick(key: string) {
  amount.value += key
}

function handleDeleteNumber() {
  amount.value = amount.value.slice(0, -1)
}

function increment() {
  emit('amount', Number(amount.value))
}

const amountFormatted = computed(() => Number(amount.value).toLocaleString('en-US'))

watchEffect(() => {
  if (props.resetAmount) {
    amount.value = ''
  }
})
</script>

<style scoped>
.calculator {
  border-radius: 20px;
  padding: 2.5rem;
}
.calculatorInactive {
  background-color: #e6e6e6;
}
.calculatorActive {
  background-color: var(--color-tertiary);
  border-color: var(--color-primary);
  border-style: solid;
  border-width: 2px;
}

.display {
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.value-display,
.symbol-display {
  font-size: 20px;
  font-weight: 700;
}

.numeric-keyboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.numeric-keyboard button {
  border-style: none;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
}
.value-key {
  background-color: #ffffff;
  padding: 0.8rem 1rem;
  font-weight: 450;
  font-size: 30px;
}
.check-amount-key {
  margin: 1rem;
}
.check-amount-key button {
  background-color: var(--color-primary);
  width: 3rem;
  height: 3rem;
  color: white;
  cursor: pointer;
}
.check-amount-key button:disabled {
  background-color: gray;
}
</style>
