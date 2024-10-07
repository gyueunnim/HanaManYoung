export default function Section2({
  setId,
  setPassword,
  setPasswordCheck,
  isValidPassword,
  password,
  passwordCheck,
}) {
  return (
    <div className="w-full">
      <div className="mt-2">
        <div className="ml-2">아이디를 입력해주세요</div>
        <input
          type="text"
          className="w-full mt-2 pl-5 h-16 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="아이디 입력"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <div className="ml-2">
          비밀번호를 입력해주세요
          {isValidPassword === 0 ? null : isValidPassword === 1 ? (
            <span className="ml-3 text-xs text-blue-500">
              비밀번호 형식과 일치해요
            </span>
          ) : (
            <span className="ml-3 text-xs text-red-500">
              비밀번호 형식과 일치하지 않아요
            </span>
          )}
        </div>
        <input
          type="password"
          className="w-full mt-2 pl-5 h-16 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="비밀번호 입력 (영문, 숫자 포함 8자 이상)"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <div className="ml-2">
          비밀번호를 다시 입력해주세요
          {!passwordCheck ? null : passwordCheck === password ? (
            <span className="ml-3 text-xs text-hana">일치해요</span>
          ) : (
            <span className="ml-3 text-xs text-gray-500">일치하지 않아요</span>
          )}
        </div>
        <input
          type="password"
          className="w-full mt-2 pl-5 h-16 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </div>
    </div>
  );
}
