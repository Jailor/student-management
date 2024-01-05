import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Container, Table, Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader } from 'reactstrap';
import CourseService from './CourseService'; // Import your CourseService
import '../App.css';
import {checkAuthenticationStatus} from './Auth';


const Courses = () => {
    const authResult = checkAuthenticationStatus();

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseNameMapping, setCourseNameMapping] = useState({});
    const [courseOptions, setCourseOptions] = useState([]);

    const { register, handleSubmit, reset, control, setValue } = useForm();

    const fetchCourses = () => {
        CourseService.getAllCourses()
            .then(response => {
                setCourses(response.data);
                // Create a mapping from course IDs to names
                const mapping = {};
                response.data.forEach(course => {
                    mapping[course.id] = course.courseName;
                });
                setCourseNameMapping(mapping);
                console.log(mapping);
            })
            .catch(error => console.error("Error fetching courses", error));
    };

    useEffect(() => {
        if (!authResult) {
            return;
        }

        fetchCourses();
    }, []);

    useEffect(() => {
        if (!authResult) {
            return;
        }

        // Create options for multi-select dropdown
        const options = courses.map(course => ({
            value: course.id,
            label: course.courseName
        }));
        setCourseOptions(options);
    }, [courses]);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Course Code', accessor: 'courseCode' },
            { Header: 'Course Name', accessor: 'courseName' },
            { Header: 'Description', accessor: 'courseDescription' },
            { Header: 'Credits', accessor: 'credits' },
            {
                Header: 'Prerequisites',
                accessor: 'prerequisites',
                Cell: ({ cell: { value } }) => (
                    <ul>
                        {value.map((prerequisiteId, index) => (
                            <li key={index}>
                                {courseNameMapping[prerequisiteId] || prerequisiteId}
                            </li>
                        ))}
                    </ul>
                )
                //Cell: ({ cell: { value } }) => value.join(', ')
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button className="button-spacing" color="secondary" onClick={() => selectCourse(row.original)}>
                            Edit
                        </Button>
                        <Button className="button-spacing" color="danger" onClick={() => deleteCourse(row.original.id)}>
                            Delete
                        </Button>
                    </div>
                )
            }
        ],
        [courses, courseNameMapping]
    );

    // Handle form submission
    const onSubmit = (data) => {
        // const courseData = { ...data, prerequisites: data.prerequisites.split(',') };


        data.prerequisites = data.prerequisites.map(option => option.value);

        // Use the appropriate service call based on whether you're updating or creating a course
        const serviceCall = selectedCourse
            ? CourseService.updateCourse(selectedCourse.id, data)
            : CourseService.createCourse(data);

        serviceCall
            .then(() => {
                fetchCourses();
                resetForm();
            })
            .catch(error => console.error("Error saving course", error));
    };
    const selectCourse = (course) => {
        setSelectedCourse(course);
        setValue("courseCode", course.courseCode);
        setValue("courseName", course.courseName);
        setValue("courseDescription", course.courseDescription);
        setValue("credits", course.credits);
        const selectedPrerequisites = course.prerequisites.map(id => ({
            value: id,
            label: courseNameMapping[id] || id
        }));
        setValue("prerequisites", selectedPrerequisites);
    };

    const deleteCourse = (id) => {
        CourseService.deleteCourse(id)
            .then(() => fetchCourses())
            .catch(error => console.error("Error deleting course", error));
    };

    const resetForm = () => {
        reset({
            courseCode: '',
            courseName: '',
            courseDescription: '',
            credits: '',
            prerequisites: [],
        });
        setSelectedCourse(null);
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: courses });

    if (!authResult) {
        window.location.href = "/login";
        return <div>Redirecting...</div>;
    }

    return (
        <Container>
            <CardHeader><h2>Course Management</h2></CardHeader>
            <br />
            <CardHeader><h4>Create/Update Course</h4></CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="courseCode">Course Code</Label>
                            <Controller name="courseCode" control={control} defaultValue=""
                                render={({ field }) => <Input {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="courseName">Course Name</Label>
                            <Controller name="courseName" control={control} defaultValue=""
                                render={({ field }) => <Input {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="courseDescription">Description</Label>
                            <Controller name="courseDescription" control={control} defaultValue=""
                                render={({ field }) => <Input type="textarea" {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="credits">Credits</Label>
                            <Controller name="credits" control={control} defaultValue=""
                                render={({ field }) => <Input type="number" {...field} />} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prerequisites">Prerequisites</Label>
                            <Controller
                                name="prerequisites"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={courseOptions}
                                        isMulti
                                        closeMenuOnSelect={false}
                                    />
                                )}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button className="button-spacing" type="submit">{selectedCourse ? 'Update' : 'Create'} Course</Button>
                <Button className="button-spacing" onClick={resetForm}>Reset</Button>
            </Form>
            <br />
            <CardHeader><h4>All Courses</h4></CardHeader>
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
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default Courses;
