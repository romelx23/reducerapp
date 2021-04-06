import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sideHide} from '../../actions/notes';

export const AppBar = () => {
    const [hiden, setHiden] = useState(false)
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSidebar=()=>{
        setHiden(!hiden)
        dispatch(sideHide(hiden))
    }
    return (
        <div className="notes__appbar app__bar">
            <h3>JournalApp</h3>
            <span>28 Agosto 2020</span>
            <div className="">
                <button 
                        className="btn"
                        onClick={handleSidebar}
                    >
                        <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    )
}
