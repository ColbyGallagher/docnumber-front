import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`Welcome back, ${name}`}
      </div>
      <div className='white f3'>
        {`To start a new document number fill out the dropdowns below.`}
        </div>
      <div className='white f3'>
        <label for="projectNumber">Project number:</label>
        <input type="text" id="projectNumber"></input>
      
        <form>  
          <p>
             <label>Volume</label>
             <select id = "volume">
               <option value = "XX">XX</option>
               <option value = "ZZ">ZZ</option>
               <option value = "01">01</option>
               <option value = "02">02</option>
             </select>
          </p>
        </form>

        <form>  
          <p>
             <label>Level</label>
             <select id = "level">
               <option value = "XX">XX</option>
               <option value = "ZZ">ZZ</option>
               <option value = "01">01</option>
               <option value = "02">02</option>
               <option value = "B1">B1</option>
               <option value = "B2">B2</option>
             </select>
          </p>
        </form>


        <form>  
          <p>
             <label>Doc type</label>
             <select id = "docType">
               <option value = "SK">Sketch</option>
               <option value = "DR">Drawing</option>
               <option value = "RE">Report</option>
               <option value = "LE">Letter</option>
             </select>
          </p>
        </form>

        <form>  
          <p>
             <label>Discipline</label>
             <select id = "discipline">
               <option value = "S">Structural Engineer</option>
               <option value = "C">Civil Engineer</option>
               <option value = "A">Architect</option>
               <option value = "E">Environmental</option>
               <option value = "M">Mechanical</option>
               <option value = "H">Hydraulic</option>
             </select>
             
          </p>
        </form>
        </div>
      <div className='white f1'>
        {entries} 
      </div>
    </div>
  );
}

export default Rank;