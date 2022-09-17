<template>
  <v-sheet class="pa-6  pb-10 pt-10" min-height="100vh"  color="#7cf0ff" rounded>
    <v-container class=" background-box-completed">
      <v-row no-gutters> 
        <v-col cols="12" lg="12" >
          <div class="timeline-task timeline-style">
            <div v-if="lengthTask.length === 0">
              <v-alert icon="mdi-note-off" type="info" color="#3f51b5"  density="compact" variant="elevated" theme="dark" border>You haven't completed any of your tasks yet...</v-alert>
            </div>
            <v-timeline side="end" v-else-if="lengthTask.length !== 0">
              <v-timeline-item
                v-for="task in tasks"
                :key="task.id"
                dot-color="green-lighten-1"
                icon="mdi-clipboard-check-outline"
                size="large">
                <v-alert
                  :value="true"
                  type="success"
                  class="white--text"
                  density="comfortable"
                  border="start"
                  :title="task.title">
                  {{task.description}}
                </v-alert>
              </v-timeline-item>
            </v-timeline> 
          </div>
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
  import  AppModal  from "./ModalDescription.vue";
  import { createApp, onMounted, ref, computed, reactive  } from 'vue';

const router = useRouter();
const taskStoreService = taskStore();
const { tasks } = storeToRefs(taskStoreService);
const userStoreService = userStore();
const app = createApp({});
let lengthTask = reactive([])

  onMounted( async () =>{
    try {
      await taskStoreService.fetchAllTasksCompleted( userStoreService.user.id );
      console.log(tasks)
      tasks._object.tasks.forEach(task => {
        lengthTask.push(task)
      })
      // console.log(lengthTask.value.length)
    } catch (err) {
      console.log(err);
    }
    
  });

</script>
<style scoped>

.timeline-style {
    justify-content: flex-start;
    padding: 30px 0px;
    overflow: auto;
    height: 100vh;
}
.background-box-completed{
  background: url('../../assets/undraw_completed_tasks_vs6q.svg') no-repeat;
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
.timeline-task .v-timeline--vertical.v-timeline--align-center {
    justify-content: flex-start;
}
  </style>