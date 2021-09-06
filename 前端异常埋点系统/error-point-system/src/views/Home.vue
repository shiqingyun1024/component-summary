<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="getImg">
    <!-- <p>{{value}}</p> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

export default class Home extends Vue {
  // data(){
  //   return {
  //      value:'123'
  //   }
  // },
  getImg(){
      throw new Error('错误输出');
  }
}
</script>
