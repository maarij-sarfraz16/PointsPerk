import Styled from 'vue3-styled-components';

const CarouselStyleWraper = Styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    height: 150px;
    line-height: 160px;
    background: #5A5F7D;
    overflow: hidden;
  }
  .ant-carousel .slick-dots li{
    width: 15px;
  }
  .ant-carousel .slick-dots li.slick-active{
    width: 25px;
  }
  .ant-radio-group{
    margin-bottom: 16px !important;
  }
  .ant-radio-button-wrapper{
    font-size: 14px;
    height: 38px !important;
    line-height: 36px !important;
    font-weight: 600;
    color: ${({ theme }) => theme['light-color']}
  }
  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
`;


export{
    CarouselStyleWraper,
}