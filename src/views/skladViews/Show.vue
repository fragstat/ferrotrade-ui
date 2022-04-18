<template>
  <div class="party-page page-content">
    <div class="party-page__items" v-bind:class="{ 'party-page__items_full': !this.isTableView }">
      <div class="party-page__representation">
        <div class="party-page__view">
          Карточки
          <CastomSwitcher
              class="party-page__view-switcher"
              v-model="isTableView"
          />
          Таблица
        </div>
        <div class="party-page__all-sort"
        v-if="isTableView"
        >
          Сортировать по:
          <CastomSelector
            class="party-page__all-sort-selector"
            :options="sort"
            :selected="selectedSort"
            @select-change="optionSelect"
          />
        </div>

      </div>
      <div>
        <CardList v-if="!isTableView" />
        <PositionTable v-if="isTableView"
        :marks="selectedMarks"
        :packs="selectedPacks"
        :diameter="selectedDiameter"
        :sort="selectedSortValue"
        />
      </div>
    </div>
    <CastomFilter v-if="this.isTableView" class="party-page__filters"
    @sendMarks='sendMarks'
    @sendDiameters='sendDiameters'
    @sendPacks='sendPacks'
    />
  </div>
</template>

<script>
import CardItem from "../../components/CardItem.vue";
import CastomSelector from "../../components/Show/CastomSelector.vue";
import CastomSwitcher from "../../components/Show/CastomSwitcher.vue";
import CastomFilter from "../../components/Show/CastomFilter.vue";
import CardList from "@/components/Show/CardList";
import PositionTable from "@/components/Show/PositionTable";

export default {
  name: "Show",
  components: {
    CardList,
    CardItem,
    CastomSelector,
    CastomSwitcher,
    CastomFilter,
    PositionTable
  },
  data() {
    return {
      sort: [
        { name: "марке", value: "mark" },
        { name: "диаметру", value: "diameter" },
      ],
      selectedSort: "марке",
      selectedSortValue: "mark",
      isTableView: true,
      selectedMarks: [],
      selectedPacks: [],
      selectedDiameter: []
    };
  },
  methods: {
    optionSelect(option) {
      this.selectedSort = option.name
      this.selectedSortValue = option.value
    },
    sendMarks(marks) {
      this.selectedMarks = marks
    },
    sendDiameters(diameters) {
      this.selectedDiameter = diameters
    },
    sendPacks(packs) {
      this.selectedPacks = packs
    },
  },
};
</script>

<style scoped>
.party-page {
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
}
.party-page__items {
  width: 80%;
  position: relative;
}
.party-page__representation {
  position: absolute;
  height: 50px;
  width: 75%;
  top: -50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.5rem;
}
.party-page__items_full {
  width: 100%;
}
.party-page__all-sort {
  width: auto;
  display: flex;
  margin-left: 25px;
  align-items: center;
}
.party-page__all-sort-selector {
  margin-left: 1rem;
}
.party-page__view {
  display: flex;
  align-items: center;
}
.party-page__view-switcher {
  margin: 0 1rem;
}
.party-page__filters {
  width: 18%;
}
</style>
