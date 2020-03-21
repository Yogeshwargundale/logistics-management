import React, { Component } from 'react'
const BASE_URL='https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments';
const axios = require("axios");

class Dashboard extends Component{

    componentDidMount(){
        console.log('component did mount')
        axios({
            method: 'post',
            url: `${BASE_URL}/yogeshwar`,
            data: {
              email: 'yogeshwargundale@gmail.com',
            },
            headers: {'AUTHORIZATION': 'Bearer tTU3gFVUdP'}
          }) .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Dashboard</h1>
            </React.Fragment>
        )
    }
}

export default Dashboard;