import { Checkbox } from 'antd';
import styles from './ResourceCheck.module.less';
import ResourceCheckItem from './ResourceCheckItem';

export interface IResourceCheckProps {
  list: any[];
  value?: number[];
  onChange?: (keys: number[]) => void;
  type: 'api' | 'menu';
  parentsMap: Record<number, any>;
}
const ResourceCheck: React.FC<IResourceCheckProps> = (props) => {
  const { list, onChange, value = [], type, parentsMap } = props;
  return (
    <div className={styles.resourceCheck}>
      {list.map((item) => (
        <ResourceCheckItem parentsMap={parentsMap} type={type} key={item.id} item={item} onChange={onChange} value={value}/>
      ))}
    </div>
  );
};
export default ResourceCheck;
