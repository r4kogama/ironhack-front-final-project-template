<script setup>
    import { useRouter } from "vue-router";
    import { userStore } from "../../stores/ServiceUser.js";
    import { taskStore } from "../../stores/ServiceTask.js";
    import Task from "../../classes/task.js";
    import { createApp, ref , provide, inject } from 'vue';
    import AppNavigation from "../components/NavigationDashboard.vue";

  const router = useRouter();
  const userStoreService = userStore();
  const taskStoreService = taskStore();
  const app = createApp({});
  app
    .component('AppNavigation', AppNavigation)

  const formRules = ref({
        required: value => !!value || 'Field is required.',
        min: value => value.length >= 3 || 'Min 3 characters.',
        max: value => value.length <= 25 || 'Max 25 characters.',
        text: value => value.length < 255 || 'Max 255 characters.',
      })
  provide( 'rules', formRules);
      
  const logOut = async () =>{
    try {
      userStoreService.signOut();
      router.push({ path: "/home" });
    } catch (err) {
      console.log(err);
    }
  };
  //create new task
  const taskSubmitForm = async (data) =>{
    let task = new Task(null, data.value, null, null);
    if(task.title && !task.completed){
      try {
        taskStoreService.createTask( task.title, task.completed, userStoreService.user.id );
      } catch (err) {
        console.log(err);
      }
    }else {
        console.log("Unexpected error nonexistent task data, restart the page");
    }
  };
  //update status actual task by id
  const updateTaskComplete = async (data) =>{
   let task = new Task(parseInt(data[0]), null, null, !data[1].value);
    if(typeof task === 'object'){
      try {
        taskStoreService.changeStatus( task, userStoreService.user.id );
      } catch (err) {
        console.log(err);
      }
    }else {
        console.log("Unexpected error nonexistent task data, restart the page");
    } 
  };

  //update info task by id
  const updateTaskEditForm = async (dataInputs) =>{
    let task = new Task(dataInputs[0].value, dataInputs[1].value, dataInputs[2].value, null);
    if(typeof task === 'object'){
      try {
        taskStoreService.editTask( task, userStoreService.user.id );
      } catch (err) {
        console.log(err);
      }
    }else {
        console.log("Unexpected error nonexistent task data, restart the page");
    }
  };
  //remove task by id
  const removeTaskForm = async (task_id) =>{
     if(typeof task_id.value === 'number'){
      try {
        taskStoreService.deleteTask( task_id.value, userStoreService.user.id );
      } catch (err) {
        console.log(err);
      }
    }else {
        console.log("Unexpected error nonexistent task data, restart the page");
    }
  };
</script>
    
<template>
  <AppNavigation 
  @clickLogOut="logOut" 
  @createTask="taskSubmitForm" 
  @updateComplete="updateTaskComplete"
  @updateEdit="updateTaskEditForm"
  @removeTask="removeTaskForm"
  :formRules="formRules"/>
</template>

<style scoped>
</style>
    