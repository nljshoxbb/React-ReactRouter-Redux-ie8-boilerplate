import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/dashboard.js';
import Toast from '../../../components/toast';
import Modal from '../../../components/modal';
import { bindActionCreators } from 'redux';
import styles from './style.scss';
import {
    Button,
    Row,
    Col,
    Menu,
    Dropdown,
    Icon,
    // Pagination,
    Steps,
    Cascader,
    // Checkbox,
    DatePicker,
    Form,
    Input,
    Rate,
    Radio
} from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;

console.log( Radio.Button)
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
}];
function onChange(date, dateString) {
    console.log(date, dateString);
}

@connect((({ dashboard }) => ({ dashboard })), ((dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
})))
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            options,
            inputValue: '',
        }
    }


    componentDidMount() {

    }

    _handleModal = () => {
        this.setState({ show: !this.state.show });
    }
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
        this.setState({
            inputValue: selectedOptions.map(o => o.label).join(', '),
        });
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [{
                label: `${targetOption.label} Dynamic 1`,
                value: 'dynamic1',
            }, {
                label: `${targetOption.label} Dynamic 2`,
                value: 'dynamic2',
            }];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                alert(JSON.stringify(values))
            }
        });
    }
    render() {
        const { actions } = this.props;
        const { show } = this.state;
        const { getFieldDecorator } = this.props.form;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <div className={styles['red']} onClick={() => actions.add(1)}>add</div>
                {this.props.dashboard.count}
                <br />
                <Button type="primary" shape="circle" icon="search" />
                <br />
                <Button type="primary" loading >Click me!</Button>
                <br />
                <Button type="primary" shape="circle" loading />
                <br />
                <Row >
                    <Col className={styles['blue1']} span={12}>col-12</Col>
                    <Col className={styles['blue2']} span={12}>col-12</Col>
                </Row>
                <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Row gutter={32}>
                    <Col span={6} >
                        <div className={styles['blue1']}>col-6</div>
                    </Col>
                    <Col span={6} >
                        <div className={styles['blue1']}>col-6</div>
                    </Col>
                    <Col span={6} >
                        <div className={styles['blue1']}>col-6</div>
                    </Col>
                    <Col span={6} >
                        <div className={styles['blue1']}>col-6</div>
                    </Col>
                </Row>
                <br />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                        Hover me <Icon type="down" />
                    </a>
                </Dropdown>
                <br />
                <Steps direction="vertical" current={1}>
                    <Steps.Step title="Finished" description="This is a description." />
                    <Steps.Step title="In Progress" description="This is a description." />
                    <Steps.Step title="Waiting" description="This is a description." />
                </Steps>
                <br />
                <Cascader
                    options={this.state.options}
                    loadData={this.loadData}
                    onChange={this.onChange}
                    changeOnSelect
                />
                <br />
                <DatePicker onChange={onChange} />
                <br />
                <MonthPicker onChange={onChange} placeholder="Select month" />
                <br />
                <RangePicker onChange={onChange} />
                <br />
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in </Button>
                    </FormItem>
                </Form>
                <br />
                <Input.Search
                    placeholder="input search text"
                    style={{ width: 200 }}
                    onSearch={value => console.log(value)}
                />
                <Row>
                    <Col>
                        <Rate character={<Icon type="heart" />} allowHalf />
                        <br />
                        <Rate character="A" allowHalf style={{ fontSize: 36 }} />
                        <br />
                        <Rate character="好" allowHalf />
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}
const DashboardWrap = Form.create()(Dashboard);
export default DashboardWrap;