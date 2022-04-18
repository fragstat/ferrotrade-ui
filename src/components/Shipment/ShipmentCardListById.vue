<template>
    <div class="positions-list">
        <CardItem v-for="pos in this.positions" :position="pos" :key="pos.id"/>
    </div>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import Vue from 'vue';
import axios from "axios";

const idCardUrl = Vue.prototype.$hostname + "/api/getById";
export default {
    name: "ShipmentCardListById",
    components: {
        CardItem
    },
    data(){
        return{
            positions: [],
        }
    },
    props: {
        positionsId: Array,
    },
    mounted(){
        for(let i = 0; i < this.positionsId.length; i++){
            console.log(this.positionsId[i]);
            axios(idCardUrl + "/" + this.positionsId[i], {
                method: "GET"
            })
                .then((position) => {
                    this.positions.push(position.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        console.log(this.positionsId);
    }
    
}
</script>

<style scoped>
.positions-list{
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}
</style>