<template>
  <div class="card-item">
    <p class="cart-item__title">{{ isPosition ? 'Позиция' : 'Поддон' }}</p>
    <p class="card-item__text">Марка: {{position.mark}}</p>
    <p class="card-item__text">Диаметр: {{position.diameter}}</p>
    <p class="card-item__text">Упаковка: {{position.packing}}</p>
    <p class="card-item__text">Партия: {{position.part}}</p>
    <p class="card-item__text">Плавка: {{position.plav}}</p>
    <p class="card-item__text">Вес: {{position.mass}}</p>
    <p class="card-item__text" v-if="position.comment">Комментарий: {{position.comment}}</p>
    <p class="card-item__text">Статус: {{position.status}}</p>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    position: {
      type : Object
    }
  },
  data() {
    return {
      isPosition: true,
    }
  },
  mounted() {
    if (!this.position.hasOwnProperty("createdFrom")) {
      this.isPosition = false
    }
    switch (this.position.status) {
      case 'In_stock':
        this.position.status = 'На складе';
        break;
      case 'Departured':
        this.position.status = 'Отгружен';
        break;
      case 'Arriving':
        this.position.status = 'В дороге';
        break;
    }
  }
};
</script>

<style scoped>
.card-item {
  border: var(--color-primary) 3px solid;
  border-radius: 1rem;
  padding: 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cart-item__title {
  font-size: 1.3rem;
  margin: 0 auto 0.6rem;
}
.card-item__text {
  font-size: 1.1rem;
  padding-top: 0.4rem;
  text-align: start;
  word-break: break-all;
}
</style>