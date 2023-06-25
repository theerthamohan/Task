import { Badge, Button, Card, Col, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import TaskModal from "../features/components/TaskModal";
import { TModalState, TTaskList } from "../features/types";
import { ColumnsType } from "antd/es/table";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { showsModal } from "../features/task/taskslice";
import EmptyBlock from "../features/components/EmptyBlock";

const Tasklist = () => {
  const show = useSelector(
    (state: RootState) => state.task.taskModalState.show
  );
  const mode = useSelector(
    (state: RootState) => state.task.taskModalState.mode
  );
  const data = useSelector(
    (state: RootState) => state.task.taskModalState.data
  );
  const dispatch = useDispatch();
  const [tasklist, setTaskList] = useState<TTaskList[]>([]);

  const handleDelete = (id?: any) => {
    const result = tasklist?.filter((item, index) => index !== id);
    setTaskList(result);
  };

  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-button-container">
        <Button
          className="add-btn"
          onClick={() => dispatch(showsModal({ show: true, mode: "ADD" }))}
        >
          Add Task
        </Button>
      </div>

      {show && (
        <TaskModal
          visible={show}
          onHide={() => dispatch(showsModal({ show: false }))}
          setTaskList={(val?: any) => setTaskList(val)}
          tasklist={tasklist}
          mode={mode}
          editData={data}
        />
      )}

      <div className="tasklist-container">
        <h1 className="task-list-title">Task List</h1>
        <div className="tasklist">
          <Row gutter={[15, 15]}>
            {tasklist.length > 0 ? (
              tasklist?.map((item, index) => (
                <Col lg={8} md={12} sm={12} xs={24}>
                  <Card key={index} className="task-card">
                    <h4 className="card-title">{item?.title}</h4>
                    <Badge
                      style={{ backgroundColor: "#faad14" }}
                      count={
                        item?.status === "progress"
                          ? "In progress"
                          : "Completed"
                      }
                    ></Badge>

                    <p className="card-description">{item?.description}</p>

                    <Space>
                      <Button
                        onClick={() =>
                          dispatch(
                            showsModal({ show: true, mode: "EDIT", data: item })
                          )
                        }
                        icon={<BiEdit />}
                        style={{ backgroundColor: "#0d73c1", color: "#fff" }}
                        shape="circle"
                      />
                      <Button
                        onClick={() => handleDelete(index)}
                        icon={<AiOutlineDelete />}
                        style={{ backgroundColor: "red", color: "#fff" }}
                        shape="circle"
                      />
                    </Space>
                  </Card>
                </Col>
              ))
            ) : (
              <EmptyBlock />
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Tasklist;
