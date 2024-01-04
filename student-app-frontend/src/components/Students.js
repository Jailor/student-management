import React, { useState } from 'react';
import { useTable } from 'react-table';
import { useForm, Controller  } from 'react-hook-form';
import { Container, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import StudentService from './StudentService';

const Students = () => {
    // Sample data
    const data = React.useMemo(
        () => [
            { id: 1, name: 'John Doe', age: 20, course: 'Computer Science' },
            // ... more students
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Course', accessor: 'course' },
            // Add actions column for edit/delete
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',  // Provide default values for all controlled fields
            // ... other fields
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission for add/update
        reset();
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Controller
                        name="name"
                        control={control}
                         render={({ field }) => <Input {...field} />}
                    />
                </FormGroup>
                {/* Add other fields similarly */}
                <Button type="submit">Submit</Button>
            </Form>
            <Table {...getTableProps()}>
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
