// import React, { useState, useEffect, useMemo } from 'react';
// import { Container, Modal, Button  } from 'react-bootstrap';
// import TransactionForm from '../components/TransactionForm';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilter';
// import TransactionSummary from '../components/TransactionSummary';
// import axios from '../axiosConfig';
// import { Transaction } from '../types';
import React from 'react';
import TransactionTabs from '../components/TransactionTab';



const HomePage: React.FC = () => {
  return (
    <div>
      <TransactionTabs />
    </div>
  );
};
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [filter, setFilter] = useState<string>('');
//   const [editing, setEditing] = useState<boolean>(false);
//   const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof Transaction | null;
//     direction: 'ascending' | 'descending';
//     type?: string;  // Agregar esto si aún no está
//   }>({ key: null, direction: 'ascending' });
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);



//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await axios.get<Transaction[]>('/transactions');
//         const enrichedTransactions = res.data.map(transaction => ({
//           ...transaction,
//           convertedValue: transaction.currency === 'VES' ? transaction.amount / (transaction.exchangeRate || 1) : transaction.amount
//         }));
//         // console.log("Transactions fetched:", res.data);
//         setTransactions(enrichedTransactions);
//         // setTransactions(res.data);
//       } catch (err) {
//         console.error('Error fetching transactions:', err);
//       }
//     };

//     fetchTransactions();
//   }, []);


//   // Usamos useMemo para calcular transacciones filtradas y ordenadas
//   const processedTransactions = useMemo(() => {
//     let processed = [...transactions];
//     // console.log("Original transactions:", processed);
//     // console.log("filters ", processed.filter(transaction => transaction.userName));
    

//     // Filtrar
//     if (filter) {
//       const lowercasedFilter = filter.toLowerCase();
//       processed = processed.filter(transaction =>
//         transaction.description.toLowerCase().includes(lowercasedFilter) ||
//         transaction.type.toLowerCase().includes(lowercasedFilter) ||
//         transaction.amount.toString().includes(lowercasedFilter) ||
//         (transaction.comments && transaction.comments.toLowerCase().includes(lowercasedFilter)) ||
//         (transaction.userName && transaction.userName.toLowerCase().includes(lowercasedFilter))
//       );
//     }

//     // Filtrar por rango de fechas
//     if (startDate || endDate) {
//       processed = processed.filter(transaction => {
//           const transactionDate = new Date(transaction.transactionDate);
//           return (!startDate || transactionDate >= startDate) && 
//                 (!endDate || transactionDate <= endDate);
//       });
//     }

//     // Ordenar
//     if (sortConfig.key) {
//       processed.sort((a, b) => {
//         const aValue = a[sortConfig.key!]; // Using non-null assertion operator (!)
//         const bValue = b[sortConfig.key!]; // Assuming key is not null
//         const sortOrder = sortConfig.direction === 'ascending' ? 1 : -1;

//         if (typeof aValue === 'number' && typeof bValue === 'number') {
//           return sortOrder * (aValue - bValue);
//         }
//         if (typeof aValue === 'string' && typeof bValue === 'string') {
//           return sortOrder * aValue.localeCompare(bValue);
//         }
//         return 0;
//       });
//       // console.log("Sorted transactions:", processed);
//     }
//     return processed;
//   }, [transactions, filter, sortConfig, endDate, startDate]);


//   const onEdit = (transaction: Transaction) => {
//     setEditing(true);
//     setCurrentTransaction(transaction);
//   };

//   // Función para manejar la eliminación de una transacción
//   const onDelete = (id: string) => {
//     if (window.confirm('¿Estás seguro de querer eliminar esta transacción?')) {
//       axios.delete(`${process.env.REACT_APP_BACKEND_URL}/transactions/${id}`)
//         .then(() => {
//           setTransactions(transactions.filter(t => t._id !== id));
//           console.log('Transacción eliminada con éxito');
//         })
//         .catch(error => {
//           console.error('Error al eliminar la transacción', error);
//           alert('No se pudo eliminar la transacción');
//         });
//     }
//   };


//   const handleTransactionSave = (transactionData: Transaction) => {
//     if (transactionData._id) {
//       saveEditedTransaction(transactionData);
//     } else {
//       addTransaction(transactionData);
//     }
//   };

//   const addTransaction = async (transaction: Transaction) => {
//     const { _id, ...newTransaction } = transaction;
//     try {
//       console.log("Data being sent on add:", newTransaction);
//       const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transactions`, newTransaction);
//       setTransactions([...transactions, res.data]); // Asumiendo que res.data contiene la transacción añadida
//       console.log('Transacción añadida con éxito');
//     } catch (err) {
//       console.error('Error al añadir la transacción', err);
//     }
//   };
  
//   const saveEditedTransaction = (transactionData: Transaction) => {
//     console.log("Saving transaction with ID:", transactionData._id);
//     if (transactionData._id) {
//       axios.put(`${process.env.REACT_APP_BACKEND_URL}/transactions/${transactionData._id}`, transactionData)
//         .then(response => {
//           // Aquí deberías actualizar el estado con la transacción modificada
//           setTransactions(transactions.map(t => t._id === transactionData._id ? { ...t, ...response.data } : t));
//           setEditing(false);  // Asumiendo que se cierra el formulario de edición
//           console.log('Transacción actualizada con éxito');
//         })
//         .catch(error => {
//           console.error('Error actualizando la transacción', error);
//           alert('No se pudo actualizar la transacción');
//         });
//     } else {
//       // Manejar la creación de una nueva transacción si no hay _id
//       addTransaction(transactionData);
//     }
//   };

//   const sortTransactions = (key: keyof Transaction, type?: string) => {
//     setSortConfig(oldConfig => {
//       const isAscending = oldConfig.key === key && oldConfig.direction === 'ascending';
//       const newDirection = isAscending ? 'descending' : 'ascending';
  
//       const sortedTransactions = [...transactions].sort((a, b) => {
//         const aValue = key === 'convertedValue' && a.currency === 'VES' ? (a.amount * (a.exchangeRate || 1)) : a[key];
//         const bValue = key === 'convertedValue' && b.currency === 'VES' ? (b.amount * (b.exchangeRate || 1)) : b[key];
  
//         if (typeof aValue === 'number' && typeof bValue === 'number') {
//           return newDirection === 'ascending' ? aValue - bValue : bValue - aValue;
//         }
  
//         return newDirection === 'ascending' ? 
//           String(aValue).localeCompare(String(bValue)) :
//           String(bValue).localeCompare(String(aValue));
//       });
  
//       setTransactions(sortedTransactions);
//       return { key, direction: newDirection, type };
//     });
//   };
  
  
//   const onDateRangeChange = (startDate: Date | undefined, endDate: Date | undefined) => {
//     // console.log(startDate, endDate);
//     setStartDate(startDate);
//     setEndDate(endDate);
    
// };

//   return (
//     <Container>
//       <h1 className="my-5 text-center">Gestión de Finanzas</h1>
      
//       <div className="mb-2">
//         <TransactionForm onSave={handleTransactionSave}/>
//       </div>
//       <h2 className='mt-5 pb-4'>Cálculos</h2>
//       <div className="mb-5">
//         <TransactionSummary transactions={processedTransactions} />
//       </div>
//       <h2 className='mt-5 pb-4'>Filtros</h2>
//       <div className="mb-5">
//         <TransactionFilters onFilterChange={setFilter} onDateRangeChange={onDateRangeChange} />
//       </div>
//       <div className="mb-5">
//         <TransactionList
//         transactions={processedTransactions}
//         onEdit={onEdit}
//         onDelete={onDelete}
//         onSort={sortTransactions}
//         sortConfig={sortConfig}
//       />
//       </div>
      

//       <Modal show={editing} onHide={() => setEditing(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Editar Transacción</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <TransactionForm transaction={currentTransaction} onSave={handleTransactionSave} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setEditing(false)}>
//             Cerrar
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </Container>
//   );
// };

export default HomePage;
