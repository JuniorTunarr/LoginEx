/* eslint-disable @next/next/no-sync-scripts */
import styled from "@emotion/styled";
import Head from "next/head";
import Script from "next/script";
const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

declare const window: typeof globalThis & {
  IMP: any;
};

export default function ShopPage() {
  const onClickPaymet = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp27538454"); // 예: imp00000000

    IMP.request_pay(
      {
        // param
        pg: "nice",
        pay_method: "card", // card, vbank등
        merchant_uid: "ORD20180131-0000011", // 주문번호. 중복될 시 결제 안됨!
        name: "노르웨이 회전 의자",
        amount: 100, // 숫자 타입
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        // 앱은 결제시 결제페지이로 사이트 주소가 아예 바뀌기 때문에 돌아갈 주소값을 알려줘야함
        m_redirect_url: "http://localhost:3000/shop",
      },
      function (rsp: any) {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          // const paymentDate = new Date(); -> 이런 식으로 프론트에서 시간을 만드는 것은 안됨. 시간은 백엔드가 기준

          // 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행하기
        } else {
          alert("결제에 실패했습니다! 다시 시도해주세요!");
        }
      }
    );
  };
  return (
    <>
      <Head>
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        />
        {/* <!-- iamport.payment.js --> */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        />
      </Head>
      <MainHome>
        <button onClick={onClickPaymet}>결제하러 가기</button>
      </MainHome>
    </>
  );
}
