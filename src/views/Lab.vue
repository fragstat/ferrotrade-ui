<template>
  <div class="container">
		<nav>
      <button class="lab__new-form" @click="toFirstStep">Новая форма</button>
		</nav>
		<div class="page-content">
      <AutocompleteInput
        class="lab__input"
        :items="this.marks"
        :title="'Марка'"
        :editable="false"
        :stl="'darkSide'"
        @input="markChange"
      />
      <FormInput
        class="lab__input"
        title="Диаметр"
        type="input"
        :hasRedact="false"
        stl="darkSide"
        @on-change="onDiameterChanged"
      />
      <OptionForm
        title="Упаковка"
        :options="packs"
        :placeholder="'Выберете упаковку'"
        :isEditable="false"
        class="lab__input"
        @on-change="onPackChange"
      />
      <OptionForm
        v-if="this.currentStep >= 2"
        title="ГОСТ"
        :options="gosts"
        :placeholder="'Выберете ГОСТ'"
        :isEditable="false"
        class="lab__input"
        @on-change="onGostChange"
      />
      <FormInput
        v-if="this.currentStep >= 2"
        class="lab__input"
        title="Плавка"
        type="input"
        :hasRedact="false"
        stl="darkSide"
        @on-change="onPlavChanged"
      />
      <table v-if="(this.currentStep >= 3) && (!this.isNewPlav)">
        <thead>
          <tr>
            <th v-for="el in this.himElWithNum">{{el.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="el in this.himElWithNum">{{el.value}}</td>
          </tr>
        </tbody>
      </table>
      <table v-if="(this.currentStep >= 3) && (this.isNewPlav)">
        <thead>
          <tr>
            <th v-for="el in this.himEl">{{el.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="el in this.himEl"><input v-model="el.value" type="text"></td>
          </tr>
        </tbody>
      </table>
      <FormInput
        v-if="this.currentStep >= 3"
        class="lab__input"
        title="Партия"
        type="input"
        :hasRedact="false"
        stl="darkSide"
        @on-change="onPartChanged"
      />
      <div class="lab__params-form" v-if="(this.currentStep >= 3)">
        <OptionForm
          :options="params"
          :placeholder="'Выберите параметр'"
          :isEditable="false"
          class="lab__input lab__input_small lab__params-input"
          @on-change="onParamChange"
        />
        <input v-model="paramNumber" class="lab__params-input" type="text">
        <button class="btn" @click="addParam">Добавить</button>
      </div>
      <div class="lab__params-list" v-if="(this.currentStep >= 3)">
        <div class="lab__params-list-item" v-for="(param,id) in this.currentParams" :key="id">
          <button class="btn" @click="deleteParam(id)">Удалить</button>
          <p>{{param.name}}</p>
          <p>{{param.value}}</p>
        </div>
      </div>
      <button class="btn btn_next" @click="nextStep">Далее</button>
    </div>
		<button class="btn btn_log" @click="logout">Выйти</button>
	</div>
</template>

<script>
import AutocompleteInput from "@/components/AutocompleteInput";
import FormInput from "@/components/Register/FormInput";
import OptionForm from "@/components/OptionForm";
import Vue from "vue";
import axios from "axios";

const marksUrl = Vue.prototype.$hostname + "/api/position/marks";
const packsUrl = Vue.prototype.$hostname + '/api/position/packs'
const gostUrl = "http://ferro-trade.ru:7000" + '/docGenerator/certificate/gost'
const plavUrl = "http://ferro-trade.ru:7000" + '/chemistry'

export default {
  name: "Lab",
  components: {
    AutocompleteInput,
    FormInput,
    OptionForm,
  },
  data(){
    return{
      currentStep: 1,
      marks: [],
      diametr: 0,
      packs: [],
      pack: "",
      gosts: [],
      gost: "",
      plav: "",
      isNewPlav: false,
      part: "",
      param: "",
      paramNumber: "",
      currentParams: [],
      himElWithNum: [],
      params: [
        "Временное сопротивление разрыву, Н/мм<sup>2</sup>(МПа)",
        "Число перегибов на 180deg",
        "Испытание на МКК, Метод/Результат",
        "Относительное удлинение",
        "Содержание ферритной фазы",
        "Состояние поверхности",
      ],
      himEl: [
            {
                "name": "C",
                "value": ""
            },
            {
                "name": "Mn",
                "value": ""
            },
            {
                "name": "Si",
                "value": ""
            },
            {
                "name": "S",
                "value": ""
            },
            {
                "name": "P",
                "value": ""
            },
            {
                "name": "Cr",
                "value": ""
            },
            {
                "name": "Ni",
                "value": ""
            },
            {
                "name": "Cu",
                "value": ""
            },
            {
                "name": "Ti",
                "value": ""
            },
            {
                "name": "Mo",
                "value": ""
            },
            {
                "name": "V",
                "value": ""
            },
            {
                "name": "N",
                "value": ""
            },
            {
                "name": "Al",
                "value": ""
            },
            {
                "name": "Nb",
                "value": ""
            },
            {
                "name": "W",
                "value": ""
            }],
    }
  },
  mounted() {
    fetch(marksUrl)
        .then(response => response.json())
        .then(json => this.marks = json)
    fetch(packsUrl)
        .then(response => response.json())
        .then(json => this.packs = json)
        .then(() => this.packs.unshift("Выберете упаковку"))
  },
  methods:{
    logout(){
			this.$router.replace({ name: "Login" });
		},
    toFirstStep(){
      this.$router.go(0);
    },
    nextStep(){
      switch(this.currentStep){
        case 1:
          if(this.mark != "" && this.diametr != "" && this.pack != ""){
            this.currentStep++;
            axios(gostUrl, {
              method: "GET",
              params: {
                mark: this.mark
              }
            })
              .then((gosts) => {
                this.gosts = gosts.data;
              })
              .catch((error) => {
                console.log(error);
              });
          }
          break;
        case 2:
          if(this.gost != "" && this.plav != ""){
            this.currentStep++;
            axios(plavUrl + "/" + this.plav, {
              method: "GET",
            })
              .then((plavInfo) => {
                console.log(plavInfo);
                this.himElWithNum = plavInfo.data.elements;
              })
              .catch((error) => {
                this.isNewPlav = true;
              });
          }
          break;
        case 3:
          this.toFirstStep();
          break;
        case 4:
      }
    },
    markChange(val) {
      this.mark = val.trim()
    },
    onDiameterChanged(val){
      this.diametr = val.trim();
    },
    onPackChange(val){
      this.pack = val.trim();
    },
    onGostChange(val){
      this.gost = val.trim();
    },
    onPlavChanged(val){
      this.plav = val.trim();
    },
    onPartChanged(val){
      this.part = val.trim();
    },
    onParamChange(val){
      this.param = val.trim();
    },
    addParam(){
      this.currentParams.push({
        name: this.param,
        value: this.paramNumber,
      })
    },
    deleteParam(id){
      console.log(id,this.currentParams);
      this.currentParams.splice(id,1);
    }

  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100%;
  max-width: 1400px;
  margin: auto;
  padding: 2rem 1rem;
  display: flex;
  position: relative;
}
nav{
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  width: 20%;
}
input{
  width: 100%;
  min-width: 50px;
  padding: 4px 4px;
}
.page-content{
  margin-top: 4rem;
  margin-left: 3rem;
}
.lab__new-form {
  padding: 1rem;
  margin-top: 0.5rem;
  color: var(--color-font-second);
  background-color: var(--color-primary);
  border: 3px solid var(--color-primary);
  border-radius: 0.7rem;
	text-align: center;
}
.lab__input{
  width: 60%;
  min-width: 300px;
  margin-top: 1rem;
}
.lab__input_small{
  width: 30%;
}
table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
  margin-top: 2rem;
  overflow-x: scroll;
}
table thead th {
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 10px 15px;
  background: #d8d8d8;
  font-size: 14px;
}
table thead tr th:first-child {
  border-radius: 8px 0 0 8px;
}
table thead tr th:last-child {
  border-radius: 0 8px 8px 0;
}
table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
table tbody tr:nth-child(even){
  background: #f3f3f3;
}
table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
}
.lab__params-form{
  display: flex;
  width: 100%;
  height: 2.5rem;
  margin-top: 2rem;
}
.lab__params-input{
  width: 20%;
  margin: 0;
  margin-right: 1rem;
}
.lab__params-list-item{
  margin-top: 1rem;
  display: flex;
  align-items: center;
}
.lab__params-list-item p{
  margin-left: 2rem;
}
.btn_next{
  margin-top: 2rem;
}
.btn_log{
	position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>