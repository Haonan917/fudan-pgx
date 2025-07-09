<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="container">
        <div class="header-row el-row">
          <div class="el-col-2">
            <div style="padding-left: 10px;height: 4vw">
              <a href="/">
                <img src="./logo/bar_logo.png" alt="" style="height: 100%;width: auto">
              </a>
            </div>
          </div>
          <div class="el-col-22">
            <ul class="nav-items">
              <li class="nav-item" v-for="(item, index) in navItems" :key="index">
                <a
                    :class="{active: isActive === index}"
                    @click="navClick(index, item)"
                >{{item.text}}</a>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </div>
<!--    <div style="width: 100%;height: 70px;padding: 0;margin: 0;background-color:#42b983">-->
<!--    </div>-->
  </div>
</template>

<script>


export default {
  name:'NavBar',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    navClick(index, item) {
      this.isActive = index
      this.$router.push({
        path: item.url
      })
    }
  }

};
</script>

<style scoped>
.header-wrapper,
.header {
  box-sizing: border-box;
  margin-bottom: 4vw;
}

. header-wrapper {
  height: 4vw;
  background-color: #42b983;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 999;
}

.header {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  height: 4vw;
  line-height: 4vw;
  width: 100%;
  box-shadow: 0 .125rem .625rem -.1875rem rgba(0, 0, 0, .1);
  position: fixed;
  z-index: 1000;
}

.container {
  height: 100%;
  box-sizing: border-box;
  width: 1200px;
  display: block;
  margin: auto;
  text-align: center;
}

.nav-items {
  height: 100%;
  background: transparent;
  padding: 0;
  margin: 0;
  display: block;
  /*控制nav bar items是整体靠哪一边*/
  text-align: center;
  list-style-type: disc;
  font-size: 15px;
}

.nav-item {
  /*鼠标放上去有出现点击手势*/
  cursor: pointer;
  /*一行内放多个块状元素*/
  display: inline-block;
  /*控制nav bar items之间的间距*/
  margin: 0 2vw;
}

.nav-item > a {
  color: #1f80ff;
  font-weight: 650;
  padding: 4px 10px;
  text-decoration: none;
}

.active {
  background-color: #1f80ff !important;
  color: #fff !important;
  border-radius: 3px
}
</style>