import Head from 'next/head';
import { useState } from 'react';

const API_URL = 'http://localhost:5000/api/v1';

const fetchGroups = async () => {
  const res = await fetch(`${API_URL}/groups`);
  const { data } = await res.json();
  return data;
};

export default function Home({ data }) {
  // console.log('groups', groups);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState(data || []);

  const handleOnLogin = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
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

    const userRes = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { data: userDetails } = await userRes.json();

    setToken(token);
    setUser(userDetails);
  };

  const handleOnJoinGroup = async id => {
    try {
      await fetch(`${API_URL}/groups/${id}/join`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      setGroups(await fetchGroups());
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
        {groups.map(({ _id, name, members, owner }) => {
          return (
            <div key={_id} className="border border-gray-500 rounded p-2 shadow">
              <div className="flex justify-between items-center ">
                <h2 className="text-lg">{name}</h2>
                {user && owner !== user._id && (
                  <button
                    type="button"
                    onClick={() => handleOnJoinGroup(_id)}
                    className={`border rounded font-semibold text-sm py-1 px-2 ${
                      members.some(({ _id }) => _id === user?._id)
                        ? 'border-red-600 text-red-600'
                        : 'border-blue-600 text-blue-600'
                    }`}
                  >
                    {members.some(({ _id }) => _id === user?._id) ? '- Leave' : '+ Join'}
                  </button>
                )}
              </div>
              <div className="text-sm">
                <h2 className="font-medium">Members</h2>
                <div className="flex space-x-4 text-blue-600">
                  {members.length && members.map(({ _id, name }) => <div key={_id}>{name}</div>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => ({
  props: { data: await fetchGroups() }
});
