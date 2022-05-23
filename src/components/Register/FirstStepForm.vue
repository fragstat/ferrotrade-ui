<template>
  <form action="#" class="register-form" @keyup.enter.prevent @submit.prevent="toSecondStep">
    <div class="base_rows">
      <AutocompleteInput
          class="register-form__input input__small"
          :items="marks"
          :title="'Марка'"
          :editable="true"
          :stl="'darkSide'"
          @input="onAutocompleteChange"
      />
      <FormInput
          title="Диаметр"
          type="input"
          :hasRedact="true"
          stl="darkSide"
          class="register-form__input input__small"
          @on-change="onDiameterChanged"
      />
      <OptionForm
          title="Упаковка"
          :options="packs"
          :placeholder="'Выберете упаковку'"
          :isEditable="true"
          class="register-form__input input__small"
          @on-change="onPackChange"
      />
      <FormInput
          title="Плавка"
          type="input"
          :hasRedact="true"
          stl="darkSide"
          class="register-form__input input__small"
          @on-change="onPlavChanged"
      />
      <FormInput
          title="Партия"
          type="input"
          :hasRedact="true"
          stl="darkSide"
          class="register-form__input input__small"
          :error="partValidationError"
          @on-change="onPartChanged"
      />
      <FormInput
          title="Вес"
          type="input"
          :hasRedact="true"
          stl="darkSide"
          class="register-form__input input__small"
          @on-change="onWeightChanged"
      />
    </div>
    <div class="additional_rows">
      <FormInput
          title="Производитель"
          type="input"
          :hasRedact="true"
          stl="darkSide"
          class="register-form__input"
          @on-change="onManufacturerChanged"
      />
      <FormInput
          title="Количество"
          type="counter"
          :hasRedact="false"
          stl="darkSide"
          class="register-form__input"
          @on-change="onAmountChanged"
      />
    </div>
    <FormInput
        title="Комментарий"
        type="textarea"
        :hasRedact="true"
        stl="darkSide"
        class="register-form__input input__large"
        @on-change="onCommentChanged"
    />
    <button type="submit" class="btn">Зарегистрировать</button>
  </form>
</template>

<script>
import FormInput from "@/components/Register/FormInput";
import AutocompleteInput from "@/components/AutocompleteInput";
import OptionForm from "@/components/OptionForm";
import Vue from "vue";
export default {
  name: "FirstStepForm",
  components:{
    FormInput,
    AutocompleteInput,
    OptionForm
  },
  data() {
    return {
      packs: [],
      marks : [],
      mark : '',
      diameter: '',
      position: {
        mark: '',
        diameter: '',
        pack: '',
        plav: '',
        part: '',
        weight: '',
        manufacturer: '',
        comment: ''
      },
      amount: '',
      partValidationError: false
    }
  },
  mounted() {
    const marksUrl = Vue.prototype.hostname + '/api/position/marks'
    const packsUrl = Vue.prototype.hostname + '/api/position/packs'
    fetch(marksUrl, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    })
        .then(response => response.json())
        .then(json => this.marks = json)
    fetch(packsUrl, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    })
        .then(response => response.json())
        .then(json => this.packs = json)
        .then(() => this.packs.unshift("Выберете упаковку"))
  },
  methods: {
    validateParam() {
      const validationUrl = Vue.prototype.hostname + '/api/add/validate';
      if (this.position.part && this.position.plav && this.position.mark && this.position.diameter) {
        const body = {
          part: this.position.part,
          plav: this.position.plav,
          mark: this.position.mark,
          diameter: this.position.diameter
        };
        let res = true
        return fetch(validationUrl, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : localStorage.token
          }
        })
            .then(res => res.text())
            .then(text => {
              if (text === 'false') {
                res = false
              }
              return res
            })
      }
      return Promise.resolve(() => true)
    },
    toSecondStep() {
      this.validateParam().then(
          value => {
            if (value) {
              const params = {
                position: this.position,
                amount: this.amount
              }
              this.$emit("nextStep", params)
            } else {
              this.partValidationError = true
              this.$notify({
                type: 'error',
                title: 'Ошибка регистрации',
                text: 'Данная партия уже используется'
              })
            }
          }
      )
    },
    onAutocompleteChange(val) {
      this.position.mark = val.trim()
    },
    onPackChange(val) {
      this.position.pack = val.trim()
    },
    onDiameterChanged(val) {
      this.position.diameter = val.replaceAll(',','.').trim()
    },
    onPlavChanged(val) {
      this.position.plav = val.trim()
    },
    onPartChanged(val) {
      this.position.part = val.trim()
    },
    onWeightChanged(val) {
      this.position.weight = val.replaceAll(',','.').trim()
    },
    onManufacturerChanged(val) {
      this.position.manufacturer = val.toUpperCase().trim()
    },
    onCommentChanged(val) {
      this.position.comment = val.trim()
    },
    onAmountChanged(val) {
      this.amount = val
    }

  }
};
</script>

<style scoped>
.base_rows {
  display: grid;
  grid-template-columns: 47% 47%;
  grid-gap: 10px;
}
.additional_rows {
  display: grid;
  grid-template-columns: 55% 40%;
  grid-gap: 10px;
}
.register-form {
  width: 75%;
  margin-left: auto;
  margin-right: auto;

  border: 5px solid var(--color-primary);
  border-radius: 1.5rem;
  padding: 1.5rem;
  flex-wrap: wrap;
}
.register-form__input {
  margin-top: 0.8rem;
}
.input__small {
  width: 100%;
}
.input__small:nth-child(2n) {
  margin-left: 5%;
}
.input__small:nth-child(1),
.input__small:nth-child(2) {
  margin-top: 0;
}

.input__large {
  width: 100%;
}

.btn {
  margin-top: 2rem;
  width: 100%;
  font-size: 17px;
  height: 3rem;
}
</style>