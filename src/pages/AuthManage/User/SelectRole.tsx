import { IRoleInfo } from '@/store/role';
import { Select } from 'antd'

const { Option } = Select;
interface ISelectRoleProps {
  value?: string[];
  onChange?: () => void;
  roleList: IRoleInfo[];
}
const SelectRole: React.FC<ISelectRoleProps> = ({value, onChange, roleList }) => {
  return (
    <Select value={value} onChange={onChange} mode="multiple" allowClear>
      {roleList.map((item) => (
    <Option value={item.code} key={item.code}>{item.name}</Option>
      ))}

  </Select>
  )
}

export default SelectRole;