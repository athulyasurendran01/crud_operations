import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  providers: [TodoService]
})
export class BasicComponent implements OnInit {
	private newTodo;


	private todos;
  	private activeTasks;
  	constructor(private todoService: TodoService) { }

  	addTodo(){
	  this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
	    return this.getTodos();
	  }).then(() => {
	    this.newTodo = ''; 
	  });
	}

	getTodos(){
	    return this.todoService.get().then(todos => {
	      this.todos = todos;
	      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
	    });
  	}

  	updateTodo(todo, newValue) {
	  todo.title = newValue;
	  return this.todoService.put(todo).then(() => {
	    todo.editing = false;
	    return this.getTodos();
	  });
	}

	destroyTodo(todo){
	  this.todoService.delete(todo._id).then(() => {
	    return this.getTodos();
	  });
	}

  	ngOnInit() {
  		this.getTodos();
  	}

}