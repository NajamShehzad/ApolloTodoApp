import React, { PureComponent } from "react";
import { Skeleton, Row, Col, Button, Input, Table } from "antd";

import { buttons } from "./columns";
import "./todo.css";
import { getTasks, addTask } from "../hocs";
import Item from "./Item";

class ToDo extends PureComponent {
  state = {
    newTask: "",
    show: "All",
  };

  addNewTask = async () => {
    const { newTask } = this.state;
    const { addTask } = this.props;
    try {
      const res = await addTask({ description: newTask, state: "ToDo" })
      console.log(res)
      if (res && res.data && res.data.addTask.success) {
        this.setState({ newTask: '' })
      }
    } catch (err) {
      alert(err.message)
    }
  };

  render() {
    const { newTask, show } = this.state;
    const { addNewTask } = this;
    let { getTasks = [], loading } = this.props;
    const dataSource = (getTasks || []).filter(
      ({ state }) => show === "All" || state === show
    );

    const tableColumns = [
      {
        key: 'name',
        title: "Description",
        render: row => (
          <Item row={row} show="description" />
        ),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: row => (
          <Item row={row} show="action" />
        ),
      },
    ]
    console.log(this.props)

    return (
      <Row type="flex" justify="center">
        <Skeleton loading={false} active>
          <React.Fragment>
            <Col span={21} className="todo">
              <Col className="col">
                <Input
                  placeholder="Add a new task"
                  onPressEnter={addNewTask}
                  onChange={({ target }) =>
                    this.setState({ newTask: target.value })
                  }
                  value={newTask}
                />
              </Col>
              <Row>
                {buttons.map(({ name }) => (
                  <Col key={name} span={8}>
                    <Button
                      block
                      type={name === show ? "primary" : "secondary"}
                      onClick={() => this.setState({ show: name })}
                    >
                      {name}
                    </Button>
                  </Col>
                ))}
              </Row>
              <Col className="col">
                <Table
                  bordered
                  loading={loading}
                  pagination={false}
                  dataSource={dataSource}
                  rowKey="_id"
                  columns={tableColumns}
                />
              </Col>
            </Col>
          </React.Fragment>
        </Skeleton>
      </Row>
    );
  }
}

export default addTask(
  getTasks(ToDo)
);
