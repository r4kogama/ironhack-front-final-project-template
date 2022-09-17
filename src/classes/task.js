class Task{
  constructor(id, title, description, completed) {
    this.id = (id !== 'undefined' && id !== null) ? id : null;
    this.title = (title !== 'undefined' && title !== null) ? title.trim() : null;
    this.description = (description !== 'undefined' && description !== null) ? description.trim() : null;
    this.completed = (completed !== 'undefined' && completed !== null) ? completed : false;
  }

}
export default Task;
