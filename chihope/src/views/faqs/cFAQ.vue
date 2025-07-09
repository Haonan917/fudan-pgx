<template>
  <div style="width: 100%;background-color: #f0f2f5;min-height: 100vh;height: auto">
      <div style="margin: 0 10vw;background-color: white;min-height: 100vh;padding: 0 5vw">
        <div class="el-row">
          <div class="el-col-24" style="text-align: center;margin: 2vw 0;">
            <h2>Commit issues</h2>
          </div>
          <div class="el-col-12" style="text-align: left;margin: 1vw 0;">
            <h3 class="form-title">Add a title</h3>
            <el-input class="form-input" v-model="form.title" placeholder="Title"></el-input>
          </div>
          <div class="el-col-12" style="text-align: left;margin: 1vw 0;">
            <h3 class="form-title">Add a name</h3>
            <el-input class="form-input" v-model="form.name" placeholder="Name"></el-input>
          </div>
          <div class="el-col-12" style="text-align: left;margin: 1vw 0;">
            <h3 class="form-title">Add an institution</h3>
            <el-input class="form-input" v-model="form.institution" placeholder="Institution"></el-input>
          </div>

          <div class="el-col-12" style="text-align: left;margin: 1vw 0;">
            <h3 class="form-title">Add an email</h3>
            <el-input class="form-input" v-model="form.email" placeholder="Email"></el-input>
          </div>

          <div class="el-col-24" style="text-align: left;margin: 1vw 0;">
            <h3 style="margin-bottom: 0.8vw" class="form-title">Add a description</h3>
            <QuillEditor
                v-model:content="form.content"
                contentType="text"
                theme="snow"
                toolbar="full"
                style="height: 18vw"  />
          </div>
          <div class="el-col-24" style="text-align: center;margin: 3vw 0;">
            <el-button type="primary" @click="handleSubmit">Submit new issue</el-button>
          </div>


        </div>
      </div>
  </div>
</template>

<script>
// https://www.emailjs.com/docs/sdk/options/
import * as emailjs from "@emailjs/browser";

(function(){
  emailjs.init({
    publicKey: "CBUcHxCEjJZTLpoB6",
  });
})();
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {ElMessage} from "element-plus";
export default {
  name: "cFAQ",
  components:{
    QuillEditor
  },
  data() {
    return {
      form: {
        title:'',
        name:'',
        institution:'',
        email:'',
        content:''
      },
      serviceID:'service_7xcppkm',
      templateID:'template_msqkdvw'
    }
  },

  methods:{
    handleSubmit(){
      emailjs.send(this.serviceID, this.templateID, this.form);

      this.form = {
        title:'',
        name:'',
        institution:'',
        email:'',
        content:''
      }
      ElMessage({
        message: 'Sending successfully',
        type: 'success',
      })

    }
  }
}
</script>

<style scoped>
.form-title {
  margin-bottom: 0.8vw;
  font-size: 1.5vw
}

.form-input {
  width: 30vw;
  height: 3.2vw;
  font-size: 1.4vw;
  line-height: 3.2vw
}

>>>.el-input__wrapper{
  padding: 0.1vw 1vw !important;
}

>>>.el-input{
  --el-input-border-radius:0.2vw !important;
  --el-border-width:0.1vw !important
}
</style>