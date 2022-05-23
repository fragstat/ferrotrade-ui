<template>
  <div :class="error ? 'card-item_error' : 'card-item'">
    <p class="card-item__text">Марка: {{addPosition.position.mark ? position.mark : ''}}</p>
    <AutocompleteInput
        :editable="false"
        :items="marks"
        v-if="!addPosition.position.mark"
        class="card-item__input"
        @input="onAutocompleteChange"
    />
    <p class="card-item__text">Диаметр: {{addPosition.position.diameter ? position.diameter : ''}}</p>
    <input v-if="!addPosition.position.diameter" class="card-item__input" v-model="position.diameter" type="number"/>
    <p class="card-item__text">Упаковка: {{addPosition.position.pack ? position.pack : ''}}</p>
    <OptionForm
        class="card-item__input"
        v-if="!addPosition.position.pack"
        :placeholder="'Выберете упаковку'"
        :options="packs"
        :isEditable="false"
        :dark="false"
        @on-change="changePack"
    />

    <p class="card-item__text">Партия: {{addPosition.position.part ? position.part : ''}}</p>
    <input v-if="!addPosition.position.part" class="card-item__input" v-model="position.part"/>

    <p class="card-item__text">Плавка: {{addPosition.position.plav ? position.plav : ''}}</p>
    <input v-if="!addPosition.position.plav" class="card-item__input" v-model="position.plav"/>

    <p class="card-item__text">Вес: {{addPosition.position.weight ? position.weight : ''}}</p>
    <input v-if="!addPosition.position.weight" class="card-item__input" v-model="position.weight" type="number"/>

    <p class="card-item__text">Производтель: {{addPosition.position.manufacturer ? position.manufacturer : ''}}</p>
    <input v-if="!addPosition.position.manufacturer" class="card-item__input" v-model="position.manufacturer"/>

    <p class="card-item__text" v-if="position.comment">Комментарий: {{addPosition.position.comment}}</p>
  </div>
</template>

<script>
import AutocompleteInput from "@/components/AutocompleteInput";
import OptionForm from "@/components/OptionForm";
import Vue from "vue";
export default {
  name: "RegisterPositionCard",
  components: {
    AutocompleteInput,
    OptionForm
  },
  props: {
    addPosition: {
      type: Object
    },
    sendData: Boolean
  },
  methods: {
    push() {
      this.$emit('on-changed', {
        id: this.addPosition.id,
        position: this.position,
        valid: true
      })
    },
    onAutocompleteChange(val) {
      this.position.mark = val.trim()
    },
    changePack(val) {
      this.position.pack = val
    },
    validate() {
      if (this.position.mark && this.position.diameter && this.position.plav
          && this.position.part && this.position.pack && this.position.weight && this.position.manufacturer) {
        if (this.addPosition.position.mark || this.addPosition.position.diameter
            || this.addPosition.position.plav || this.addPosition.position.part) {
          const validationUrl = Vue.prototype.hostname + '/api/add/validate';
          const body = {
            part: this.position.part,
            plav: this.position.plav,
            mark: this.position.mark,
            diameter: this.position.diameter
          };
          let res = true
          fetch(validationUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN" : localStorage.token
            }
          }).then(res => res.text()).then(text => {
                if (text === 'false') {
                  res = false
                }
                return res
              }).then(res => {
                if (!res) {
                  this.error = true
                  this.$notify({
                    type: 'error',
                    title: 'Ошибка регистрации',
                    text: 'Данная партия уже используется'
                  })
                }
              }).then(() => this.push())}
        else {
          this.push()
        }
      } else {
        this.error = true
        this.$notify({
          type: 'error',
          title: 'Ошибка регистрации',
          text: 'Заполненеы не все поля'
        })
      }
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
        weight: '',
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
    if (!this.addPosition.position.mark) {
      const marksUrl = Vue.prototype.hostname + '/api/position/marks'
      fetch(marksUrl, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "X-CSRF-TOKEN" : localStorage.token
        }
      })
          .then(response => response.json())
          .then(json => this.marks = json)
    }
    if (!this.addPosition.position.packing) {
      const marksUrl = Vue.prototype.hostname + '/api/position/packs'
      fetch(marksUrl, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "X-CSRF-TOKEN" : localStorage.token
        }
      })
          .then(response => response.json())
          .then(json => this.packs = json)
          .then(() => this.packs.unshift("Выберете упаковку"))
    }
    this.position.mark = this.addPosition.position.mark
    this.position.diameter = this.addPosition.position.diameter
    this.position.pack = this.addPosition.position.pack
    this.position.plav = this.addPosition.position.plav
    this.position.part = this.addPosition.position.part
    this.position.weight = this.addPosition.position.weight
    this.position.comment = this.addPosition.position.comment
    this.position.manufacturer = this.addPosition.position.manufacturer
  },
  watch: {
    sendData: function () {
      this.validate()
      this.trigger = !this.trigger
    }
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
  width: 260px;
}
.card-item_error {
  border: var(--color-error) 3px solid;
  border-radius: 1rem;
  padding: 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 260px;
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