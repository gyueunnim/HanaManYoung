import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../etc/url";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로그인</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <iframe src={LOGIN_URL} width="100%" height="330" />
          <div className="pb-5 mt-2">
            <h2 className="ml-3 text-sm font-basic">아직 회원이 아니라면?</h2>
            <button
              type="submit"
              className="w-[97%] mt-2 ml-2 py-3 text-center text-xl text-white btn-hana-blue rounded-xl cursor-pointer hover:opacity-85 transition-all duration-300 ease-in-out"
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
