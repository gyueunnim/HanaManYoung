import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

export default function CheckCardInfo({ cardCheck, setCardCheck }) {
  const handleCardCheck = () => {
    setCardCheck(!cardCheck);
  };
  return (
    <>
      <ModalHeader>
        영하나플러스 체크카드
        <span className="pl-2 text-hana text-xs font-thin">
          (하단의 약관 동의란에 체크해주세요)
        </span>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Accordion>
          <div className="font-basic">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
          </div>
        </Accordion>
        <div className="mt-3 pb-3 text-lg flex justify-center items-center">
          모든 내용을 숙지하였으며 약관에 동의합니다
          <input
            type="checkbox"
            className="ml-2"
            onChange={handleCardCheck}
            checked={cardCheck}
          />
        </div>
      </ModalBody>
    </>
  );
}

function Section1() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          주요혜택
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2 flex flex-col">
            <div className="py-3 border-t-2 flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/cards/hana_money.png"}
                className="w-[10%]"
                alt=""
              />
              <div className="w-[30%] px-2 text-sm border-r-2">
                하나머니 적립
              </div>
              <div className="w-[60%] px-3 text-xs">
                <div className="py-1">커피, 영화, 편의점 10~20% 적립</div>
                <div className="py-1">
                  버스, 지하철, 통신자동이체 1,000 하나머니 적립
                </div>
                <div className="py-1">
                  외식, 온라인쇼핑, 어학시험, 외국어 학원 5% 적립
                </div>
                <div className="py-1">
                  OK캐쉬백 가맹점 OK캐쉬백 결제 시 OK캐쉬백 사용금액의 30%
                  하나머니 적립
                </div>
              </div>
            </div>
            <div className="py-3 border-t flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/cards/card_info2.png"}
                className="w-[10%]"
                alt=""
              />
              <div className="w-[30%] px-2 text-sm border-r-2">
                OK캐쉬백 플러스
              </div>
              <div className="w-[60%] px-3 text-xs">
                <div className="py-1">
                  OK캐쉬백 플러스 적립 서비스
                  <br />
                  - OK캐쉬백 플러스 우너클릭 충전 및 자동충전 시 1% OK캐쉬백
                  추가 적립
                  <br />
                  (지난달 이용 조건 없음)
                </div>
              </div>
            </div>
            <div className="py-3 border-t flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/cards/card_info3.png"}
                className="w-[10%]"
                alt=""
              />
              <div className="w-[30%] px-2 text-sm border-r-2">
                헤외이용 수수료 우대
              </div>
              <div className="w-[60%] px-3 text-xs">
                <div className="py-1">
                  해외ATM인출 수수료 우대
                  <br />
                  - 해외ATM현금인출 시 이용원금의 1.0% 수수료 부과
                  <br />
                  (해외 인출 이용 수수료 3.0$ 면제)
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 border-t flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/cards/card_info4.png"}
              className="w-[10%]"
              alt=""
            />
            <div className="w-[30%] px-2 text-sm border-r-2">놀이공원</div>
            <div className="w-[60%] px-3 text-xs">
              <div className="py-1">
                롯데월드/에버랜드 자유이용권 50% 할인 (월1회/연6회 제공)
              </div>
            </div>
          </div>
          <div className="py-3 border-t flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/cards/hana_money.png"}
              className="w-[10%]"
              alt=""
            />
            <div className="w-[30%] px-2 text-sm border-r-2">
              하나마니 서비스
            </div>
            <div className="w-[60%] px-3 text-xs">
              <div className="py-1">
                하나금융그룹에서 제공하는 생활금융플랫폼
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Section2() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          부가서비스 유지 및 변경 안내
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="py-1 text-sm">
            - 카드이용시 제공되는 포인트 및 할인혜택 등의 부가서비스는 카드
            신규출시 (20201년 6월 07일) 이후 3년 이상 축소·폐지 없이 유지됩니다.
          </div>
          <div className="py-1 text-sm">
            - 다만, 다음과 같은 사유가 발생한 경우 카드사는 부가서비스를 변경할
            수 있습니다.
            <div className="py-1 text-xs">
              ① 카드사 또는 제휴업체의 휴업·파산·경영상의 위기 또는 천재지변이
              발생한 경우
              <br />② 제휴업체가 카드사의 의사에 반하여 해당 부가서비스를
              축소하거나 변경 시, 당초 부가서비스에 상응하는 다른 부가서비스를
              제공하는 경우
              <br />③ 부가서비스를 3년 이상 제공한 상태에서 해당 부가서비스로
              인해 상품의 수익성이 현저히 낮아진 경우
            </div>
          </div>
          <div className="py-1 text-sm">
            - 카드사가 부가서비스를 변경하는 경우 변경 사유, 변경 내용 등을 다음
            각 호에서 정하는 기간에 따라 서면, 우편, 또는 팩스에 따른 서신전달,
            전화, 전자우편 또는 이에 준하는 전자적 의사표시, 그 밖에 상대방에
            의사를 표시하였다는 사실을 객관적으로 입증할 수 있는 방법 중 2가지
            이상의 방법으로 고지하여 드립니다. 다만, 제2호의 경우 부가서비스
            변경일 6개월 이전부터는 서면, 우편 또는 팩스에 따른 서신전달, 전화,
            전자우편 또는 이에 준하는 전자적 의사표시, 그 밖에 상대방에 의사를
            표시하였다는 사실을 객관적으로 입증할 수 있는 방법 중 어느 하나의
            방법으로 매월 고지하여 드립니다.
            <div className="py-1 text-xs">
              1. ①,② : 사유발생 즉시 <br />
              2. ③ : 부가서비스 변경일 6개월 이전
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Section3() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          해외결제 및 기타 안내
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="py-1 text-sm">
            <div className="py-1">
              ① 해외 이용 시(해외사이트 거래 포함) 미화(USD)기준 거래 금액에
              카드 승인시점의 하나은행이 고시한 전신환매도율을 적용한 금액으로
              카드승인일에 회원의 계좌 잔액에서 지급정지 되고, 이 후 매출표가
              접수되면 지급정지금액 계산시와 동일한 방법으로 산정된 미화(USD)
              금액에 접수일의 하나은행 최초고시 전신환매도율을 적용한
              원화금액으로 회원의 계좌에서 출금됩니다.
            </div>
            <div className="py-1">
              ② 단, 1회 승인금액 100만원 이상의 거래(단 T&E업종 제외), 또는
              카드사가 정한 특정 브랜드(BC 등) 및 상품의 카드이용대금은
              미화(USD) 기준 거래 금액에 카드승인시점의 하나은행이 고시한
              전신환매도율을 적용한 원화금액으로 회원의 계좌잔액에서 즉시
              인출됩니다. T&E 업종 : Travel and Entertainment 업종, 여행과 여가
              관련 업종(항공, 호텔, 숙박, 렌터카 등)
            </div>
            <div className="py-1">
              ③ ①~②의 인출금액에는 국제브랜드사가 부과하는
              국제브랜드수수료(mastercard 1.0%)와 하나카드가 부과하는
              해외서비스수수료(US$0.5)가 포함됩니다.
            </div>
          </div>
          <div className="px-3 py-3 bg-stone-100">
            <div className="text-sm">
              <strong>해외 이용 시 청구 금액 산출 방법</strong>
            </div>
            <div className="text-xs">
              <div className="py-[0.1rem]">
                - 해외 이용 시 청구금액 = (거래미화금액 X 전신환매도율¹) +
                국제브랜드수수료² + 해외서비스수수료³
              </div>
              <div className="py-[0.1rem]">
                1.전신환매도율 : ① 접수일의 하나은행 최초고시 전신환매도율 ②
                즉시출금은 승인시점의 하나은행 전신환매도율
              </div>
              <div className="py-[0.1rem]">
                2.국제브랜드수수료 = (거래미화금액 X 국제브랜드
                이용수수료율(mastercard 1.0%)) X 전신환 매도율
              </div>
              <div className="py-[0.1rem]">
                3.해외서비스수수료 = (거래건수 X US$0.5) X 전신환매도율
              </div>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <div>
              {" "}
              - 해외 가맹점에서 원화로 결제할 경우(DCC) 추가 수수료가 발생하므로
              현지 통화 또는 미화로 거래하시기 바랍니다.
              <div className="pl-2 text-xs">
                해외원화결제서비스(DCC) 사전차단 서비스 이용방법
              </div>
              <div className="pl-4 text-xs">
                {" "}
                → 콜센터, 홈페이지/모바일 App(마이페이지/라이프 > 이용안심서비스
                > <strong>해외원화결제(DCC) 차단서비스)</strong>
              </div>
            </div>
            <div className="py-1">
              - 일부 해외 거래 시 IC칩 비밀번호(PIN)를 요구하는 경우가 있으므로
              출국 전 반드시 IC칩 비밀번호(PIN) 등록여부를 확인하시기 바랍니다.
            </div>
            <div className="py-1">
              - 결제 계좌 개설기관의 영업 마감시간(16시) 이후 결제계좌에 입금된
              금액에 대해서는 결제계좌 개설 기관의 사정에 따라 당일 출금되지
              못하여 연체로 처리될 수 있으므로 유의하시기 바랍니다.
              <div className="pl-2 text-xs">
                자동납부 업무 마감시간 이후 당사 홈페이지 / 모바일 등에서
                즉시결제 또는 가상계좌 입금(송금납부)을 통해 당일 결제가
                가능합니다.
              </div>
              <div className="pl-4 text-xs">
                - 세부사항은 하나카드 홈페이지[고객센터 → 카드이용안내 →
                <strong>결제안내</strong>] 및 모바일 앱[고객센터 탭] 참조
              </div>
            </div>
            <div className="py-1">
              - 결제은행에 따라 안정적인 서비스 제공을 위한 전산 시스템
              점검시에는 23:00~06:00 중 체크카드 이용이 일시적으로 제한될 수
              있습니다.
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Section4() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          하이브리드 서비스 및 후불교통카드 안내
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="py-1 text-sm">
            <div>
              - 체크카드 이용 중 통장 잔액이 부족할 경우 월 최대 30만원 한도
              내에서 신용거래로 결제되는 서비스
            </div>
            - 가입대상
            <div className="pl-4 text-xs">
              만 19세 이상 (단, 연체 및 신용등급에 따라 서비스 제공이 제한될 수
              있음)
            </div>
            <div className="py-2">
              - 이용방법
              <div className="pl-2 text-xs">
                - 다음의 경우 해당 결제요청금액 전액이 하이브리드
                서비스(신용거래승인)로 자동 처리되며, 이용대금은 카드 결제일에
                회원에게 청구됨 (결제일전 출금 계좌번호 및 잔액 확인요망)
              </div>
              <div className="pl-4 text-xs">
                ※후불교통 이용금액, 핸드폰 부가 서비스 이용 등 무승인거래 자동
                납부 시<br />
                ※통장 잔액 부족 시(계좌 잔액이 1만원인 상황에서 3만원 사용승인을
                요청하였을 경우 3만원 전액이 신용거래로 처리)
              </div>
            </div>
            <div>
              - 하나카드 신용카드 소지 고객의 경우 기존 신용한도 내에서 30만원
              이용
              <br />- 2개 이상의 체크카드 사용 시에도 하이브리드 서비스 한도는
              합산 적용
              <br />- 통장 잔액이 3만원이고 하이브리드 잔여 신용한도가 2만원일
              때에 5만원 사용승인을 요청할 경우 승인거절 처리
              <br />
              - 하이브리드 결제 시에는 별도 SMS 발송
              <br />
              - 본인 결제일에 신용카드 이용대금 및 하이브리드 이용대금 일괄 청구
              <br />- 하이브리드 이용금액은 연말 소득공제 시, 신용카드 실적으로
              산정됩니다.
            </div>
            <div className="py-2">
              ※유의사항
              <div className="text-xs">
                - 하이브리드서비스 및 후불교통카드 결제 금액은 고객님의
                결제계좌로 월1회 청구됩니다.
                <div className="pl-2">
                  예시 1) 신용카드와 체크카드 동시 소지 고객 → 체크카드
                  결제계좌로 청구
                  <br />
                  예시 2) 체크카드만 2매 이상 소지 고객 → 후불교통, 하이브리드를
                  이용한 체크카드 연결계좌로 청구
                </div>
              </div>
              <div className="py-2 text-xs">
                - 하이브리드 서비스는 해외 사용불가합니다.
                <br />
                - 하이브리드 서비스는 계좌잔액이 부족한 경우에 한해서만 일시불로
                결제 가능하며, 할부/단기카드대출(현금서비스) 이용은 불가합니다.
                <br />- 하이브리드 서비스는 개인신용정보조회 동의가 필수입니다.
                <br />- 신청/해지 : 하나카드 고객센터 1800-1111, 홈페이지
                <a href="www.hanacard.co.kr"> www.hanacard.co.kr</a>
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Section5() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          가족카드 이용 안내
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="text-sm">
            - 가족카드 연회비는 각 상품별 연회비 부과 기준을 따르며 가족카드
            발급매수에는 제한이 없습니다.
            <div className="py-1">
              - 가족카드 부가서비스의 전월이용금액, 월별 할인횟수 및 할인한도는
              본인카드와 합산 적용됩니다.
            </div>
            <div className="py-1">
              - 가족카드 연말정산 시 가족카드 사용금액은 가족카드 명의자[카드
              앞(뒤)면에 표기된 [이름]의 신용카드 등 사용금액으로 포함됩니다.
              연간 소득금액 기준은 국세청 기준에 따릅니다.
            </div>
            <div className="py-1">
              - 본인회원이 가족회원의 카드사용 내역에 대한 알림을 받고자 하는
              경우 가족회원의 동의를 받아 본인회원이 고객센터(1800-1111)에 별도
              신청하여야 합니다. 가족카드 이용대금명세서는 본인회원이 지정한
              주소와 방법으로 본인회원에게 합산되어 발송됩니다. 다만, 가족카드
              이용대금명세서를 별도 요청하는 경우에는 본인회원, 가족회원에게
              별도 발송 가능합니다.
            </div>
            <div className="py-1">
              - 가족카드 이용으로 적립된 포인트는 본인회원의 포인트에 합산되어
              관리되며, 본인회원이 하나카드 고객센터(1800-1111) 및
              홈페이지>포인트양도에서 가족으로 등록된 회원에게만 양도 가능하며,
              타 회원에게 양도는 불가합니다.가족등록은 고객센터에서만 등록
              가능합니다.
            </div>
            <div className="py-1">
              - 이혼, 사망, 파양 등 가족관계 변동 시 본인회원 또는 가족회원이
              하나카드 고객센터(1800-1111) 및 홈페이지/모바일앱
              [카드관리-카드해지신청]에서 가족카드 정지 또는 해지 가능합니다.
            </div>
            <div className="py-1">
              - 가족회원의 가족관계 변동시 카드사에 즉시 통지해야하며 가족관계
              변동이 되었음에도 가족카드를 정지 또는 해지하지 않은 경우
              본인회원에게 의도하지 않은 카드사용 및 책임이 발생할 수 있습니다.
            </div>
            <div className="py-1">
              - 본인회원이 요청할 경우 가족회원의 동의 없이 가족카드가
              한도감액/정지/해지될 수 있습니다.
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}
function Section6() {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          미성년자 체크카드 발급안내
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="text-sm">
            - 비교통 체크카드
            <div className="pl-2 text-xs">
              - 영업점 : 만 14~ 17세 본인 카드 발급 가능(리틀프렌즈 체크카드는
              만 12세 이상 발급 가능)
              <br />- 홈페이지/앱 : 만 17세 이상(주민등록증 혹은 운전면허증
              소지) 홈페이지/앱으로 카드 신청 가능
            </div>
          </div>
          <div className="py-2 text-sm">
            - 후불교통 체크카드(BC 리틀프렌즈 틴에이저 체크카드)
            <div className="pl-2 text-xs">
              - 영업점 : 만 12~17세 미성년자의 법정대리인 신청 가능(본인 신청
              불가)
            </div>
          </div>
          <div className="py-2 text-sm">
            - 신청서류 안내
            <div className="pl-2 text-xs">
              - 법정대리인 신청 시 : 법정대리인 신분증, 미성년자 기준
              기본증명서(상세 또는 특정), 가족관계증명서/주민등록등본 택 1
              <br />- 미성년자 본인 신청 시 : 학생증/여권 중 택 1,
              주민등록초본/등본 중 택 1
              <br />※ 제출서류는 영업점 방문하신 법정대리인, 미성년자 주민번호
              전체 공개
              <br />※ 3개월 이내 발급 서류만 인정 <br />※ 여권에 주민번호
              뒷자리가 기재되어 있지 않은 경우, 여권사실증명서 추가 제출
              <br />※ 미성년자 본인 신청 시 주민등록증/청소년증/운전면허증
              소지한 경우 제출서류 없음
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}
