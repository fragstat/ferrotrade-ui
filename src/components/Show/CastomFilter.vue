<template>
  <div class="filter">
    <Loader v-if="!loaded"/>
    <div v-if="loaded">
      <div class="filter__item">
        <button class="btn btn-filter" @click="clearFilters">
          Очистить фильтр
        </button>
        <p class="filter__title">Марка:</p>
        <CastomCheckbox
          v-for="mark in marks"
          :key="mark"
          :label="mark"
          :value="mark"
          v-model="selectedMarks"
          @change = 'sendMarks'
        />
      </div>
      <div class="filter__item">
        <p class="filter__title">Диаметр:</p>
        <CastomMultiSlider
          :min="minDiametr"
          :max="maxDiametr"
          :value="selectedDiametrs"
          @change:selectedDiametrs="sendDiameters"
        />
        <div class="filter__text">
          От <span class="filter__numbers">{{ selectedDiametrs[0] }}</span> до
          <span class="filter__numbers">{{ selectedDiametrs[1] }}</span>
        </div>
      </div>
      <div class="filter__item">
        <p class="filter__title">Упаковка:</p>
        <CastomCheckbox
            v-for="pack of packs"
            v-model="selectedPacks"
            :value="pack"
            :key="pack"
            :label="pack"
            @change="sendMarks"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CastomCheckbox from "../../components/Show/CastomCheckbox.vue";
import CastomMultiSlider from "../../components/Show/CastomMultiSlider.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Vue from "vue";
import Loader from "@/components/Loader";
const hostname = Vue.prototype.hostname + '/api/position/'


export default {
  name: "CastomFilter",
  components: {
    Loader,
    CastomCheckbox,
    CastomMultiSlider,
  },
  data() {
    return {
      packs: [],
      marks: [],
      selectedMarks: [],
      selectedPacks: [],
      minDiametr: 0,
      maxDiametr: 10,
      selectedDiametrs: [1, 10],
      loaded: false
    };
  },
  computed: {
    ...mapGetters(["MARKS"]),
  },
  watch : {

  },
  methods: {
    ...mapActions(["GET_MARKS_FROM_API"]),
    clearFilters() {
      this.selectedMarks = [];
      this.selectedPacks = [];
      this.selectedDiametrs= [this.minDiametr, this.maxDiametr]
      this.sendMarks()
      this.sendDiameters()
    },
    sendMarks() {
      let data = this.selectedMarks.length === 0 ? this.marks : this.selectedMarks
      this.$emit('sendMarks', data)
      data = this.selectedPacks.length === 0 ? this.packs : this.selectedPacks
      this.$emit('sendPacks', data)
    },
    sendDiameters(value = this.selectedDiametrs) {
      this.selectedDiametrs = value
      this.$emit('sendDiameters', this.selectedDiametrs)
    }
  },
  mounted() {
    const markFetch = fetch(hostname + 'marks', {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    })
        .then(response => response.json())
        .then(json => this.marks = json)
    const diameterFetch = fetch(hostname + 'diameter', {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    }).then(response => response.json())
        .then(json => {
          this.minDiametr = Number.parseFloat(json[0])
          this.maxDiametr = Number.parseFloat(json[1])
          this.selectedDiametrs = [this.minDiametr, this.maxDiametr]
        })
    const packsFetch = fetch(hostname + 'packs', {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "X-CSRF-TOKEN" : localStorage.token
      }
    }).then(response => response.json())
        .then(json => this.packs = json)
    Promise.all([markFetch, diameterFetch, packsFetch])
        .then(() => {
          this.loaded = true
          this.sendMarks()
          this.sendDiameters()
        })
  },
};
</script>

<style scoped>
.filter__item {
  margin-bottom: 0.8rem;
}
.filter__title {
  margin-left: 0.6rem;
  margin-bottom: 0.6rem;
}
.btn-filter {
  margin-bottom: 0.4rem;
}
.filter__text {
  margin-top: 0.2rem;
}
.filter__numbers {
  background-color: var(--color-side);
  padding: 0.1rem 0.2rem;
  border-radius: 5px;
}
</style>
