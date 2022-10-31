<template>
  <div class="searching page-content">
    <SearchInput
    @doSearch="search"
    />
    <Loader v-if="!loaded"/>
    <SearchList
    v-bind:positions="positions"
    ></SearchList>
  </div>
</template>

<script>
import SearchInput from "@/components/Search/SearchInput";
import SearchList from "@/components/Search/SearchList";
import Loader from "@/components/Loader";
import Vue from "vue";

export default {
  name: "searching",
  components: {
    SearchInput,
    SearchList,
    Loader
  },
  data () {
    return {
      positions : [],
      loaded : true
    }
  },
  methods: {
    search(value) {
      this.loaded = false
      const body = {
        'query' : value
      }
      const searchUrl = Vue.prototype.hostname + '/api/v1/search?' + new URLSearchParams(body).toString()
      fetch(searchUrl, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + localStorage.token
        }
      })
          .then(response => response.json())
          .then(json => this.positions = json)
          .then(() => this.loaded = true)
          .then(() => {
              if (this.positions.length === 0) {
                  this.$notify({
                    type: 'error',
                    title: 'Поиск не удался'
                  })
                }
              }
          )
    }
  }
};
</script>

<style scoped>
.searching {
  padding-left: 3rem;
}
</style>
