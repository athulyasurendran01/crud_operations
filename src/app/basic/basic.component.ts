import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  providers: [TodoService]
})
export class BasicComponent implements OnInit {
		private todos;
		private activeTasks;
		
		productForm: FormGroup;
		title: FormControl;
		description: FormControl;
		price: FormControl;

		selectedProduct: any = {};
		productEdit: boolean = false;

  	constructor(private todoService: TodoService) { }

  	ngOnInit() {
			this.createFormControls();
			this.createForm();

  		this.getTodos();
		}
		
		createFormControls() {
			this.title = new FormControl('', Validators.required);
			this.description = new FormControl('', Validators.required);
			this.price = new FormControl('', Validators.required);
		}

		createForm() {
			this.productForm = new FormGroup({
				title: this.title,
				description: this.description,
				price: this.price,
			});
		}

		getTodos(){
			return this.todoService.apiTokenRequestGet('organization')
				.subscribe((res: any) => {
					this.todos = res;
				}, error => {
			});
  	}

  	saveProduct(){
			let data = this.productForm.value;
			if(this.productEdit){
				return this.todoService.apiTokenRequestPut('organization', data)
					.subscribe((res: any) => {
						this.getTodos();
						this.productForm.reset();
						this.productEdit = false;
					}, error => {
				});
			}else{
				return this.todoService.apiTokenRequestPost('organization', data)
					.subscribe((res: any) => {
						this.getTodos();
						this.productForm.reset();
					}, error => {
				});
			}
		}

		updateProduct(todo){
			let data = this.productForm.value;
			return this.todoService.apiTokenRequestPut('organization', data)
				.subscribe((res: any) => {
					this.getTodos();
					this.productForm.reset();
				}, error => {
			});
		}
		
		EditProduct(todo){
			this.selectedProduct = todo;
			this.productEdit = true;
		}

		destroyTodo(id){
			return this.todoService.apiTokenRequestDelete('organization', id)
				.subscribe((res: any) => {
					this.getTodos();
				}, error => {
			});
		}

}