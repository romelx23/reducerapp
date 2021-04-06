import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import { sideHide, startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const SideBar = () => {
    // const [hiden, setHiden] = useState(true);
    const {hide} = useSelector(state => state.notes)
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth)
    const handleLogOut=()=>{
        console.log('hola');
        dispatch(startLogOut());
    }

    const handleAddNew=()=>{
        dispatch(startNewNote());
    }

    const handleSidebar=()=>{
        dispatch(sideHide(false))
    }
    return (
        <aside className={
            (hide)?
            (`journal__sidebar`):
            (`journal__sidebar journal__sidebar__hide`)
            }>
            <div className="journal__sidebar-navbar">
                <button 
                    className="btn btn-toggle"
                    onClick={handleSidebar}
                >
                    <i class="fas fa-bars"></i>
                </button>
                <h3>
                    <i className="far fa-moon"></i>
                    <span>{name}</span>
                </h3>
                <button 
                    className="btn"
                    onClick={handleLogOut}
                >
                    LogOut
                </button>
            </div>
            <div 
            className="journal__new-entry"
            onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New Entry</p>
            </div>
            <h3>Elija su Nota:</h3>
            <JournalEntries/>
        </aside>
    )
}
