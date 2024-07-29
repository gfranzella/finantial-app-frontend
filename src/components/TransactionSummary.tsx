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
            if (curr.type === 'ingreso') {
                console.log('este es curr de ingreso',curr);
                const amountToAdd = curr.currency === 'VES' ? (curr.convertedValue || 0) : curr.amount;
                console.log('amount to add',amountToAdd);
                return acc + amountToAdd;
            }
            return acc;
        }, 0);
        const totalEgresos = transactions.reduce((acc, curr) => {
            if (curr.type === 'egreso') {
                // console.log('este es curr de egreso',curr);
                const amountToSubstract = curr.currency === 'VES' ? (curr.convertedValue || 0) : curr.amount;
                return acc + amountToSubstract;
            }
            return acc;
            // return curr.type === 'egreso' ? acc + curr.amount : acc;
        }, 0);
        console.log('total ingresos', totalIngresos);
        console.log('total egresos', totalEgresos);
        const total = totalIngresos - totalEgresos;
        setTotals({ ingresos: totalIngresos, egresos: totalEgresos, balance: total });
    };

    function formatNumber(value: number) {
        // console.log("Value before formatting:", value);
        return new Intl.NumberFormat('de-DE', { // Ajusta el 'locale' según necesites
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      }

    return (
        <Container>
            <Row className="align-items-center g-2 ">
                    <Col sm={12} md={2}>
                        <p><strong>Total Ingresos:</strong> ${formatNumber(totals.ingresos)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <p><strong>Total Egresos:</strong> ${formatNumber(totals.egresos)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <p><strong>Balance:</strong> ${formatNumber(totals.balance)}</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <Button variant="primary" onClick={calculateTotals}>Calcular Totales</Button>
                    </Col>
                </Row>
        </Container>
    );
};

export default TransactionSummary;
