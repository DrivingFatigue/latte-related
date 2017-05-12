import React, { Component } from 'react';
import {Form, Input, Col, Row, DatePicker, Button, Table, Select, Popconfirm, Card, Icon} from 'antd';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import {GoodsTypes} from "../../constants/ActionTypes";
import {createForm} from "rc-form";
import * as GoodsActions from '../../actions/GoodsActions.js';
import * as antdTableUtils from '../../lib/antdTableUtils';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {bindingMixin} from "redux-2way-binding";


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
export default
class MarketingEvents extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("ok");
  }

  render() {
    return (
      <div >
        <Card title="营销事件列表">
          {this.renderQueryForm()}
          <div>
            <Button type="primary" style={{marginLeft: 30, marginBottom: 10}}><Icon type="plus"/>添加</Button>
          </div>
        </Card>
      </div>
    );
  }

  renderQueryForm() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };
    return (
     <Form horizontal>
        <Row>
          <Col span={6}>
            <FormItem label="事件ID" {...formItemLayout}>
              <Input placeholder="请输入搜索值"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="事件名称" {...formItemLayout}>
              <Input placeholder="请输入搜索值"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="事件状态" {...formItemLayout}>
              <Input placeholder="请输入搜索值"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="周期状态" {...formItemLayout}>
              <Input placeholder="请输入搜索值"/>
            </FormItem>
          </Col>
        </Row>
       <Row>
         <Col span={12} offset={0}>
           <FormItem{...formItemLayout} label="更新时间:">
             <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
           </FormItem>
         </Col>
         <Col span={4}>
           <Button type="primary" style={{marginRight: 30}}>查询</Button>
           <Button type="default" >重置</Button>
         </Col>
       </Row>
     </Form>
    );

  }
}
