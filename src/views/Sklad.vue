<template>
	<div class="container">
		<nav>
			<img class="company-icon" src="../assets/icon.svg" alt="icon" />
			<router-link to="/sklad/Register"
				>Регистрация нескольких продуктов
			</router-link>
			<router-link to="/sklad/Show">Посмотреть все </router-link>
			<router-link to="/sklad/Searching">Поиск</router-link>
      <a class="router-link_disabled" href="#">Поиск по плавке</a>
      <a class="router-link_disabled" href="#">Объединить</a>
			<!-- <router-link to="/sklad/SearchingMelt">Поиск по плавке</router-link> -->
			<!-- <router-link to="/sklad/Unite">Объединить</router-link> -->
			<router-link to="/sklad/Shipment">Отгрузка</router-link>
			<router-link to="/sklad/ShipmentHistory">История отгрузок</router-link>
      <a class="router-link_disabled" href="#">Приёмка</a>
      <a class="router-link_disabled" href="#">Отправка на другой склад</a>
			<!-- <router-link to="/sklad/Admission">Приёмка</router-link> -->
			<!-- <router-link to="/sklad/ShipmentStore">Отправка на другой склад</router-link> -->
		</nav>
		<router-view />
		<button class="btn btn_log" @click="logout">Выйти</button>
	</div>
</template>

<script>
export default {
	name: "Sklad",
	methods: {
		logout(){
			this.$router.replace({ name: "Login" });
		},
	},
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: 100vw;
  height: 100%;
  max-width: 1400px;
  margin: auto;
  padding: 2rem 1rem;
  display: flex;
  position: relative;
}
nav {
  display: flex;
  flex-direction: column;
  width: 20%;
}
.company-icon {
  height: 8rem;
  margin-bottom: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 80%;
}
router-link {
  margin: 32px;
}
a {
  padding: 1rem;
  margin-top: 0.5rem;
  color: var(--color-font-second);
  background-color: var(--color-primary);
  border: 3px solid var(--color-primary);
  border-radius: 0.7rem;
	text-align: center;
}
a.router-link_disabled{
  background-color: var(--color-side-light);
  border: none;
}
.router-link-active {
  background-color: var(--font-second);
  color: var(--color-primary);
}
.btn_log{
	position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>