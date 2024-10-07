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

export default function AccountInfo({ accountCheck, setAccountCheck }) {
  const handleAccountCheck = () => {
    setAccountCheck(!accountCheck);
  };
  return (
    <>
      <ModalHeader>
        영하나플러스 통장
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
          </div>
        </Accordion>
        <div className="mt-3 pb-3 text-lg flex justify-center items-center">
          모든 내용을 숙지하였으며 약관에 동의합니다
          <input
            type="checkbox"
            onChange={handleAccountCheck}
            checked={accountCheck}
            className="ml-2"
          />
        </div>
      </ModalBody>
    </>
  );
}

function Section1() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            상품정보
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2">
            <h2 className="mt-1 text-sm">상품특징</h2>
            <div className="mt-1 text-gray-500 text-xs">
              다양한 수수료 우대 서비스를 제공하는 YOUTH 고객 전용통장
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">예금종류</h2>
            <div className="mt-1 text-gray-500 text-xs">저축예금</div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">가입대상</h2>
            <div className="mt-1 text-gray-500 text-xs">
              만 30세 이하 실명의 개인 및 개인사업자 (1인 1계좌)
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">전환여부</h2>
            <div className="mt-1 text-gray-500 text-xs">
              ① 저축예금에 한하여 동 상품으로 전환가능
              <br />
              (단, 기존 수수료면제통장에서 전환 시 수수료면제횟수는 해당월은
              기존상품의 잔여횟수를 적용하고, 다음달부터는 동 상품의 실적에 따라
              수수료면제혜택 제공)
              <br />
              ② 상품가입(전환) 후, 만 35세가 되는 시점의 익월 첫 영업일에
              [주거래하나통장]으로 자동전환됨.
              <br />
              (단, [주거래하나통장]을 보유하고 있는 경우에는 [저축예금]으로
              자동전환됨. 전환이후에는 전환된 상품의 우대서비스 및 혜택만 제공)
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">이자지급 및 이자지급방법</h2>
            <div className="mt-1 text-gray-500 text-xs">
              이자계산기간동안 매일의 최종잔액게서 고시글미를 적용한 일별이자를
              합산하여 지급
            </div>
            <div className="mt-3 text-gray-500 text-sm">
              <div className="flex items-center border border-t-2">
                <div className="w-[30%] h-16 px-2 text-center bg-stone-100 flex justify-center items-center">
                  이자계산기간
                </div>
                <div className="w-[70%] h-full px-2 bg-white">
                  예금일(또는 원가일)부터 원가일(또는 지급일) 전날까지의 기간
                </div>
              </div>
              <div className="flex items-center border-x border-b">
                <div className="w-[30%] h-16 px-2 text-center bg-stone-100 flex justify-center items-center">
                  이자결산일
                </div>
                <div className="w-[70%] px-2 bg-white">
                  매년 3, 6, 9, 12월의 제 3금요일
                </div>
              </div>
              <div className="flex items-center border-x border-b-2">
                <div className="w-[30%] h-16 px-2 text-center bg-stone-100 flex justify-center items-center">
                  이자지급일(원가일)
                </div>
                <div className="w-[70%] px-2 bg-white">결산일 익일</div>
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
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            기본금리
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2">
            <h2 className="mt-1 text-sm">기본금리</h2>
          </div>
          <div className="mt-5">
            <div className="mt-3 text-gray-500 text-sm">
              <div className="bg-stone-100 flex items-center border border-t-2">
                <div className="w-[50%] px-2 py-3 text-center border-r-2">
                  분류
                </div>
                <div className="w-[50%] px-2 py-3 text-center">
                  금리(연율, 세전)
                </div>
              </div>
              <div className="bg-white flex items-center border-x border-b">
                <div className="w-[50%] px-2 py-3 text-center border-r-2">
                  -
                </div>
                <div className="w-[50%] px-2 py-3 text-center">0.1%</div>
              </div>
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
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            우대서비스
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2">
            <h2 className="mt-1 text-sm">수수료 우대서비스</h2>
            <div className="mt-1 text-gray-500 text-xs">
              아래의 서비스 제공 조건 중 1가지 이상을 해당월에 충족한 경우,
              충족월 다음달(익일 1일부터 말일까지)에 수수료 우대서비스를 제공
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">[서비스 제공 조건]</h2>
            <div className="mt-1 text-gray-500 text-xs">
              ① 본인명의 하나카드(신용/체크)의 대금을 이 통장에서 결제 시
              <br />② 타인으로부터 월 건당 10만원 이상 입금 시
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">[수수료 우대]</h2>
            <div className="mt-1 text-gray-500 text-xs">
              ① 당행 자동화기기를 통한 현금인출 수수료 무제한 면제
              <br />
              ② 당행 자동화기기를 통한 타행이체 수수료 무제한 면제
              <br />③ 인터넷뱅킹, 스마트폰뱅킹, 폰뱅킹(ARS)을 통한 타행 이체
              수수료 무제한 면제
              <br />④ 납부자자동이체 수수료 무제한 면제
              <br />⑤ 타행 자동화기기를 통한 현금 인출 수수료 월 5회 면제
            </div>
            <div className="mt-3 pl-2 text-xs text-gray-500">
              - 이 통장을 신규 후 다음달 말일까지는 제공조건 충족여부와 관계없이
              수수료 우대서비스 제공
              <br />- 이 통장을 통한 거래에서 발생하는 수수료에 한하여 제공됨
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
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            유의사항
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2">
            <h2 className="mt-1 text-sm">세제혜택</h2>
            <div className="mt-1 text-gray-500 text-xs">
              비과세종합저축 가능 (전 금융기관 통합한도 범위내)
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">유의사항</h2>
            <div className="mt-1 pl-2 text-xs text-gray-500">
              <div className="py-1">
                - 수수료 우대 서비스는 이 통장에 의한 거래에만 적용되며, 매월
                요건 충족여부를 확인하여 다음월에 수수료 우대서비스를
                제공합니다.{" "}
              </div>
              <div className="py-1">
                - 우대서비스 내용은 은행의 사정에 의해 변경될 수 있습니다. 동
                내용 변경 시 변경사유, 변경 내용 등 관련 내용을 영업점 및 당행
                인터넷 홈페이지에 1개월간 게시합니다.
              </div>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              ※ 금융상품에 관한 계약을 체결하기 전에 금융상품 설명서 및 약관을
              읽어 보시기 바랍니다.
              <br />
              ※ 금융소비자는 해당 상품 또는 서비스에 대하여 설명 받을 권리가
              있습니다. <br />※ 이 홍보물은 법령 및 내부통제기준에 따른 절차를
              거쳐 제공됩니다.
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">원금 및 이자지급제한</h2>
            <div className="mt-1 text-gray-500 text-xs">
              - 계좌에 압류, 가압류 등이 등록될 경우 원금 및 이자 지급이 제한 될
              수 있음
              <br />
              ※ 민사집행법에 따라 최저생계비 이해 등 압류금 지채권에 해당하는
              경우에는 입류금지채권 범위 변경 신청 등을 통해 입류를 취소할 수
              있습니다.
              <br />- 예금잔액증명서 발급 당일 잔액 변동이 불가
              <br />- 통장이 '전기통신금융사기 피해 방지 및 피해금 환급에 관한
              특별법'에서 정의한 피해의심거래계좌 및 사기이용계좌로 이용될 경우
              이체, 송금지연, 지급정지 등의 금융거래 제한조치를 할 수 있음.
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">위법계약해지권</h2>
            <div className="mt-1 text-gray-500 text-xs">
              - 설명의무 위반 등 금융소비자 보호에 관한 법률 제 47조에 따른
              위법계약해지 사유가 발생한 경우, 계약체결일로부터 5년이내 범위에서
              위반사실을 안 날로부터 1년인에 서면 등으로 해당계약의 해지를 요구
              할 수 있습니다. 만약 금융소비자의 요구가 정당한 것으로 판단될 경우
              수수료 등 계약해지와 관련한 추가 비용 부담없이 계약해지가 가능
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
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            상품변경안내
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="mt-2">
            <h2 className="mt-1 text-sm">원금 및 이자지급제한 항목 신설</h2>
            <div className="mt-1 text-gray-500 text-xs">
              ■ 기존 가입고객에 대한 적용 여부: 적용
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">변경 전</h2>
            <div className="mt-1 pl-2 text-gray-500 text-xs ">
              <div className="py-1">해당사항 없음 (신설)</div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">번경 후</h2>
            <div className="mt-1 text-gray-500 text-xs">
              - 계좌에 압류, 가압류 등이 등록될 경우 원금 및 이자 지급이 제한 될
              수 있음
              <br />
              - 예금잔액증명서 발급 당일 잔액 변동이 불가
              <br />- 통장이 '전기통신금융사기 피해 방지 및 피해금 환급에 관한
              특별법'에서 정의한 피해의심거래계좌 및 사기이용계좌로 이용될 경우,
              이체, 송금지연, 지급정지 등의 금융거래 제한조치를 할 수 있음.
            </div>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">위법계약해지권 항목 신설</h2>
            <p className="mt-1 text-gray-500 text-xs">
              ■ 기존 가입고객에 대한 적용 여부: 2021.03.25 이후 신규 가입 고객에
              한해 적용
            </p>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">변경 전</h2>
            <p className="mt-1 text-gray-500 text-xs">해당사항 없음 (신설)</p>
          </div>
          <div className="mt-5">
            <h2 className="mt-1 text-sm">변경 후</h2>
            <div className="mt-1 text-gray-500 text-xs">
              설명의무 위반 등 금융소비자 보호에 관한 법률 제47조에 따른
              위법계약해지 사유가 발생한 경우, 계약체결일로부터 5년이내 범위에서
              위반사실을 안 날로부터 1년이내에 서면 등으로 해당계약의 해지를
              요구할 수 있습니다. 만약 금융소비자의 요구가 정당한 것으로 판단될
              경우 수수료 등 계약해지와 관렪난 추가 비용 부담없이 계약해지가
              가능
            </div>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
}
