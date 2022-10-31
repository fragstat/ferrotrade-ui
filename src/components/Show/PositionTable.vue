<template>
  <div>
    <Loader v-if="!loaded"/>
    <p v-else-if="filterTable.length === 0">Ничего не найдено!</p>
    <table v-else>
     <thead>
      <tr>
        <th>Марка</th>
        <th>Диаметр</th>
        <th>Упаковка</th>
        <th>Солнечногорск</th>
        <th>Белорецк(Склад)</th>
        <th>Белорецк(Произ-во)</th>
      </tr>
     </thead>
      <tbody>
        <PositionTableRow
            v-for="row of filterTable"
            v-bind:position="row"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import PositionTableRow from "@/components/Show/PositionTableRow";
import Loader from "@/components/Loader";
import Vue from "vue";

const url = Vue.prototype.hostname + '/api/v1/filter/table'

export default {
  name: "PositionTable",
  components: {
    PositionTableRow, Loader
  },
  props: {
    marks : {
      type: Array
    },
    packs : {
      type: Array
    },
    diameter : {
      type: Array
    },
    sort : {
      type : String
    }
  },
  data() {
    return {
      rows: [],
      loaded: false
    }
  },
  mounted() {
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.token
      }
    })
        .then(response => response.json())
        .then(json => {
          this.rows = json
          this.loaded = true
    }).catch(err => console.log(err))
  },
  computed: {
    filterTable() {
      const newArr =  this.rows.filter(p => this.marks.includes(p.mark))
          .filter(p => this.packs.includes(p.packing))
          .filter(p => p.diameter > this.diameter[0] && p.diameter < this.diameter[1])
      if (this.sort === 'diameter') {
        return newArr.sort((a, b) => b.diameter - a.diameter)
      }
      return newArr.sort((a, b) => {
          if (a.mark === b.mark) {
            return b.diameter - a.diameter
          } else {
            return a.mark > b.mark
          }
      })
    }
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
</style>