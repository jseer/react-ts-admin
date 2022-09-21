import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './ResourceCheck.module.less';
import { union, pullAll, pull } from 'lodash';
import { IResourceCheckProps } from './ResourceCheck';

interface IResourceCheckItemProps extends Omit<IResourceCheckProps, 'list'> {
  item: any;
}

const ResourceCheckItem: React.FC<IResourceCheckItemProps> = (props) => {
  const { item, onChange, value = [], type, parentsMap } = props;
  const checked = value.includes(item.id);

  const getIdsFromChildren = (children: any[], ids: number[]) => {
    children.forEach((it: any) => {
      ids.push(it.id);
      if (it.children) {
        getIdsFromChildren(it.children, ids);
      }
    });
  };

  const getIdsFromParents = (item: any) => {
    return parentsMap[item.id]|| [];
  }

  const onCheck = (e: CheckboxChangeEvent) => {
    const v = e.target.checked;
    const ids: number[] = [];
    if(item.children) {
      getIdsFromChildren(item.children, ids);
    }
    let newValue: number[] = [];
    if(v) {
      const parents = getIdsFromParents(item);
      newValue = union(value, ids.concat(parents.map((p: any) => p.id)));
      // let i = -1;
      // while(++i < parents.length) {
      //   const p = parents[i];
      //   if(p.children.every((c: any) => newValue.includes(c.id))) {
      //     newValue = union(newValue, [p.id]);
      //   } else {
      //     break;
      //   }
      // }
    } else {
      const [self, ...parents] = getIdsFromParents(item);
      pullAll(value, ids.concat(self.id));
      let i = -1;
      while(++i < parents.length) {
        const p = parents[i];
        if(p.children.some((c: any) => value.includes(c.id))) {
          break;
        } else {
          pull(value, p.id);
        }
      }
      newValue = value;
    }
    onChange!([...newValue]);
  };
  return (
    <div className={styles.resourceCheckItem}>
      {item.type === '1' && item.children ? (
        <>
          {item.children.length ? (
            <Checkbox checked={checked} onChange={onCheck}>
              {item.name}
            </Checkbox>
          ) : null}
          {item.children.map((c: any) => (
            <ResourceCheckItem
              type={type}
              key={c.id}
              item={c}
              value={value}
              onChange={onChange}
              parentsMap={parentsMap}
            />
          ))}
        </>
      ) : (
        <div>
          <Checkbox checked={checked} onChange={onCheck}>
            {item.name} {item.path}
          </Checkbox>
        </div>
      )}
    </div>
  );
};
export default ResourceCheckItem;
