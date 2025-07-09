<template>
    <NavBar :nav-items="navItems"></NavBar>
    <div style="width: 100%;">
      <router-view></router-view>
    </div>
</template>
<script>
import NavBar from "@/components/NavBars/NavBar";
import {  mapActions} from 'vuex';

window.ResizeObserver = class ResizeObserver extends window.ResizeObserver {
  constructor(callback) {
    let timer = null;
    const debouncedCallback = function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, 16);
    };
    super(debouncedCallback);
  }
}

export default {
  components:{
    NavBar
  },
  data() {
    return {
      navItems: [
        {text: 'Home', url: '/home'},
        {text: 'Project', url: '/project'},
        {text: 'Publication', url: '/publication'},
        {text: 'Collaboration', url: '/collaboration'},
        {text: 'Members', url: '/member'},
        {text: 'News', url: '/news'},
        {text: 'About', url: '/about'},
      ]
    }
  },
  methods:{
    ...mapActions('publicationStore', ['fetchPublications', 'fetchPublicationsFromJson']),
    ...mapActions('memberStore', ['fetchMembers', 'fetchMembersFromJson']),
    ...mapActions('alumniStore', ['fetchAlumnis', 'fetchAlumnisFromJson']),
    ...mapActions('newsStore', ['fetchNewsFromJson']),
    // loadPublications() {
    //   this.fetchPublications();
    // },
    // loadMembers(){
    //   this.fetchMembers()
    // },
    loadPublicationsFromJson() {
      console.log('loadPublicationsFromJson');
      this.fetchPublicationsFromJson();
    },

    loadMembersFromJson(){
      console.log('loadMembersFromJson');
      this.fetchMembersFromJson()
    },

    loadAlumnisFromJson(){
      console.log('loadAlumnisFromJson');
      this.fetchAlumnisFromJson()
    },
    loadNewsFromJson(){
      console.log('loadNewsFromJson');
      this.fetchNewsFromJson()
    },


  },
  async mounted() {
    this.loadPublicationsFromJson()
    this.loadMembersFromJson()
    this.loadNewsFromJson()
    this.loadAlumnisFromJson()





    // this.loadPublications()
    // this.loadMembers()
    // this.loadAlumnis()
  }
};
</script>
<style scoped>
body {
  perspective: 2000px; perspective-origin: 50% -100%;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container-wrapper{
  /*padding-top: 70px;*/
  /*padding-bottom: 40px;*/
  /*background-color: rgb(244, 245, 245);*/
  min-height: 100vh;
}




</style>
