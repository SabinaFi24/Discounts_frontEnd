import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class SettingsPage extends React.Component {
    state = {
        userOrganizations: [],
        organizations:[],
        checked : true
    }

    componentWillMount() {
        this.getAllOrganizations()
        this.getOrganizationsByUser()
    }
    getAllOrganizations =() =>{
        axios.get("http://localhost:8989/get-all-organizations")
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState({
                        organizations: response.data
                    })
                }
            })
    }
    getOrganizationsByUser = () => {
        debugger;
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-organizations-by-user", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                if(response.data) {
                    this.setState({
                        userOrganizations: response.data
                    })
                }
            })
    }

    doseUserInOrganization = (id) =>{
        const organization = this.state.userOrganizations.find(organization => {
            return organization.id == id;
        })
        return organization != undefined;
    }

    changeSettings = (id) => {
        let cookies = new Cookies();
        let data = new FormData();
        data.append("token", cookies.get("logged_in"))
        data.append("id", id)
        axios.post("http://localhost:8989/settings-change", data)
            .then((response) => {
                this.getOrganizationsByUser();

            })
    }
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Settings</h1>
                <h2>Select the organizations that belong to you :</h2>
                {this.state.organizations.map(organization => {
                    return (
                        <div className={"settings"}>
                            <p>
                                <input type={"checkbox"}
                                       onClick={() => this.changeSettings(organization.id)}
                                       value={organization.id}
                                       checked={this.doseUserInOrganization(organization.id)}/>
                                <label>{organization.name}</label>
                            </p>
                        </div>

                    )
                })
                }
            </div>
        )

    }
}


export default SettingsPage;