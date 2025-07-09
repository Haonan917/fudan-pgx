<template>
  <div class="header-wrapper" >
    <div class="header" >
      <div class="container">
        <div class="header-row el-row">
          <div class="el-col-2" >
            <div style="padding-top: 0.1vw;padding-left: 3vw;">
              <a href="./">
                <img :src="logo" alt="HumPoPG-log0" style="width: 6vw;">
              </a>
            </div>
          </div>
          <div class="el-col-22">
            <ul class="nav-items">
              <li class="nav-item" v-for="(item, index) in navItems" :key="index">
                <a  :class="{active: isActive === index}"
                    @click="navClick(index, item)"
                >{{item.text}}</a>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex';

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
      isActive: 0,
      logo:'./logo.png'
    }
  },
  computed: {
    // Map Vuex state to this component's computed properties
    ...mapGetters({
      navActive: 'shareStore/getNavActive'
    })
  },
  watch: {
    // Watch for changes in navActive and update isActive accordingly
    navActive(newVal) {
      this.isActive = newVal;
    },
  },
  methods: {
    ...mapMutations('shareStore', ['SET_NAV_ACTIVE']),
    navClick(index, item) {
      this.isActive = index
      this.$router.push({
        path: item.url
      })
      this.SET_NAV_ACTIVE(index);
    }
  }

};
</script>

<style scoped>
#app, * {
  /*font-family: Helvetica;*/
}

.header-wrapper,
.header {
  box-sizing: border-box;
}

. header-wrapper {
  /*height: 4vw;*/
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
  height:4vw;
  line-height: 4vw;
  width: 100%;
  box-shadow: 0 .125rem .625rem -.1875rem rgba(0, 0, 0, .1);
  position: fixed;
  z-index: 1000;
}

.container {
  height: 100%;
  box-sizing: border-box;
  width: 100vw;
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
  font-size: 1.1vw;
}

.nav-item {
  /*鼠标放上去有出现点击手势*/
  cursor: pointer;
  /*一行内放多个块状元素*/
  display: inline-block;
  /*控制nav bar items之间的间距*/
  margin: 0 0.6vw;
}

.nav-item > a {
  color: #1f80ff;
  font-weight: 650;
  padding: 0.4vw 1vw;
  text-decoration: none;
}

.active {
  background-color: #1f80ff !important;
  color: #fff !important;

  border-radius: 0.3vw
}
</style>