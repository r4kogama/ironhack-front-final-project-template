<template>
     <v-row >
       <v-col cols="auto">
         <v-dialog v-model="dialog" persistent >
           <template v-slot:activator="{ props }">
              <v-btn class="btn-complete style-icon"  :data-btn="id" variant="elevated" 
                :color="complete ? 'green-lighten-1' : 'red-lighten-1'"
                :loading="loading"
                v-bind="props"
                :elevation="isHovering ? 5 : 2">
                <v-icon v-if="complete === false"  size="large" class="text-white" text-color="white" >mdi-timer-sand</v-icon>
                <v-icon v-else-if="complete === true"  size="large" class="text-white" text-color="white">mdi-check-outline</v-icon>
                <v-tooltip activator="parent" location="bottom">Change Status</v-tooltip>
              </v-btn>     
           </template>
           <v-form v-model="form" @submit.prevent="updateStatusSubmit">
            <v-card  class="box-card-delete pl-3 pr-3 pt-1 pb-1">
              <v-card-text>
                <v-alert v-if="complete === false" prominent type="info" variant="outlined">
                  Do you want to change the status of your task to <strong>completed</strong>?
                </v-alert>
                <v-alert v-else-if="complete === true" prominent type="warning" variant="outlined">
                  Did you leave something <strong>to do</strong>? Your task will change to <strong>incompleted</strong>
                </v-alert>
                  <v-text-field v-model="idtask" readonly 
                      :type="'hidden'"
                      v-bind:value="idtask">
                  </v-text-field>
              </v-card-text>
              <v-card-actions >
                  <div class="containt-button-status pl-2 pr-2">
                    <div class="box-close">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn v-bind="props" 
                        :elevation="isHovering ? 3 : 2" 
                        class="btn-close mt-3 text-white btn-style-confirm pr-5 pl-5" color="#00bcd4"  
                        @click.native="dialog = false">cancel
                        <v-icon class="pl-4 pt-1">mdi-cancel</v-icon></v-btn>
                      </v-hover>
                    </div>
                    <div class="box-confirm">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn v-if="complete === false" type="submit" class="btn-style-confirm mt-3 text-white btn-style-complete" v-bind="props"  :loading="loading" :elevation="isHovering ? 3 : 2"  >
                          task complete
                          <v-icon class="pl-4 pt-1" size="x-large" >mdi-check-bold</v-icon>
                        </v-btn>
                        <v-btn v-else-if="complete === true" type="submit" class="btn-style-confirm mt-3 text-white btn-style-uncomplete" v-bind="props"  :loading="loading" :elevation="isHovering ? 3 : 2"  >
                          task incomplete
                          <v-icon class="pl-4 pt-1" size="x-large" >mdi-timer-sand</v-icon>
                        </v-btn>
                      </v-hover>
                    </div>
                  </div>
              </v-card-actions>
            </v-card>
          </v-form>
         </v-dialog>
       </v-col>
     </v-row>
 </template>
 
 <script setup>
  import { reactive, ref } from 'vue';
  const dialog = ref(false);
  const idtask = ref(task.dataTask.id);
  const complete = ref(task.dataTask.is_complete);
  const form = ref(false);
  const loading = ref(false);
  const task = defineProps({
    dataTask : Object,
    complete: Boolean
  });

  const emits = defineEmits(['emitStatusComplete']);
  const updateStatusSubmit = (event) => {
    
    try{
      if (!form.value) return;
      loading.value = true;
      let formData = [event.currentTarget[0].value, complete.value];
      console.log(formData)
      setTimeout(() => (loadingForm()), 1000);
      const loadingForm = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('emitStatusComplete', formData); 
          dialog.value = false;
        } 
      }
    }catch(err){
      console.log(err);
    }
  }; 
 </script>
 
 <style scoped>
   .btn-show{
     background: var(--primary);
     color:white;
   }
   .btn-close{
     background: var(--button);
   }

  .btn-complete{
    height: 35px;
    width: 35px;
  }

   .v-overlay__content {
     position: relative;
     left: 27px;
   }
   .containt-button-status{
      display:flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
   }
   .btn-style-confirm{
    height: 60px;
    color:white;
     font-size: 1.1em;
     letter-spacing: 2px;
     font-weight: bold;
     padding: 0px 20px;
   }
   .btn-style-complete{
    background: #4caf50;
   }
   .btn-style-uncomplete{
    background: #ef5350;
   }
 </style>
