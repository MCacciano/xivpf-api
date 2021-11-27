const GroupList = ({ user, groups = [], onJoinGroup }) => {
  return (
    <div className="flex flex-col space-y-6 m-6">
      {groups.map(({ _id, name, members, owner }) => {
        return (
          <div key={_id} className="border border-gray-500 rounded p-2 shadow">
            <div className="flex justify-between items-center ">
              <h2 className="text-lg">{name}</h2>
              {user && owner !== user._id && (
                <button
                  type="button"
                  onClick={() => {
                    if (onJoinGroup) onJoinGroup(_id);
                  }}
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
  );
};

export default GroupList;
