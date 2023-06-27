import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MainTable(props) {
    const navigate = useNavigate()
    const deleteRow = async(id)=>{
        try{
            const res = await axios.delete('http://localhost:3001/users/'+id)
            props.getCall()
            return toast.success('item deleted successfully')
        }
        catch(err){
            return toast.err('internal error happend')
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align='center'>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{deleteRow(row.id)}}>
                                        Delete
                                    </Button>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{navigate('/edit/'+row.id)}}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MainTable






/**
 * post api call to add data to backend
 * now make a get call to data
 * delete call to delete the data from backend
 * now make a get call again
 */