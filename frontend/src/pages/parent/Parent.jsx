import { useEffect, useState } from "react";
import BottomNav from "../common/BottomNav";
import Footer from "../common/Footer";
import SubHeader from "../common/SubHeader";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import { childrenSample } from "../../data/childrenSample";
import { useSelector } from "react-redux";
import { MAN_YOUNG_URL } from "../../etc/url";
import axios from "axios";
import LoadingSkeleton from "../common/LoadingSkeleton";

export default function Parent() {
  const [selected, setSelected] = useState(0);
  const user = useSelector((state) => state.user);
  const children = childrenSample;
  const [relationList, setRelationList] = useState([]);
  const [relationRequestList, setRelationRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
      setIsLoading(false);
    };
    getRelationInfo();
  }, [user.user_login_id]);

  if (isLoading) return <LoadingSkeleton />;
  return (
    <div className="animate__animated animate__fadeIn">
      <SubHeader type="부모님용" color="text-black" />
      <div className="relative h-full min-h-[calc(100vh-78px)] pt-[78px] bg-hana">
        <div className="w-full max-w-[1440px] min-h-[calc(100vh-78px)] mx-auto pt-6 pb-10 flex flex-col">
          <Section1
            user={user}
            children={children}
            selected={selected}
            setSelected={setSelected}
            relationList={relationList}
            relationRequestList={relationRequestList}
          />
          <Section2 />
        </div>
      </div>
      <div className="w-full border-t">
        <div className="max-w-[1440px] mx-auto mb-12">
          <BottomNav />
        </div>
      </div>
      <Footer color={"text-black"} bgColor={"bg-white"} />
    </div>
  );
}
