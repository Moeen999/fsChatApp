const User = ({ otherUsers }) => {
  return (
    <div className="flex items-center gap-5 hover:bg-gray-500 rounded-lg p-2 cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={otherUsers?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{otherUsers?.fullName}</h2>
        <p className="text-sm">{otherUsers?.username}</p>
      </div>
    </div>
  );
};

export default User;
