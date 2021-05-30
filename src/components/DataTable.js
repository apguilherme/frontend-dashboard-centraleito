import * as React from 'react';
import api from '../api';
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgress } from '@material-ui/core';

export default function DataTable() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Unidade', width: 200 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'uf', headerName: 'UF', width: 150 },
    { field: 'address', headerName: 'Endereço', width: 150 },
    { field: 'num_beds', headerName: 'Leitos', width: 150 },
    { field: 'num_beds_occupied', headerName: 'Ocupados', width: 150 },
    { field: 'person_contact', headerName: 'Contato', width: 150 },
  ];

  const [rows, setRows] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    setLoad(true);
    api.get("/hospitals", {headers: {"x-access-token": localStorage.getItem("contraleito-token")}})
      .then(res => {
        let r = [];
        for (let item of res.data){
          r.push({
            id: item?._id, 
            name: item?.name, 
            city: item?.city, 
            uf: item?.uf, 
            address: item?.address, 
            num_beds: item?.num_beds, 
            num_beds_occupied: item?.num_beds_occupied,
            person_contact: item?.person_contact,
          })
        }
        setRows(r);
        setLoad(false);
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {
        load ? <CircularProgress color="secondary" /> :
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      }
    </div>
  );
}
