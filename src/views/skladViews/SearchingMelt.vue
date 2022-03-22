<template>
  <div class="searching-melt page-content">
    <div class="searching-melt__searching-bar">
      <FormInput
        ph="Введите плавку"
        class="searching-melt__input"
        type="text"
      />
      <button class="btn searching-melt__btn">Найти</button>
    </div>
  </div>
</template>

<script>
import FormInput from "../../components/Register/FormInput.vue";

export default {
  name: "searching-melt",
  components: {
    FormInput,
  },
};
</script>

<style scoped>
.searching-melt {
  padding-left: 3rem;
}
.searching-melt__searching-bar {
  width: 100%;
  display: flex;
}
.searching-melt__input {
  width: 60%;
}
.searching-melt__btn {
  margin-left: 2rem;
}
</style>
