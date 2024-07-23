import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Transaction } from '../types';  // Asegúrate de que la ruta sea correcta

interface TransactionSummaryProps {
    transactions: Transaction[];
}

interface Totals {
    ingresos: number;
    egresos: number;
    balance: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ transactions }) => {
    const [totals, setTotals] = useState<Totals>({ ingresos: 0, egresos: 0, balance: 0 });

    const calculateTotals = () => {
        const totalIngresos = transactions.reduce((acc, curr) => {
            return curr.type === 'ingreso' ? acc + curr.amount : acc;
        }, 0);
        const totalEgresos = transactions.reduce((acc, curr) => {
            return curr.type === 'egreso' ? acc + curr.amount : acc;
        }, 0);

        const total = totalIngresos - totalEgresos;
        setTotals({ ingresos: totalIngresos, egresos: totalEgresos, balance: total });
    };

    return (
        <Container>
            {/* <Button variant="primary" onClick={calculateTotals}>Calcular Totales</Button>
            <div className="mt-3">
                
                
                
            </div> */}
            <Row className="align-items-center g-2 ">
                    <Col sm={12} md={2}>
                        <p><strong>Total Ingresos:</strong> ${totals.ingresos.toFixed(2)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <p><strong>Total Egresos:</strong> ${totals.egresos.toFixed(2)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <p><strong>Balance:</strong> ${totals.balance.toFixed(2)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <Button variant="primary" onClick={calculateTotals}>Calcular Totales</Button>
                    </Col>
                </Row>
        </Container>
    );
};

export default TransactionSummary;
