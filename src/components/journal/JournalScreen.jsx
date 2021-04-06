import React from 'react'
import { useSelector } from 'react-redux'
import { NotesScreen } from '../notes/NotesScreen'
import { NoteSelected } from './NoteSelected'
import { SideBar } from './SideBar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes)

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <SideBar/>
            <main className="main__sidebar">
                {
                    (active)?
                    <NotesScreen/>:
                    <NoteSelected/> 
                }
                {/* <NoteSelected/> */}
                {/* <NotesScreen/> */}
            </main>
        </div>
    )
}
