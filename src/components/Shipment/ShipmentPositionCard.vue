<template>
  <div class="card-item">
    <p class="card-item__text">Марка: {{addPosition.mark ? position.mark : ''}}</p>
    <p class="card-item__text">Диаметр: {{addPosition.diameter ? position.diameter : ''}}</p>
    <p class="card-item__text">Упаковка: {{addPosition.packing ? position.pack : ''}}</p>
    <p class="card-item__text">Партия: {{addPosition.part ? position.part : ''}}</p>
    <p class="card-item__text">Плавка: {{addPosition.plav ? position.plav : ''}}</p>
    <input class="card-item__input" @input="changeValue()" v-model="position.mass" type="number"/>
    <p class="card-item__text">Производтель: {{addPosition.manufacturer ? position.manufacturer : ''}}</p>
    <p class="card-item__text">Комментарий: {{addPosition.comment ? position.comment : ''}}</p>
  </div>
</template>

<script>
import AutocompleteInput from "@/components/AutocompleteInput";
import Vue from "vue";
export default {
  name: "ShipmentPositionCard",
  components: {
    AutocompleteInput
  },
  props: {
    addPosition: {
      type: Object
    }
  },
  methods: {
    changeValue() {
      this.$emit('change-mass', this.addPosition.id, this.position.mass)
    }
  },
  data() {
    return {
      position: {
        mark: '',
        diameter: '',
        pack: '',
        plav: '',
        part: '',
        mass: '',
        comment: '',
        manufacturer: ''
      },
      marks: [],
      packs: [],
      trigger: false,
      error : false
    }
  },
  mounted() {
    this.position.mark = this.addPosition.mark
    this.position.diameter = this.addPosition.diameter
    this.position.pack = this.addPosition.packing
    this.position.plav = this.addPosition.plav
    this.position.part = this.addPosition.part
    this.position.mass = this.addPosition.mass
    this.position.comment = this.addPosition.comment
    this.position.manufacturer = this.addPosition.manufacturer
  }
}
</script>

<style scoped>
.card-item {
  border: var(--color-primary) 2px solid;
  border-radius: 1rem;
  padding: 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.card-item__text {
  font-size: 1.1rem;
  padding-top: 0.4rem;
  text-align: start;
  word-break: break-all;
}
.card-item__input {
  font-size: 1.1rem;
  text-align: start;
  word-break: break-all;
  width: 100%;
  margin-top: 0.4rem;
  height: 36px;
}
.form-input__info {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
}
</style>