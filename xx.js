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
const EVENT_STATUS_ENUM = [
  {payload: '', text: '所有'},
  {payload: 'DRAFT', text: '草稿'},
  {payload: 'WAITING', text: '等待发送'},
  {payload: 'SENDING', text: '发送中'},
  {payload: 'SUSPENDED', text: '暂停发送'},
  {payload: 'FAILED', text: '发送失败'},
  {payload: 'DONE', text: '发送成功'},
  {payload: 'FINISHED', text: '事件结束'}
];
const CYCLE_TYPE = [
  { payload: '', text: '' },
  { payload: 'ONCE', text: '一次性事件' },
  { payload: 'CYCLED', text: '连续性事件' }
];

@bindingMixin
class MarketingEvents extends Component {
  constructor(props) {
    super(props);
    this.action = bindActionCreators(MarketPromotionActions, props.dispatch);
  }

  componentDidMount() {
    const { marketPromotion } = this.props;
    let marketingEventsPaging = marketPromotion.get('marketingEventsPaging').toJS();
    let params = antdTableUtils.getParamsFromStore(marketingEventsPaging);
    this.action.getMarketingEventsPaging(params);
  }

  render() {
    let { marketPromotion } = this.props;
    let pagination = marketPromotion.getIn(['marketingEventsPaging', 'pagination']).toJS();
    let dataSource = marketPromotion.getIn(['marketingEventsPaging', 'items']).toJS();
    let tableKey = marketPromotion.getIn(['marketingEventsPaging', 'key']);

    let columns = this.getColumns();

    return (
      <div >
        <Card title="营销事件列表">
          {this.renderQueryForm()}
          <div>
            <Button type="primary" style={{marginLeft: 30, marginBottom: 10}}><Icon type="plus"/>添加</Button>
          </div>
          <Row>
            <Table
              key={tableKey}
              rowKey="id"
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
            />
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

export default connect(state => ({
  marketPromotion: state.marketPromotion
}))(createForm({
  onFieldsChange(props, fields) {
    props.dispatch({
      type: MarketPromotionTypes.UPDATE_MARKETING_COUPON_EVENTS_QUERY_FORM_DATA,
      data: fields
    });
  },
  mapPropsToFields(props) {
    return props.marketPromotion.get('marketPromotionsQueryFormData').toJS();
  }
})(MarketingEvents));
