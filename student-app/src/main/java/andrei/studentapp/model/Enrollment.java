package andrei.studentapp.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Enrollment {
    private String courseId;
    private LocalDate enrollmentDate;
    private String status;
    private String grade;

    public Enrollment() {
        super();
    }

    public Enrollment(String courseId, LocalDate enrollmentDate, String status, String grade) {
        super();
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
        this.grade = grade;
    }

    public Enrollment(String courseId, LocalDate enrollmentDate, String status) {
        super();
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
    }
}
