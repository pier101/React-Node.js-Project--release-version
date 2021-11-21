import React,{useState,useEffect} from 'react'
import {Box,Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';






const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'orderQty',
        headerName: '수량',
        width: 60,
        editable: true,
      },
    {
        field: 'goods_color',
        headerName: '색상',
        width: 90,
        editable: true,
      },
    {
        field: 'goods_size',
        headerName: '사이즈',
        type: 'number',
        width: 70,
        editable: true,
      },
    {
      field: 'buyer_hp',
      headerName: '핸드폰번호',
      width: 150,
      editable: true,
    },
    {
      field: 'buyer_address',
      headerName: '주소',
      width: 450,
      editable: true,
    },
    {
      field: 'buyer_email',
      headerName: '이메일',
      width: 150,
      editable: true,
    },
    {
      field: 'orderCreated',
      headerName: '구매시간',
      width: 140,
      editable: true,
    },
    {
      field: 'goodsNum',
      headerName: '상품번호',
      width: 110,
      editable: true,
    },
    {
      field: 'userId',
      headerName: '유저아이디',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];
  //           1	5	purple	105	임철순		소녀시대	2021-11-19 05:17:47	1	soon12
  




export default function Post() {
 const [rows,setRows] = useState([
 { id: 0, lastName: 'Snow', firstName: 'Jon', age: 35 },
 { id: 0, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
 { id: 0, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
 { id: 3, lastName: 'Stark', firstName: 'Arya', age: 16 },
 { id: 0, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
 { id: 0, lastName: 'Melisandre', firstName: null, age: 150 },
 { id: 0, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
 { id: 0, lastName: 'Frances', firstName: 'Rossini', age: 36 },
 { id: 1, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
])
 useEffect(()=>{  
    axios.get(`http://localhost:5000/admin/goodsCard`)
   .then( (res)=>{setRows(res.data)})
},[])
console.log(rows)
    return (
        <>
            <Paper sx={{mx:'10%'}}>
            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>배송지확인</Box>
            <Box sx={{ mx:'5%', m:1, textAlign: 'center', }}>    
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
                </div>
            </Box>
        </Paper>
        </>
    )
}
