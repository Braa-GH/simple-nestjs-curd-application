import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {TaskEntity} from "./task.entity";
import {v4 as uuid} from 'uuid'

@Injectable()
export class TaskService {
    private tasks: TaskEntity[] = [];

    getAll(): TaskEntity[] {
        return this.tasks;
    }

    getOneById(id): TaskEntity {
        for (const task of this.tasks){
            if (task.id === id){
                return task;
            }
        }
        throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }

    addTask(task: string): TaskEntity {
        const newTask = {
            id: uuid(),
            content: task,
            owner_id: 1005,
            created_at: new Date().toISOString(),
            last_update: new Date().toISOString()
        }
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id: string, newTask: string): TaskEntity{
        for (let task of this.tasks) {
            if (task.id == id){
                task.content = newTask;
                task.last_update = new Date().toISOString();
                return task;
            }
        }
        throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }

    deleteTask(id): void {
        this.tasks = this.tasks.filter(tsk => tsk.id != id);
    }

}