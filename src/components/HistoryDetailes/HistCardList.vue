<template>
  <div>
  <div class="party-page__cards">
    <CardItem
        v-for="position of positions"
        v-bind:position = 'position'
        :key="position.id"
    />
  </div>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";

export default {
  name: "CardList",
  components: {
    CardItem
  },
  props:{
    positions: Array
  }
}
</script>

<style scoped>
.party-page__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  width: 100%;
}
</style>