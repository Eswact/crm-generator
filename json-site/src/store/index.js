import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
});