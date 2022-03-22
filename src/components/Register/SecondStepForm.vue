<template>
  <form class="register-form" @submit.prevent>
    <button type="button" :class="allValid ? 'btn register-btn-success' : 'btn register-btn'" @click="getData">{{ allValid ? 'Зарегистрировать' : 'Проверить' }}</button>
    <div class="card-holder">
    <RegisterPositionCard
        v-for="position of getCards"
        :addPosition="position"
        @on-changed="onChangeHandler"
        :sendData="sendData"
    />
    </div>
  </form>
</template>

<script>
import RegisterPositionCard from "@/components/Register/RegisterPositionCard";
import Vue from "vue";
export default {
  name: "SecondStepForm",
  components: {
    RegisterPositionCard
  },
  props: {
    positionBase: Object,
    amount: Number
  },
  data() {
    return {
      addPositions: [],
      marks: [],
      sendData: false,
      allValid: false
    }
  },
  mounted() {
  },
  methods: {
    onChangeHandler(val) {
      this.addPositions[val.id] = val
      if (this.addPositions.filter(p => p.valid).length === this.addPositions.length) {
        this.allValid = true
        this.$notify({
          type: 'success',
          title: 'Проверка прошла успешно',
          text: ''
        })
      }
    },
    getData() {
      if (!this.allValid) {
        this.sendData = !this.sendData
      } else {
        const positions = []
        for (let position of this.addPositions) {
          let pos = position.position
          const addPos = {
            'mark' : pos.mark,
            'diameter' : pos.diameter,
            'packing' : pos.pack,
            'part' : pos.part,
            'plav' : pos.plav,
            'manufacturer' : pos.manufacturer,
            'mass' : parseFloat(pos.weight),
            'comment': pos.comment
          }
          positions.push(addPos)
        }

        const body = {
          'positions' : positions
        }
        const addingUrl = Vue.prototype.$hostname + '/api/adding'
        fetch(addingUrl, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "Content-Type" : "application/json"
          }
        })
            .then(response => response.json())
            .then(json => this.$emit('nextStep', json))
      }
    },
  },
  computed: {
    getCards() {
      for (let i = 0; i < this.amount; i++) {
        this.addPositions[i] = {
          id: i,
          position: this.positionBase,
          valid: false
        }
      }
      return this.addPositions
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 85%;
  margin-left: auto;
  margin-right: auto;

  border: 5px solid var(--color-primary);
  border-radius: 1.5rem;
  padding: 1.5rem;
  flex-wrap: wrap;
}
.card-holder {
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  width: 90%;
  margin: 0 auto;
  position: relative;
}
.register-btn {
  margin-bottom: 1.5rem;
  height: 3rem;
  width: 100%;
}

.register-btn-success {
  margin-bottom: 1.5rem;
  height: 3rem;
  width: 100%;
  background-color: #21A647;
}
</style>