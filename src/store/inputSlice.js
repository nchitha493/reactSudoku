import { createSlice,current } from '@reduxjs/toolkit';
import solvePuzzle from './solvePuzzle';
const findMinVerticalIndex = (value) => {
  while (value > 2) {
    value = value - 3
  }
  return value
}
const getAllPossibleVerticalIndex = (value) => {
  const arr = []
  while (value <= 8) {
    arr.push(value)
    value = value + 3
  }
  return arr
}
const findMinHorizondalIndex = (value) => {
  let getMin = value
  if (value >= 0) {
    getMin = 0
  }

  if (value >= 3) {
    getMin = 3
  }
  if (value >= 6) {
    getMin = 6
  }

  return getMin
}
const getAllPossibleHorizondalIndex = (value) => {
  const arr = []

  for (let i = 1; i < 4; i++) {
    arr.push(value)
    value = value + 1

  }
  return arr
}
const getAllSelectableVerticalIndex = (minLowerVerticalIndex, minUpperVerticalIndex) => {

  const AllPossibleLowerVerticalIndex = getAllPossibleVerticalIndex(minLowerVerticalIndex)
  const AllPossibleUpperVerticalIndex = getAllPossibleVerticalIndex(minUpperVerticalIndex)
  const allposibleFinalVertical= []
  AllPossibleUpperVerticalIndex.map((up) => {
    AllPossibleLowerVerticalIndex.map((low) => {
      //console.log(state.cellValues[up][low])
      allposibleFinalVertical.push({up,low})
      //state.cellValues[up][low] = { ...state.cellValues[up][low], inputClass: ['highlight'] }
    })
  })
  //return arr
  return allposibleFinalVertical
}

const getAllSelectableHorizondalIndex = (minLowerHorizondalIndex, minUpperHorizondalIndex) => {

  const AllPossibleLowerHorizondalIndex = getAllPossibleHorizondalIndex(minLowerHorizondalIndex)
  const AllPossibleUpperHorizondalIndex = getAllPossibleHorizondalIndex(minUpperHorizondalIndex)
  const allposibleFinalHorizondal= []
  AllPossibleUpperHorizondalIndex.map((up) => {
    AllPossibleLowerHorizondalIndex.map((low) => {
     // console.log(state.cellValues[up][low])
      allposibleFinalHorizondal.push({up,low})
      //state.cellValues[up][low] = { ...state.cellValues[up][low], inputClass: ['highlight'] }
    })
  })
  return allposibleFinalHorizondal
  //return arr
}
const unqiueSelectableArray = (allSelectableIndex)=>{
  const newallSelectableIndex = []
  allSelectableIndex.map((val)=>{
    if(!(newallSelectableIndex.find((find)=>find.up == val.up && find.low==val.low))){
      newallSelectableIndex.push(val)
    }
  })
  return newallSelectableIndex
}
const unqiueSelectableFunction = (uperIndex,inerIndex)=>{
  const minLowerVerticalIndex = findMinVerticalIndex(inerIndex)
  const minUpperVerticalIndex = findMinVerticalIndex(uperIndex)
  const allVerticalSelectableIndex = getAllSelectableVerticalIndex(minLowerVerticalIndex, minUpperVerticalIndex)
  const minLowerHorizondalIndex = findMinHorizondalIndex(inerIndex)
  const minUpperHorizondalIndex = findMinHorizondalIndex(uperIndex)
  const allHorizondalSelectableIndex = getAllSelectableHorizondalIndex(minLowerHorizondalIndex, minUpperHorizondalIndex)
  //console.log(allVerticalSelectableIndex)
  const allSelectableIndex = allVerticalSelectableIndex.concat(allHorizondalSelectableIndex)
  const newallSelectableIndex = unqiueSelectableArray(allSelectableIndex)
  return newallSelectableIndex
}
const selectAllUnqiueSelectable = (unqiueSelectable,state)=>{
  unqiueSelectable.forEach(element => {
    state.cellValues[element.up][element.low].inputClass.push('highlight')
  });
}
const makeHighLight = (s,arrayToFilter)=>{
 // console.log("resetesss",s)
  let states =  JSON.parse(JSON.stringify(s));
  let unqiueSelectableValues = []
  arrayToFilter.forEach((element)=>{
    unqiueSelectableValues.push({up:element.up,low:element.low,value:states.cellValues[element.up][element.low].value})
    
  })
  const matchingValues = unqiueSelectableValues.map((val)=>val.value).filter((value, index, self) => self.indexOf(value) !== index)
  
  unqiueSelectableValues.forEach((element)=>{
    if(matchingValues.find((el)=>el==element.value)){
      //console.log(states.cellValues[element.up][element.low].inputClass)
      s.cellValues[element.up][element.low].inputClass.push("error")
      s.cellValues[element.up][element.low].mutable = false
  }
  })
   
}
const higlightSimialarValues = (allVerticalSelectableIndex,allHorizondalSelectableIndex,s,value)=>{
  let states =  JSON.parse(JSON.stringify(s));

  s=resetSelector(s,'error',false,allVerticalSelectableIndex,value)
  s=resetSelector(s,'error',false,allHorizondalSelectableIndex,value)
  makeHighLight(s,allVerticalSelectableIndex)
  makeHighLight(s,allHorizondalSelectableIndex)
}
const resetSelector = (state,resetClass,complete,condition=[],value=0) => {
  state.cellValues = state.cellValues.map((up,upper) => {
    return up.map((iner,lower) => {
        let letGo = true
        if(!complete){
          let con = condition.some((val)=>{

            return val.up ==upper && val.low==lower 
          })
          //console.log("concon",con)
          if(con){
            if(!iner.mutable){
              iner.mutable = true
            }
            if(iner.mutable){
              iner.inputClass = iner.inputClass.filter(e => e !== resetClass)
            }
          }
          return iner
        }
        if(resetClass== "selectedComVals"){
          if(iner.value ==value && value!=0){
            iner.inputClass.push("selectedComVals")
            return iner
          }
        }
        iner.inputClass = iner.inputClass.filter(e => e !== resetClass)
        return iner
   
    })
  })
  return state
}
const inputSlice = createSlice({
  name: 'input',
  initialState: {
    cellValues: [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ],
    count:[0,0,0,0,0,0,0,0,0]
  },
  reducers: {
    updateCellWithClass(state, action) {
      console.log("statesssssssssssssssss",state)
      state.cellValues = state.cellValues.map((inner) => {
        return inner.map((value) => {
          return { value: value, inputClass: [],mutable:true }
        })
      }
      )
    },
    changeValue(state, action) {
      if((typeof(parseInt(action.payload.val))=="number" && parseInt(action.payload.val)>0 && parseInt(action.payload.val) <=9) || action.payload.val =="")
        state.cellValues[action.payload.ind.index][action.payload.ind.inerIndex].value = parseInt(action.payload.val)
      resetSelector(state,'selectedComVals',true,[],action.payload.val)
      const uperIndex = action.payload.ind.index
      const inerIndex = action.payload.ind.inerIndex
      const minLowerVerticalIndex = findMinVerticalIndex(inerIndex)
      const minUpperVerticalIndex = findMinVerticalIndex(uperIndex)
      const allVerticalSelectableIndex = getAllSelectableVerticalIndex(minLowerVerticalIndex, minUpperVerticalIndex)
      const minLowerHorizondalIndex = findMinHorizondalIndex(inerIndex)
      const minUpperHorizondalIndex = findMinHorizondalIndex(uperIndex)
      const allHorizondalSelectableIndex = getAllSelectableHorizondalIndex(minLowerHorizondalIndex, minUpperHorizondalIndex)
      state= higlightSimialarValues(allVerticalSelectableIndex,allHorizondalSelectableIndex,state,action.payload.val)

    },

    focusValue(state, action) {
      resetSelector(state,'highlight',true,[],0)
      resetSelector(state,'selectedComVals',true,[],action.payload.val)
      const uperIndex = action.payload.ind.index
      const inerIndex = action.payload.ind.inerIndex
      const unqiueSelectable = unqiueSelectableFunction(uperIndex,inerIndex)
      selectAllUnqiueSelectable(unqiueSelectable,state)
    },
    solvePuzzle(state,action){
      console.log("sssssssssssssssssssssssssssss",state)
      solvePuzzle(state,action)
    }
  },
});

export const inputActions = inputSlice.actions;

export default inputSlice;
