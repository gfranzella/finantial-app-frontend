import React, { useEffect, useState }from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from '@clerk/clerk-react';
import { Transaction } from '../types';
import { NumericFormat } from 'react-number-format'; 

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface TransactionFormProps {
  transaction?: Transaction | null; // Opcional, usado para la edición
  onSave: (transaction: any) => void; // Maneja tanto agregar como actualizar
}

const initialState = {
  _id: '',
  type: '',
  description: '',
  comments: '',
  amount: 0.00,
  currency: 'USD',
  exchangeRate: 1,
  transactionDate: new Date()
};

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onSave }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState(initialState);
  const [amountError, setAmountError] = useState<boolean>(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...initialState, // Comienza con valores predeterminados
        ...transaction, // Sobreescribe con valores de la transacción
        comments: transaction.comments || '', // Asegúrate de que comments es siempre string
        transactionDate: new Date(transaction.transactionDate || new Date()) // Maneja fechas no válidas
      });
    } else {
      setFormData(initialState); // Limpia el formulario si no hay transacción
    }
  }, [transaction]);

  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, transactionDate: date || new Date() });
  };

  const handleAmountChange = (values: { value: string; floatValue: number | undefined; formattedValue: string }) => {
    const { floatValue } = values;
    setFormData({ ...formData, amount: floatValue || 0 });
    setAmountError(floatValue === undefined || floatValue === null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("monto ",formData.amount );
    e.preventDefault();
    if (user) {
      if (formData.amount === undefined || formData.amount === null) {
        setAmountError(true);
        return;
      }
      const transactionData = {
        ...formData,
        userId: user.id,
        userName: user.fullName
      };
      onSave(transactionData); // Usa onSave para manejar la lógica de agregar o actualizar
    } else {
      console.error('User is not authenticated');
    }
    // onSave(formData); // Usa onSave para manejar la lógica de agregar o actualizar
    setFormData(initialState); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    console.log("e punto target --> ", e);
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Tipo de operación</Form.Label>
        <Col sm={10}>
          <Form.Control 
            as="select" 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            placeholder="Tipo de operación" 
            required 
          >
            <option value="">Seleccione</option>
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Descripción</Form.Label>
        <Col sm={10}>
          <Form.Control 
            as="select"
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Descripción" 
            required 
          >
            <option value="">Seleccione</option>
            <option value="VEN - OF - 83">Venezuela | Oficina 8-3</option>
            <option value="VEN - OF - 93">Venezuela | Oficina 9-3</option>
            <option value="VEN - LOCAL">Venezuela | Local Comercial</option>
            <option value="VEN - APTO - 2B">Venezuela | Apto 2-B</option>
            <option value="VEN - APTO - 6B">Venezuela | Apto 6-B</option>
            <option value="ESP - VALLADOLID">España | Valladolid</option>
            <option value="ESP - BARAJAS">España | Barajas</option>
            </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Comentarios</Form.Label>
        <Col sm={10}>
          <Form.Control 
            name="comments" 
            value={formData.comments} 
            onChange={handleChange} 
            placeholder="Comentarios" 
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Monto</Form.Label>
        <Col sm={10}>
        <NumericFormat
            className={`form-control ${amountError ? 'is-invalid' : ''}`}
            value={formData.amount}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            onValueChange={handleAmountChange}
            placeholder="Monto"
          />
          {amountError && <div className="invalid-feedback">Monto es requerido</div>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Moneda</Form.Label>
        <Col sm={10}>
          <Form.Control 
            as="select" 
            name="currency" 
            value={formData.currency} 
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="VES">VES</option>
          </Form.Control>
        </Col>
      </Form.Group>
      {formData.currency === 'VES' && (
        <Form.Group as={Row} className='mb-1'>
          <Form.Label column sm={2}>Tasa de cambio</Form.Label>
          <Col sm={10}>
            <Form.Control 
              name="exchangeRate" 
              type="number" 
              value={formData.exchangeRate} 
              onChange={handleChange} 
              placeholder="Tasa de cambio" 
            />
          </Col>
        </Form.Group>
      )}
      <Form.Group as={Row} className='mb-1'>
        <Form.Label column sm={2}>Fecha de la transacción</Form.Label>
        <Col sm={10}>
          <DatePicker
            selected={formData.transactionDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="form-control" // Para aplicar estilos de Bootstrap
          />
        </Col>
      </Form.Group>
      <Button type="submit">Guardar</Button>
    </Form>
  );
};

export default TransactionForm;
