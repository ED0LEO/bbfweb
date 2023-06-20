package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getTasks() {
        return this.taskRepository.findAll();
    }

    @Override
    public void deleteTask(int id) {
        this.taskRepository.deleteById(id);
    }

    @Override
    public Task addTask(Task task) {
        return this.taskRepository.save(task);
    }
}
