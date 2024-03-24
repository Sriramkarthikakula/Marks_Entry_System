import React, { useState } from 'react';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import Mid1Component from './Mid1';
import Mid2Component from './Mid2';



function Input(params){
  return (<div><input type='text' placeholder={params.Qnum} name={params.Qnum} onChange={params.Changeres} value={params.Qval}></input><br></br></div>);
}


const FormComponent = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
  });
  const [sesmarks,setsesmarks] = useState({
    rollNumber:'',
    mid1marks:'',
    mid2marks:''
  });
  const [file,setfile] = useState('');
  const [allFormData, setAllFormData] = useState([]);
  const [markstype, setMarkstype] = useState('');
  const [evaltype,setEvaltype] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    Q5: '',
    Q6: ''
  });
  // Handler functions for dropdowns
 
  const handleQ1Change = (e) => {
    const names = e.target.name;
    const value = e.target.value;
    if (value == 1){
      setFormData(prevFormData => ({
        ...prevFormData,
        [names]: ''
      }));
      setSelectedOptions(prevFormData => ({
        ...prevFormData,
        [names]: value
      }));
    }
    else if(value == 2){
      const orname = names[1];
      const a = orname+'a';
      const b = orname+'b';
      setFormData(prevFormData => ({
        ...prevFormData,
        [a]: '',
        [b]:''
      }));
      setSelectedOptions(prevFormData => ({
        ...prevFormData,
        [names]: value
      }));
    }
    if(names=='Q6'){
      setFormData(prevFormData => ({
        ...prevFormData,
        Assignment: '',
        Bits:''
      }));
      setSelectedOptions(prevFormData => ({
        ...prevFormData,
        [names]: value
      }));
    }
    
  };
  const handleFormChange = (e) =>{
    const {name,value} = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }
  const handlesesFormChange = (e) =>{
    const {name,value} = e.target;
    setsesmarks(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }
function filename(e){
  setfile(e.target.value);
}

  const handleSubmit = (e) => {
    if(markstype == 'Mid-1' || markstype == 'Mid-2'){
      setAllFormData(prevAllFormData => {
        const formDataValues = Object.values(formData);
        let sums = 0;
        if (evaltype === '15') {
          for (let i = 1; i < formDataValues.length; i++) {
            sums += Number(formDataValues[i]);
          }
        }
        else if(evaltype === '30'){
          let i;
          for(i=1;i<formDataValues.length-2;i++){
            sums += Number(formDataValues[i]);
          }
          sums = Math.round(sums/2);
          sums = sums+Number(formDataValues[i])+Number(formDataValues[i+1]);
        }
        const updatedFormData = { ...formData };
        updatedFormData.Total = sums;
        return [...prevAllFormData, updatedFormData];
      });
      setFormData(prevFormData => {
        const clearedFormData = {};
       
        for (const key in prevFormData) {
  
          clearedFormData[key] = '';
        }
        return clearedFormData;
      });
    }
    else if(markstype=='Sessionals'){
      setAllFormData(prevAllFormData => {
        const formDataValues = Object.values(sesmarks);
        
        let sums = 0;
      let a = Number(formDataValues[1]);
     
      let b = Number(formDataValues[2]);
      if(a>=b){
        a = Math.round(a*(80/100));
        b = Math.round(b*(20/100));
      }
      else{
        a = Math.round(a*(20/100));
        b = Math.round(b*(80/100));
      }
      sums = a+b;
      console.log(sums)
      const updatedFormData = { ...sesmarks };
        updatedFormData.Total = sums;
        return [...prevAllFormData, updatedFormData];
      });
      setsesmarks(prevFormData => {
        const clearedFormData = {};
       
        for (const key in prevFormData) {
  
          clearedFormData[key] = '';
        }
        return clearedFormData;
      });
    }
    e.preventDefault();
  };
  function resetData(){
    setFormData({rollNumber: ''});
    setsesmarks({
      rollNumber:'',
      mid1marks:'',
      mid2marks:''
    })
    setSelectedOptions({
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      Q5: '',
      Q6: ''
    });
  }
  function mid1typeselectionclear(){
    resetData();
    setMarkstype('Mid-1');
  }
  function mid2typeselectionclear(){
    resetData();
    setMarkstype('Mid-2');
  }
  const handleFinalSubmit = () => {
    // Create Excel workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allFormData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Student Marks');

    // Generate Excel file
    let finalfilename = file+'.xlsx';
    writeFile(wb, finalfilename);
  };
  const formDataEntries = Object.entries(formData);
  console.log(formDataEntries);
  const sesDataEntries = Object.entries(sesmarks);
  return (
    <div>
    <button onClick={resetData}>Reset</button>
    <input type='text' onChange={filename} placeholder='Enter the file name: '/>
      <form onSubmit={handleSubmit}>
      <input type='radio' name='marks' value='Mid-1' onChange={mid1typeselectionclear} />Mid-1
      <input type='radio' name='marks' value='Mid-2' onChange={mid2typeselectionclear} />Mid-2
      <input type='radio' name='marks' value='Sessionals' onChange={() => setMarkstype('Sessionals')} />Sessionals
      
      {markstype === 'Mid-1' && <Mid1Component q1func={handleQ1Change} selfunc={selectedOptions}/>}
      {markstype === 'Mid-2' && <Mid2Component q1func={handleQ1Change} selfunc={selectedOptions}/>}
      {markstype === 'Sessionals' && (
        <div>
          <p>Sessionals</p>
            {sesDataEntries.map(([name, value], index) => (
  <Input key={index} Qnum={name} Changeres={handlesesFormChange} Qval={value}/>
))}
        </div>
      )}
      {markstype != 'Sessionals' && (
        <div>
          <p>Evaluation of Theory marks: </p>

            <input type='radio' name='Evaltype' value='15' onChange={() => setEvaltype('15')} />15 Marks
            <input type='radio' name='Evaltype' value='30' onChange={() => setEvaltype('30')} />30 Marks
            {formDataEntries.map(([name, value], index) => (
  <Input key={index} Qnum={name} Changeres={handleFormChange} Qval={value}/>
))}
        </div>
      )}
      

     
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleFinalSubmit}>Final Submit</button>
    </div>
  );
};

export default FormComponent;
