<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Тип</th>
          <th>Дата</th>
          <th>Место</th>
          <th>Работник</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(history, index) in this.histories">
          <td>{{index+1}}</td>
          <td>{{history.type}}</td>
          <td>{{history.date}}</td>
          <td>{{history.place}}</td>
          <td>{{history.user}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";

const histUrl = Vue.prototype.$hostname + "/api/history/allById";

export default {
  name: "ProductTable",
  props: {
    id: Number
  },
  data(){
    return{
      histories: []
    }
  },
  mounted(){
    axios(histUrl + "/" + this.id, {
        method: "GET",
        params: {
          id: this.id
        }
      })
      .then((hists) => { 
        this.histories = hists.data;
        for(let index = 0; index < this.histories.length; index++){
          switch(this.histories[index].type){
            case 'ADDING':
              this.histories[index].type = "Добавление";
              break;
            case 'OTGRUZKA':
              this.histories[index].type = "Отгрузка";
              break;
          }
          switch(this.histories[index].place){
            case 'SOLNECHNOGORSK':
              this.histories[index].place = "Солнечногорск";
              break;
            case 'UNKNOWN':
              this.histories[index].place = "Нет";
              break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
table thead th {
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 10px 15px;
  background: #d8d8d8;
  font-size:1.1rem;
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
  font-size: 1.2rem;
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
</style>