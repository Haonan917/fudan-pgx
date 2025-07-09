<template>
  <div>
    <v-app-bar  dark  style="opacity: 1;">
      <img src="./Logo/bar_logo.png" alt="Logo" style="height: 120%;margin-left: 3vw" />
      <v-spacer></v-spacer>
      <!-- Home Button -->
      <v-btn :to="'/home'"  class="menu-btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span>Home</span>
      </v-btn>

      <!-- About Button  -->
      <v-menu offset-y open-on-hover open-delay="0" id="about">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" :height="style.appBarHeight" class="menu-btn">
            <svg class="icon" aria-hidden="true" >
              <use xlink:href="#icon-about"></use>
            </svg>
            <span >About</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in about_items"
              :key="index"
              :value="index"
              @click="goToAbout(item)"
              style="font-size: small"
          >
            <svg class="icon" aria-hidden="true" style="padding-top: 0.6vw">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span style="margin-left: 1.2vw;font-size: 1vw">{{ item.title }}</span>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Project Dropdown -->
      <v-menu offset-y open-on-hover open-delay="0" id="project">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" :height="style.appBarHeight" class="menu-btn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-research1"></use>
            </svg>
            <span >Studies</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in project_items"
              :key="index"
              :value="index"
              :to="item.url"
              style="font-size: small"
          >
            <svg class="icon" aria-hidden="true" style="padding-top: 0.6vw">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span style="margin-left: 1.2vw;font-size: 1vw">{{ item.title }}</span>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text :to="'/data'" :height="style.appBarHeight" class="menu-btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-database"></use>
        </svg>
        <span >Data</span>
      </v-btn>
      <!-- FAQs Button -->
      <v-btn text :to="'/faqs'" :height="style.appBarHeight" class="menu-btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fankuifaqs"></use>
        </svg>
        <span >FAQs</span>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- Search input -->

<!--      <v-text-field-->
<!--          flat-->
<!--          solo-inverted-->
<!--          hide-details-->
<!--          v-model="searchText"-->
<!--          label="Search"-->
<!--          prepend-inner-icon="mdi-magnify"-->
<!--          append-outer-icon="mdi-keyboard"-->
<!--          class="custom-search"-->
<!--          @focus="dialog = true"-->
<!--      ></v-text-field>-->



      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">Search Dialog</v-card-title>
          <v-card-text style="height: 50vh">
<!--            <el-autocomplete-->
<!--                v-model="searchText"-->
<!--                :fetch-suggestions="querySearch"-->
<!--                popper-class="my-autocomplete"-->
<!--                placeholder="Please input"-->
<!--                @select="handleSelect"-->

<!--            >-->
<!--              <template #prefix>-->
<!--                <svg class="icon" aria-hidden="true">-->
<!--                  <use xlink:href="#icon-Edge"></use>-->
<!--                </svg>-->
<!--              </template>-->
<!--              <template #default="{ item }">-->
<!--                <div class="value">{{ item.value }}</div>-->

<!--              </template>-->
<!--            </el-autocomplete>-->
            <v-autocomplete
                :clearable="true"
                v-model="searchText"
                :items="mockData"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                :active="true"
                :autofocus="true"
                :auto-select-first="true"
                :base-color="'rgb(255,0,0)'"
                :bg-color="'rgb(255,255,255)'"
                :center-affix="false"
                :chips="true"
                :closable-chips="true"
                :error="false"
                close-text="close"
                direction="horizontal"
                :custom-filter="filterFunction"
                :filter-keys="['title','value']"
                filter-mode="union"
                :focused="true"
                :hide-details="true"
                :hide-no-data="false"
                :hide-spin-buttons="true"
                :hide-selected="true"
                hint="this is a hint"
                :loading="true"
                :item-color="'rgb(255,0,0,0.5)'"
                menu-icon="mdi-github"
                @update:focused="true"
            >
              <template v-slot:item="{item,  props}">
                <v-list-item v-bind="props">{{item.value}}</v-list-item>
              </template>
            </v-autocomplete>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Github icon with tooltip -->
<!--      <v-tooltip bottom>-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--&lt;!&ndash;          <v-btn icon :v-bind="attrs" v-on="on" @click="GlobalSearch">&ndash;&gt;-->
<!--&lt;!&ndash;            <v-icon>mdi-magnify</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;          </v-btn>&ndash;&gt;-->

<!--          <v-btn icon :href="'https://github.com/biovis-report'" v-bind="attrs" v-on="on">-->
<!--            <v-icon>mdi-github</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <span>Visit our GitHub</span>-->
<!--      </v-tooltip>-->
    </v-app-bar>

<!--    <NavBar :nav-items="navItems"></NavBar>-->
<!--    <v-main>-->
    <div style="margin-top: 5vw">
      <router-view></router-view>
    </div>
<!--    </v-main>-->
  </div>
</template>

<script>
// import NavBar from "@/components/NavBars/NavBar";
export default {
  name: "MainPage",
  components:{
    // NavBar
  },
  computed:{

  },
  data: () => ({
    dialog: false,
    searchText:'',
    navItems: [
      {text: 'Home', url: '/home'},
      {text: 'About', url: '/about'},
      {text: 'Study', url: '/project'},
      {text: 'Data', url: '/data'},
      {text: 'FAQ', url: '/faqs'},

    ],
    mockData1: [
      'Apple',
      'Banana',
      'Cherry',

    ],
    style: {
      appBarHeight: 55
    },
    about_items: [
      { title: 'Drug', icon: '#icon-Pill', url: '/about', id: '#drug', name: 'about' },
      { title: 'Cohort', icon: '#icon-paidui1', url: '/about', id: '#cohort', name: 'about' },
      { title: 'Omics', icon: '#icon-a-MolecularBiology', url: '/about', id: '#omics', name: 'about' },
      { title: 'Our Team', icon: '#icon-team', url: '/about', id: '#team', name: 'about' },
    ],
    project_items: [
      { title: 'Drug treatment', icon: '#icon-Pill', url: '/project/main/study' },
      { title: 'Diabetes subgroups', icon: '#icon-people-group1', url: '/project/subtype/study' },
      { title: 'Predictive models', icon: '#icon-chart-area', url: '/project/models/study' },
      { title: 'Functional validation', icon: '#icon-target', url: '/project/target/study' },
    ],
  }),
  methods: {
    goToAbout(item) {
      this.$router.push({
        path: item.url,
        query: {
          location: item.id
        }
      })
    },
    filterFunction(value, query){
      if (value.includes(query)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

.menu-btn {
  background-color: white;
  color: #000000;
  border-radius: 0; /* 调整按钮的底部圆角 */
  box-shadow: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1.1vw;
  width: 10vw !important;
  max-width: 10vw !important;
  min-width: 10vw !important;
  height:5vw;
}
.menu-btn:hover {
  background-color: #ffffff;
  color: #409eff;
  border-bottom: 0.2vw solid #409eff;
}

>>> .v-toolbar{
  height: 5vw !important;
}

>>> .v-toolbar__content{
  height: 5vw !important;
}
>>> .v-btn{
  height: 5vw !important;
  top: 0% !important;
}

#about >>> .v-list{
  width:11vw;
  padding-top: 1vw !important;
  padding-bottom: 1vw !important;
}
#project >>> .v-list{
  width:16vw;
  padding-top: 1vw !important;
  padding-bottom: 1vw !important;
}

>>> .v-list-item {
  line-height:3vw !important;
  height: 3vw !important;
  min-height: 3vw !important;
  font-size: 1.5vw !important;
  padding: 1vw 2vw !important;
}



</style>
