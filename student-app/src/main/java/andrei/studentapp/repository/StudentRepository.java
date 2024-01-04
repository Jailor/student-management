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
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    // Additional custom methods if needed
    List<StudentNameEmailProjection> findAllProjectedBy();
    List<Student> findByPersonalDetails_EnrollmentStatus(EnrollmentStatus status);
}