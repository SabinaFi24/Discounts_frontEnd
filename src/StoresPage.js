import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { AiFillLike } from 'react-icons/ai';
import Dropzone from 'react-dropzone'


class StoresPage extends React.Component {
    state = {
        token: "",
        content: "",
        stores: []
    }

    componentDidMount() {
        this.getAllStores()
    }

    onTextChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content
        })
    }




    getAllStores = () => {
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

    /*removePost = (postId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/remove-post", {
            params: {
                token: cookies.get("logged_in"),
                postId
            }
        })
            .then((response) => {
                const currentPosts = this.state.posts;
                this.setState({
                    posts: currentPosts.filter((item) => {
                        return item.id != postId
                    })
                })
            })
    }*/


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

                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        this.state.file ?
                                            <p>{this.state.file.name}</p>
                                            :
                                            <p>Drag 'n' drop some files here, or click to select files</p>

                                    }
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button onClick={this.addPost}>Submit</button>
                </div>
            </div>
        )
    }
}

export default StoresPage;