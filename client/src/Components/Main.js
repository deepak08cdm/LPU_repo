import  {useState} from 'react'

function Main(props){
    const [name, setName] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    async function fetchData(){
        const res = await fetch('https://randomuser.me/api/')
        const ans = await res.json()
        console.log(ans)
        const {name,picture:{large}} = ans.results[0]
        setName(name?.title+' '+name?.first+' '+name?.last)
        setImgSrc(large)
    }
    
    return(
        <div id='mainComponent'>
            {name? <p>I am : {name}</p>:<p>click on call data button to get random name</p>}
            <button onClick={()=>{fetchData()}}>call Data</button>
            <div>
                <img src={imgSrc}/>
            </div>
            <p>my current counter is  {props.count}</p>
            {props.children}
        </div>
    )
}
export default Main