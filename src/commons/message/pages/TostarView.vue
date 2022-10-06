
<template>
    <AppTostar v-if=" show === true" :progress="progress" :value="value"  @emitTostarTime="counterBack" @emitTostarRemove="removeTostar" />
</template>

<script setup>
import { createApp, ref,reactive, computed, onMounted, inject, onBeforeMount, onUnmounted } from 'vue';
import AppTostar from '../components/TostarComponent.vue';
const tostarData = inject('tostarData');//array
const show = ref(tostarData.value[0]);
const time = ref(0);
//props progress bar
const count = ref(0);
const value = ref(0);
const app = createApp({});
    app
      .component('AppTostar', AppTostar)


  const counterBack = () => {
    if ( count.value < 400 ){
        count.value += 100;
        const progress = ref(count.value);
        value.value += 25;
        time.value = setTimeout(() => {counterBack()}, 1000);
    }else{
        clearTimeout(time.value);
        count.value = 0;
        deleteTostarWithTime();
    }
  };
  
  onBeforeMount( () => {
    clearTimeout(time.value);
  });

  const  deleteTostarWithTime =() =>{
    let tostarContainer = document.querySelector(".tostar-container");
    if(tostarContainer !== null){
      tostarContainer.remove();
    }
  };
  const removeTostar = (ev) =>{
    let nodeTostar = ev.target.parentElement.parentElement.parentElement;
    if(nodeTostar !== null){
      nodeTostar.remove();
    }
  }; 

</script>

<style scoped>

</style>

