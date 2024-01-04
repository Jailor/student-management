package andrei.studentapp.repository;

import andrei.studentapp.model.EnrollmentStatus;
import andrei.studentapp.model.Student;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class StudentAggregateRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public Map<EnrollmentStatus, Long> countStudentsByEnrollmentStatus() {
        GroupOperation groupByStatus = Aggregation.group("personalDetails.enrollmentStatus").count().as("count");
        Aggregation aggregation = Aggregation.newAggregation(groupByStatus);
        AggregationResults<StatusCount> result = mongoTemplate.aggregate(aggregation, Student.class, StatusCount.class);

        Map<EnrollmentStatus, Long> statusCountMap = new HashMap<>();
        result.getMappedResults().forEach(statusCount -> statusCountMap.put(statusCount.getStatus(), statusCount.getCount()));
        return statusCountMap;
    }

    @Getter
    @Setter
    public static class StatusCount {
        private EnrollmentStatus status;
        private long count;
    }
}
