package andrei.studentapp.repository;

import andrei.studentapp.model.EnrollmentStatus;
import andrei.studentapp.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    // Additional custom methods if needed
    List<StudentNameEmailProjection> findAllProjectedBy();
    List<Student> findByPersonalDetails_EnrollmentStatus(EnrollmentStatus status);
}