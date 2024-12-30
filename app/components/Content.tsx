import React from 'react';
import { Card, Divider, Flex, Pagination, Row, Space, Typography} from 'antd';
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from "@ant-design/icons";


const cardInfoList = [
    {
        id: 1,
        title: 'Sed ipsum',
        class: {id: 1, name: 'test class 1'},
        tag: [],
        createTime: '',
        preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.'
    },
    {
        id: 2,
        title: 'Molestie dolor',
        class: {id: 1, name: 'test class 1'},
        preview: 'Vero erat eos magna at sit delenit lorem eum eos dolore kasd ea placerat zzril nonumy amet. Diam praesent invidunt qui sed.'
    },
    {
        id: 3,
        title: 'Eros et',
        class: {id: 1, name: 'test class 1'},
        preview: 'Minim stet et tempor et consetetur aliquip eos et kasd sea accusam et eirmod sit in accusam lorem rebum. Mazim justo amet ipsum magna ea dolore minim sanctus magna sea te elitr duis stet elitr laoreet takimata.Minim stet et tempor et consetetur aliquip eos et kasd sea accusam et eirmod sit in accusam lorem rebum. Mazim justo amet ipsum magna ea dolore minim sanctus magna sea te elitr duis stet elitr laoreet takimata.'
    },
    {
        id: 4,
        title: 'Dolores lorem',
        class: {id: 1, name: 'test class 1'},
        preview: 'Est eirmod vel accusam lorem magna elitr justo vero ut sed erat te. Sed tempor amet at consetetur accumsan dolore dolor et sit et aliquyam soluta.'
    },
    {
        id: 5,
        title: 'Nonumy duis',
        class: {id: 1, name: 'test class 2'},
        preview: 'Duis dolore justo et lorem sea illum nonumy est amet amet. Consequat erat lorem sit consetetur justo gubergren esse esse rebum sadipscing ipsum et dolor lorem aliquyam eos invidunt dolor.'
    },
    {
        id: 1,
        title: 'Sed ipsum',
        class: {id: 1, name: 'test class 1'},
        tag: [],
        createTime: '',
        preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.'
    },
    {
        id: 2,
        title: 'Molestie dolor',
        class: {id: 1, name: 'test class 1'},
        preview: 'Vero erat eos magna at sit delenit lorem eum eos dolore kasd ea placerat zzril nonumy amet. Diam praesent invidunt qui sed.'
    },
    {
        id: 3,
        title: 'Eros et',
        class: {id: 1, name: 'test class 1'},
        preview: 'Minim stet et tempor et consetetur aliquip eos et kasd sea accusam et eirmod sit in accusam lorem rebum. Mazim justo amet ipsum magna ea dolore minim sanctus magna sea te elitr duis stet elitr laoreet takimata.'
    },
    {
        id: 4,
        title: 'Dolores lorem',
        class: {id: 1, name: 'test class 1'},
        preview: 'Est eirmod vel accusam lorem magna elitr justo vero ut sed erat te. Sed tempor amet at consetetur accumsan dolore dolor et sit et aliquyam soluta.'
    },
    {
        id: 5,
        title: 'Nonumy duis',
        class: {id: 1, name: 'test class 2'},
        preview: 'Duis dolore justo et lorem sea illum nonumy est amet amet. Consequat erat lorem sit consetetur justo gubergren esse esse rebum sadipscing ipsum et dolor lorem aliquyam eos invidunt dolor.'
    },
];

const imgStyle: React.CSSProperties = {
    height: '280px',
    width: '180px',
    display: 'block',
    objectFit: 'cover'
}

const cardBodyStyle: React.CSSProperties = {
    overflow: 'hidden',
    padding: 0
};

const cardStyle: React.CSSProperties = {
    boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
    width: '800px', padding: 0, overflow: 'hidden',
}

const dividerStyle: React.CSSProperties = {
    color: '#000000'
}

//
const cardList: React.JSX.Element[] = cardInfoList.map(cardInfo =>
    <Row key={cardInfo.id} justify="center">
        <Card style={cardStyle} styles={{body: cardBodyStyle}}>
            <Flex justify="space-between" gap='small'>
                <Flex vertical justify='space-around' align='flex-start' style={{padding: 24}}>
                    <div style={{width: '100%'}}>
                        <Typography.Title level={4}>{cardInfo.title}</Typography.Title>
                        <Divider style={dividerStyle}/>
                    </div>
                    <div style={{height: '100px', overflow: 'hidden', marginBottom: 10}}>
                        <Typography.Paragraph>{cardInfo.preview}</Typography.Paragraph>
                    </div>
                    <Flex justify="space-between" align='center' style={{width: '100%'}}>
                        <Typography.Text type={"secondary"}><ClockCircleOutlined/> {'2024-10-10 10:10:10'}</Typography.Text>
                        <Divider style={dividerStyle} type='vertical'/>
                        <Typography.Text type={"secondary"}><BorderlessTableOutlined/> {cardInfo.class.name}</Typography.Text>
                        <Divider style={dividerStyle} type='vertical'/>
                        <Typography.Text type={"secondary"}><TagsOutlined/> {cardInfo.class.name}</Typography.Text>
                    </Flex>
                </Flex>
                <img src='https://wwr.icu/assets/0.8f127386.jpg' alt='' style={imgStyle}/>
            </Flex>
        </Card>
    </Row>
)

const AppContent: React.FC = () => {
    return (
    <Space direction="vertical" size={16} style={{ marginTop: "16px", width: '100%' }}>
        {cardList}
        <Pagination align="center" defaultCurrent={1} total={50} />
    </Space>
    )
};

export default AppContent
