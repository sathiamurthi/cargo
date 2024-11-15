import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Input, Button } from 'semantic-ui-react';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import './LineChart.css'; // Ensure this file exists with necessary styles

// Register the components for Chart.js
Chart.register(...registerables);

const LineChart = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: ''
    });
    const [chartData, setChartData] = useState({
        labels: [], // Dates (X-axis)
        datasets: [] // Number of people (Y-axis)
    });
    const [allocationCounts, setAllocationCounts] = useState({
        allocated: 0,
        unallocated: 0,
        draft: 0,
        bench: 0
    });

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return [];
        }
    };
    
    // Function to fetch overall chart data (min to max date)
    const fetchOverallChartData = async () => {
        try {
            const response = await fetch(`http://localhost:7071/api/employees/allocations?startDate=2010-01-01&endDate=2030-12-31`);
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
    
            // Handle empty or invalid JSON responses
            const data = await response.json().catch(() => {
                console.error("Error parsing JSON from the response.");
                return [];
            });
    
            if (data.length === 0) {
                console.warn("No data received from the API.");
                return;
            }
    
            const labels = data.map(item => item.AllocationDate); // Get dates
            const allocatedData = data.map(item => item.AllocatedCount);
            const unallocatedData = data.map(item => item.UnallocatedCount);
            const draftData = data.map(item => item.DraftCount);
            const benchData = data.map(item => item.BenchCount);
    
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Allocated',
                        data: allocatedData,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: true,
                    },
                    {
                        label: 'Unallocated',
                        data: unallocatedData,
                        borderColor: 'rgba(255,99,132,1)',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        fill: true,
                    },
                    {
                        label: 'Draft',
                        data: draftData,
                        borderColor: 'rgba(54,162,235,1)',
                        backgroundColor: 'rgba(54,162,235,0.2)',
                        fill: true,
                    },
                    {
                        label: 'Bench',
                        data: benchData,
                        borderColor: 'rgba(153,102,255,1)',
                        backgroundColor: 'rgba(153,102,255,0.2)',
                        fill: true,
                    },
                ],
            });
    
            // Update allocation counts
            setAllocationCounts({
                allocated: allocatedData.reduce((a, b) => a + parseInt(b || 0, 10), 0),
                unallocated: unallocatedData.reduce((a, b) => a + parseInt(b || 0, 10), 0),
                draft: draftData.reduce((a, b) => a + parseInt(b || 0, 10), 0),
                bench: benchData.reduce((a, b) => a + parseInt(b || 0, 10), 0)
            });            
        } catch (error) {
            console.error(`Error fetching data from overall chart API:`, error);
        }
    };
    
    

    // Function to fetch chart data for a specific range
    const fetchChartData = async (startDate, endDate) => {
        const response = await fetch(`http://localhost:7071/api/employees/allocations?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();

        const labels = data.map(item => item.AllocationDate); // Get dates
        const allocatedData = data.map(item => item.AllocatedCount);
        const unallocatedData = data.map(item => item.UnallocatedCount);
        const draftData = data.map(item => item.DraftCount);
        const benchData = data.map(item => item.BenchCount);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Allocated',
                    data: allocatedData,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
                {
                    label: 'Unallocated',
                    data: unallocatedData,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    fill: true,
                },
                {
                    label: 'Draft',
                    data: draftData,
                    borderColor: 'rgba(54,162,235,1)',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    fill: true,
                },
                {
                    label: 'Bench',
                    data: benchData,
                    borderColor: 'rgba(153,102,255,1)',
                    backgroundColor: 'rgba(153,102,255,0.2)',
                    fill: true,
                },
            ],
        });

        // Update allocation counts
        setAllocationCounts({
            allocated: allocatedData.reduce((a, b) => a + b, 0),
            unallocated: unallocatedData.reduce((a, b) => a + b, 0),
            draft: draftData.reduce((a, b) => a + b, 0),
            bench: benchData.reduce((a, b) => a + b, 0)
        });
    };

    useEffect(() => {
        // Fetch overall data when the component mounts
        fetchOverallChartData();
    }, []);

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            fetchChartData(formData.startDate, formData.endDate);
        }
    }, [formData]);

    const handleChange = (e, { name, value }) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClear = () => {
        setFormData({
            startDate: '',
            endDate: ''
        });
        setChartData({
            labels: [],
            datasets: []
        });
        setAllocationCounts({
            allocated: 0,
            unallocated: 0,
            draft: 0,
            bench: 0
        });

        // Refresh the page
        window.location.reload();
    };

    return (
        <div className="line-chart-container" style={{ width: '60%',display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
                <h2>Employee Allocation Overview</h2>
                <div className='filter-tabs'>
                    <Input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder="Start Date"
                        aria-label="Start Date"
                    />
                    <Input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        placeholder="End Date"
                        aria-label="End Date"
                    />
                    <Button onClick={handleClear} primary>Clear</Button>
                </div>
                <div className="chart-container">
                    <Line 
                        data={chartData} 
                        options={{
                            scales: {
                                x: {
                                    type: 'category', // Use category for string labels
                                    title: {
                                        display: true,
                                        text: 'Dates',
                                    },
                                    ticks: {
                                        callback: (value) => {
                                            // Ensure value is a string
                                            if (typeof value === 'string') {
                                                const dateParts = value.split('-'); // Split the date string
                                                return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Format as DD/MM/YYYY
                                            }
                                            return value; // Fallback in case of unexpected type
                                        },
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Number of Employees',
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LineChart;