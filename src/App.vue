<template>
  <div id="app">
		<router-view></router-view>
    <notifications/>
  </div>
</template>

<script>
export default {
	mounted() {
		// this.$router.replace({ name: "Login" });
	},
	
}
</script>

<style src="./main.css">
</style>
