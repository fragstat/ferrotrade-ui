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
      const searchUrl = Vue.prototype.hostname + '/api/search'
      fetch(searchUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type" : "application/json",
          "X-CSRF-TOKEN" : localStorage.token
        }
      })
          .then(response => response.json())
          .then(json => this.positions = json)
          .then(() => this.loaded = true)
    }
  }
};
</script>

<style scoped>
.searching {
  padding-left: 3rem;
}
</style>
