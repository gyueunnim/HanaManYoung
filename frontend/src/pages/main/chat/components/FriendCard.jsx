export default function FriendCard({ data, setSelectFriend }) {
  return (
    <div
      className="px-3 py-2 border font-basic text-gray-700 cursor-pointer opacity-80 duration-300"
      onClick={() => setSelectFriend(data)}
    >
      <div className="text-base flex justify-between items-end">
        <p className="font-bold">{data.relation_user_name}</p>
        <p className="text-sm">등록일</p>
      </div>
      <div className="text-xs flex justify-between">
        <p>아이디 {data.relation_user_target}</p>
        <p>{data.relation_date}</p>
      </div>
    </div>
  );
}
