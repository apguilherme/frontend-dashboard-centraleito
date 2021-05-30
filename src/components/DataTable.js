import * as React from 'react';
import api from '../api';
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgress } from '@material-ui/core';

import Modal from './Modal';

export default function DataTable() {

  const [rows, setRows] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedHospital, setSelectedHospital] = React.useState([]);

  const columns = [
    //{ field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Unidade', width: 200 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'uf', headerName: 'UF', width: 150 },
    { field: 'address', headerName: 'Endereço', width: 150 },
    { field: 'num_beds', headerName: 'Leitos', width: 150 },
    { field: 'num_beds_occupied', headerName: 'Ocupados', width: 150 },
    { field: 'rate_occupied', headerName: 'Tax Ocup.', width: 150 },
    { field: 'person_contact', headerName: 'Contato', width: 150 },
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
        for (let item of res.data) {
          r.push({
            id: item?._id,
            name: item?.name,
            city: item?.city,
            uf: item?.uf,
            address: item?.address,
            num_beds: item?.num_beds,
            num_beds_occupied: item?.num_beds_occupied,
            rate_occupied: item?.num_beds > 0 ? `${((item?.num_beds_occupied / item?.num_beds) * 100).toFixed(1)} %` : "Zero leitos",
            person_contact: item?.person_contact,
            actions: "Edit"
          })
        }
        setRows(r);
        setLoad(false);
      });
  }, [showModal]);

  const handleRowClick = async (param, event) => {
    setLoad(true);
    event.stopPropagation();
    await api.get(`/hospital/${param.row.id}`, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        setSelectedHospital({
          _id: res.data._id,
          ownerId: res.data.ownerId,
          name: res.data.name,
          city: res.data.city,
          uf: res.data.uf,
          address: res.data.address,
          num_beds: res.data.num_beds,
          num_beds_occupied: res.data.num_beds_occupied,
          num_waiting: res.data.num_waiting,
          time_waiting: res.data.time_waiting,
          person_name: res.data.person_name,
          person_contact: res.data.person_contact
        });
      });
    setLoad(false);
    setShowModal(true);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {
        load ? <CircularProgress color="secondary" /> :
          <DataGrid rows={rows} columns={columns} pageSize={5} onRowClick={handleRowClick} />
      }
      {
        showModal && <Modal showModal={showModal} setShowModal={setShowModal} selectedHospital={selectedHospital} />
      }
    </div>
  );
}
