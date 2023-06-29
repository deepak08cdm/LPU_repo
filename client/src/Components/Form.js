import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/reducer";

function Form(props) {

    const [formData, setFormData] = useState({})
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const pattern = /edit/g
    const dispatch = useDispatch()

    const handleClick = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const clearData = () => {
        console.log('clearData called')
        setFormData({name:'',email:'',id:''})
    }
    const addDataToRedux = ()=>{
        dispatch(addUser(formData))
    }
    const addData = async () => {
        try {
            if (pattern.test(location.pathname)) {
                const res = await axios.put('http://localhost:3001/users/' + params.id,formData)
                props.getCall()
                navigate('/')
            }
            else {
                const res = await axios.post('http://localhost:3001/users', formData)
                props.getCall()
                clearData()
                return toast.success('data added successfully')
            }
        }
        catch (err) {
            console.log(err)
            return toast.error(err)
        }
    }

    const fetchEditData = async (id) => {
        try {
            const data = await axios.get('http://localhost:3001/users/' + id)
            setFormData(data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        
        if (pattern.test(location.pathname)) {
            fetchEditData(params.id)
        }
        else{
            console.log(location)
            clearData()
        }
    }, [location])

    return (
        <>
            <div>
                <form>
                    <label htmlFor="name">Name: </label>
                    <input type='text' value={formData.name} name='name' onChange={(e) => { handleClick(e) }} />
                    <br />
                    <label htmlFor="email">E-mail: </label>
                    <input type='text' value={formData.email} name='email' onChange={(e) => { handleClick(e) }} />
                    <br />
                    <label htmlFor="id">ID: </label>
                    <input type='text' value={formData.id} name='id' onChange={(e) => { handleClick(e) }} />
                    <br />
                    <input type="button" value='Add user' onClick={addDataToRedux} />
                    <input type='button' value='Clear' onClick={clearData} />
                </form>
            </div>
        </>
    )
}

export default Form

// on Add user :- make a post api call and add user details to the backedn server
// on clear :- claer whole input tag

// we have a rule that key of object can only be string or number