import { useRef, useState } from 'react';
import { Button, Card, Form, Input, InputRef, List, Popover, Space, Tabs } from 'antd';
import './App.css';
import Title from 'antd/es/typography/Title';

function App() {
  const inputRef = useRef<InputRef>(null);

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
    const updatedToDoList = toDoList.filter((todo) => todo !== item);
    setToDoList(updatedToDoList);
    setDoneList([...doneList, item]);
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
              <Button type="primary" onClick={handleAdd}>
                Add
              </Button>
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
              <Popover content="Click to mark as done" trigger="hover" placement="right">
                <Card
                  style={{ width: '100%', cursor: 'pointer' }}
                  onClick={() => handleCheck(item)}>
                  {item}
                </Card>
              </Popover>
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
              <Card style={{ width: '100%' }}>{item}</Card>
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
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </>
  );
}

export default App;
