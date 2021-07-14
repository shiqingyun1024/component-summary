<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="downloadFile(posterImg,'海报')">下载海报</button>
    <div class="content_container">
      <vue-canvas-poster  :painting="painting" @success="success" @fail="fail"></vue-canvas-poster>
      <img :src="posterImg" />
    </div>
  </div>
</template>
<script>
// import vueCanvasPoster  from "vue-canvas-poster";

export default {
  components: {
    // vueCanvasPoster,
  },
  data() {
    return {
      posterImg: "", //生成的海报
      painting: {
        width: "1080px",
        height: "2049px",
        background:
          "https://ddcz.oss-cn-beijing.aliyuncs.com/images/file-1587004539522R5oa.png",
        views: [
          {
            type: "image",
            url: require("../images/123.png"),
            css: {
              top: "40px",
              left: "36px",
              borderRadius: "40px",
              width: "80px",
              height: "80px"
            }
          },
          {
            type: "text",
            text: "我的名字",
            css: {
              top: "48px",
              left: "136px",
              width: "360px",
              maxLines: 1,
              fontSize: "26px"
            }
          },
          // 注意，type为二维码的这里放置的是content，一般都是一个链接。不是一张图片。
          {
            type: "qrcode",
            content: "https://blog.csdn.net/inmarry/article/details/105552070",
            css: {
              bottom: "68px",
              right: "68px",
              color: "#000",
              background: "#fff",
              width: "356px",
              height: "356px",
              borderWidth: "15px",
              borderColor: "#fff",
              borderRadius: "2px"
            }
          }
        ]
      }
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
    downloadFile(content, fileName) {
      //下载base64图片
      var base64ToBlob = function(code) {
        let parts = code.split(";base64,");
        let contentType = parts[0].split(":")[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
          type: contentType
        });
      };
      let aLink = document.createElement("a");
      let blob = base64ToBlob(content); //new Blob([content]);
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      aLink.click();
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.content_container {
  width: 1080px;
  height: 2049px;
}
</style>
