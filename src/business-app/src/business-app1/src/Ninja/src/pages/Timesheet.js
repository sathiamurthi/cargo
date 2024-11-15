import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Icon, Input, Table, Message, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isWeekend, addDays, startOfWeek } from 'date-fns';
import moment from 'moment';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Import Axios

export default function Timesheet() {
    const [currentDate, setCurrentDate] = useState(moment().day(6).toDate()); // Set initial date to the upcoming Saturday
    const [timesheetData, setTimesheetData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                const response = await axios.get('http://localhost:7071/api/timesheet', {
                    params: { userid: 'INN013', weekend: moment(currentDate).format('YYYY-MM-DD') }
                });
                setTimesheetData(response.data);
            } catch (error) {
                console.error("Error fetching timesheets:", error);
                setErrorMessage("Failed to fetch timesheet data.");
            }
        };
        fetchTimesheets();
    }, [currentDate]); // This effect depends on currentDate

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const downloadExcel = () => {
        console.log("Download Excel triggered");
    };

    const filteredData = timesheetData.filter(item => item.project.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleNavigation = (direction) => {
        setCurrentDate((prevDate) => addDays(prevDate, direction === 1 ? 7 : -7));
    };

    const handleDateChange = (date) => {
        if (date && isWeekend(date)) {
            setCurrentDate(date);
        }
    };

    const handleChangeHours = (project, day, value) => {
        const updatedData = timesheetData.map(item => {
            if (item.project === project) {
                return {
                    ...item,
                    hours: { ...item.hours, [day]: value === '' ? null : value }
                };
            }
            return item;
        });
        setTimesheetData(updatedData);
        setErrorMessage('');
    };

    const handleSubmitChanges = async () => {
        try {
            // Filter out entries that have status 'Approved' or 'Submitted'
            const projectsToSubmit = timesheetData.filter(item => 
                item.status.toLowerCase() !== 'approved' && item.status.toLowerCase() !== 'submitted'
            );

            const payload = {
                userId: 'INN013', // Replace with actual userId as necessary
                projects: projectsToSubmit
            };

            if (projectsToSubmit.length > 0) { // Only submit if there are projects to send
                await axios.post('http://localhost:7071/api/timesheet', payload);
                console.log('Submitted Data:', payload);
            } else {
                console.log('No projects to submit.');
            }

            setErrorMessage('');
            await fetchTimesheets(); // Refresh data after submission
        } catch (error) {
            console.error("Error submitting timesheet:", error);
            setErrorMessage('Failed to submit timesheet data.');
        }
    };

    const fetchTimesheets = async () => {
        try {
            const response = await axios.get('http://localhost:7071/api/timesheet', {
                params: { userid: 'INN013', weekend: moment(currentDate).format('YYYY-MM-DD') }
            });
            setTimesheetData(response.data);
        } catch (error) {
            console.error("Error fetching timesheets:", error);
            setErrorMessage("Failed to fetch timesheet data.");
        }
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
            Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
        };

        timesheetData
            .filter(item => moment(item.weekend, 'YYYY-MM-DD').isSame(currentDate, 'week'))
            .forEach(item => {
                Object.keys(item.hours).forEach(day => {
                    totalHours[day] += parseInt(item.hours[day]) || 0; // Ensure proper summation of hours
                });
            });

        return totalHours;
    };

    const totalHours = calculateTotalHours();

    return (
        <div className='main-layout'>
            <Navbar />
            <Container className='right-content'>
                <div className='breadcrumb'>
                    <h2 className="breadcrumb-text">Timesheet for the weekend of {moment(currentDate).format('MM/DD/YYYY')}</h2>
                </div>
                <div className="controls">
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
                    <Input
                        icon="search"
                        placeholder="Search Project"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                        style={{ marginRight: '10px', width: '300px' }}
                    />
                    <Button
                        icon
                        labelPosition="left"
                        color="blue"
                        onClick={downloadExcel}
                        className="download-button"
                    >
                        <Icon name="download" />
                        Download
                    </Button>
                </div>

                {errorMessage && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{errorMessage}</p>
                    </Message>
                )}

                <div className='table'>
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
                            {filteredData
                                .filter(item => moment(item.weekend, 'YYYY-MM-DD').isSame(currentDate, 'week'))
                                .map(item => (
                                    <Table.Row key={item.projectID + item.weekend}>
                                        <Table.Cell>{item.project}</Table.Cell>
                                        <Table.Cell>
                                            <Label color={getStatusColor(item.status)}>{item.status}</Label>
                                        </Table.Cell>
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                            <Table.Cell key={day}>
                                                <Input
                                                    type="text"
                                                    value={item.hours[day] !== null ? item.hours[day] : ''}
                                                    onChange={(e) => {
                                                        if (
                                                            item.status.toLowerCase() !== 'approved' &&
                                                            item.status.toLowerCase() !== 'submitted'
                                                        ) {
                                                            handleChangeHours(item.project, day, e.target.value);
                                                        }
                                                    }}
                                                    style={{ width: '70px' }} 
                                                    disabled={item.status.toLowerCase() === 'approved' || item.status.toLowerCase() === 'submitted'}
                                                />
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Total Hours</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                    <Table.HeaderCell key={day}>
                                        {totalHours[day]}
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
                </div>

                <Button primary onClick={handleSubmitChanges}>
                    Submit Changes
                </Button>
            </Container>
        </div>
    );
}
