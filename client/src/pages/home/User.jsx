const User = () => {
  return (
    <div className="flex items-center gap-5">
      <div class="avatar online">
        <div class="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">Full Name</h2>
        <p className="text-sm">Username</p>
      </div>
    </div>
  );
};

export default User;
