export interface Transaction {
    _id: string;
    type: string;
    amount: number;
    description: string;
    comments?: string;
    currency: string;
    exchangeRate?: number;
    transactionDate: Date;
  }

// Asegúrate de que React esté disponible globalmente
import React from 'react';

 // Declaración de módulo para react-number-format
declare module 'react-number-format' {
  interface NumberFormatProps {
    value: number | string;
    thousandSeparator?: boolean | string;
    prefix?: string;
    suffix?: string;
    onValueChange?: (values: {
      value: string;
      floatValue: number | undefined;
      formattedValue: string;
    }) => void;
    // Agrega otros props que necesites
  }

  export default class NumberFormat extends React.Component<NumberFormatProps> {}
}