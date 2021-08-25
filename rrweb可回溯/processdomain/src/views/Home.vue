<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  created(){
    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_URL);
    console.log(process.env.oss);
  }
}
</script>
