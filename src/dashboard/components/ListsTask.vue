<template>
   <v-sheet class="pa-6  pb-10 pt-10" min-height="100vh"  color="#7cf0ff" rounded>
    <v-container class="  background-box-timeline">
      <v-row no-gutters> 
        <v-col cols="12" lg="12">
  <v-timeline align="start" class="timeline-task padding-timeline">
    <v-timeline-item
      v-for="task in tasks"
      :icon="task.is_complete ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-clock-outline'"
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
      <div class="modal-box">
        <AppModalStatusTask :dataTask="task" @emitStatusComplete="statusComplete"/>
        <AppModalEdit :dataTask="task" @editTask="editTask" @emitRemoveTask="emitRemoveTask"/>
      </div>
      <v-card class="background-task" max-width="300px">
        <v-card-title :class="['text-h6','text-center','letter']"  >
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
  import AppModalDescription  from "./ModalDescription.vue";
  import AppModalEdit  from "./ModalEdit.vue";
  import AppModalStatusTask from "./ModalStatusTask.vue";
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
  .component('AppModalStatusTask', AppModalStatusTask)

  onMounted( async () =>{
    try {
      await taskStoreService.fetchAllTasks( userStoreService.user.id )
    } catch (err) {
      console.log(err);
    }
  });

  const emits = defineEmits(['updateComplete','updateTask','taskRemove']);

  const editTask = (formValues) =>{
    emits('updateTask', formValues);
  };
  const emitRemoveTask = (idTask) =>{
    emits('taskRemove', idTask);
  };
  const statusComplete = (task) => {
    emits('updateComplete', task); 
  };
</script>
<style scoped>
.v-timeline--vertical.v-timeline--align-start {
    overflow: auto;
}
.modal-box{
  display: flex;
    align-items: end;
    position: relative;
    top: 15px;
    left: -15px;
    width: 110%;
    z-index: 1;
    justify-content: right;
}
.btn{
  background: var(--secondary);
}
.padding-timeline{
  padding: 40px 15px;
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

.timeline-task .info-create {
  top: 66px;
  background: #959595;
  color: white!important;
}
.timeline-task .v-card--variant-elevated {
    box-shadow: none;
}
  </style>
