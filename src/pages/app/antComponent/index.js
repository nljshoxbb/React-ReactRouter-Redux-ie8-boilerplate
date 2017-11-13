import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/dashboard.js';

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
    // Radio,
    Select,
    // Slider,
    Switch,
    // TreeSelect,
    TimePicker,
    // Transfer,
    Upload,
    // message,
    Avatar,
    Badge,
    // Card,
    // Carousel,
    Collapse,
    Popover,
    // Tooltip,
    // Table,
    Tabs,
    Tag,
    Timeline,
    Tree,
    Alert,
    Modal,
    Spin,
    // Affix,
    // BackTop
} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const treeData = [{
    label: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    label: 'Node2',
    value: '0-1',
    key: '0-1',
}];

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
const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}

const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);
@connect((({ dashboard }) => ({ dashboard })), ((dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
})))
class AntComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            options,
            inputValue: '',
            targetKeys,
            selectedKeys: [],
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

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });

        console.log('targetKeys: ', targetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }
    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
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
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        const Uploadprops = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    // message.success(`${info.file.name} file uploaded successfully`);
                    alert(JSON.stringify(info.file.name))
                } else if (info.file.status === 'error') {
                    // message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


        const state = this.state;
        return (
            <div className={styles.container}>
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
                <br />
                <div className="mb">
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={(value) => { console.log(value) }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                </div>
                <div className="mb">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onChange={(value) => console.log(value)}
                    >
                        {children}
                    </Select>
                </div>

                <div className="mb">
                    Switch<Switch defaultChecked={false} onChange={(value) => console.log(value)} />,
                </div>
                <div className="mb">
                    <TimePicker onChange={(value) => console.log(value)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                </div>
                <div className="mb">
                    <Upload {...Uploadprops}>
                        <Button> <Icon type="upload" /> Click to Upload </Button>
                    </Upload>
                </div>
                <div className="mb">
                    <div>
                        <Avatar size="large" icon="user" />
                        <Avatar icon="user" />
                        <Avatar size="small" icon="user" />
                    </div>
                    <div>
                        <Avatar shape="square" size="large" icon="user" />
                        <Avatar shape="square" icon="user" />
                        <Avatar shape="square" size="small" icon="user" />
                    </div>
                </div>
                <div>
                    <span style={{ marginRight: 24 }}>
                        <Badge count={999}><Avatar shape="square" icon="user" /></Badge>
                    </span>
                    <span>
                        <Badge dot><Avatar shape="square" icon="user" /></Badge>
                    </span>
                </div>
                <div className="mb">
                    <Collapse defaultActiveKey={['1']} onChange={(value) => console.log(value)}>
                        <Panel header="This is panel header 1" key="1">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" disabled>
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>
                <div className="mb">
                    <Popover content={
                        <div>
                            <p>Content</p>
                            <p>Content</p>
                        </div>
                    } title="Title">
                        <Button type="primary">Hover me</Button>
                    </Popover>
                </div>
                <div className="mb">
                    <Tabs defaultActiveKey="1" onChange={(value) => console.log(value)}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </div>
                <div className="mb">
                    <Tag>Tag 1</Tag>
                    <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
                    <Tag closable >Tag 2</Tag>
                    <Tag closable >Prevent Default</Tag>
                </div>
                <div className="mb">
                    <Timeline>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                    </Timeline>
                </div>
                <div className="mb">
                    <Tree
                        checkable
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={(selectedKeys, info) => console.log(selectedKeys, info)}
                        onCheck={(checkedKeys, info) => console.log(checkedKeys, info)}
                    >
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="parent 1-0" key="0-0-0" disabled>
                                <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                                <TreeNode title="leaf" key="0-0-0-1" />
                            </TreeNode>
                            <TreeNode title="parent 1-1" key="0-0-1">
                                <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
                <div className="mb">
                    <Alert message="Success Text" type="success" />
                </div>

                <div className="mb">
                    <Button onClick={() =>
                        Modal.confirm({
                            title: 'Do you want to delete these items?',
                            content: 'When clicked the OK button, this dialog will be closed after 1 second',
                            onOk() {
                                return new Promise((resolve, reject) => {
                                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                }).catch(() => console.log('Oops errors!'));
                            },
                            onCancel() { },
                        })}> Confirm </Button>
                </div>

                <div className="mb">
                   
                </div>
            </div>
        );
    }
}
const AntComponentWrap = Form.create()(AntComponent);
export default AntComponentWrap;