import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import GestionPropiedades from './GestionPropiedades';
import GestionBarajas from './GestionBarajas';

const TransactionTabs: React.FC = () => {

  return (
    <Tabs defaultActiveKey="home" id="transaction-tabs">
      <Tab eventKey="home" title="Finanzas al 50%">
        <GestionPropiedades />
      </Tab>
      <Tab eventKey="profile" title="Finanzas Barajas">
        <GestionBarajas />
      </Tab>
    </Tabs>
  );
};

export default TransactionTabs;
