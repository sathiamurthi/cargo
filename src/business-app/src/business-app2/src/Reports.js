import React, { useState } from 'react';
import { Table, Button, Dropdown, Pagination, Input, Form } from 'semantic-ui-react';

const Reports = () => {
  const [reportType, setReportType] = useState('Driver Performance');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reports, setReports] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const reportOptions = [
    { text: 'Driver Performance', value: 'Driver Performance' },
    { text: 'Shipment Summary', value: 'Shipment Summary' },
    // Add more report types if needed
  ];

  const handleGenerateReport = () => {
    // Dummy data generation logic
    const dummyReports = [
      { driverName: 'John Doe', totalShipments: 1, onTimeDeliveries: 0, lateDeliveries: 0 },
      // Add more report entries for demonstration
    ];
    setReports(dummyReports);
  };

  const handlePageChange = (e, { activePage }) => setActivePage(activePage);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reports</h2>
      <p>Generate and analyze performance reports for drivers and shipments.</p>

      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <Dropdown
              placeholder='Select Report Type'
              selection
              options={reportOptions}
              value={reportType}
              onChange={(e, { value }) => setReportType(value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Button primary onClick={handleGenerateReport}>Generate Report</Button>
          </Form.Field>
        </Form.Group>
      </Form>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Driver Name</Table.HeaderCell>
            <Table.HeaderCell>Total Shipments</Table.HeaderCell>
            <Table.HeaderCell>On-Time Deliveries</Table.HeaderCell>
            <Table.HeaderCell>Late Deliveries</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reports.slice((activePage - 1) * 5, activePage * 5).map((report, index) => (
            <Table.Row key={index}>
              <Table.Cell>{report.driverName}</Table.Cell>
              <Table.Cell>{report.totalShipments}</Table.Cell>
              <Table.Cell>{report.onTimeDeliveries}</Table.Cell>
              <Table.Cell>{report.lateDeliveries}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(reports.length / 5)}
      />
    </div>
  );
};

export default Reports;
