import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscriber, Subscription, Observable } from "rxjs";
import { ToDo } from '../models/toDo';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class ToDoServices
{
    private toDos: ToDo[] = [];
    private localUrl = 'http://localhost:3000/api/todos';
    private azureUrl = 'https://mimicnodeserver.azurewebsites.net/api/todos/';
    private todoUrl = this.azureUrl;

    toDosUpdated = new Subject<ToDo[]>();

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public httpClient: HttpClient
    ) {}

    getToDos(): Observable<ToDo[]> {
        // console.log("retrieving ToDos from: " + this.todoUrl);
        return this.httpClient
          .get<ToDo[]>(this.todoUrl)
          // Using pipe & map to keep a local copy of the todo array
          // without it Delete and Add elements don't show up initially without refresh
          .pipe(map((toDos) => (this.toDos = toDos)));
      }

    addToDo(toDo: ToDo): void {
        this.httpClient
            .post<{ message: string; toDoId: string }>(
                this.todoUrl,
            toDo
            )
        .subscribe((responseData) => {
            //todomodel
            const newToDo: ToDo = {
                id: responseData.toDoId,
                title: toDo.title,
                description: toDo.description,
                completed: toDo.completed,
                notification: toDo.notification,
                createdDate: toDo.createdDate,
                startDateTime: toDo.startDateTime,
                endDateTime: toDo.endDateTime,
            };
            console.log(newToDo);
            this.toDos.push(newToDo);
            console.log(this.toDos);
            this.toDosUpdated.next([...this.toDos]);
            this.router.navigate(['/to-dos']).then(() => window.location.reload());
        });
    }

    deleteToDo(toDoId: string): void {
        this.httpClient
            .delete(this.todoUrl + toDoId)
            .subscribe(() => {
                console.log(this.toDos);
                const updatedToDos = this.toDos.filter((toDo) => toDo.id !== toDoId);
                console.log(updatedToDos);
                this.toDos = updatedToDos;
                this.toDosUpdated.next([...this.toDos]);
                this.router.navigate(['/toDos']).then(() => window.location.reload())
          });
    }
    getToDo(id: string) {
        return this.httpClient.get<ToDo>(this.todoUrl + id);
        // console.log(`ToDo is ${id}`)
        // const returnToDo = this.toDos.find(toDo => toDo.id === id)
        // console.log(`getToDo return an id of-${id}`)
    }

    getToDosUpdateListener(): Observable<ToDo[]>
    {
        return this.toDosUpdated.asObservable();
    }
}
