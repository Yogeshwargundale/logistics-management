import React, { Component} from 'react';
import Header from '../components/Header'
import { Row, Col, Table ,Timeline} from 'antd';
import './style.css'
const BASE_URL='https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments';
const axios = require("axios");

class Dashboard extends Component{

    constructor(props){
        super(props)
        this.state = {
            shipment_data : [],
            copy_shipment_data : [],
            DEL:0,
            INT:0,
            OOD:0,
            DEX:0,
            NFI:0
        }
    }

    fetchFilterCountData = (status)=>{
      axios({
        method: 'post',
        url: `${BASE_URL}/yogeshwar`,
        data: {
          email: 'yogeshwargundale@gmail.com',
        },
        headers: {'AUTHORIZATION': 'Bearer tTU3gFVUdP'}
      }) .then((response) => {debugger
        const dataobj = [];
        const result = response.data.data.filter((element,id)=> {
         return element.current_status_code===status 
      })

      result.forEach(element=>{
        dataobj.push({'awbno':element.awbno,'carrier':element.carrier,'from':element.from,'to':element.to,
        'carrier':element.carrier,'pickup_date':element.pickup_date,'etd':element.extra_fields!==undefined?element.extra_fields.expected_delivery_date:'',
        'current_status':element.current_status,'scan':element.scan
         })
      })
      this.setState({shipment_data:dataobj,copy_shipment_data:dataobj})

      })
      .catch((error) => {
        console.log(error);
      });
    }


    sortShipment = (status)=>{

      if(status==='DEL'){
      this.fetchFilterCountData('DEL')
      }
      if(status==='OOD'){
         this.fetchFilterCountData('OOD')
       }

       if(status==='INT'){
         this.fetchFilterCountData('INT')
       }

       if(status==='UND'){
        this.fetchFilterCountData('UND')
       }

       if(status==='NFI'){
        this.fetchFilterCountData('NFI')
       }
       if(status==='DEX'){
        this.fetchFilterCountData('DEX')
       }
      
    }
    componentDidMount(){
        axios({
            method: 'post',
            url: `${BASE_URL}/yogeshwar`,
            data: {
              email: 'yogeshwargundale@gmail.com',
            },
            headers: {'AUTHORIZATION': 'Bearer tTU3gFVUdP'}
          }) .then((response) => {
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
              'current_status':element.current_status,'scan':element.scan
            })
          })
            this.setState({shipment_data:dataobj,copy_shipment_data:dataobj})
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
                  <div className="count-container">
                  <div id="del" tabindex="1" onClick={() =>this.sortShipment('DEL')}><span >DEL</span><br/>{this.state.DEL}</div>
                  <div tabindex="2" onClick={() =>this.sortShipment('OOD')}>OOD <br/>{this.state.OOD}</div>
                  <div tabindex="3" onClick={() =>this.sortShipment('INT')}>INT <br/>{this.state.INT}</div>
                  <div tabindex="4" onClick={() =>this.sortShipment('DEX')}>DEX <br/>{this.state.DEX}</div>
                  <div tabindex="5" onClick={() =>this.sortShipment('NFI')}>NFI <br/>{this.state.NFI}</div>
                  </div>
                <Row>
                    <Col offset="1" span="7">
                   
                    </Col>
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