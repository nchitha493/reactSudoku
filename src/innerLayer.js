import InSideInner from "./insideInner";
function InnerLayer(props) {
    const InnerLayers = (<div className="innerLayer"> {props.elements.map((innerElement, inerIndex) => {

        return (<InSideInner key={inerIndex} ind={{index:props.index,inerIndex}} innerElement={innerElement}/>)
    })}</div>)

return  InnerLayers
  }

export default InnerLayer;
