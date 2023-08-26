package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    @Override
    public List<Activity> getActivities() {
        return activityRepository.findAll();
    }

    @Override
    public List<Activity> getActivitiesByUser(int userId) {
        return activityRepository.findByUser_Id(userId);
    }

    @Override
    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    @Override
    public void deleteActivity(int id) {
        activityRepository.deleteById(id);
    }

    @Override
    public Activity getActivityById(int id) {
        Optional<Activity> activityOptional = activityRepository.findById(id);
        return activityOptional.orElse(null);
    }

    @Override
    public Activity updateActivity(Activity activity) {
        return activityRepository.save(activity);
    }
}
