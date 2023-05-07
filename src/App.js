
import { useEffect, useState } from 'react';
import './App.css';
import InnerLayer from './innerLayer';
import { useSelector,useDispatch } from 'react-redux';
import { inputActions } from './store/inputSlice';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(inputActions.updateCellWithClass())
  },[])
  const cellValues= useSelector((state)=>state.input.cellValues)
  console.log("sss",cellValues)
  const element = cellValues.map((element,index) => {
    return (
      <InnerLayer key={index} elements={element} index={index} />
    )
  })
  const solveHandler =()=>{
    dispatch(inputActions.solvePuzzle())
  }
  return (
<div className='overall'>
<div className='main-box'>
      {element}
    </div>
    <div>
    <button className='solveButton' onClick={solveHandler}>Solve</button>
    </div>
</div>
  );
}

export default App;
