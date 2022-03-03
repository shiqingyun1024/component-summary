<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <hello2 ref=“hello” msg="Welcome to Your Vue.js App"/>
    <!-- <hello3 ref=“hello2” msg="Welcome to Your Vue.js App"/> -->
    <el-button @click="handleUpload" type="primary" class="btn"> 上传文件 </el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import hello2 from '@/components/hello2.vue'
// import hello3 from '@/components/hello3.vue'
import { ref,onMounted } from 'vue'

export default {
  name: 'Home',
  components: {
    hello2,
    // hello3
  },
  setup(context){
    const hello = ref(null)
    const handleUpload = () => {
      hello.value.increment();
    }

    onMounted(() => {
      console.log(hello.value);
      console.log("-------自定义--------");
      console.log(context.$selfvm);
      // comp-a 调用 expose 之后, 父组件 ref 拿到的结果为调用 expose 时的参数。而不再是组件实例了
      // hello.value.increment();
    })

    // 创建上传视频的元素,并触发相应的上传事件 
    const createInput=()=>{
      let btn = document.getElementsByClassName('btn')[0];
      if(document.getElementById('videoUpload')) return;
      let inputDom = document.createElement('input');
      inputDom.setAttribute('id','videoUpload');
      inputDom.setAttribute('type','file');
      
      inputDom.setAttribute('accept','video/*');
      // iOS最遵守HTML5规范，其次是X5内核，安卓的webview基本忽略了capture。
      // 理想情况下应该按照如下开发webview：
      // 1. 当accept=”image/*”时，capture=”user”调用前置照相机，capture=”其他值”，调用后置照相机
      // 2. 当accept=”video/*”时，capture=”user”调用前置录像机，capture=”其他值”，调用后置录像机
      // 3. 当accept=”image/*,video/*”，capture=”user”调用前置摄像头，capture=”其他值”，调用后置摄像头，默认照相，可切换录像
      // 4. 当accept=”audio/*”时，capture=”放空或者任意值”，调用录音机
      // 5. 当input没有capture时，根据accppt类型给出文件夹选项以及摄像头或者录音机选项
      // 6. input含有multiple时访问文件夹可勾选多文件，调用系统摄像头或者录音机都只是单文件
      // 7. 无multiple时都只能单文件
      // accept 属性只能与 <input type="file"> 配合使用。它规定能够通过文件上传进行提交的文件类型。
      // 提示：请避免使用该属性。应该在服务器端验证文件上传。
      
      inputDom.setAttribute('capture','user');
      // capture 属性用于调用设备的摄像头或麦克风
      // 当 accept = ‘audio/video’ 时，capture的值只有俩种
      // 一种是 user，用于调用面向人脸的摄像头（例如手机前置摄像头）
      // 一种是 environment，用于调用环境摄像头（例如手机后置摄像头）
      // 当 accept = 'audio’时，只要有capture就调用设备麦克风，忽略user和environment值

      inputDom.classList.add("input");
      //  classList 属性返回元素的类名，作为 DOMTokenList 对象。
      //  该属性用于在元素中添加，移除及切换 CSS 类。
      //  classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。
      // 1.target.classList.add("className")/remove("className")可以对目标元素增加一个类或者删除一个类
      // 2.target.classList.toggle.("className")可以相当于跟classList增加一个目标类的开关一样，
      // 原本有目标类的经过这个方法或删除，原本没有的经过这个方法的会增加目标类
      
      inputDom.style.opacity = 0;
      inputDom.style.position = "absolute";
      inputDom.style.top = 0;
      inputDom.style.left = 0;
      inputDom.style.width = "100%";
      inputDom.style.height = "100%";
      inputDom.onchange = this.startVideoUpload;
      inputDom.onclick = this.clickInput;
      btn?btn.appendChild(inputDom):'';
      document.getElementById("videoUpload").click();
    }

    const clearInputDom = ()=>{
      let videoUpload = document.getElementById("videoUpload");
      videoUpload && videoUpload.remove();
    }

    const clickInput = ()=>{
      console.log()
    }

    return {
      hello,
      handleUpload
    }
  }
}
</script>
