import { useEffect } from 'react';
import useGroupContext from '../hooks/useGroupCtx';

const Groups = () => {
  const { groups } = useGroupContext();

  return (
    <div>
      <ul>
        {groups.map(({ _id, name }) => {
          return (
            <li key={_id}>
              <h2>{name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Groups;
