<template>
  <div class="admission page-content">
    <div class="admission__searching-bar">
      <FormInput
        ph="Введите информацию со сканера"
        class="admission__input"
        type="text"
      />
      <button class="btn admission__btn">Принять</button>
    </div>
  </div>
</template>

<script>
import FormInput from "../../components/Register/FormInput.vue";

export default {
  name: "admission",
  components: {
    FormInput,
  },
};
</script>

<style scoped>
.admission {
  padding-left: 3rem;
}
.admission__searching-bar {
  width: 100%;
  display: flex;
}
.admission__input {
  width: 60%;
}
.admission__btn {
  margin-left: 2rem;
}
</style>
