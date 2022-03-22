<template>
  <div class="castom-select">
    <p
      @click="areOptionsVisible = !areOptionsVisible"
      class="select"
      :class="{ active: areOptionsVisible }"
    >
      {{ selected }}
    </p>
    <div v-if="areOptionsVisible" class="options">
      <p
        v-for="option in options"
        @click="setOption(option)"
        :key="option.name"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CastomSelector",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    setOption(option) {
      this.$emit("select-change", option);
      this.hideSelect();
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>

<style scoped>
.castom-select {
  cursor: pointer;
  width: 120px;
  text-align: start;
}
.select {
  background-color: var(--color-side);
  border-radius: 0.7rem;
  padding: 0.3rem 1rem;
}
.select.active {
  border-radius: 0.7rem 0.7rem 0 0;
}
.options {
  background-color: var(--color-side);
  border-radius: 0 0 0.7rem 0.7rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 120px;
  overflow: hidden;
}
.options p {
  border-top: 1px var(--color-side-dark) solid;
  padding: 0.3rem 1rem;
}
.options p:hover {
  background-color: var(--color-side-light);
}
</style>