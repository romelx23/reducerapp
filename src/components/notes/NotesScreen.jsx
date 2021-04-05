import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formvalues, handleInputChange,reset] = useForm(note);
    const { body, title,id } = formvalues;
    const activeId=useRef(note.id);

    useEffect(() => {
        
        if(note.id!==activeId.current){
            reset(note);
            activeId.current=note.id
        }

    }, [note,reset])

    useEffect(() => {
        console.log(formvalues);
        formvalues.url=note.url;
        dispatch(activeNote(formvalues.id,{...formvalues}))
    }, [formvalues,dispatch])

    const handleDelete=()=>{
        dispatch(startDeleting(id));
    }
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some Awesome title"
                    className="note__title_input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="What happend today"
                    className="note_textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>
                {   (note.url) &&
                    (
                    <div className="notes__images">
                        <img src={note.url}
                            alt="imagen" />
                    </div>
                     )
                }
            </div>
            <button 
            className="btn btn-danger"
            onClick={handleDelete}
            >
                Borrar
            </button>
        </div>
    )
}
