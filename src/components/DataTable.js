import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Unidade', width: 200 },
  { field: 'city', headerName: 'Cidade', width: 200 },
  { field: 'state', headerName: 'Estado', width: 150},
  { field: 'address', headerName: 'Endereço', width: 150},
  { field: 'quantity', headerName: 'Leitos', width: 150},
  { field: 'occupied', headerName: 'Ocupados', width: 150},
];

const rows = [
  { id: 1, name: 'Snow', city: 'Jon', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 2, name: 'Lannister', city: 'Cersei', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 3, name: 'Lannister', city: 'Jaime', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 4, name: 'Stark', city: 'Arya', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 5, name: 'Targaryen', city: 'Daenerys', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 6, name: 'Melisandre', city: "Ok", state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 7, name: 'Clifford', city: 'Ferrara', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 8, name: 'Frances', city: 'Rossini', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
  { id: 9, name: 'Roxie', city: 'Harvey', state: "SP", address: "aaa", quantity: 10, occupied: 9 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
