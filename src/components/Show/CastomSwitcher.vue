<template>
  <label class="switch">
    <input type="checkbox" v-model="checked" @change="changeChecked" />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  name: "CastomSwitcher",
  props: {
    defaultChecked: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: this.defaultChecked,
    };
  },
  methods: {
    changeChecked() {
      this.$emit("input", this.checked);
    },
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: var(--color-primary);
}
input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}
</style>