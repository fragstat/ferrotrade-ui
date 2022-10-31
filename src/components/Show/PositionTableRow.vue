<template>
  <tr>
    <th scope="col">{{ position.mark }}</th>
    <th scope="col">{{position.diameter}}</th>
    <th scope="col">{{position.packing}}</th>
    <th scope="col">{{position.solnechnogorsk}}</th>
    <th scope="col">{{position.belSklad}}</th>
    <th scope="col">{{position.manufacture}}</th>
  </tr>
</template>

<script>
export default {
  name: "PositionTableRow",
  props: {
    position: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>