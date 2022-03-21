import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { get_actual_rate } from '../../actions/action';
import './homepage.css'

function HomePage (){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_actual_rate())
    },[])
    return(
        <div>555</div>
    )
}
export default HomePage