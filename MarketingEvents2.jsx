import React, { Component } from 'react';
import { $http, $restdata } from '@lattebank/webadmin-http';
import { Form, Input, Col, Row, DatePicker, Button, Table, Card, Popconfirm, Modal, Select} from 'antd';
import 'antd/dist/antd.css';
import {formatTime} from '../../lib/configTrans.js';

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

export default
class MarketingEvents2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: [],
      eventId:'',
      eventType:'',
      eventState:'',
      cycleStatus:'',
    };
  }

  componentDidMount() {
    $http.get('campaignnew/marketing/event/paging', {
      params: {
        count: 20,
        page: 1
      }
    }).then(({data}) => {
      console.log(data.events);
      console.log(data);
      this.setState({
        params: data.events,
        total: data.total
      })
    } );
  }

  render() {
    let columns = this.getColumns();
    let {marketPromotion} = this.props;
    return (
      <div>
        <Card title="营销事件列表">
          {this.renderQueryForm()}
          <div>
            <Button type="primary" style={{marginLeft: 30, marginBottom: 10}} >添加</Button>
          </div>
          <Row>
            <Table
              dataSource={this.state.params}
              columns={columns}
              pagination={{
                defaultCurrent: 1,
                onChange: (page) => console.log(page),
                total: 100
              }}
            />
          </Row>
        </Card>
      </div>
    )
  }

  renderQueryForm() {
    // let {getFieldProps} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 10}
    };

    return (
      <Form horizontal>
        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout} label="事件ID">
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem{...formItemLayout} label="事件名称">
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout}  label="事件状态">
              <Select>
                <Option value="">&nbsp;</Option>
                <Option value="ONCE">一次性事件</Option>
                <Option value="CYCLED">连续性事件</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="周期状态">
              <Select>
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
        </Row>
        <Row>
          <Col span={10}>
            <FormItem  labelCol={{span: 6}} wrapperCol={{span: 16}} label="起止时间:">
              <RangePicker style={{width: 280}} showTime format="YYYY-MM-DD HH:mm:ss"/>
            </FormItem>
          </Col>
          <Col>
            <Button type="primary" style={{marginRight: 30, marginLeft: 30}} onClick={this.reloadData.bind(this)}>查询</Button>
            <Button type="default" style={{marginRight: 30}} >重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
  getColumns() {
    return [
      {name: 'id', dataIndex: 'id', title: '编号', width: 50},
      {name: 'name', dataIndex: 'name',title: '事件名称'},
      {name: 'upTime', dataIndex:'upTime',title: '开始日期', render: (text) => formatTime(new Date(text), "yyyy-MM-dd HH:mm:ss")},
      {name: 'downTime', dataIndex:'downTime',title: '结束日期',render: (text) => formatTime(new Date(text), "yyyy-MM-dd HH:mm:ss")},
      {name: 'updatedAt', dataIndex:'updatedAt',title: '修改日期', render: (text) => formatTime(new Date(text), "yyyy-MM-dd HH:mm:ss")},
      {name: 'channels',dataIndex:'channels',title: '渠道', width: 70,render: function(channels, item) {
        let channelsObj = item.channels;
        var channelLabel = '';
        channelsObj.map((item) => {
          channelLabel = channelLabel + item.channel + " ";
        });
        return channelLabel;
      }
      },
      {name: 'status', dataIndex:'serGroups', title: '状态', width: 80 ,render: function(status, item) {
        for(let i = 0; i<EVENT_STATUS_ENUM.length; i++) {
          if(EVENT_STATUS_ENUM[i].payload == item.status) {
            return EVENT_STATUS_ENUM[i].text;
          }
        }
      }
      },
      {name: 'type', dataIndex:'type', title: '事件类型',
      },
      {name: 'smsClickedRate', dataIndex:'smsClickedRate', title: 'SMS点击发送比',render: (text, record) => text ? <a >{text}</a> : '—'
      },
      {name: 'pushClickedRate',dataIndex:'pushClickedRate',  title: 'Push点击发送比',render: (text, record) => text ? <a >{text}</a> : '—'
      },
      {name: 'pushViewedRate', dataIndex:'pushViewedRate', title: 'Push点击展示比',render: (text, record) => text ? <a >{text}</a> : '—'
      },
      {
        name: 'ctrl', title: '操作', width: 300, render: function (ctrl, item) {
        return (
          <div>
            {
              item.status === 'DRAFT' || item.status === 'SUSPENDED'
                ?
                <Popconfirm placement="left" title="激活" primary onClick={console.log('。。')}>
                  <a style={{marginRight: 10}}>激活</a>
                </Popconfirm>
                :
                null
            }
            {
              item.status === 'WAITING'
                ?
                <Popconfirm placement="left" title="暂停" primary onClick={console.log('。。')}>
                  <a style={{marginRight: 10}}>暂停</a>
                </Popconfirm>
                :
                null
            }
            {
              item.status === 'DRAFT' || item.status === 'SUSPENDED'
                ?
                <Popconfirm placement="left" title="编辑" secondary={true} onClick={console.log('。。')}>
                  <a style={{marginRight: 10}}>编辑</a>
                </Popconfirm>
                :
                null
            }
            {
              item.status === 'DRAFT' || item.status === 'SUSPENDED'
                ?
                <Popconfirm placement="left" title="删除" secondary={true} onClick={console.log('。。')}>
                   <a style={{marginRight: 10}}>删除</a>
                </Popconfirm>
                :
                null
            }

            <a style={{marginRight: 10}} onClick={console.log('。。')}>触达详情</a>
            <a style={{marginRight: 10}} onClick={console.log('。。')}>执行详情</a>
          </div>
        );
      },
      }
    ];
  }

  reloadData() {
    const eventId = this.state.eventId;
    const eventType = this.state.eventType;
    const eventState = this.state.eventState;
    const cycleStatus = this.state.cycleStatus;

    $http.get('campaignnew/marketing/event/paging', {
      params: {
        eventId: eventId,
        eventType: eventType,
        eventState: eventState,
        cycleStatus: cycleStatus,
      }
    }).then(({data}) => {
      console.log(data.events);
      console.log(data);
      this.setState({
        params: data.events,
        total: data.total
      })
    } );
  }
}
