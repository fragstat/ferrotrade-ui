<template>
  <div class="shipment page-content">
    <PrintList :ids="this.positionsId" class="print" id="print"/>
    <form class="shipment__searching-form" v-if="!isSend">
      <FormInput
        ph="Введите информацию со сканера"
        class="shipment__input"
        type="text"
        title="Отгрузить"
        @on-change="changeRequest"
        :redactable="!isSecondStep"
      />
      <FormInput
        ph="Введите информацию со сканера"
        class="shipment__input"
        type="text"
        title="Исключить"
        @on-change="changeExcept"
        :redactable="!isSecondStep"
      />
      <FormInput
        ph="Имя агента"
        class="shipment__input"
        type="text"
        title="Контр Агент"
        @on-change="changeContrAgent"
        :redactable="isSecondStep"
      />
      <FormInput
        ph="Номер счёта"
        class="shipment__input"
        type="text"
        title="Счёт"
        @on-change="changeBill"
        :redactable="isSecondStep"
      />
      <CardList class="shipment__card-list" v-if="isSecondStep" :positions="this.positions" @change-mass="changeSendPositions"/>
      <button type="submite" class="btn shipment__btn" @click="compliteStep">Отгрузить</button>
    </form>
    <button v-if="isSend" class="btn btn__print-all" @click="printAll">Распечатать всё</button>
    <CardListById v-if="isSend" :positionsId="this.positionsId" />
  </div>
</template>

<script>
import FormInput from "../../components/Register/FormInput.vue";
import CardList from "../../components/Shipment/ShipmentCardList.vue";
import CardListById from "../../components/Shipment/ShipmentCardListById.vue";
import PrintList from "../../components/PrintList.vue";
import Vue from 'vue';
import axios from "axios";

const departFirstUrl = Vue.prototype.$hostname + "/api/departure";
const departSecondUrl = Vue.prototype.$hostname + "/api/departureConfirmation";

export default {
  name: "shipment",
  components: {
    FormInput,
    CardList,
    CardListById,
    PrintList,
  },
  data(){
    return{
      isSecondStep: false,
      contrAgent: "",
      bill: "",
      request: "",
      except: "",
      positions: [],
      sendPositions: [],
      isSend: false,
      positionsId: [],
    }
  },
  methods:{
    changeBill(val){
      this.bill = val;
    },
    changeRequest(val){
      this.request = val;
    },
    changeExcept(val){
      this.except = val;
    },
    changeContrAgent(val){
      this.contrAgent = val;
    },
    changeSendPositions(id, val){
      for(let i = 0; i < this.sendPositions.length; i++){
        if(this.sendPositions[i].id == id){
          this.sendPositions[i].weight = val;
        }
      }
    },
    compliteStep(e){
      e.preventDefault()
      if(!this.isSecondStep){
        axios(departFirstUrl, {
          method: "POST",
          params: {
            request: this.request,
            except: this.except
          }
        })
          .then((positions) => {
            if(positions.data.length > 0){
              this.isSecondStep = true;
              this.positions = positions.data;
              for(let i = 0; i < this.positions.length; i++){
                let newPos = {
                  id: this.positions[i].id,
                  weight: this.positions[i].mass,
                }
                this.sendPositions.push(newPos);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else{
        let json = JSON.stringify({
          data: this.sendPositions,
          contrAgent: this.contrAgent,
          account: this.bill,
        })
        axios.post(departSecondUrl, json, {
            headers: {
             'Content-Type': 'application/json'
            }
          })
          .then((resp) => {
            this.isSend = true;
            this.positionsId = resp.data.id;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    printAll(){
      setTimeout(() => {
        this.loaded = true
        this.$htmlToPaper('print')
      }, 500);
    }
  }
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
.shipment__card-list{
  margin-bottom: 1.5rem;
}
.shipment__btn {
  width: 100%;
  max-width: 150px;
}
.btn__print-all{
  margin-bottom: 2rem;
}
.print{
  display: none;
}
</style>
