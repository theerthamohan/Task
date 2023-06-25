import React, { FC, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Table } from "antd";
import { TTaskList } from "../types";

const formInit: TTaskList = {
  id: 0,
  title: "",
  description: "",
  status: undefined,
};

const TaskModal: FC<{
  visible?: boolean;
  onHide?: () => void;
  setTaskList?: any;
  tasklist: TTaskList[];
  mode: any;
  editData: TTaskList;
}> = ({ visible, onHide, setTaskList, tasklist, mode, editData }) => {
  const [form] = Form.useForm<TTaskList>();

  useEffect(() => {
    if (mode === "EDIT" && editData) {
      form.setFieldsValue({
        title: editData?.title,
        description: editData?.description,
        status: editData?.status,
      });
    } else {
      form.resetFields();
    }
  }, [mode, editData, form]);

  const handleEdit = (
    id?: any,
    title?: any,
    status?: any,
    description?: any
  ) => {
    const newItem = tasklist.map((item) =>
      item.id === editData.id ? { id, title, status, description } : item
    );

    setTaskList(newItem);
  };
  const onHandle = async () => {
    const value = await form.validateFields();

    if (mode === "EDIT") {
      handleEdit(editData.id, value.title, value.status, value.description);
    } else {
      setTaskList([...tasklist, { ...value, id: Date.now() }]);
    }

    form.resetFields();
    onHide?.();
  };

  return (
    <>
      <div>
        <Modal
          open={visible}
          onCancel={onHide}
          okText={mode === "EDIT" ? "Update" : "Add"}
          onOk={onHandle}
          title={mode === "EDIT" ? "Edit Task" : "Add Task"}
        >
          <Form layout="vertical" form={form} initialValues={formInit}>
            <Form.Item
              label="title"
              name="title"
              rules={[{ required: true, message: "Task title is required" }]}
            >
              <Input placeholder="Task title" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Task description" />
            </Form.Item>
            <Form.Item
              name="status"
              rules={[{ required: true, message: "please select status" }]}
              label="Status"
            >
              <Select
                options={[
                  { value: "progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                ]}
                placeholder="Select status"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default TaskModal;
