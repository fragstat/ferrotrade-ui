<template>
  <div class="container">
    <PrintCard
    :uid="+this.id"
    id="1"
    class="print"

    />
    <div class="product-info">
      <div class="function-buttons">
        <div class="function-buttons__button" @click="drowCard">Распечатать штрих-код</div>
        <form action="#" v-if="this.status != 'Отгружен'">
          <FormInput
              class="function-buttons__form-input"
              ph="Вес отгрузки"
              type="input"
              @on-change="weightChange"
          />
          <FormInput
              class="function-buttons__form-input"
              ph="Имя агента"
              type="input"
              @on-change="agentChange"
          />
          <FormInput
              class="function-buttons__form-input"
              ph="Номер счёта"
              type="input"
              @on-change="billChange"
          />
          <button type="submite" class="btn arrived__btn" @click="departureSingle">Отгрузить</button>
        </form>
      </div>
      <table>
        <tr>
          <th>Марка</th>
          <td>{{this.mark}}</td>
        </tr>
        <tr>
          <th>Диаметр</th>
          <td>{{this.diameter}}</td>
        </tr>
        <tr>
          <th>Упаковка</th>
          <td>{{this.packing}}</td>
        </tr>
        <tr>
          <th>Партия</th>
          <td>{{this.part}}</td>
        </tr>
        <tr>
          <th>Плавка</th>
          <td>{{this.plav}}</td>
        </tr>
        <tr>
          <th>Вес</th>
          <td>{{this.mass}}</td>
        </tr>
        <tr>
          <th>Статус</th>
          <td>{{this.status}}</td>
        </tr>
        <tr>
          <th>Производитель</th>
          <td>{{this.manufacturer}}</td>
        </tr>
        <tr v-if="this.comment.length > 0">
          <th>Комментарий</th>
          <td>{{this.comment}}</td>
        </tr>
      </table>
    </div>
    <ProductTable :id="+this.id"/>
    <button class="btn btn_log" @click="logout">Выйти</button>
  </div>
</template>

<script>
import ProductTable from "@/components/Product/ProductTable.vue";
import FormInput from "@/components/Register/FormInput.vue";
import PrintCard from "@/components/PrintCard";
import Vue from 'vue';
import axios from "axios";

const reqUrl = Vue.prototype.$hostname + "/api/position";
const labUrl = Vue.prototype.$hostname + "/chemistry";
const departUrl = Vue.prototype.$hostname + "/api/position/departure";
export default {
  name:"Product",
  components: {
    ProductTable,
    FormInput,
    PrintCard
  },
  data(){
    return {
      id: 0,
      mark: "",
      diameter: "",
      packing: "",
      part: "",
      plav: "",
      mass: 0,
      status: "",
      manufacturer: "",
      comment: "",
      agent: "",
      bill: "",
      arrivedWeight: "",
      position: {}
    }
  },
  beforeMount(){
    this.id = this.$route.params.id;
  },
  mounted(){
    axios(reqUrl + "/" + this.id, {
        method: "GET",
        params: {
          id: this.id
        }
      })
        .then((position) => {
          this.id = position.data.id;
          this.mark = position.data.mark;
          this.diameter = position.data.diameter;
          this.packing = position.data.packing;
          this.part = position.data.part;
          this.plav = position.data.plav;
          this.mass = position.data.mass;
          switch (position.data.status) {
            case 'In_stock':
              this.status = 'На складе';
              break;
            case 'Departured':
              this.status = 'Отгружен';
              break;
            case 'Arriving':
              this.status = 'В дороге';
              break;
          }
          this.manufacturer = position.data.manufacturer;
          this.comment = position.data.comment;
          // axios(labUrl + "/" + this.plav, {
          //   method: "GET",
          //   params: {
          //     plav: this.plav
          //   }
          // })
          //   .then((labInfo) => {
          //     console.log(labInfo);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log(error);
        });
  },
  methods: {
    logout(){
			this.$router.replace({ name: "Login" });
		},
    weightChange(val){
      this.arrivedWeight = val;
    },
    agentChange(val){
      this.agent = val;
    },
    billChange(val){
      this.bill = val;
    },
    departureSingle(e){
      e.preventDefault()
      let json = JSON.stringify({
        data: {
          id: this.id,
          weight: this.arrivedWeight,
        },
        contrAgent: this.agent,
        account: this.bill,
      })
      axios.post(departUrl, json, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((id) => {
          if(id.data == 0){
            this.$router.replace({ name: "Sklad",});
          }
          else{
            this.$router.replace({ name: "Sklad",});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    drowCard(){
      setTimeout(() =>
      this.$htmlToPaper("1"), 500
      )
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
  justify-content: space-between;
  position: relative;
  flex-direction: column;
}
.product-info{
  display: flex;
  width: 100%;
}
.function-buttons {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 20%;
}
.function-buttons__button {
  padding: 1rem;
  margin-top: 0.5rem;
  color: var(--color-font-second);
  background-color: var(--color-primary);
  border: 3px solid var(--color-primary);
  border-radius: 0.7rem;
	text-align: center;
  cursor: pointer;
}
.function-buttons__button:hover{
  background-color: var(--font-second);
  color: var(--color-primary);
}
.btn_log{
	position: absolute;
  top: 2rem;
  right: 2rem;
}
table {
  margin-bottom: 20px;
  padding: 20px;
  border: solid var(--color-primary) 2px;
  border-radius: 1.5rem;
  min-width: 35%;
  margin-top: 50px;
  margin-left: 2rem;
}
table th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 3rem 10px 15px;
  font-size: 14px;
  min-width: 20%;
}
table tr {
  min-width: 30%;
}
.shipment__btn {
  width: 100%;
  max-width: 150px;
}
.arrived__btn{
  width: 100%;
  max-width: 150px;
  margin-top: 1rem;
}
.function-buttons__form-input{
  margin-top: 1rem;
}
.print {
  display: none;
  visibility: hidden;
}
</style>