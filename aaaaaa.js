import React, { Component } from 'react';
import {Form, Input, Col, Row, DatePicker, Button, Table, Select, Popconfirm, Card, Icon} from 'antd';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import {MarketPromotionTypes,GoodsTypes} from '../../constants/ActionTypes.js';
import {createForm} from "rc-form";
import * as MarketPromotionActions from '../../actions/MarketPromotionActions.js';
import * as antdTableUtils from '../../lib/antdTableUtils';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {bindingMixin} from "redux-2way-binding";


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

@connect(state => ({
  marketPromotion: state.marketPromotion,
  goods: state.goods
}))
@bindingMixin
export default
class MarketingEvents extends Component {
  constructor(props) {
    super(props);
    this.action = bindActionCreators(MarketPromotionActions, props.dispatch);
    this.searchFields = 'searchFiled';
  }

  componentDidMount() {
    const { marketPromotion } = this.props;
    this.action.getMarketingEvents();
    // let marketingEventsPaging = marketPromotion.get('marketingEventsPaging').toJS();
    // let params = antdTableUtils.getParamsFromStore(marketingEventsPaging);
    // this.action.getMarketingEventsPaging(params);
  }

  render() {
    let { marketPromotion } = this.props;
    console.log(marketPromotion);

    return (
      <div >
        <Card title="营销事件列表">
          {this.renderQueryForm()}
          <div>
            <Button type="primary" style={{marginLeft: 30, marginBottom: 10}}><Icon type="plus"/>添加</Button>
          </div>
          <Row>
          </Row>
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
              <Select style={{ minWidth: 100 }}>
                <Option value="">所有</Option>
                <Option value="DRAFT">草稿</Option>
                <Option value="WAITING">等待发送</Option>
                <Option value="SENDING">发送中</Option>
                <Option value="SUSPENDED">暂停发送</Option>
                <Option value="FAILED">发送失败</Option>
                <Option value="DONE">发送成功</Option>
                <Option value="FINISHED">事件结束</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="周期状态" {...formItemLayout}>
              <Select style={{ minWidth: 100 }}>
                <Option value="">  </Option>
                  <Option value="ONCE">一次性事件</Option>
                  <Option value="CYCLED">发送成功</Option>
              </Select>
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

