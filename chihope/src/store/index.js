// store.js
import { createStore } from 'vuex';

import mainStore from "@/store/modules/mainStore";
import subtypeStore from "@/store/modules/subtypeStore";
import globalStore from "@/store/modules/globalStore";

export default createStore({
   modules:{
       globalStore,
       mainStore,
       subtypeStore
   }
});
