<template>
  <MainLayout title="Pago de propinas" />

  <main>
    <div class="content-wrapper">
      <div>
        <div class="price-header">
          <span>
            Total de propinas
            <p>$<input type="number" v-model="totalTips" placeholder="Ingrese el valor" /></p>
          </span>
        </div>
        <div class="pay-tips">
          <p class="title">¿Entre cuántos quieres dividir las propinas?</p>
          <input
            type="number"
            min="1"
            v-model="employersTip"
            placeholder="#"
            :disabled="!totalTips"
          />
          <span>{{ employersTip ? `$${tipsBetweenEmployers} x persona` : '' }}</span>
        </div>
        <PayMethodComponent
          @payMethod="handlePayMethod"
          :reset-amount="isResetValues"
          :pay-methods="payMethods"
          :disabled="!totalTips"
        />
      </div>
      <CalculatorComponent
        @amount="handleTip"
        :reset-amount="isResetValues"
        :disabled="!totalTips"
      />
      <PaymentsComponent :payments="payments" />
    </div>
    <div class="content-wrapper-footer">
      <div class="total">
        <div class="total-paid">Total pagado ${{ totalPaid }}</div>
        <div>Restante por pagar ${{ needPaid }}</div>
      </div>
      <button @click="resetValues" :disabled="totalPaid == '0'">
        Pagar ${{ totalPaid }} en Propinas
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import CalculatorComponent from '@/components/CalculatorComponent.vue'
import PayMethodComponent from '@/components/payTips/PayMethodComponent.vue'
import PaymentsComponent from '@/components/payTips/PaymentsComponent.vue'
import { useCounterStore } from '@/stores/counter'

const totalTips = ref<number>()
const payTip = ref<number>()
const employersTip = ref<number>()
const payMethod = ref<string>('')
const isResetValues = ref<boolean>(false)
const payMethods = ['Efectivo', 'Cuenta ahorros', 'Cuenta corriente', 'Tranferencia nequi']

function handlePayMethod(value: string) {
  payMethod.value = value
}

function handleTip(value: number) {
  isResetValues.value = false
  payTip.value = value
  saveTip()
}

function resetValues() {
  isResetValues.value = true
  payTip.value = 0
  payMethod.value = ''
}

function saveTip() {
  if (payTip.value && payMethod.value) {
    useCounterStore().addPayment(payTip.value, payMethod.value)
    resetValues()
  }
}

const totalPaid = computed(() => useCounterStore().totalPaid.toLocaleString('en-US'))
const needPaid = computed(() => {
  let amount = '0'
  if (totalTips.value) {
    amount = (totalTips.value - useCounterStore().totalPaid).toLocaleString('en-US')
  }
  return amount
})
const tipsBetweenEmployers = computed(() =>
  (totalTips.value / employersTip.value).toLocaleString('en-US')
)
const payments = computed(() => useCounterStore().payments)
</script>

<style scoped>
.content-wrapper {
  padding: 2rem;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.title {
  padding-inline: 10px;
  font-weight: 600;
}

/* pay tips */

.pay-tips {
  padding: 2rem;
  text-align: center;
}
.pay-tips input {
  border-radius: 10px;
  width: 3rem;
  text-align: center;
  padding: 5px 0;
}
.pay-tips span {
  color: var(--color-primary);
  font-weight: 600;
  padding-inline: 10px;
}

/* price */
.price-header {
  color: var(--color-primary);
  text-align: end;
}
.price-header span {
  padding-inline-end: 1px;
  font-weight: 450;
  font-size: 13px;
}
.price-header p {
  border-radius: 10px;
  padding: 3px 15px;
  font-size: 2rem;
  font-weight: 600;
  background-color: var(--color-secondary);
  display: flex;
}
.price-header input {
  font-size: 1.8rem;
  border-style: none;
  text-align: end;
  background-color: var(--color-secondary);
  display: flex;
  width: 220px;
}
.price-header input:focus-visible {
  border-style: none;
}

/* total */
.content-wrapper-footer {
  padding: 2rem;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.total-paid {
  color: var(--color-primary);
}
.total div {
  font-size: 28px;
  font-weight: 700;
}
.content-wrapper-footer button {
  background-color: var(--color-primary);
  border-radius: 35px;
  border-style: none;
  padding: 1.5rem 4rem;
  color: white;
  margin-inline-start: 1rem;
}
.content-wrapper-footer button:disabled {
  background-color: white;
  border-color: gray;
  border-style: solid;
  color: gray;
}
</style>
