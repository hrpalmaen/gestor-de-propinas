import { ref } from 'vue'

import { defineStore } from 'pinia'

export interface Payment {
  payMethod: string
  amount: number
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    totalTips: 0,
    logTips: ref<Payment[]>([]),
    payments: ref<Payment[]>([]),
    totalPaid: 0
  }),
  actions: {
    addTip(amount: number, payMethod: string) {
      this.totalTips += amount
      this.logTips.push({ payMethod, amount })
    },

    addPayment(amount: number, payMethod: string) {
      this.totalPaid += amount
      this.payments.push({ payMethod, amount })
    }
  }
})
