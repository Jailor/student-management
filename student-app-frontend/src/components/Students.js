import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useForm, Controller, set } from 'react-hook-form';
import { Container, Table, Button, Form, FormGroup, Label, Input, Row, Col, Card,
    CardHeader} from 'reactstrap';
import Select from 'react-select';
import StudentService from './StudentService';
import CourseService from './CourseService';
import '../App.css';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([{}]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [courseNameMapping, setCourseNameMapping] = useState({});
    const [enrollmentOptions, setEnrollmentOptions] = useState([]);

    const { register, handleSubmit, reset, control, setValue } = useForm();

    const fetchCourses = () => {
        CourseService.getAllCourses()
            .then(response => {
                setCourses(response.data);
                const mapping = {};
                response.data.forEach(course => {
                    mapping[course.id] = course.courseName;
                });
                setCourseNameMapping(mapping);
            })
            .catch(error => console.error("Error fetching courses", error));
    };


    const fetchStudents = () => {
        StudentService.getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => console.error("Error fetching students", error));
    };

    // Fetch students from the backend
    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, []);

    useEffect(() => {
        // When courses are fetched, set the options for the enrollment Select component
        setEnrollmentOptions(courses.map(course => ({
            value: course.id,
            label: course.courseName
        })));
    }, [courses]);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'First Name', accessor: 'personalDetails.firstName' },
            { Header: 'Last Name', accessor: 'personalDetails.lastName' },
            { Header: 'Email', accessor: 'personalDetails.email' },
            {
                Header: 'Date of Birth',
                accessor: row => row.personalDetails.dateOfBirth ? row.personalDetails.dateOfBirth.toString() : 'N/A'
            },
            { Header: 'Enrollment Status', accessor: 'personalDetails.enrollmentStatus' },
            {
                Header: 'Enrollments',
                accessor: 'enrollments',
                Cell: ({ cell: { value } }) => (
                    <ul>
                        {value && value.map((enrollment, index) => (
                            <li key={index}>
                                {`Course: ${courseNameMapping[enrollment.courseId] || enrollment.courseId}, 
                                Status: ${enrollment.status},
                                 Grade: ${enrollment.grade || 'N/A'},
                                 Enrolled on: ${enrollment.enrollmentDate}
                                 `}
                            </li>
                        ))}
                    </ul>
                )
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button className="button-spacing" color="secondary"  onClick={() => selectStudent(row.original)}>
                            Edit</Button>{' '}
                        <Button className="button-spacing" color="danger" onClick={() => deleteStudent(row.original.id)}>
                            Delete</Button>
                    </div>
                )
            },
        ],
        [students, courseNameMapping]
    );

    // Handle form submission
    const onSubmit = (data) => {

        data.enrollments = data.enrollments.map(option => ({
            courseId: option.value,
            enrollmentDate: option.enrollmentDate || new Date().toISOString(),
            grade: option.grade || null,
            status: option.status || 'ENROLLED'
        }));

        if (selectedStudent) {
            StudentService.updateStudent(selectedStudent.id, data)
                .then(() => fetchStudents())
                .catch(error => console.error("Error updating student", error));
        } else {
            StudentService.createStudent(data)
                .then(() => fetchStudents())
                .catch(error => console.error("Error creating student", error));
        }
        resetForm();
    };

    const resetForm = () => {
        reset();
        setSelectedStudent(null);
    };

    const selectStudent = (student) => {
        setSelectedStudent(student);
        // Populate form fields
        setValue("personalDetails.firstName", student.personalDetails.firstName);
        setValue("personalDetails.lastName", student.personalDetails.lastName);
        setValue("personalDetails.email", student.personalDetails.email);
        setValue("personalDetails.dateOfBirth", student.personalDetails.dateOfBirth);
        setValue("personalDetails.enrollmentStatus", student.personalDetails.enrollmentStatus);
        
        const studentEnrollments = student.enrollments.map(enrollment => ({
            value: enrollment.courseId,
            label: courseNameMapping[enrollment.courseId] || enrollment.courseId,
            enrollmentDate: enrollment.enrollmentDate,
            grade: enrollment.grade,
            status : enrollment.status
        }));
        setValue("enrollments", studentEnrollments);
    };

    const deleteStudent = (id) => {
        StudentService.deleteStudent(id)
            .then(() => fetchStudents())
            .catch(error => console.error("Error deleting student", error));
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: students });

    return (
        <Container>
        <CardHeader>
          <h2> Student Management </h2>
        </CardHeader>
        <br/>
        <CardHeader>
          <h4> Create/Update Student </h4>
        </CardHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Controller name="personalDetails.firstName" control={control} defaultValue=""
                                render={({ field }) => <Input {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Controller name="personalDetails.lastName" control={control} defaultValue=""
                                render={({ field }) => <Input {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Controller name="personalDetails.email" control={control} defaultValue=""
                                render={({ field }) => <Input type="email" {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="dateOfBirth">Date of Birth</Label>
                            <Controller name="personalDetails.dateOfBirth" control={control} defaultValue=""
                                render={({ field }) => <Input type="date" {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="enrollmentStatus">Enrollment Status</Label>
                            <Controller name="personalDetails.enrollmentStatus" control={control} defaultValue="ENROLLED"
                                render={({ field }) => (
                                    <Input type="select" {...field}>
                                        <option value="ENROLLED">Enrolled</option>
                                        <option value="GRADUATED">Graduated</option>
                                        <option value="ON_LEAVE">On Leave</option>
                                        <option value="WITHDRAWN">Withdrawn</option>
                                        <option value="SUSPENDED">Suspended</option>
                                    </Input>
                                )} />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                    <FormGroup>
                    <Label for="enrollments">Enrollments</Label>
                    <Controller
                        name="enrollments"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={enrollmentOptions}
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        )}
                    />
                    </FormGroup>
                    </Col>
                </Row>
                <Button className="button-spacing" type="submit">{selectedStudent ? 'Update' : 'Create'} Student</Button>
                <Button className="button-spacing" onClick={resetForm} style={{ marginLeft: '10px' }}>Reset</Button>
            </Form>
        <br/>
        <CardHeader>
          <h4> All Students </h4>
        </CardHeader>
        <Table {...getTableProps()} bordered hover striped>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </Container>
    );
};

export default Students;
