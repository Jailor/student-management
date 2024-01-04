package andrei.studentapp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("students")
@Getter
@Setter
public class Student {
    @Id
    private String id;
    private PersonalDetails personalDetails;
    private List<Enrollment> enrollments;

    public Student() {
        super();
        this.enrollments = new ArrayList<>();
    }

    public Student(PersonalDetails personalDetails) {
        this();
        this.personalDetails = personalDetails;
    }

    public Student(PersonalDetails personalDetails, List<Enrollment> enrollments) {
        this(personalDetails);
        this.enrollments = enrollments;
    }
}