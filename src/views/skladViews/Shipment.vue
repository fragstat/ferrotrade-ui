<template>
  <div class="shipment page-content">
    <form class="shipment__searching-form">
      <FormInput
        ph="Введите информацию со сканера"
        class="shipment__input"
        type="text"
        title="Отгрузить"
      />
      <FormInput
        ph="Введите информацию со сканера"
        class="shipment__input"
        type="text"
        title="Исключить"
      />
      <button type="submite" class="btn shipment__btn">Отгрузить</button>
    </form>
  </div>
</template>

<script>
import FormInput from "../../components/Register/FormInput.vue";

export default {
  name: "shipment",
  components: {
    FormInput,
  },
};
</script>

<style scoped>
.shipment {
  padding-left: 3rem;
}
.shipment__searching-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.shipment__input {
  width: 60%;
  margin-bottom: 1.5rem;
}
.shipment__btn {
  width: 100%;
  max-width: 150px;
}
</style>
