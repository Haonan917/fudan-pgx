<template>
  <div class="member-wrapper" @click="memberClick">
    <div class="member-container" >
      <el-row>
        <el-col :span="9">
          <img :src="image" class="member-image" />
        </el-col>
<!--        <el-col :span="1">-->

<!--        </el-col>-->
        <el-col :span="15">
          <div class="member-info">
            <h4 class="member-name">{{ name }}</h4>
            <p class="member-title">{{ title }}</p>
            <!--          <p style="opacity: 0.7;">{{ department }}</p>-->

            <p class="member-department">{{department}}</p>

            <p class="member-institution">{{ institution }}</p>

            <p class="member-email">
<!--              <span><strong>Email:</strong></span>-->
              <el-link type="primary" :underline="false" >{{ email }}</el-link>
            </p>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="member-footer">
      <p class="member-interests">
        <strong>Research Interests: </strong>{{ researchInterests }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberCard',
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    researchInterests: {
      type: String,
      required: true
    }
  },
  methods:{
    memberClick() {
      let object = {
        id: this.name
      }

      this.$emit('memberClick', object)
    }
  }
}
</script>

<style scoped>
#app, * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.member-wrapper {
  margin: 20px 20px;
  cursor: pointer;
  border-bottom: 1px solid rgba(151, 151, 151, 0.1);
}

.member-wrapper:hover{
  background-color: #f9fafa;
}

.member-container{
  max-height: 200px;
  min-height: 200px;

}

.member-info{
  padding: 0px 20px;
  text-align: left;
}

.member-footer{
  padding: 0px 0px;
  max-height:70px;
  min-height: 70px;

  font-size: 14px;
  text-align: justify;
}

.member-interests {
  padding-top: 15px;
  opacity: 0.8;
  font-size: 12px;
}
.member-image {
  width: 100%;
  min-height: 170px;
  max-height: 200px;
}

.member-department {
  margin-top: 10px;
  color: rgb(96, 98, 102);
  font-size: 12px;
  text-align: justify;
}
.member-institution {
  opacity: 0.9;
  margin-top: 10px;
  font-size: 14px;
}

.member-email{
  margin-top: 10px;
  font-size: 12px;
}



.member-name{

}

.member-title{
  font-style: italic;
  opacity: 0.8;
  font-size:14px;
  margin-top: 10px;
}

.member-card {
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #efeeee;
}



.research-interests {
  font-size: 1vw;
}

.email-link {
  color: #2A7C92; /* Set the link color to #2A7C92 */
  text-decoration: none; /* Remove underline if necessary */
}

.email-link:hover {
  text-decoration: underline; /* Add underline on hover */
}
</style>
