<template>
  <div class="page-content shipment-history">
    <Loader v-if="this.loading"/>
    <!-- <PrintCard
    :uid="33181"
    id="1"
    class="print"

    /> -->
    <table v-else>
      <thead>
        <tr>
          <th>№</th>
          <th>Номер счёта</th>
          <th>Грузополучатель</th>
          <th>Дата</th>
          <th>Масса</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hist, index) in this.history" @click="redirectHistoryDetailes(hist.id)">
          <td>{{index+1}}</td>
          <td>{{hist.bill}}</td>
          <td>{{hist.contrAgent}}</td>
          <td>{{hist.date}}</td>
          <td>{{hist.mass}}</td>
        </tr>
      </tbody>
    </table>
	</div>
</template>

<script>
// import PrintCard from "@/components/PrintCard";
import Vue from "vue";
import axios from 'axios';
import Loader from "@/components/Loader";

const histUrl = Vue.prototype.$hostname + "/api/history/all";
export default {
  name: 'ShipmentHistory',
  components: {
    // PrintCard
    Loader
  },
  data() {
    return {
      // position: {}
      history: [],
      loading: true
    }
  },
  methods: {
    redirectHistoryDetailes(id){
      this.$router.replace({ name: "HistoryDetailes", params: { id:id } });
    }
  },
  mounted() {
    // setTimeout(() =>
    // this.$htmlToPaper('1'), 500
    // )
    axios(histUrl, {
      method: "GET"
    })
    .then((hists) => { 
      this.history = hists.data;
      this.loading = false;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style scoped>
.shipment-history{
  padding-left: 3rem;
}
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
  font-size: 1.1rem;
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
  font-size: 1.1rem;
  vertical-align: top;
  cursor: pointer;
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
/* .print {
  visibility: hidden;
} */
</style>
