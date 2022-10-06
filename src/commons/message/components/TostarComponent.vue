
<template>
  <div class="tostar-container">
    <v-alert  class=" headline-medium"  border="start" density="default" :type="typeTostar" >
        {{message}}
        <v-btn class="tostar-btn" @click="removeTostar"></v-btn>
    </v-alert>
    <v-progress-linear class="progress"
      height="8"
      v-model="progressData.value"
      :color="colorProgress"
      :buffer-value="progress"
      striped>
    </v-progress-linear>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, inject } from 'vue';
  const tostarData = inject('tostarData');//array
  const message = ref(tostarData.value[1].message);
  const typeTostar = ref(tostarData.value[1].type);
  const progressData = defineProps({
    progress : Number,
    value : Number
  });
  const emits = defineEmits(['emitTostarRemove','emitTostarTime']);
  const removeTostar = (event) => {
      try{
        emits('emitTostarRemove', event);          
      }catch(err){
        console.log(err);
      }
  };
  const colorProgress = computed(() => {
      if(typeTostar.value === 'success'){
        return 'light-green';
      }else if(typeTostar.value === 'warning'){
        return 'deep-orange';
      }else if(typeTostar.value === 'error'){
        return 'red darken-2';
      }else if(typeTostar.value === 'info'){
        return 'light-blue';
      }else{
        return 'black';
      }
  });
  onMounted(async () => {
      try {
        emits('emitTostarTime'); 
      } catch (err) {
        console.log(err);
      }
  }); 


</script>

<style scoped>
.tostar-btn{
  min-width: 35px;
    height: 35px;
    background: #ffffff26;
    border-radius: 50px;
    margin-left: 20px;
    position: relative;
    border: 1px solid #ffffff87;
    transition: all 150ms ease-out;
    box-shadow: 2px 2px 0px #ffffffad;
    opacity: .8;
    cursor: pointer;
}
.progress{
  filter: saturate(2);
  top: -8px;
}
.tostar-btn:hover{
    background: #ffffff00;
    border-radius: 50px;
    margin-left: 20px;
    position: relative;
    border: 1px solid #ffffff3d;
    transition: all 150ms ease-out;
    box-shadow: 1px 1px 0px #ffffff4f;
}

.tostar-btn::before {
    content: '';
    width: 20px;
    height: 3px;
    background: white;
    position: absolute;
    top: 0;
    left: 3px;
    transition: all 150ms ease-in;
    transform: rotateZ(45deg) translate3d(14px, 8px, 0px);
}

.tostar-btn:hover::before {
    transition:  all 150ms ease-out;
    transform: rotateZ(0deg) translate3d(4px, 15px, 0px);
}

.tostar-btn::after {
    content: '';
    width: 20px;
    height: 3px;
    background: white;
    position: absolute;
    top: 0px;
    opacity: 1;
    border: 0;
    left: 3px;
    transition:  all 150ms ease-in;
    transform: rotateZ(315deg) translate3d(-8px, 14px, 0px);
} 
.tostar-btn:hover::after {
    transition:  all 150ms ease-out;
    transform: rotateZ(360deg) translate3d(4px, 15px, 0px);
} 
</style>

