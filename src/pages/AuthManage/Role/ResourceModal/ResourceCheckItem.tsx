import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './ResourceCheck.module.less';

interface IResourceCheckProps {
  item: any;
  value?: number[];
  onChange?: (keys: number[]) => void;
  type: 'api' | 'menu';
}
const ResourceCheckItem: React.FC<IResourceCheckProps> = (props) => {
  const { item, onChange, value = [], type } = props;
  const checked = value.includes(item.id);
  const onCheckChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if(checked) {
      onChange!([...value, item.id]);
    } else {
      onChange!(value.filter((v) => v !== item.id));
    }
  }
  return (
    <div className={styles.resourceCheckItem}>
      {item.type === '1' && item.children ? (
        <>
          {type === 'menu' ? (
            <Checkbox checked={checked} onChange={onCheckChange}>{item.name} {item.path}</Checkbox>
          ): (
            <div>{item.name}</div>
          )}
          {item.children.map((c: IResourceCheckProps['item']) => (
            <ResourceCheckItem type={type} key={c.id} item={c} value={value} onChange={onChange}/>
          ))}
        </>
      ) : (
        <div>
          <Checkbox checked={checked} onChange={onCheckChange}>{item.name}  {item.path}</Checkbox>
        </div>
      )}
    </div>
  );
};
export default ResourceCheckItem;
