import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [token, setToken] = useState(null);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await fetch('http://localhost:5000/api/v1/groups');
    const { data } = await res.json();

    setGroups(data);
  };

  const handleOnLogin = async () => {
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'mozzey@test.com',
        password: '123456'
      })
    });
    const { token } = await res.json();
    setToken(token);
    fetchGroups();
  };

  const handleOnJoinGroup = async e => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/groups/${e.target.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      fetchGroups();

      console.log(`data`, data);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={handleOnLogin}
          className="border rounded bg-blue-600 text-white font-semibold text-sm py-1 px-2"
        >
          Login
        </button>
      </div>
      <div className="flex flex-col space-y-6 m-10">
        {groups.map(({ _id, name, members }) => (
          <div key={_id} className="border border-gray-500 rounded p-2 shadow">
            <div className="flex justify-between items-center ">
              <h2>{name}</h2>
              <button
                type="button"
                id={_id}
                onClick={handleOnJoinGroup}
                className="border rounded bg-blue-600 text-white font-semibold text-sm py-1 px-2"
              >
                + Join
              </button>
            </div>
            <div className="text-blue-600">
              {members.length && members.map(({ _id, name }) => <div key={_id}>{name}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
