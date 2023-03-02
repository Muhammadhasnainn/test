import { Input, Modal, Select } from "antd";
import React from "react";

const ProjectModal = (props) => {
  const { modalOpen, setModalOpen } = props;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Modal
        title="Create new project"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className="d-flex align-center">
          <Input placeholder="Enter Project Name" size="large" 
          className="w-50" />
          <Select
            className="ms-3 w-50"
            defaultValue="Enter Client Name"
            size="large"
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProjectModal;
