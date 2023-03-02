import { Button, Dropdown, Input, Row, Tooltip, Typography } from "antd";
import {
  PlusCircleOutlined,
  TagOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

const Timetracker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [billable, setBillable] = useState(false);

  const items = [
    {
      key: "1",
      label: <Input placeholder="Search Projects" className="py-1"/>,
    },
    {
      key: "2",
      label: <p>My Project</p>,
    },
    {
      key: "3",
      label: (
        <div className="d-flex" onClick={()=> setModalOpen(true)}>
          <PlusCircleOutlined
            style={{ fontSize: "1.4rem", color: "#03a9f4" }}
          />
          <p className="ms-2 pointer" style={{ color: "#03a9f4" }}>
            Create Project
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="Tracker">
      <div className="trackerBar d-flex justify-content-between flex-wrap py-2 px-2 border bg-white w-100">
        <div className="d-flex w-70">
          <Input placeholder="Basic usage" className="py-1 workdesc" />
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            onOpenChange={(e)=> console.log(e)}
            arrow
          >
            <div className="d-flex align-center px-4 pe-5 ms-2 border-r">
              <PlusCircleOutlined
                style={{ fontSize: "1.4rem", color: "#03a9f4" }}
              />
              <p className="ms-2 pointer" style={{ color: "#03a9f4" }}>
                Project
              </p>
            </div>
          </Dropdown>
        </div>
        <div className="d-flex w-30">
          <div className="d-flex align-center px-3 border-r pointer">
            <TagOutlined style={{ fontSize: "1.5rem", color: "#666" }} />
          </div>
          <Tooltip
            placement="topLeft"
            title={billable ? `Billable` : "Non-billable"}
            className="d-flex align-center px-3 border-r pointer me-3"
            onClick={() => setBillable(!billable)}
          >
            <DollarOutlined
              style={{
                fontSize: "1.5rem",
                color: billable ? "#03a9f4" : "#666",
              }}
            />
          </Tooltip>
          <div className="d-flex align-center px-3">
            <p className="bold" style={{ fontSize: "1.2rem" }}>
              00:00:00
            </p>
            <Button
              type="primary"
              htmlType="submit"
              className="ms-4 w-100 rounded px-5"
              size="large"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
      <ProjectModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </section>
  );
};

export default Timetracker;
