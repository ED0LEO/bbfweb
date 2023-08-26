package com.ed0leo.bbfweb;

import java.util.List;

public interface ActivityService {
    List<Activity> getActivities();
    List<Activity> getActivitiesByUser(int userId);
    Activity addActivity(Activity activity);
    void deleteActivity(int id);
    Activity getActivityById(int id);
    Activity updateActivity(Activity activity);
}
