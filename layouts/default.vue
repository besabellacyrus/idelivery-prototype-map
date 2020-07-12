<template>
  <Nuxt />
</template>
<script>
export default {}
</script>

<style lang="scss">
/* @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css'; */

html {
  font-family: RobotoRegular, 'Helvetica Neue', Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.container {
  @apply flex justify-center items-center text-center mx-auto;
  max-width: 425px;
  background-color: #e3e3e3;
}
.app-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
</style>
