import React, { useState } from 'react';
import { Row, Col, Form   } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TransactionFiltersProps {
    onFilterChange: (filter: string) => void;
    onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  }

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onFilterChange, onDateRangeChange }) => {
    const [filter, setFilter] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        onFilterChange(newFilter);
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date || undefined);
        onDateRangeChange(date || undefined, endDate);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date || undefined);
        onDateRangeChange(startDate, date || undefined);
    };

    return (
            <Form>
                <Row className="align-items-center g-2">
                    <Col sm={12} md={3}>
                        <Form.Group controlId="filterText">
                            <Form.Control
                                type="text"
                                placeholder="Filtrar transacciones..."
                                value={filter}
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={2}>
                        <Form.Group controlId="startDate">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                isClearable
                                placeholderText="Fecha Desde"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={3}>
                        <Form.Group controlId="endDate">
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                isClearable
                                placeholderText="Fecha Hasta"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        
    );
};

export default TransactionFilters;
