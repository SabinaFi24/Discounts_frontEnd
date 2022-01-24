import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {AiFillLike} from "react-icons/ai";
import Dropzone from "react-dropzone";

class SettingsPage extends React.Component {
    state = {
        token: "",
        organizations:[],
        usersOrganizations:[],
        checked: true
    }

    componentDidMount() {
        this.getAllOrganizations()
        this.getOrganizationsByUser()
    }

    getAllOrganizations = () => {
        axios.get("http://localhost:8989/get-all-organizations", {
        })
            .then((response) => {
                if(response.data.length>0){
                    this.setState({
                        organizations: response.data
                    })
                }else{
                    this.setState({organizations:[]})
                }

            })
    }
    getOrganizationsByUser = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-organizations-by-user", {
            params:{
                token:cookies.get("logged_in")
            }
        }).then((response) => {
            if(response.data){
                this.setState({
                    usersOrganizations: response.data
                })
            }
            else {
                this.setState({
                    usersOrganizations:[]
                })
            }
        })
    }

    changeSettings =(organizationId) =>{
        const cookies = new Cookies();
        let data = new FormData();
        data.append("token", cookies.get("logged_in"));
        data.append("organizationId",organizationId)
        axios.post("http://localhost:8989/settings-change",data)
            .then((response)=>{
                this.getOrganizationsByUser();
            })

    }
    option =(event)=>{
       const ans = this.state.checked
        if(ans == false){
            this.setState({
            checked : true
        })}

    }

    doseUserInOrganization=(organizationId)=>{
        let belong = false
        console.log("change is "+this.state.change)

        this.state.usersOrganizations.map((organization)=>{
            return(
                <div>{
                    organization.id == organizationId  &&
                    <div>{
                        belong = true
                    }</div>

                }
                </div>
            )})
        return belong
    }

    render(){
        return(
            <div style={{textAlign:"center"}}>
                <h2>Select the organizations that belong to you :</h2>
                {this.state.organizations.map(organization => {
                    return (
                        <div>
                             <input type="checkbox"
                                    onChange={this.changeSettings()}
                                    value={organization.id}
                                    checked={this.option()}
                             />
                             <label>{organization.name}</label>

                        </div>

                    )
                })
                }
            </div>
        )

    }
}


export default SettingsPage;