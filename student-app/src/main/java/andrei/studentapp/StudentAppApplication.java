package andrei.studentapp;

import andrei.studentapp.model.*;
import andrei.studentapp.repository.CourseRepository;
import andrei.studentapp.repository.StudentNameEmailProjection;
import andrei.studentapp.repository.StudentRepository;
import andrei.studentapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class StudentAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentAppApplication.class, args);
	}


	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private UserRepository userRepository;

	@Bean
	public CommandLineRunner defaultSimulationRunner() {
		return args -> run();
	}

	public void run() {
		studentRepository.deleteAll();
		courseRepository.deleteAll();
		userRepository.deleteAll();

		System.out.println("----- Initialize Student Database -----");

		createStudents();

		System.out.println("----- Display Student Emails -----");
		displayStudentEmails();

		System.out.println("----- Create Users -----");
		createUsers();

	}



	public void createUsers() {
		System.out.println("Creating users...");
		User user1 = new User();
		user1.setUsername("admin");
		user1.setPassword("admin");
		user1.setRole("ADMIN");
		user1.setName("Admin User");
		userRepository.save(user1);

		User user2 = new User();
		user2.setUsername("student");
		user2.setPassword("student");
		user2.setRole("STUDENT");
		user2.setName("Student User");
		userRepository.save(user2);

		User user3 = new User();
		user3.setUsername("andrei_pelle");
		user3.setPassword("andrei_pelle");
		user3.setRole("ADMIN");
		user3.setName("Andrei Pelle");
		userRepository.save(user3);

		System.out.println("Users created.");
	}

	public void displayStudentEmails() {
		List<StudentNameEmailProjection> students = studentRepository.findAllProjectedBy();
		for (StudentNameEmailProjection student : students) {
			String firstName = student.getPersonalDetails().getFirstName();
			String lastName = student.getPersonalDetails().getLastName();
			String email = student.getPersonalDetails().getEmail();
			System.out.println(firstName + " " + lastName + " - " + email);
		}
	}

	List<String> createCourses() {
		System.out.println("Creating courses...");

		Course savedCourse = null;
		List<String> courseIds = new ArrayList<>();
		// Course 1: Introduction to Computer Science
		Course course1 = new Course();
		course1.setCourseCode("CS101");
		course1.setCourseName("Introduction to Computer Science");
		course1.setCourseDescription("Basic concepts of computer science including algorithms, data structures, and software development.");
		course1.setCredits(4);
		course1.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course1);
		courseIds.add(savedCourse.getId());

		// Course 2: Advanced Mathematics
		Course course2 = new Course();
		course2.setCourseCode("MATH201");
		course2.setCourseName("Advanced Mathematics");
		course2.setCourseDescription("In-depth study of mathematical theories, including calculus, linear algebra, and differential equations.");
		course2.setCredits(3);
		List<String> prerequisitesForCourse2 = new ArrayList<>();
		prerequisitesForCourse2.add(course1.getId()); // Assuming course1 is a prerequisite
		course2.setPrerequisites(prerequisitesForCourse2);
		savedCourse = courseRepository.save(course2);
		courseIds.add(savedCourse.getId());

		// Course 3: Principles of Economics
		Course course3 = new Course();
		course3.setCourseCode("ECON101");
		course3.setCourseName("Principles of Economics");
		course3.setCourseDescription("Introduction to microeconomics and macroeconomics, covering market dynamics, fiscal policies, and economic theories.");
		course3.setCredits(3);
		course3.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course3);
		courseIds.add(savedCourse.getId());

		// Course 4: World History
		Course course4 = new Course();
		course4.setCourseCode("HIST105");
		course4.setCourseName("World History");
		course4.setCourseDescription("A comprehensive overview of global history from ancient times to the modern era.");
		course4.setCredits(3);
		course4.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course4);
		courseIds.add(savedCourse.getId());

		// Course 5: Introduction to Psychology
		Course course5 = new Course();
		course5.setCourseCode("PSYCH101");
		course5.setCourseName("Introduction to Psychology");
		course5.setCourseDescription("Exploration of psychological concepts, theories, and research methods, focusing on behavior and mental processes.");
		course5.setCredits(3);
		course5.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course5);
		courseIds.add(savedCourse.getId());

		// Course 6: Introduction to Programming with Python
		List<String> prerequisitesForCourse6 = new ArrayList<>();
		prerequisitesForCourse6.add(course1.getId());
		prerequisitesForCourse6.add(course2.getId());
		prerequisitesForCourse6.add(course3.getId());
		Course course6 = new Course();
		course6.setCourseCode("ITPP101");
		course6.setCourseName("Introduction to Programming with Python");
		course6.setCourseDescription("Fundamentals of programming using Python...");
		course6.setCredits(4);
		course6.setPrerequisites(prerequisitesForCourse6);
		savedCourse = courseRepository.save(course6);
		courseIds.add(savedCourse.getId());

		// Course 7: Modern World Literature
		Course course7 = new Course();
		course7.setCourseCode("LIT202");
		course7.setCourseName("Modern World Literature");
		course7.setCourseDescription("Exploration of contemporary literature from around the world...");
		course7.setCredits(3);
		course7.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course7);
		courseIds.add(savedCourse.getId());

		// Course 8: Data Science and Analytics
		Course course8 = new Course();
		course8.setCourseCode("DSA301");
		course8.setCourseName("Data Science and Analytics");
		course8.setCourseDescription("In-depth study of data analysis, statistical methods...");
		course8.setCredits(4);
		List<String> prerequisitesForCourse8 = new ArrayList<>();
		prerequisitesForCourse8.add(course6.getId()); // Python course as a prerequisite
		course8.setPrerequisites(prerequisitesForCourse8);
		savedCourse = courseRepository.save(course8);
		courseIds.add(savedCourse.getId());

		// Course 9: Environmental Science
		Course course9 = new Course();
		course9.setCourseCode("ENV101");
		course9.setCourseName("Environmental Science");
		course9.setCourseDescription("Study of environmental issues, ecological concepts...");
		course9.setCredits(3);
		course9.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course9);
		courseIds.add(savedCourse.getId());

		// Course 10: Business Management and Leadership
		Course course10 = new Course();
		course10.setCourseCode("BML201");
		course10.setCourseName("Business Management and Leadership");
		course10.setCourseDescription("Fundamentals of business management, leadership skills...");
		course10.setCredits(3);
		course10.setPrerequisites(new ArrayList<>());
		savedCourse = courseRepository.save(course10);
		courseIds.add(savedCourse.getId());

		System.out.println("Courses created.");
		return courseIds;
	}

	void createStudents() {
		System.out.println("Creating students...");

		// Retrieve course IDs created earlier
		List<String> courseIds = createCourses();

		// Assuming courseIds are in the order of the courses you created
		String cs101Id = courseIds.get(0); // Course ID for CS101
		String math201Id = courseIds.get(1); // Course ID for MATH201
		String econ101Id = courseIds.get(2); // Course ID for ECON101
		String hist105Id = courseIds.get(3); // Course ID for HIST105

		// Create student 1
		Student student1 = new Student();
		student1.setPersonalDetails(new PersonalDetails("Alice", "Johnson", "alice.johnson@example.com", LocalDate.of(2000, 3, 15),"ENROLLED"));
		student1.setEnrollments(List.of(new Enrollment(cs101Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student1);

		// Create student 2
		Student student2 = new Student();
		student2.setPersonalDetails(new PersonalDetails("Bob", "Smith", "bob.smith@example.com", LocalDate.of(2001, 7, 22), "ENROLLED"));
		student2.setEnrollments(List.of(new Enrollment(math201Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student2);

		// Create student 3
		Student student3 = new Student();
		student3.setPersonalDetails(new PersonalDetails("Carol", "Williams", "carol.williams@example.com", LocalDate.of(1999, 11, 8), "ON_LEAVE"));
		student3.setEnrollments(Arrays.asList(new Enrollment(cs101Id, LocalDate.now(), "ACTIVE"), new Enrollment(math201Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student3);

		// Create student 4
		Student student4 = new Student();
		student4.setPersonalDetails(new PersonalDetails("Dave", "Brown", "dave.brown@example.com", LocalDate.of(2002, 1, 30), "ENROLLED"));
		student4.setEnrollments(List.of(new Enrollment(cs101Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student4);

		// Create student 5
		Student student5 = new Student();
		student5.setPersonalDetails(new PersonalDetails("Eve", "Miller", "eve.miller@example.com", LocalDate.of(2000, 5, 17), "SUSPENDED"));
		student5.setEnrollments(new ArrayList<>()); // Assuming no active enrollments due to suspended status
		studentRepository.save(student5);

		// Create student 6
		Student student6 = new Student();
		student6.setPersonalDetails(new PersonalDetails("Frank", "Green", "frank.green@example.com", LocalDate.of(2002, 8, 14), "ENROLLED"));
		student6.setEnrollments(List.of(
				new Enrollment(cs101Id, LocalDate.now(), "ACTIVE", "A"),
				new Enrollment(math201Id, LocalDate.now(), "ACTIVE", "B"),
				new Enrollment(econ101Id, LocalDate.now(), "ACTIVE"),
				new Enrollment(hist105Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student6);

		// Create student 7
		Student student7 = new Student();
		student7.setPersonalDetails(new PersonalDetails("Grace", "Hall", "grace.hall@example.com", LocalDate.of(2001, 9, 19),"ENROLLED"));
		student7.setEnrollments(List.of(new Enrollment(math201Id, LocalDate.now(), "ACTIVE")));
		studentRepository.save(student7);

		// Create student 8
		Student student8 = new Student();
		student8.setPersonalDetails(new PersonalDetails("Henry", "Adams", "henry.adams@example.com", LocalDate.of(2000, 12, 5), "GRADUATED"));

		student8.setEnrollments(new ArrayList<>()); // No active enrollments for graduated students
		studentRepository.save(student8);

		System.out.println("Students created.");
	}


}
