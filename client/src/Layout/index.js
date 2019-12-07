import React from "react";
import { Layout } from "antd";

import "./layout.css";

export default ({ children }) => (
  <Layout style={{ height: "100vh" }}>
    <h1 className="headingTodo">TODO LIST</h1>
    {children}
  </Layout>
);
