<template>
  <div class="print">
    <Loader v-if="!loaded"/>
    <PrintCard
      v-for="uid in ids"
      :uid="uid"
    />
    <lottie-player v-if="loaded" src="https://assets9.lottiefiles.com/datafiles/OhIfcxnkLsj1Jxj/data.json"  background="transparent"  speed="0.6"  style="width: 300px; height: 300px;"    ></lottie-player>
  </div>
</template>

<script>
import PrintCard from "@/components/PrintCard";
import Loader from "@/components/Loader";
export default {
  name: "PrintList",
  components: {
    Loader,
    PrintCard
  },
  props: {
    ids: Array
  },
  data() {
    return {
      loaded: false
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.print {
  visibility: hidden;
}
</style>