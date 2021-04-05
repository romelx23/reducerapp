import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSavedNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
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
