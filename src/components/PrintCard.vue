<template>
  <div>
    <img v-if="id" :src='codeUrl + id'>
    <p>Производитель: {{position.manufacturer}}</p>
    <p>Марка: {{position.mark}}</p>
    <p>ГОСТ</p>
    <p>Диаметер: {{position.diameter}}</p>
    <p>Вид поставки: {{position.paking}}</p>
    <p>Партия: {{position.part}}</p>
    <p>Плавка: {{position.plav}}</p>
    <p>Масса: {{position.mass}}</p>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "PrintCard",
  props: {
    uid: Number
  },
  beforeMount() {
    this.id = this.uid
    this.positionUrl += this.id
    this.codeUrl += this.id
  },
  data() {
    return {
      codeUrl: Vue.prototype.hostname + '/api/code/',
      positionUrl: Vue.prototype.hostname + '/api/position/',
      id: 0,
      position: {}
    }
  },
  mounted() {
    fetch(this.positionUrl, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    }).then(res => res.json()).then(json => this.position = json)
  }
}
</script>

<style scoped>

</style>