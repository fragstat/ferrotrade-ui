<template>
  <tr>
    <th scope="col">{{ position.mark }}</th>
    <th scope="col">{{position.diameter}}</th>
    <th scope="col">{{position.packing}}</th>
    <th scope="col">{{ Math.round(Number.parseFloat(position.mass[0])).toFixed(2)}}</th>
    <th scope="col">{{ Math.round(Number.parseFloat(position.mass[1])).toFixed(2)}}</th>
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