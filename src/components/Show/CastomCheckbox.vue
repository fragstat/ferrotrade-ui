<template>
  <label class="check-lable">
    <input
      type="checkbox"
      class="check-input"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="check-box"></span>
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "CastomCheckbox",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String },
    modelValue: { default: "" },
    label: { type: String, required: true },
    trueValue: { default: true },
    falseValue: { default: false },
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    },
  },
};
</script>

<style scoped>
.check-lable {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.check-input {
  opacity: 0;
  position: absolute;
}
.check-box {
  position: relative;
  display: inline-block;
  height: 0.9rem;
  width: 1rem;
  background-color: var(--color-side-light);
  margin-right: 0.4rem;
}
.check-input:checked + .check-box::before {
  display: flex;
}
.check-box::before {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  height: 90%;
  width: 90%;
  background: no-repeat url("../../assets/Checked.svg") center center;
  background-size: 0.7rem 0.8rem;
}
</style>
