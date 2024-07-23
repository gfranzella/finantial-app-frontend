import React from 'react';
import { Table } from 'react-bootstrap';
import { Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import moment from 'moment';
import { Transaction } from '../types';


interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onSort: (key: keyof Transaction, type?: string) => void;  // Añade un argumento opcional para el tipo
  sortConfig: {
    key: keyof Transaction | null;
    direction: 'ascending' | 'descending';
    type?: string;
  };
}

const headers = [
  { label: 'Tipo', key: 'type', width:'70px'},
  { label: 'Descripción', key: 'description', width:'150px'},
  { label: 'Comentario', key: 'comments', width:'150px' },
  { label: 'Ingreso', key: 'amount', type: 'ingreso', width:'150px' },  // Ejemplo de cómo manejar tipos
  { label: 'Egresos', key: 'amount', type: 'egreso', width:'150px' },
  { label: 'Moneda', key: 'currency', width:'90px' },
  { label: 'Tasa', key: 'exchangeRate', width:'70px' },
  { label: 'Valor Convertido', key: 'convertedValue', width:'250px' },
  { label: 'Fecha Transacción', key: 'transactionDate', width:'250px' },
  { label: 'Usuario', key: 'userName', width:'150px' }
];

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, onSort, sortConfig }) => {
  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    if (!date.isValid()) {
      return "Invalid Date";
    }
    return date.format('YYYY/MM/DD');
  };

  function formatNumber(value: number) {
    // console.log("Value before formatting:", value);
    return new Intl.NumberFormat('de-DE', { // Ajusta el 'locale' según necesites
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  const calculateConvertedValue = (amount: number, exchangeRate: number | undefined) => {
    if (!exchangeRate) return 'N/A';
    return formatNumber(amount / exchangeRate);
  };

  return (
    <div>
      <h2 className='pb-4'>Transacciones</h2>
      <Table striped bordered hover>
        <thead>
        <tr>
          {headers.map(header => (
            <th key={header.label} onClick={() => onSort(header.key as keyof Transaction, header.type)} style={{width: header.width, cursor: 'pointer'}}>
              {header.label}
              {sortConfig.key === header.key && sortConfig.type === header.type && (
                sortConfig.direction === 'ascending' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
              )}
            </th>
          ))}
          <th style={{width:'100px'}}>Acciones</th>
        </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: any) => (
            <tr key={transaction._id}>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.comments}</td>
              <td style={{color:'green', fontWeight:'bold'}}>{transaction.type === "ingreso" ? formatNumber(transaction.amount) : ""}</td>
              <td style={{color:'red', fontWeight:'bold'}}>{transaction.type === "egreso" ? formatNumber(-transaction.amount) : ""}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.exchangeRate || 'N/A'}</td>
              <td>
                {transaction.currency === 'VES' ? '$' + calculateConvertedValue(transaction.amount, transaction.exchangeRate) : 'N/A'}
              </td>
              <td>{formatDate(transaction.transactionDate)}</td>
              <td>{transaction.userName || 'No Registrado'}</td>
              <td>
                <button onClick={() => onEdit(transaction)} style={{ border: 'none', background: 'none', marginRight: '10px' }}>
                  <Pencil color="blue" size={20} />
                </button>
                <button onClick={() => onDelete(transaction._id)} style={{ border: 'none', background: 'none' }}>
                  <Trash2 color="red" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionList;
