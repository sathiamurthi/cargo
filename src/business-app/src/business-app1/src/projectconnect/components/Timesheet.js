// src/components/Timesheet.js
import React, { useState } from 'react';
import { Button, Container, Header, Icon, Input, Table, Message, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isWeekend, addDays, startOfWeek } from 'date-fns';
import moment from 'moment';

const initialMockData = [
    // Sample data for the month of August 2024
    { project: 'Project A', weekend: '08/05/2024', hours: { Monday: 2, Tuesday: 3, Wednesday: 4, Thursday: 2, Friday: 5, Saturday: 5, Sunday: 0 }, status: 'Pending' },
    { project: 'Project Z', weekend: '08/05/2024', hours: { Monday: 4, Tuesday: 3, Wednesday: 2, Thursday: 2, Friday: 3, Saturday: 4, Sunday: 0 }, status: 'Approved' },
    { project: 'Project B', weekend: '08/05/2024', hours: { Monday: 3, Tuesday: 2, Wednesday: 1, Thursday: 1, Friday: 2, Saturday: 2, Sunday: 0 }, status: 'Rejected' },
    { project: 'Project B', weekend: '08/12/2024', hours: { Monday: 4, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 5, Saturday: 3, Sunday: 0 }, status: 'Submitted' },
    { project: 'Project C', weekend: '08/19/2024', hours: { Monday: 5, Tuesday: 2, Wednesday: 2, Thursday: 1, Friday: 3, Saturday: 5, Sunday: 0 }, status: 'Pending' },
    { project: 'Project C', weekend: '08/26/2024', hours: { Monday: 4, Tuesday: 2, Wednesday: 3, Thursday: 1, Friday: 1, Saturday: 2, Sunday: 0 }, status: 'Approved' },
];


export default function Timesheet() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [timesheetData, setTimesheetData] = useState(initialMockData);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNavigation = (direction) => {
        setCurrentDate((prevDate) => addDays(prevDate, direction === 1 ? 7 : -7));
    };

    const handleDateChange = (date) => {
        if (date && isWeekend(date)) {
            setCurrentDate(date);
        }
    };

    const handleChangeHours = (project, day, value) => {
        if (value === '') {
            const updatedData = timesheetData.map(item => {
                if (item.project === project) {
                    return {
                        ...item,
                        hours: { ...item.hours, [day]: value }
                    };
                }
                return item;
            });
            setTimesheetData(updatedData);
            setErrorMessage(''); // Clear any previous error message
            return;
        }

        if (/^[0-9]*$/.test(value)) {
            const numericValue = parseInt(value, 10);
            if (numericValue >= 1 && numericValue <= 9) {
                const updatedData = timesheetData.map(item => {
                    if (item.project === project) {
                        return {
                            ...item,
                            hours: { ...item.hours, [day]: value }
                        };
                    }
                    return item;
                });
                setTimesheetData(updatedData);
                setErrorMessage(''); // Clear any previous error message
            } else {
                setErrorMessage('Please enter a number between 1 and 9.');
            }
        } else {
            setErrorMessage('Invalid input. Please enter a number between 1 and 9.');
        }
    };

    const handleSubmitChanges = () => {
        console.log('Submitted Data:', timesheetData);
        setErrorMessage('');
    };

    const getDateNumber = (dayOffset) => {
        return moment(startOfWeek(currentDate)).add(dayOffset, 'days').date();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'green';
            case 'Pending':
                return 'orange';
            case 'Rejected':
                return 'red';
            case 'Submitted':
                return 'blue';
            default:
                return 'grey';
        }
    };

    const calculateTotalHours = () => {
        const totalHours = {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0,
        };

        timesheetData
            .filter(item => moment(item.weekend, 'MM/DD/YYYY').isSame(currentDate, 'week'))
            .forEach(item => {
                Object.keys(item.hours).forEach(day => {
                    totalHours[day] += parseInt(item.hours[day]) || 0;
                });
            });

        return totalHours;
    };

    const totalHours = calculateTotalHours();

    return (
        <Container>
            <Header as="h2">Timesheet for the weekend of {moment(currentDate).format('MM/DD/YYYY')}</Header>
            <DatePicker
                selected={currentDate}
                onChange={handleDateChange}
                filterDate={date => isWeekend(date)}
                dateFormat="MM/dd/yyyy"
            />
            <Button icon onClick={() => handleNavigation(-1)}>
                <Icon name="chevron left" />
            </Button>
            <Button icon onClick={() => handleNavigation(1)}>
                <Icon name="chevron right" />
            </Button>

            {errorMessage && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            )}

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ width: '200px' }}>Project</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Mon ({getDateNumber(0)})</Table.HeaderCell>
                        <Table.HeaderCell>Tue ({getDateNumber(1)})</Table.HeaderCell>
                        <Table.HeaderCell>Wed ({getDateNumber(2)})</Table.HeaderCell>
                        <Table.HeaderCell>Thu ({getDateNumber(3)})</Table.HeaderCell>
                        <Table.HeaderCell>Fri ({getDateNumber(4)})</Table.HeaderCell>
                        <Table.HeaderCell>Sat ({getDateNumber(5)})</Table.HeaderCell>
                        <Table.HeaderCell>Sun ({getDateNumber(6)})</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {timesheetData
                        .filter(item => moment(item.weekend, 'MM/DD/YYYY').isSame(currentDate, 'week'))
                        .map(item => (
                            <Table.Row key={item.project + item.weekend}>
                                <Table.Cell>{item.project}</Table.Cell>
                                <Table.Cell>
                                    <Label color={getStatusColor(item.status)}>{item.status}</Label>
                                </Table.Cell>
                                {Object.keys(item.hours).map(day => (
                                    <Table.Cell key={day}>
                                        <Input 
                                            type="text"
                                            value={item.hours[day]}
                                            onChange={(e) => {
                                                if (item.status !== 'Approved') {
                                                    handleChangeHours(item.project, day, e.target.value);
                                                }
                                            }}
                                            style={{ width: '70px' }} 
                                            disabled={item.status === 'Approved'} // Disable input if status is 'Approved'
                                        />
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>

            {/* Display aggregated total hours for all projects */}
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Total Hours</Table.HeaderCell>
                        {Object.keys(totalHours).map(day => (
                            <Table.HeaderCell key={day}>
                                {day} ({totalHours[day]})
                                {totalHours[day] > 9 && (
                                    <Message negative warning style={{ margin: 0 }}>
                                        Total exceeds 9 hours
                                    </Message>
                                )}
                            </Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
            </Table>

            <Button primary onClick={handleSubmitChanges}>
                Submit Changes
            </Button>
        </Container>
    );
}
