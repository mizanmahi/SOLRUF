import React from 'react';
import './gridform.css'
import Input from '../gridinput/gridinput';
import Importimg from '../../importimage/importimg';

function Gridform() {
    return (
        <div className="gridFormContainer">
            <div className="gridFormInputDiv">
                <Input name="Name" className="eachgridInput" />
                <Input name="Location"/>
            </div>
            <div className="gridFormInputDiv">
                <Input name="Customer Name"/>
                <Input name="Cast of project"/>
            </div>
            <div className="gridFormDescreptionContainer">
                <div className="gridFormDescreption">

                </div>
            </div>
            <div className="gridImportImageContainer">
                <Importimg/>
            </div>
            <div className="gridImportImageContainer">
                <Importimg/>
            </div>
            <div className="installerFormSaveContainer">
                    <div className="installFormSavebtndiv">
                        <button className="installerFormSaveBtn">Save</button>
                    </div>
            </div>
        </div>
    )
}

export default Gridform;
