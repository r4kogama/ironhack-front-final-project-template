import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const taskStore = defineStore('tasks', {
  state: () => ({
    tasks: null,
    taskCount: null,
    taskCountComplete : null
  }),
  actions: {
    async fetchAllTasks (id) {
      const  {error, data} = await supabase.from('tasks')
      .select('*')
      .match({ user_id: id })
      .order('id', { ascending: false });
      if(error) throw error;
      this.tasks = data;
    },
    async fetchAllTasksCount (id) {
      const  {error, data} = await supabase.from('tasks')
      .select('title', { count: 'exact' })
      .match({ user_id: id});
      if(error) throw error;
      this.taskCount = data.length;
      this.fetchAllTasks(id);
    },
    async fetchAllTasksCompletedCount (id) {
      const  {error, data} = await supabase.from('tasks')
      .select('title', { count: 'exact' })
      .match({ user_id: id, is_complete: true});
      if(error) throw error;
      this.taskCountComplete = data.length;
      this.fetchAllTasks(id);
    },
    async fetchAllTasksCompleted (id) {
      const  {error, data} = await supabase.from('tasks')
      .select('*')
      .match({ user_id: id, is_complete: true})
      .order('id', { ascending: false });
      if(error) throw error;
      this.tasks = data;
      //this.fetchAllTasks(id);
    },
    //create task title and user_id
    async createTask (title, complete, user_id) {
      const {error} = await supabase.from('tasks')
        .insert([{ title: title, description: 'describe your task', is_complete: complete, user_id: user_id }]);
      if(error) throw error;
      this.fetchAllTasksCount(user_id);
      //this.fetchTasks();
    },
    //change the status (complete or pending) of each task by its id_task
    async changeStatus (task, id) {
      await supabase
        .from('tasks')
        .update({ is_complete: task.completed })
        .match({ id: task.id, user_id : id });
      this.fetchAllTasksCompletedCount(id);
    }, 
    //edit each task by id_task
      async editTask (task, id) {
        await supabase
          .from('tasks')
          .update({ title: task.title, description : task.description })
          .match({ id: task.id, user_id: id });
        this.fetchAllTasks(id);
      },
       //delete each task by id_task
    async deleteTask (task_Id, id) {
      await supabase
        .from('tasks')
        .delete()
        .match({ id: task_Id, user_id: id});
      this.fetchAllTasksCount(id);
    }
  }
});
