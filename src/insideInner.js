import { useDispatch } from "react-redux"
import { inputActions } from "./store/inputSlice"
function InSideInner(props) {
    const dispatch = useDispatch()
    let val = props.innerElement.value ?props.innerElement.value:0
    let classNames = props.innerElement.inputClass ? props.innerElement.inputClass.join(" ") :""

    const valueChangeHandler = (event) => {
        dispatch(inputActions.changeValue({val:event.target.value,ind:props.ind}))
    }
    const valueFocusHalder = (event)=>{
        dispatch(inputActions.focusValue({val:event.target.value,ind:props.ind}))
    }
    const element = (<div className="insideInner">
        <input type="text" className={classNames} style={{color:val == 0?'red':"inherit"}} onFocus={valueFocusHalder} value={val} min="0" max="9" onChange={valueChangeHandler}></input>
    </div>)
    return (element);
}

export default InSideInner;
