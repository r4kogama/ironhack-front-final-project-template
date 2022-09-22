<script setup>
  import { userStore } from "../../stores/ServiceUser.js";
  import { taskStore } from "../../stores/ServiceTask.js";
  import { storeToRefs } from "pinia";
  import { createApp, onMounted, ref , reactive} from 'vue';
  import AppTaskForm from "./TaskForm.vue";
  import AppListsTask from "./ListsTask.vue";
  import AppTaskComplete from "./TaskComplete.vue";
  import { computed } from "@vue/reactivity";


  const userStoreService = userStore();
  const taskStoreService = taskStore();
  const { user, userData } = storeToRefs(userStoreService);
  const { task, taskCount, taskCountComplete } = storeToRefs(taskStoreService);
  const form = ref(false);
  const list = ref(false);
  const userName = reactive([]);
  const complete = ref(false);
  const loading = ref(false);
  const app = createApp({});
  app
    .component('AppTaskForm', AppTaskForm)
    .component('AppListsTask', AppListsTask)
    .component('AppTaskComplete', AppTaskComplete)

  const props = defineProps({
    formRules : Object,
  })
  const emits = defineEmits(['clickLogOut','createTask','updateComplete','updateEdit','removeTask']);

  onMounted(async () => {
    try {
      await userStoreService.fetchUserData();
      [userData._object.userData].forEach(user => {
        userName.push(user.name);
      })  
    } catch (err) {
      console.log(err);
    } 
    try {
      await taskStoreService.fetchAllTasksCompletedCount(userStoreService.user.id);
    } catch (err) {
      console.log(err);
    }
    try {
      await taskStoreService.fetchAllTasksCount(userStoreService.user.id);
    } catch (err) {
      console.log(err);
    }
   loading.value = true;
    setTimeout(() => (loadingForm()), 2000);
    const loadingForm = () => {
      loading.value = false;//stop animation
      if(loading.value === false){
        const elem = document.getElementById('btn-list');
        elem.click();
      } 
    } 

  }); 


  const showForm = () => {
    if(list.value === true){
      list.value = !list.value;
    }else if(complete.value === true){
      complete.value = !complete.value;
    }
    form.value = !form.value;
  }

  const showLists = () => {
    if(form.value === true){
      form.value = !form.value;
    }else if(complete.value === true){
      complete.value = !complete.value;
    }
    list.value = !list.value;
  }
  const showComplete = () => {
    if(form.value === true){
      form.value = !form.value;
    }else if(list.value === true){
      list.value = !list.value;
    }
    complete.value = !complete.value;
  }

  const logOutUser = () =>{
    emits('clickLogOut');
  };
  const emitTask = (formValues) =>{
    emits('createTask', formValues);
  };
  const emitComplete = (task) =>{
    emits('updateComplete', task);
  };
  const emitTaskUpdate = (formValues) =>{
    emits('updateEdit', formValues);
  };
  const taskRemove = (idTask) =>{
    emits('removeTask', idTask);
  };

</script>
<template>
  <v-card class="margin-card">
    <v-layout >
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item class="letter"
            prepend-avatar="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            :title="userName"
            :subtitle='user.email'
          ></v-list-item>     
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-notebook-plus" @click="showForm" title="My Task" value="myfiles"></v-list-item>

          <v-list-item  id="btn-list" prepend-icon="mdi-clipboard-list" @click="showLists" title="All Tasks" value="alltasks">
            <template v-slot:append>
              <v-badge color="error" :content="taskCount" inline></v-badge>
            </template>
          </v-list-item>
          <v-list-item prepend-icon="mdi-timeline-check" @click="showComplete" title="Completed" value="taskcompleted">
            <template v-slot:append>
              <v-badge color="error" :content="taskCountComplete" inline></v-badge>
            </template>
          </v-list-item>
        </v-list>
        <v-list class="logout" density="compact" nav>
          <v-divider></v-divider>
          <v-list-item  @click="logOutUser" prepend-icon="mdi-exit-to-app" title="Log Out" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main  :style="{ 'height': '100vh' }">
        <v-theme-provider  v-if="loading === true"  with-background class="box-welcome-profile pa-10">
          <v-card class="card-welcome letter"  subtitle="Loading profile...">
          Welcome {{userData.name}}!
          </v-card>
        </v-theme-provider>
        <AppTaskForm  v-if="form === true" :formRules="formRules" @createTask="emitTask" />
        <AppListsTask v-else-if="list === true"  @updateComplete="emitComplete" @updateTask="emitTaskUpdate" @taskRemove="taskRemove"/>
        <AppTaskComplete v-else-if="complete === true"/>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
  .margin-card{
    margin-top: 60px;
  }

  .logout{
    bottom: 0;
    position: absolute;
    width: 100%;
  }
.box-welcome-profile{
  height: 100vh;
  background: var(--primary);
}
.card-welcome{
  height: 100%;
  background: #e0f7fa url('../../assets/undraw_loading_re_5axr.svg') no-repeat;
  background-size: contain;
  background-position: bottom center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
  color: var(--primary);
  
}

.card-welcome{
  font-size: 3em;
  padding-top: 10px;
}
</style>
