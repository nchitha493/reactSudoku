
const solvePuzzle = (state,action)=>{
    state.cellValues.map((up,upper) => {
        return up.map((iner,lower) => {
           // console.log(iner)
            state.count[iner.value-1]= state.count[iner.value-1]+1
        })
      })
    //console.log("solution")
    return state
    
}

export default solvePuzzle