<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div :class="dark ? 'form-input__info' : 'form-input__info_light'" v-if="title || isEditable">
      <template v-if="title"> {{ title }}: </template>
      <button @click="edit = !edit" v-if="isEditable" class="btn btn-redact" type="button">
          Редактировать поле
        </button>
    </div>
    <select v-model="select" :disabled="!edit" :class="dark ? 'form-input__input' : 'form-input__input_light'" @change="change(select)">
      <option
      v-for="option in options"
      :value="option"
      :name="option"
      >{{option}}</option>
    </select>
  </div>
  </template>

<script>
export default {
  name: "OptionForm",
  props: {
    placeholder: {
      type: String,
    },
    title: {
      type: String
    },
    options: {
      type: Array
    },
    isEditable: {
      type: Boolean
    },
    dark : {
      default: true
    }
  },
  data() {
    return {
      select : '',
      shifted: false,
      edit: true
    }
  },
  methods: {
    change(value) {
      if (!this.shifted) {
        this.options.shift()
        this.shifted = true
      }
      this.select = value
      this.$emit("on-change", this.select)
    }
  },
  mounted() {
    this.select = this.placeholder
  }
}
</script>

<style scoped>
.form-input__input {
  display: flex;
  border: 0.2rem solid var(--color-side-dark);
  width: 100%;
  border-radius: 0.5rem;
  height: 2.5rem;
}
.form-input__input_light {
  border: 2px solid var(--color-primary);
  width: 100%;
  border-radius: 0.5rem;
  height: 36px;
}
.form-input__info {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;

}
.form-input__info_light {
  display: flex;
  align-items: center;
}
</style>