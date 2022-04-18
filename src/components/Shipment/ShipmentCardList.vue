<template>
    <div class="positions-list">
        <ShipmentPosition v-for="pos in this.positions" :addPosition="pos" :key="pos.id" @change-mass="changeMass"/>
    </div>
</template>

<script>
import ShipmentPosition from "@/components/Shipment/ShipmentPositionCard.vue";
export default {
    name: "ShipmentPositionCard",
    components: {
        ShipmentPosition
    },
    props: {
        positions: Array,
    },
    methods:{
        changeMass(id, mass){
            this.$emit('change-mass', id, mass);
        }
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