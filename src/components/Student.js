import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
import { Paper } from '@mui/material';

export default function BasicTextFields() {

    const [name, setName] = useState('');
    const [rno, setRno] = useState('');
    const [age, setAge] = useState('');
    const [students, setStudents] = useState([]);

    function addToDb(e) {
        const student = {name,rno,age};
        fetch("http://localhost:8080/student",
        {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)}
        ).then(()=>{console.log("New Student Created");})
    }

    function removeFromDb(roll) {
        fetch(`http://localhost:8080/student/${roll}`,
        {method:"DELETE"}).then(()=>{console.log("Deletion Successful")});
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        })
    },[students]);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="nameBox" label="Name" variant="standard" 
      onChange={(inputName)=>setName(inputName.target.value)} />
      <TextField id="rnoBox" label="RollNum" variant="standard" 
      onChange={(inputRno)=>setRno(inputRno.target.value)}/>
      <TextField id="ageBox" label="Age" variant="standard" 
      onChange={(inputAge)=>setAge(inputAge.target.value)}/>

    <Stack spacing={2} direction="row">
    <Button variant="contained" onClick={()=>addToDb()}>SUBMIT</Button>
    </Stack>
    
    <Paper elevation={8}>
    {students.map(st=>(
        <Paper>
        <p> Name:{st.name} <br></br></p>
        <p> Rno:{st.rno} <br></br></p>
        <p>Age:{st.age} </p>
        <Button variant="contained" onClick={()=>removeFromDb(st.rno)}>Delete</Button>
        <br></br>
        </Paper>
    ))}
    </Paper>
    </Box>


  );
}
