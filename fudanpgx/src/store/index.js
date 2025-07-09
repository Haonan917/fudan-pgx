import { createStore } from 'vuex'
import memberStore from "@/store/modules/memberStore";
import publicationStore from "@/store/modules/publicationStore";
import alumniStore from "@/store/modules/alumniStore";
import newsStore from "@/store/modules/newsStore";
import shareStore from "@/store/modules/shareStore";
export default createStore({
  modules:{
    memberStore,
    alumniStore,
    publicationStore,
    newsStore,
    shareStore
  }
})
