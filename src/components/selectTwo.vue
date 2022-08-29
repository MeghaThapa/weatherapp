<template>

  <VueMultiselect 
    :loading="data.loading"
    :preserve-search="true"
     label="name"
     @search-change ="searchHandel"
      v-model="selected"
      :option-limit="100"
      :options="searchData">
      
    </VueMultiselect>
</template>

<script setup>
 import { emptyStatement } from '@babel/types';
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import VueMultiselect from 'vue-multiselect'
import search from "../composibleapi/search"

const{searchData, searchRequest}=search();
  const emit =defineEmits(['selected']);

    const data=reactive({
        // selected: {},
        options: [],
        loading: false,
    })

    const selected = ref({});
    
    const searchHandel = (input)=>{ 
      if (input!=""){
        data.loading=true;
        searchRequest(input);
       }
    } 
    watch(selected, () =>{
      // console.log(selected.value);
      emit('selected',selected.value);
    })
    watch(searchData,() =>{
      data.loading=false;
    })

   
</script>

<style src="vue-multiselect/dist/vue-multiselect.css">
 
</style>