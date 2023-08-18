package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(int id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        return taskOptional.orElse(null);
    }

    @Override
    public List<Task> getTasksByUser(int userId) {
        return taskRepository.findByUser_Id(userId);
    }

    @Override
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getCompletedTasksByDate(String completionDate) {
        LocalDate parsedCompletionDate = LocalDate.parse(completionDate); // Parse the input string to LocalDate
        return taskRepository.findByCompletionAndCompletionDate(true, parsedCompletionDate);
    }
}
