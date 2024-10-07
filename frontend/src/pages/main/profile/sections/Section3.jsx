import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MAN_YOUNG_URL, BANK_CARD_URL } from "../../../../etc/url";
import { useSelector } from "react-redux";

export default function Section3() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [relationType, setRelationType] = useState("");
  const [relationInfo, setRelationInfo] = useState([]);
  const user = useSelector((state) => state.user);

  const [relationList, setRelationList] = useState([]);
  const [relationRequestList, setRelationRequestList] = useState([]);

  useEffect(() => {
    const getRelationInfo = async () => {
      try {
        const response = await axios.get(
          `${MAN_YOUNG_URL}/user/relation/get/${user.user_login_id}`
        );
        setRelationList(response.data.relationList);
        setRelationRequestList(response.data.relationRequestList);
      } catch (error) {
        console.error(error);
      }
    };
    getRelationInfo();
  }, []);

  const searchUserInfo = async () => {
    try {
      const response = await axios.post(
        `${MAN_YOUNG_URL}/user/search`,
        searchUser,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setSearchResult(response.data);
    } catch (error) {
      setSearchResult({});
      console.error(error);
    }
  };

  const handleSelectChange = (value) => {
    setRelationType(value);
  };

  const handleClick = () => {
    if (Object.keys(searchResult).length !== 0) {
      try {
        axios.post(`${MAN_YOUNG_URL}/user/relation/register`, relationInfo);
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    } else {
      searchUserInfo();
    }
  };

  const handleAccept = async (index) => {
    try {
      await axios.post(
        `${MAN_YOUNG_URL}/user/relation/accept/${relationRequestList[index].relation_user_target}`,
        relationRequestList[index].relation_user_request,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setRelationInfo({
      relation_user_request: user.user_login_id,
      relation_user_target: searchResult.user_login_id,
      relation_user_type: relationType,
    });
  }, [user, searchResult, relationType]);
  return (
    <div className="mt-8 px-4 py-4 bg-gradient-to-b from-red-100 to-purple-100 rounded-xl shadow-md">
      <div className="ml-2 flex items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/relation.png"}
          alt=""
          className="w-7 h-7"
        />
        <h1 className="ml-2 text-2xl text-gray-500 font-bold">관계</h1>
      </div>
      <div className="w-[98%] mt-3 mx-auto font-basic flex gap-10">
        <div className="w-[50%] bg-white border px-7 pt-3 pb-5 rounded-xl">
          <div className="mb-3 flex justify-between items-end">
            <p>관계 목록</p>
            <p
              className="text-blue-500 text-xs cursor-pointer"
              onClick={() => {
                onOpen();
              }}
            >
              관계 추가
            </p>
          </div>
          {relationList.length === 0 ? (
            <div className="h-36 flex justify-center items-center">
              관계를 추가해주세요!
            </div>
          ) : (
            <div className="mt-1 py-1 text-center border-b bg-slate-100 flex">
              <p className="w-[25%]">아이디</p>
              <p className="w-[25%]">이름</p>
              <p className="w-[25%]">관계</p>
              <p className="w-[25%]">등록일</p>
            </div>
          )}
          {relationList.map((data, index) => {
            return (
              <div className="py-1 text-center flex" key={index}>
                <p className="w-[25%]">{data.relation_user_target}</p>
                <p className="w-[25%]">{data.relation_user_name}</p>
                <p className="w-[25%]">{data.relation_user_type_name}</p>
                <p className="w-[25%]">{data.relation_date}</p>
              </div>
            );
          })}
        </div>
        <div className="w-[50%] bg-white border px-5 py-5 rounded-xl">
          <div>요청</div>
          {relationRequestList.length === 0 ? (
            <div className="h-36 flex justify-center items-center">
              요청이 없어요
            </div>
          ) : (
            <div className="w-full h-36 overflow-y-auto">
              <div className="w-full mt-1 py-1 text-center border-b flex">
                <p className="w-[25%]">아이디</p>
                <p className="w-[25%]">관계</p>
                <p className="w-[25%]">요청일</p>
                <p className="w-[25%]">수락</p>
              </div>
              {relationRequestList.map((data, index) => {
                return (
                  <div className="mt-1 text-center flex" key={index}>
                    <p className="w-[25%]">{data.relation_user_target}</p>
                    <p className="w-[25%]">{data.relation_user_type_name}</p>
                    <p className="w-[25%]">{data.relation_date}</p>
                    <p className="w-[25%] text-white">
                      <span
                        className="px-3 py-1 text-sm rounded-lg btn-hana-blue cursor-pointer hover:opacity-80 duration-300"
                        onClick={() => {
                          handleAccept(index);
                        }}
                      >
                        추가
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/hana/relation.png"}
                alt=""
                className="w-7 h-7 mr-2"
              />
              <p className="text-2xl text-gray-600">관계</p>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <p className="mb-2 ml-2 font-bold">아이디</p>
              <input
                type="text"
                placeholder="추가하실 아이디를 입력해주세요"
                className="w-full h-12 border rounded-xl px-3 py-1 border-gray-400"
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
              />
            </div>
            {searchResult === "" ? (
              <></>
            ) : Object.keys(searchResult).length !== 0 ? (
              <div className="w-full mt-3 mx-auto px-4 py-3 font-basic flex justify-between items-center">
                <div className="flex gap-5">
                  <p className="text-gray-500">아이디</p>
                  <p className="font-bold">{searchResult.user_login_id}</p>
                </div>
                <div className="flex gap-5">
                  <p className="text-gray-500">성함</p>
                  <p className="font-bold">{searchResult.user_name}</p>
                </div>
                <select
                  name=""
                  id=""
                  value={relationType || "none"}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="w-[15%] font-bold text-center cursor-pointer"
                >
                  <option value="none">관계</option>
                  <option value="RT_01">가족</option>
                  <option value="RT_02">친구</option>
                </select>
              </div>
            ) : (
              <div className="mt-3 py-3 text-center text-red-500 text-sm">
                해당하는 아이디가 없습니다.
              </div>
            )}
            <div
              className="mt-4 mb-8 py-2 text-white text-xl text-center rounded-xl btn-hana-blue cursor-pointer hover:opacity-80 duration-300"
              onClick={() => {
                handleClick();
              }}
            >
              {Object.keys(searchResult).length !== 0 ? "추가하기" : "검색하기"}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
