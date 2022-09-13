import { Layout } from "antd";
import { useOutlet } from "react-router-dom";

const { Content: AContent } = Layout;
const Content: React.FC = () => {
  const Outlet = useOutlet();

  return (
    <AContent>
      <div style={{ padding: 20 }}>{Outlet}</div>
    </AContent>
  );
};

export default Content;
