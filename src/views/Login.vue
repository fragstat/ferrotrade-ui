<template>
	<div class="auth-page">
		<div class="auth-page__container center">
			<img class="auth-page__img" src="../assets/icon.svg" alt="icon">
			<p class="auth-page__title">Авторизация</p>
			<input class="auth-page__login" type="text" placeholder="Логин">
			<input class="auth-page__pass" type="password" placeholder="Пароль">
			<button class="btn btn_log" type="submit" @click="login">Войти</button>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		login(){
			this.$router.replace({ name: "Sklad" });
		}
	},

}
</script>

<style scoped>
.auth-page{
	width: 100vw;
	height: 100vh;
}
.auth-page__container{
	width: 90%;
	height: 100%;
	margin: auto;
	flex-direction: column;
	align-items: center;
}
.auth-page__title{
	font-size: 1.5rem;
	margin-top: 2.2rem;
}
input{
	border: 3px solid var(--color-primary);
	color: rgba(0, 0, 0, 0.5);
	background-color: var(--color-side);
}
input::placeholder{
	color: rgba(0, 0, 0, 0.5);
}
.auth-page__login{
	margin-top: 0.8rem;
	border-radius: 0.7rem 0.7rem 0 0;
}
.auth-page__pass{
	border-top: none;
	border-radius: 0 0 0.7rem 0.7rem;
}
.btn_log{
	margin-top: 2rem;
}
</style>