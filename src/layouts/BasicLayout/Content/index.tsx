import { Layout } from "antd";
import { useOutlet } from "react-router-dom";

const { Content: AContent } = Layout;
const Content: React.FC = () => {
  const Outlet = useOutlet();

  return <AContent>{Outlet}</AContent>;
};

export default Content;
