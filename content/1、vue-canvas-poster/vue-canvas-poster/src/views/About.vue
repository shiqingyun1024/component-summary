<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="content_container">
      <vue-canvas-poster
        :widthPixels="1000"
        :painting="painting"
        @success="success"
        @fail="fail"
      ></vue-canvas-poster>
      <img :src="posterImg" />
    </div>
  </div>
</template>
<script>
import vueCanvasPoster  from "vue-canvas-poster";

export default {
  components: {
    vueCanvasPoster,
  },
  data() {
    return {
      posterImg: "", //生成的海报
      painting: {
        width: "550px",
        height: "876px",
        background:
          "https://ddcz.oss-cn-beijing.aliyuncs.com/images/file-1587004539522R5oa.png",
        views: [
          {
            type: "image",
            url: require('../images/123.png'),
            css: {
              top: "20px",
              left: "36px",
              borderRadius: "40px",
              width: "80px",
              height: "80px",
            },
          },
          {
            type: "text",
            text: "我的名字",
            css: {
              top: "48px",
              left: "136px",
              width: "360px",
              maxLines: 1,
              fontSize: "26px",
            },
          },
          {
            type: "qrcode",
            content:require('../images/qrcode.png'),
            css: {
              bottom: "50px",
              right: "26px",
              color: "#000",
              background: "#fff",
              width: "130px",
              height: "130px",
              borderWidth: "10px",
              borderColor: "#fff",
            },
          },
        ],
      },
    };
  },
  methods: {
    //成功生成海报
    success(src) {
      this.posterImg = src;
      console.log(src);
    },
    fail(err) {
      alert(err);
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
