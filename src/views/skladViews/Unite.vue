<template>
  <div class="uniting page-content">
    <div class="uniting__searching-bar">
      <FormInput
        ph="Введите информацию со сканера"
        class="uniting__input"
        type="text"
      />
      <button class="btn uniting__btn">Объединить</button>
    </div>
  </div>
</template>

<script>
import FormInput from "../../components/Register/FormInput.vue";

export default {
  name: "uniting",
  components: {
    FormInput,
  },
};
</script>

<style scoped>
.uniting {
  padding-left: 3rem;
}
.uniting__searching-bar {
  width: 100%;
  display: flex;
}
.uniting__input {
  width: 60%;
}
.uniting__btn {
  margin-left: 2rem;
}
</style>
