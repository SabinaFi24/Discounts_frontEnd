import React from "react";
import SaleColor from "./SaleColor";
import axios from "axios";
import Cookies from "universal-cookie/es6";


class DashboardPage extends React.Component {
    state = {
        sales: []
    }

    componentDidMount() {
        this.getSales()
    }

    getSales = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-sales-by-user", {
            params: {
                token: cookies.get("logged_in")
            }
        }).then((response) => {
            if (response.data.length > 0) {
                this.setState({
                    sales: response.data
                })
            } else {
                this.setState({sales: []})

            }
        })
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Dashboard</h1>
                <h3>Your Sales: </h3>
                {
                    this.state.sales.length > 0 ?
                        this.state.sales.map(sale => {
                            return (
                                <div>
                                    <SaleColor data={sale}/>
                                </div>
                            )
                        })
                        :
                        <div>NO SALES</div>

                }

            </div>
        )

    }

}

export default DashboardPage;