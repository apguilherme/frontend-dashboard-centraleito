import * as React from 'react';
import api from '../api';
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgress, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Modal from './Modal';
import Card from './Card';

export default function DataTable() {

  const [rows, setRows] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedBed, setSelectedBed] = React.useState({});

  const columns = [
    { field: 'id', headerName: 'ID leito', width: 150 },
    { field: 'name', headerName: 'Paciente', width: 200 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'uf', headerName: 'UF', width: 100 },
    { field: 'age', headerName: 'Idade', width: 150 },
    { field: 'document', headerName: 'Documento', width: 150 },
    { field: 'time_waiting', headerName: 'Tempo', width: 150 },
    { field: 'contact', headerName: 'Contato', width: 150 },
    { field: 'severity', headerName: 'Severidade', width: 150 },
    { field: 'sex', headerName: 'Sexo', width: 150 },
    {
      field: 'actions', headerName: 'Ações', width: 150, renderCell: (params) => {
        return (<a href="#">Edit</a>)
      }
    },
  ];

  React.useEffect(() => {
    setLoad(true);
    api.get("/hospitals", { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        let r = [];
        if (res.data.length > 0) {
          let beds = res.data[0].beds;
          for (let bed of beds) {
            r.push({
              id: bed?._id,
              name: bed?.name,
              city: bed?.city,
              uf: bed?.uf,
              age: bed?.age,
              document: bed?.document,
              time_waiting: bed?.time_waiting,
              contact: bed?.contact,
              severity: bed?.severity,
              sex: bed?.sex,
              actions: "Edit"
            });
          }
        }
        setRows(r);
        setLoad(false);
      });
  }, [showModal]);

  const handleRowClick = async (param, event) => {
    setLoad(true);
    event.stopPropagation();
    await api.get(`/bed/${param.row.id}`, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        setSelectedBed(res.data);
      });
    setLoad(false);
    setShowModal(true);
  };

  const handlenewBed = () => {
    setSelectedBed(null);
    setShowModal(true);
  }

  return (
    <div style={{ height: 400, width: '100%' }}>

      <Card />

      <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
        <h2>Leitos</h2>
        <Button size="small" variant="contained" color="primary" onClick={handlenewBed} style={{marginLeft: "16px"}}><AddIcon /> Novo leito</Button>
      </div>

      {
        load ? <CircularProgress color="secondary" /> :
          <DataGrid rows={rows} columns={columns} pageSize={10} onRowClick={handleRowClick} />
      }
      {
        showModal && <Modal showModal={showModal} setShowModal={setShowModal} selectedBed={selectedBed} />
      }
    </div>
  );
}
