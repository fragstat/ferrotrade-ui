<template>
  <div class="page-content">
    <FirstStepForm @nextStep="toSecondStep" v-if="step === 1"/>
    <SecondStepForm @nextStep="toThirdStep" v-if="step === 2" :positionBase="position" :amount="amount"/>
    <PrintStep v-if="step === 3" :ids="ids"/>
  </div>
</template>

<script>
import FirstStepForm from "@/components/Register/FirstStepForm";
import SecondStepForm from "@/components/Register/SecondStepForm";
import PrintStep from "@/components/PrintStep";
import Vue from "vue";

export default {
  name: "register",
  components: {
    FirstStepForm,
    SecondStepForm,
    PrintStep
  },
  data() {
    return {
      position: {},
      amount: 0,
      step: 1,
      ids: []
    }
  },
  mounted() {
    const url = Vue.prototype.$hostname + '/api/position/marks'
    fetch(url).then(response => response.json()).then(json => this.marks = json)
  },
  methods: {
    toSecondStep(data) {
      this.position = data.position
      this.amount = data.amount
      this.step = 2
    },
    toThirdStep(data) {
      console.log(data);
      this.ids = data.id
      this.step = 3
    },
    onAutocompleteChange(val) {
      this.mark = val
    }
  }
};
</script>

<style scoped>

</style>
