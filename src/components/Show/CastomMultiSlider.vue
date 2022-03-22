<template>
  <div class="multi-slider">
    <div class="slider-track"></div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value[0]"
      @input="updateDiametrs($event.target.value, 0)"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value[1]"
      @input="updateDiametrs($event.target.value, 1)"
    />
  </div>
</template>

<script>
export default {
  name: "CastomMultiSlider",
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 0.1 },
    value: { default: "" },
  },
  methods: {
    updateDiametrs(value, number) {
      let changedValue;
      if (number == 0) {
        changedValue = [value, this.value[1]];
      } else {
        changedValue = [this.value[0], value];
      }
      this.$emit("change:selectedDiametrs", changedValue);
    },
  },
};
</script>

<style scoped>
.multi-slider {
  position: relative;
  width: 80%;
  height: 16px;
}
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}
.slider-track {
  width: 90%;
  height: 4px;
  background-color: var(--color-primary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
}
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 4px;
}
input[type="range"]::-moz-range-track {
  -moz-appearance: none;
  height: 4px;
}
input[type="range"]::-ms-track {
  appearance: none;
  height: 4px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--color-primary);
  cursor: pointer;
  border-radius: 50%;
  pointer-events: auto;
  margin-top: -6px;
}
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--color-primary);
  cursor: pointer;
  border-radius: 50%;
}
input[type="range"]::-ms-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--color-primary);
  cursor: pointer;
  border-radius: 50%;
}
</style>
