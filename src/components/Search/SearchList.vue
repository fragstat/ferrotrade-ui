<template>
  <div>
    <div class="cards">
      <CardItem
          v-for="position of positions"
          v-bind:position = 'position'
      />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import CardItem from "@/components/CardItem";

export default {
  name: "SearchList",
  components: {
    Loader, CardItem
  },
  data() {
    return {

    }
  },
  props: {
    positions : {
      type : Array
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin-top: 20px;
}
</style>