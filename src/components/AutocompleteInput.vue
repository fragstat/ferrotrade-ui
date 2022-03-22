<template>
  <div
      :class="[stl === 'darkSide' ? 'form-input__theme_dark-side' : '']"
      class="form-input"
  >

      <div class="form-input__info" v-if="title || editable">
        <template v-if="title"> {{ title }}: </template>
        <button v-if="editable" class="btn btn-redact" type="button" @click="changeEditable">
          Редактировать поле
        </button>
      </div>
      <input
          type="text"
          @input="onChange"
          v-model="search"
          @keyup.down="onArrowDown"
          @keyup.up="onArrowUp"
          @keyup.enter.prevent="onEnter"
          :disabled="isEditable"
          class="form-input__input" />
      <div>
      <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
        <li class="loading" v-if="isLoading">
          Loading results...
        </li>
        <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
          {{ result }}
        </li>
      </ul>
      </div>

    </div>
</template>

<script>
export default {
  name: "AutocompleteInput",
  props: {
    stl: {
      type: String
    },
    editable : {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: 0,
      isEditable: false
    };
  },
  methods: {
    changeEditable() {
      this.isEditable = !this.isEditable;
    },
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit("input", this.search);

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        // Let's search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults() {
      // first uncapitalize all the things
      this.results = this.items.filter(item => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.onChange()
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  watch: {
    items: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};

</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  position: relative;
}
.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid var(--color-side-dark);
  height: 120px;
  position: absolute;
  overflow: auto;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: var(--color-primary);
  color: white;
}
.form-input__info {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
}
.form-input__theme_dark-side .form-input__input {
  display: flex;
  border: 0.2rem solid var(--color-side-dark);
}
</style>