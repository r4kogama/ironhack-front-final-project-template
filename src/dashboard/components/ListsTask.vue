<template>
   <v-sheet class="pa-6  pb-10 pt-10" min-height="100vh"  color="#7cf0ff" rounded>
    <v-container class="  background-box-timeline">
      <v-row no-gutters> 
        <v-col cols="12" lg="12">
  <v-timeline align="start" class="timeline-task padding-timeline">
    <v-timeline-item
      v-for="task in tasks"
      :key="task.id"
      :icon="task.is_complete ? 'mdi-bookmark-check' : 'mdi-bookmark-remove '"
      :dot-color="task.is_complete ? 'green-lighten-3' : 'red-lighten-3'"
      fill-dot
      text-color="white">
      <template  v-slot:opposite>
        <v-chip
          color="grey"
          class="pl-4 info-create"
          text-color="white"
          prepend-icon="mdi-calendar">
          {{task.inserted_at.split('T').slice(0,1).join()}}
        </v-chip>
      </template>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn class="btn-complete style-icon"  :data-btn="task.id" variant="elevated" v-if="task.is_complete === false"
          color="red-lighten-1"
          :loading="loading"
          v-bind="props"
          :elevation="isHovering ? 5 : 2"
          @click="statusComplete(task)">
          <v-icon   size="large" text-color="white" >mdi-bookmark-remove</v-icon>
          <v-tooltip activator="parent" location="bottom">Change Status</v-tooltip>
        </v-btn>
        <v-btn class="btn-complete style-icon" :data-btn="task.id" variant="elevated" v-else-if="task.is_complete === true"
          color="green-lighten-1"
          icon='mdi-bookmark-check'
          :loading="loading"
          v-bind="props"
          :elevation="isHovering ? 5 : 2"
          @click="statusComplete(task)">
          <v-icon  text-color="white" >mdi-bookmark-check</v-icon>
          <v-tooltip activator="parent" location="bottom">Change Status</v-tooltip>
        </v-btn>          
      </v-hover>
      <AppModalEdit :dataTask="task" @editTask="editTask" @emitRemoveTask="emitRemoveTask"/>
      <v-card class="background-task" max-width="300px">
        <v-card-title :class="['text-h6','text-center']"  :color="primary">
          {{task.title}}
        </v-card-title>
        <v-card-text class="white text--primary">
          <AppModalDescription :text="task.description"/>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline> 
</v-col>
    </v-row> 
    </v-container>
  </v-sheet>
</template>
<script setup>
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { userStore } from "../../stores/ServiceUser.js";
  import { taskStore } from "../../stores/ServiceTask.js";
  import  AppModalDescription  from "./ModalDescription.vue";
  import  AppModalEdit  from "./ModalEdit.vue";
  import { createApp, onMounted, ref, computed  } from 'vue';

const router = useRouter();
const taskStoreService = taskStore();
const { tasks } = storeToRefs(taskStoreService);
const userStoreService = userStore();
const app = createApp({});
const loading = ref(false);
app
  .component('AppModalEdit', AppModalEdit)
  .component('AppModalDescription', AppModalDescription)


  const emits = defineEmits(['updateComplete','updateTask']);

  const statusComplete = (task) => {
    try{
      animationLoading(task);
    }catch(err){
      console.log(err);
    }
  };
  const animationLoading = (task) =>{
    loading.value = true;
    setTimeout(() => (loadingUpdate()), 1000);
      const loadingUpdate = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('updateComplete', task); 
        } 
      }
  };
  onMounted( async () =>{
    try {
      await taskStoreService.fetchAllTasks( userStoreService.user.id )
    } catch (err) {
      console.log(err);
    }
    
  });

  const editTask = (formValues) =>{
    emits('updateTask', formValues);
  };
  const emitRemoveTask = (idTask) =>{
    emits('taskRemove', idTask);
  };
</script>
<style scoped>
.v-timeline--vertical.v-timeline--align-start {
    overflow: auto;
}

.btn{
  background: var(--secondary);
}
.padding-timeline{
  padding: 40px 15px;
}
.btn-complete{
  position: relative;
    left: -15px;
    z-index: 1;
    top: 15px;
    height: 35px;
    width: 35px;
}
.btn-edit{
  position: absolute;
    z-index: 1;
    right: 9px;
    top: 15px;
    width: 35px;
    height: 35px;
}
.background-box-timeline{
  background: url('../../assets/undraw_timeline_re_aw6g.svg') no-repeat;
  background-size: 80%;
    background-position-x: center;
    background-position-y: bottom;
    height: 100vh;
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    padding: 0;
    filter: opacity(1);
}
.background-task{
  background: url(../../assets/note.png)no-repeat;
  background-size: cover;
  background-position: 50% 99%;
}
.v-timeline--vertical.v-timeline {
    grid-template-columns: auto 70px auto;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    z-index: 2;
    background: #ffffffe7;

}
.v-timeline--vertical.v-timeline .v-timeline-item:first-child .v-timeline-item__body:first-child .btn-edit {
  right: -15px;
  top: 40px;
}
.timeline-task .info-create {
  top: 66px;
  background: #959595;
  color: white!important;
}

  </style>