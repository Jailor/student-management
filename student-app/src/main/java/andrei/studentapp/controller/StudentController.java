package andrei.studentapp.controller;

import andrei.studentapp.model.Student;
import andrei.studentapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable String id, @RequestBody Student studentDetails) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student updatedStudent = student.get();
            updatedStudent.getPersonalDetails().setFirstName(studentDetails.getPersonalDetails().getFirstName());
            updatedStudent.getPersonalDetails().setLastName(studentDetails.getPersonalDetails().getLastName());
            updatedStudent.getPersonalDetails().setEmail(studentDetails.getPersonalDetails().getEmail());
            updatedStudent.getPersonalDetails().setDateOfBirth(studentDetails.getPersonalDetails().getDateOfBirth());
            updatedStudent.getPersonalDetails().setEnrollmentStatus(studentDetails.getPersonalDetails().getEnrollmentStatus());
            if(studentDetails.getEnrollments() != null){
                updatedStudent.setEnrollments(studentDetails.getEnrollments());
            }
            return new ResponseEntity<>(studentRepository.save(updatedStudent), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable String id) {
        try {
            studentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}