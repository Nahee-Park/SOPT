import React from "react";
import styled from "styled-components";

//페이지 하단에 카드가 딱 붙지 않도록 하기 위함
const Footer = () => {
  return (
    <FooterWrap>
      <div className="footer">
        Copyright&copy; 2021. BE SOPT Web part. All rights Reserved.{" "}
      </div>
    </FooterWrap>
  );
};
export default Footer;

const FooterWrap = styled.div`
  .footer {
    height: 91px;
    color: #cea0e3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
