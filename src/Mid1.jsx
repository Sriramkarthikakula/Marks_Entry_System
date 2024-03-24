function Mid1Component(props){
    // Define state variables and functions here if needed
  
    return (
      <div>
        <label>unit-1</label>
        <label>Q-1</label>
        <select onChange={props.q1func} name='Q1' value={props.selfunc.Q1}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select>
        <label>Q-2</label>
        <select onChange={props.q1func} name='Q2' value={props.selfunc.Q2}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select>
        <br></br>
        <label>unit-2</label>
        <label>Q-3</label>
        <select onChange={props.q1func} name='Q3' value={props.selfunc.Q3}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select>
        <label>Q-4</label>
        <select onChange={props.q1func} name='Q4' value={props.selfunc.Q4}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select><br></br>
        <label>unit-3</label>
        <label>Q-5</label>
        <select onChange={props.q1func} name='Q5' value={props.selfunc.Q5}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select>
        <label>Q-6</label>
        <select onChange={props.q1func} name='Q6' value={props.selfunc.Q6}>
          <option>Select</option>
          <option value='1'>1</option>
          <option value="2">2</option>
        </select>
      </div>
    );
  };

export default Mid1Component;