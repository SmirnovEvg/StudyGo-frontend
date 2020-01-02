import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    state = {
        isLoading: false,
        isLoggined: false
    }
    componentDidMount = () => {
        const token = localStorage.getItem("access_token")
        axios.get('http://localhost:3333/api/user', {
            headers: {
                Authorization: token
            }
        }
        ).then(res => {
            console.log(res.data);
            this.setState({
                isLoading: true,
                isLoggined: true
            })
        })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: true,
                    isLoggined: false
                })
            })
    }

    render() {
        return (
            <div className="App">
                hey
                {this.state.isLoggined ? (<p>вошел</p>): (<p>не вошел</p>)}
                <button
                    onClick={console.log(this.state.isLoading, this.state.isLoggined)
                    }>sdsdf</button>
            </div>
        );
    }
}

export default Post;