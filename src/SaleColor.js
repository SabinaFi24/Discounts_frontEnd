import React from "react";


class SaleColor extends React.Component {

    render() {
        return (
            <div>
                <div style={{
                    border: "lightgray solid 10px",
                    width: "50%",
                    textAlign: "center",
                    marginBottom: "3%",
                    marginLeft: "25%",
                    borderRadius: "100%"
                }}>
                    <h4 style={{color: ""}}> Store : {this.props.data.store.name} </h4>
                    <h4 style={{color: this.props.border}}>{this.props.data.content}</h4>
                </div>
            </div>
        )
    }
}

export default SaleColor;