import React, { Component } from 'react';
import Header from '../components/Header'
import { Row, Col, Table } from 'antd';
import './style.css'
const BASE_URL='https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments';
const axios = require("axios");

class Dashboard extends Component{

    constructor(props){
        super(props)
        this.state = {
            shipment_data : [],
            DEL:0,
            INT:0,
            OOD:0,
            DEX:0,
            NFI:0
        }
    }
    sortShipment = (status)=>{

      if(status==='DEL'){
       const shipmentFilterData = this.state.shipment_data.filter(item=>{
          return item.current_status==='Delivered';
        })
        this.setState({shipment_data:shipmentFilterData})
      }
      if(status==='OOD'){
        const shipmentFilterData = this.state.shipment_data.filter(item=>{
           return item.current_status==='Out for Delivery';
         })
         this.setState({shipment_data:shipmentFilterData})
       }

       if(status==='INT'){
        const shipmentFilterData = this.state.shipment_data.filter(item=>{
           return item.current_status==='In Transit';
         })
         this.setState({shipment_data:shipmentFilterData})
       }

       if(status==='UND'){
        const shipmentFilterData = this.state.shipment_data.filter(item=>{
           return item.current_status==='"Undelivered"';
         })
         this.setState({shipment_data:shipmentFilterData})
       }

       if(status==='NFI'){
        const shipmentFilterData = this.state.shipment_data.filter(item=>{
           return item.current_status==='No Information Yet';
         })
         this.setState({shipment_data:shipmentFilterData})
       }
      
    }
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
            const dataobj = [];
            
            const result = response.data.data.forEach(element => {
              
              
              if(element.current_status_code==='DEL'){
                this.setState({
                  DEL: this.state.DEL + 1
                });
              }

              if(element.current_status_code==='INT'){
                this.setState({
                  INT: this.state.INT + 1
                });
              }
              if(element.current_status_code==='OOD'){
                this.setState({
                  OOD: this.state.OOD + 1
                });
              }
              if(element.current_status_code==='DEX'){
                this.setState({
                  DEX: this.state.DEX + 1
                });
              }

              if(element.current_status_code==='NFI'){
                this.setState({
                  NFI: this.state.NFI + 1
                });
              }
              dataobj.push({'awbno':element.awbno,'carrier':element.carrier,'from':element.from,'to':element.to,
              'carrier':element.carrier,'pickup_date':element.pickup_date,'etd':element.extra_fields!==undefined?element.extra_fields.expected_delivery_date:'',
              'current_status':element.current_status
            })
          })
            console.log(dataobj);
            console.log('OOD count',this.state.OOD)
            this.setState({shipment_data:dataobj})
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        const columns = [
            {
              title: 'AWB NUMBER',
              dataIndex: 'awbno',
              key: 'awbno',
            },
            {
              title: 'TRANSPORTER',
              dataIndex: 'carrier',
              key: 'carrier',
            },
            {
              title: 'SOURCE',
              dataIndex: 'from',
              key: 'from',
            },
            {
                title: 'DESTINATION',
                dataIndex: 'to',
                key: 'to',
              },
              {
                title: 'BRAND',
                dataIndex: 'carrier',
                key: 'carrier',
              },
              {
                title: 'STARTDATE',
                dataIndex: 'pickup_date',
                key: 'pickup_date',
              },
              {
                // response.data.data[0].extra_fields.expected_delivery_date
                title: 'ETD',
                dataIndex: 'etd',
                key: 'etd',
              },
              {
                title: 'STATUS',
                dataIndex: 'current_status',
                key: 'current_status',
              },
          ];

        return (
            <div style={{backgroundColor:"rgb(255, 255, 255)"}}>
                <Header />

                {/* <Row> */}
                {/* <Col offset="6">
                  <Col><div className="count">{this.state.DEL}</div></Col>
                  <Col><div>{this.state.OOD}</div></Col>
                  <Col><div>{this.state.INT}</div></Col>
                  <Col><div>{this.state.DEX}</div></Col>
                  <Col><div>{this.state.NFI}</div></Col>
                </Col>
                <Col offset="8"></Col> */}
                {/* <Col span="12"> */}
                  <div className="count-container">
                  <div onClick={() =>this.sortShipment('DEL')}><span >DEL</span><br/>{this.state.DEL}</div>
                  <div onClick={() =>this.sortShipment('OOD')}>OOD <br/>{this.state.OOD}</div>
                  <div onClick={() =>this.sortShipment('INT')}>INT <br/>{this.state.INT}</div>
                  <div onClick={() =>this.sortShipment('DEX')}>DEX <br/>{this.state.DEX}</div>
                  <div onClick={() =>this.sortShipment('NFI')}>NFI <br/>{this.state.NFI}</div>
                  </div>
                {/* </Col> */}
                {/* </Row> */}
                <Row>
                    <Col offset="1" span="7"></Col>
                    <Col offset="1" />
                    <Col span="15">
                    <Table 
                    dataSource={this.state.shipment_data}
                    columns={columns} 
                    size="small" 
                    scroll={{ x: 'max-content'}}
                    />;
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;