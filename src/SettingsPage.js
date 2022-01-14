import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {AiFillLike} from "react-icons/ai";
import Dropzone from "react-dropzone";

class SettingsPage extends React.Component {
    state = {
        token: "",
        organizations:[]
    }

    componentDidMount() {
        this.getAllOrganizations()
    }

    getAllOrganizations = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-stores", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    stores: response.data
                })
            })
    }
    addOrganization = () => {
        const cookies = new Cookies();
        let data = new FormData();
        if (this.state.file) {
            data.append("file", this.state.file, this.state.file.name);
        }
        data.append("token", cookies.get("logged_in"));
        data.append("content", this.state.content);
        axios.post("http://localhost:8989/add-organization", data, {
            headers: {'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
        }).then((response) => {
                if (response.data) {
                    const currentOrganizations = this.state.organizations;
                    currentOrganizations.unshift({
                        content: this.state.content,
                        date: "Few moments ago..."
                    })
                    this.setState({
                        organiztions: currentOrganizations
                    })
                } else {
                    alert("couldn't add the organization")
                }
            })
    }


    render() {
        return (
            <div>
                {
                    this.state.stores.map(store => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>

                                /*<img src={"http://localhost:8989/get-post-image?postId=" +store.id} alt={"no images"}/>}*/
                                <i style={{fontSize: "12px"}}>np
                                    {store.name}
                                </i>
                                <h1><AiFillLike color={"blue"}/></h1>

                            </div>
                        )
                    })
                }

                <div style={{marginTop: "30px"}}>
                    <textarea
                        onChange={this.onTextChange}
                        value={this.state.content}
                        placeholder={"Enter post"}
                    /><br/>

                    <button onClick={this.addOrganization}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SettingsPage;