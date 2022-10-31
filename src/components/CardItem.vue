<template>
  <div v-on:click="" class="card-item">
    <p class="cart-item__title">{{ position.type }}</p>
    <p class="card-item__text"><span>Марка:</span> {{position.mark}}</p>
    <p class="card-item__text"><span>Диаметр:</span> {{position.diameter}}</p>
    <p class="card-item__text"><span>Упаковка:</span> {{position.packing}}</p>
    <p class="card-item__text"><span>Партия:</span> {{position.part}}</p>
    <p class="card-item__text"><span>Плавка:</span> {{position.plav}}</p>
    <p class="card-item__text"><span>Вес:</span> {{position.weight}}</p>
    <p class="card-item__text" v-if="position.comment"><span>Комментарий:</span> {{position.comment}}</p>
    <p class="card-item__text"><span>Статус:</span> {{position.status}}</p>
    <p class="card-item__text"><span>Склад:</span></p>
    <p class="card-item__text">{{position.location}}</p>
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
  methods: {
    
    this.$router.replace({ name: "Sklad" })
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
span {
  font-style: italic;
}
</style>