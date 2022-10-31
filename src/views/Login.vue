<template>
  <div class="auth-page">
    <div :class="error ? 'auth-page__container center error_div' : 'auth-page__container center'">
      <img class="auth-page__img" src="../assets/icon.svg" alt="icon">
      <p class="auth-page__title">Авторизация</p>
      <input :class="error ? 'auth-page__login error' : 'auth-page__login'" type="text" v-model="login"
             placeholder="Логин">
      <input :class="error ? 'auth-page__pass error' : 'auth-page__pass'" type="password" v-model="password"
             placeholder="Пароль">
      <button :class="error ? 'btn btn_log_error error' : 'btn btn_log'" type="submit" @ent @click="doLogin">Войти
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      login: '',
      password: '',
      error: false
    }
  },
  methods: {
    doLogin() {
      const authUrl = Vue.prototype.hostname + '/api/v1' + '/auth/login'
      fetch(authUrl, {
        method: 'POST',
        body: JSON.stringify({
          "login": this.login,
          "password": this.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      }).then(json => {
        localStorage.token = json.accessToken;
        localStorage.expired = new Date().getTime()
      }).then(() =>
          this.$router.replace({name: "Sklad"})
      ).catch(() => {
        this.error = true;
        this.$notify({
          type: 'error',
          title: 'Ошибка авторизации',
          text: 'Неверная пара логин-пароль'
        })
        setTimeout(() => this.error = false, 1000)
      });
    }
  },
  mounted() {
    if (localStorage.token) {
      this.$router.replace({name: "Sklad"})
    }
  }
}
</script>

<style scoped>
.auth-page {
  width: 100vw;
  height: 100vh;
}

.auth-page__container {
  width: 90%;
  height: 100%;
  margin: auto;
  flex-direction: column;
  align-items: center;
}

.auth-page__title {
  font-size: 1.5rem;
  margin-top: 2.2rem;
}

input {
  border: 3px solid var(--color-primary);
  color: rgba(0, 0, 0, 0.5);
  background-color: var(--color-side);
}

input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.auth-page__login {
  margin-top: 0.8rem;
  border-radius: 0.7rem 0.7rem 0 0;
}

.error {
  border: 3px solid var(--color-error);
}

.auth-page__pass {
  border-top: none;
  border-radius: 0 0 0.7rem 0.7rem;
}

.btn_log {
  margin-top: 2rem;
}

.btn_log_error {
  margin-top: 2rem;
  background-color: var(--color-error);
}

.error_div {
  -webkit-animation-name: shake;
  -webkit-animation-duration: 0.8s;
  -webkit-animation-iteration-count: 0.5;
  -webkit-animation-timing-function: linear;
  -webkit-transform-origin: 50% 100%;
}

@-webkit-keyframes shake {
  0% {
    -webkit-transform: translate(2px, 1px) rotate(0deg);
  }
  10% {
    -webkit-transform: translate(-1px, -2px) rotate(-2deg);
  }
  20% {
    -webkit-transform: translate(-3px, 0px) rotate(3deg);
  }
  30% {
    -webkit-transform: translate(0px, 2px) rotate(0deg);
  }
  40% {
    -webkit-transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    -webkit-transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    -webkit-transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    -webkit-transform: translate(2px, 1px) rotate(-2deg);
  }
  80% {
    -webkit-transform: translate(-1px, -1px) rotate(4deg);
  }
  90% {
    -webkit-transform: translate(2px, 2px) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(1px, -2px) rotate(-1deg);
  }
}

</style>