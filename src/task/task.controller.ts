import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {TaskService} from "./task.service";
// import {AddTaskDto} from "./dto/add-task.dto";
// import {UpdateTaskDto} from "./dto/update-task.dto";

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(){
        return this.taskService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id){
        return this.taskService.getOneById(id);
    }

    @Post()
    add(@Body() body){
        return this.taskService.addTask(body.task);
    }

    @Patch(':id')
    update(@Param('id') id, @Body() body){
        return this.taskService.updateTask(id, body.newTask);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id){
        return this.taskService.deleteTask(id);
    }
}