import {Link} from "react-router-dom";

function StoreComponent (props) {
    return (
        <div style={{margin: "15px"}}>
           <Link to={"/store/" + props.store.id}>
               {props.store.name}
           </Link>
        </div>
    )
}

export default StoreComponent;