import styles from './ResourceCheck.module.less';
import ResourceCheckItem from './ResourceCheckItem';

interface IResourceCheckProps {
  list: any[];
  value?: number[];
  onChange?: (keys: number[]) => void;
  type: 'api' | 'menu';
}
const ResourceCheck: React.FC<IResourceCheckProps> = (props) => {
  const { list, onChange, value = [], type } = props;
  return (
    <div className={styles.resourceCheck}>
      {list.map((item) => (
        <ResourceCheckItem type={type} key={item.id} item={item} onChange={onChange} value={value}/>
      ))}
    </div>
  );
};
export default ResourceCheck;
