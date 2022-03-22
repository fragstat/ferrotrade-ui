<template>
  <PrintList
    :ids="ids"
  />
</template>

<script>
import PrintList from "@/components/PrintList";
import Loader from "@/components/Loader";
export default {
  name: "PrintStep",
  components: {Loader, PrintList},
  props: {
    ids: Array
  }
}
</script>

<style scoped>

</style>