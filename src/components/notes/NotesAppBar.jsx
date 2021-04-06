import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sideHide, startSavedNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const [hiden, setHiden] = useState(false)
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)
    const handleSave=()=>{
        dispatch(startSavedNote(active));
    }
    const handlePictureClick=()=>{
        document.getElementById('fileSelector').click();
    }
    const handleFileChange=(e)=>{
        console.log(e.target.files);
        const file=e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }
    const handleSidebar=()=>{
        setHiden(!hiden)
        dispatch(sideHide(hiden))
    }
    return (
        <div className="notes__appbar">
            <span>28 Agosto 2020</span>
            <input 
            id="fileSelector"
            type="file" 
            target="file"
            style={{display:'none'}}
            onChange={ handleFileChange }
            />
            <div className="">
                <button 
                        className="btn"
                        onClick={handleSidebar}
                    >
                        <i class="fas fa-bars"></i>
                </button>
                <button 
                className="btn btn-note-image"
                onClick={handlePictureClick}
                >
                    Picture
                    <i class="far fa-image"></i>
                </button>
                <button 
                className="btn btn-note-save"
                onClick={handleSave}
                >
                    Save
                    <i class="fas fa-minus-square"></i>
                </button>
            </div>
        </div>
    )
}
