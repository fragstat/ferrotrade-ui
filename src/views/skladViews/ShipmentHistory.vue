<template>
  <div>
    <PrintCard
    :uid="33181"
    id="1"
    class="print"

    />
	</div>
</template>

<script>
import PrintCard from "@/components/PrintCard";
import Vue from "vue";
export default {
  name: 'ShipmentHistory',
  components: {
    PrintCard
  },
  data() {
    return {
      position: {}
    }
  },
  methods: {
  },
  mounted() {
    setTimeout(() =>
    this.$htmlToPaper('1'), 500
    )
  }
}
</script>

<style scoped>
.print {
  visibility: hidden;
}
</style>
