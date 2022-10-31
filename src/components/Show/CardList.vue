<template>
  <div>
  <Loader v-if="loading"/>
  <div class="party-page__cards">
    <CardItem
        v-for="position of positions"
        v-bind:position = 'position'
    />
  </div>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
import Loader from "@/components/Loader";
import Vue from 'vue'

const reqUrl = Vue.prototype.hostname + "/api/v1/position"
export default {
  name: "CardList",
  components: {
    CardItem, Loader
  },
  data() {
    return {
      positions: [],
      loading: true,
    }
  },
  mounted() {
    fetch(reqUrl, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.token
      }
    })
      .then(response => response.json())
      .then(json => this.positions = json)
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.party-page__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
</style>