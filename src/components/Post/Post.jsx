import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    componentDidMount = () => {
        const token = localStorage.getItem("access_token")
        axios.get('http://localhost:3333/api/post', {
            headers: {
                Authorization: token
            }
        }
        ).then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="App">
                hey
            </div>
        );
    }
}

export default Post;