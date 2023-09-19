import { useRef, useState } from 'react';
import { Button, Card, Form, Input, List, Space, Tabs, Tooltip } from 'antd';
import './App.css';
import Title from 'antd/es/typography/Title';
import { CheckOutlined } from '@ant-design/icons';

function App() {
  const inputRef = useRef(null);

  const [toDoList, setToDoList] = useState<string[]>([]);
  const [doneList, setDoneList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setToDoList([...toDoList, inputValue]);
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleCheck = (item: string) => {
    if (toDoList.includes(item)) {
      const updatedToDoList = toDoList.filter((todo) => todo !== item);
      setToDoList(updatedToDoList);
      setDoneList([...doneList, item]);
    }
  };

  const handleClearAll = () => {
    setToDoList([]);
    setDoneList([]);
  };

  const items = [
    {
      key: '1',
      label: 'Add',
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form>
            <Form.Item>
              <Input
                placeholder="Write here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={handleAdd}>
                  Add
                </Button>
                {toDoList.length > 0 && <Button onClick={handleClearAll}>Clear All</Button>}
              </Space>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      key: '2',
      label: 'Done',
      children: (
        <List
          dataSource={doneList}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <div style={{ textDecoration: 'line-through' }}>{item}</div>
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: '3',
      label: 'Active',
      children: (
        <List
          dataSource={toDoList}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '100%', cursor: 'pointer' }} onClick={() => handleCheck(item)}>
                {item}
                <Tooltip title="Mark as done">
                  <Button
                    type="link"
                    size="small"
                    style={{ float: 'right' }}
                    onClick={() => handleCheck(item)}
                    icon={<CheckOutlined />}
                  />
                </Tooltip>
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: '4',
      label: 'All',
      children: (
        <List
          dataSource={[...toDoList, ...doneList]}
          renderItem={(item) => (
            <List.Item>
              {doneList.includes(item) ? (
                <Card style={{ width: '100%' }}>
                  <div style={{ textDecoration: 'line-through' }}>{item}</div>
                </Card>
              ) : (
                <Card style={{ width: '100%' }}>{item}</Card>
              )}
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <>
      <Title>Todos</Title>
      <Card style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </Card>
    </>
  );
}

export default App;
