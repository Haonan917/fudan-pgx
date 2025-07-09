<template>
  <v-row class="align-center justify-center">
    <v-col cols="2">
      <v-select
          hide-details
          v-model="selectedKey"
          :items="keys"
          label=""
          variant="outlined"
          placeholder="Choose key"
          @update:modelValue="updateSelect"
      ></v-select>
    </v-col>
    <v-col cols="7">
      <v-combobox
          hide-details
          clearable
          chips
          label="Molecular"
          v-model="molecularInput"
          :items="filteredItems"
          variant="outlined"
          :placeholder="placeholder"
          no-data-text="No matching items"
      >
      </v-combobox>

    </v-col>
    <v-col cols="3" class="d-flex align-center justify-center">
      <v-btn @click="search" color="primary">
        <span style="font-size: 1.1vw;">Search</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MolecularSearch',
  props:{
    items: {
      type: Array,
      required: true
    },
    keys: {
      type: Array,
      required: true
    },
    initKey: {
      type: String,
    },
    placeholder: {
      type: String,
      default:'Type to search'
    }
  },
  data() {
    return {
      selectedKey:null,
      molecularInput: null,
      menuProps: {
        "closeOnClick":false,
        "closeOnContentClick":true,
        "openOnClick":false,
        "maxHeight":300}
    };
  },
  computed:{
    filteredItems(){
      const key = this.selectedKey;
      if (!key) return [];
      console.log(this.items)
      let result = this.items.map(item => item[key])
          .filter(value => value !== null && value !== undefined && value !== '');
      return result
    }
  },
  methods: {
    search() {
      let object = {
        "key": this.selectedKey,
        "value": this.molecularInput
      }
      this.$emit('childClick',object);
      // this.molecularInput = null
    },

    updateSelect(){
      this.$emit('childSelect',this.selectedKey);
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.initKey!==null){
        this.selectedKey = this.initKey
      }
    });
  }
};
</script>

<style scoped>
/* 你可以根据需要添加样式 */



>>> .v-btn{
  height: 3vw !important;
  line-height: 3vw !important;
  padding: 0vw 1vw !important;
  max-width: 8vw !important;
  min-width: 8vw !important;
  border-radius: 0.2vw !important;
  margin: 0 !important;
  letter-spacing: 0.2vw !important;
}
</style>
