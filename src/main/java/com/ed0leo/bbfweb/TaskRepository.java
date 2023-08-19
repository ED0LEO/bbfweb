package com.ed0leo.bbfweb;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByCompletionAndCompletionDate(boolean completion, LocalDate completionDate);
    List<Task> findByUser_Id(int userId);
    List<Task> findByCompletionAndCompletionDateAndUser_Id(boolean b, LocalDate parsedCompletionDate, int userId);
}
