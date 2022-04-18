<template>
  <div>
    <div class="container">
      <div class="history-info">
        <div class="history-info__bill">Счет: {{this.history.bill}}</div>
        <div class="history-info__contragent">Агент: {{this.history.contrAgent}}</div>
        <div class="history-info__date">Дата: {{this.history.date}}</div>
      </div>
      <CardList :positions="this.history.positions"/>
      <button class="btn btn_log" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import CardList from "@/components/HistoryDetailes/HistCardList.vue";

const histUrl = Vue.prototype.$hostname + "/api/history/departure";
export default {
    name: "HistoryDetailes",
    components:{
      CardList
    },
    data(){
      return{
        id: 0,
        history: {}
      }
    },
    mounted(){
      this.id = this.$route.params.id;
      console.log(histUrl);
      axios(histUrl +"/"+ this.$route.params.id, {
        method: "GET",
      })
      .then((hists) => { 
        this.history = hists.data;
        console.log(this.history);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    methods: {
      logout(){
        this.$router.replace({ name: "Login" });
      },
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
  flex-direction: column;
  position: relative;
}
.history-info{
  margin-top: 4rem;
  margin-bottom: 2rem;
}
.btn_log{
	position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>