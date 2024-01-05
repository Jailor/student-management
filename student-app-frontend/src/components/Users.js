import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useForm, Controller } from 'react-hook-form';
import { Container, Table, Button, Form, FormGroup, Label, Input, Card, CardHeader, Col } from 'reactstrap';
import UserService from './UserService';
import {checkAuthenticationStatus} from './Auth';
import { Navigate } from 'react-router-dom';
import '../App.css';

const Users = () => {
    const authResult = checkAuthenticationStatus();

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { register, handleSubmit, reset, control, setValue } = useForm();

    const fetchUsers = () => {
        UserService.getAllUsers()
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error("Error fetching users", error));
    };

    useEffect(() => {
        if (!authResult) {
            return;
        }
        fetchUsers();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Username', accessor: 'username' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Role', accessor: 'role' },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button className="button-spacing" color="secondary" onClick={() => selectUser(row.original)}>
                            Edit
                        </Button>
                        <Button className="button-spacing" color="danger" onClick={() => deleteUser(row.original.id)}>
                            Delete
                        </Button>
                    </div>
                )
            }
        ],
        []
    );

    const onSubmit = (data) => {
        const serviceCall = selectedUser
            ? UserService.updateUser(selectedUser.id, data)
            : UserService.createUser(data);

        serviceCall
            .then(() => {
                fetchUsers();
                resetForm();
            })
            .catch(error => {
                console.error("Error saving user", error);
                // if the status is conflict, then the username already exists
                if (error.response && error.response.status === 409) {
                    alert("Username already exists");
                } else {
                    alert("An error occurred while saving the user");
                }
            });
    };

    const selectUser = (user) => {
        setSelectedUser(user);
        setValue("username", user.username);
        setValue("name", user.name);
        setValue("password", user.password);
        setValue("role", user.role);
    };

    const deleteUser = (id) => {
        UserService.deleteUser(id)
            .then(() => fetchUsers())
            .catch(error => console.error("Error deleting user", error));
    };

    const resetForm = () => {
        reset({
            username: '',
            name: '',
            password: '',
            role: 'ADMIN',
        });
        setSelectedUser(null);
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: users });

    if (!authResult) {
        return <Navigate to="/login" />;
    }

    return (
        <Container>
            <CardHeader><h2>User Management</h2></CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Col md={6}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <Input {...field} />}
                    />
                </FormGroup>
            </Col>
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <Input {...field} />}
                    />
                </FormGroup>
            </Col>
            <Col md={6}>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <Input {...field} type="password" />}
                    />
                </FormGroup>
            </Col>
            <Col md={6}>
                <FormGroup>
                    <Label for="role">Role</Label>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue="ADMIN"
                        render={({ field }) => (
                            <Input type="select" {...field}>
                                <option value="STUDENT">STUDENT</option>
                                <option value="ADMIN">ADMIN</option>
                            </Input>
                        )}
                    />
                </FormGroup>
            </Col>
                <Button type="submit" color="primary">{selectedUser ? 'Update' : 'Create'} User</Button>
                <Button onClick={resetForm} style={{ marginLeft: '10px' }}>Reset</Button>
            </Form>
            <br />
            <Table {...getTableProps()} bordered hover>
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
                                {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
