<template>
  <form class="bar" @submit.prevent="doSearch">
      <input
          placeholder="Введите/отсканируйте информацию"
          class="input"
          type="text"
          v-model="query"
      />
      <button type="submit" class="btn">Найти
      </button>
  </form>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      query : ''
    }
  },
  methods : {
    doSearch() {
     this.$emit("doSearch", this.query)
    }
  }
}
</script>

<style scoped>
.bar {
  width: 100%;
  display: flex;
}
.input {
  width: 60%;
}
.btn {
  margin-left: 2rem;
}
</style>