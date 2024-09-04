import Styled from 'vue3-styled-components';

const ChartStyle = Styled.div`
    .ninjadash-congratulation-banner{
        @media only screen and (max-width: 991px){
            margin-bottom: 25px;
        }
        .ant-card{
            margin-bottom: 0 !important;
        }
        .ant-card-body{
            min-height: 360px !important;
        }
        .ninjadash-congratulation-banner-content{
            img{
                bottom: -155px;
            }
        }
        figcaption{
            h2{
                font-size: 30px;
                @media only screen and (max-width: 475px){
                    font-size: 24px
                }
            }
            p{
                margin-bottom: 22px;
            }
        }
        &.congratulation-banner--two{
            .ant-card-body{
                position: relative;
                padding: 55px 30px;
            }
            .ninjadash-congratulation-banner-content{
                position: static;
                img{
                    bottom: 0;
                    right: 0;
                    width: 245px;
                    max-width: 245px;
                    height: 245px;
                }
                .banner-feature-btn{
                    color: #fff !important;
                    height: 44px;
                    border-radius: 6px;
                    font-size: 15px;
                    font-weight: 500;
                    background: ${({ theme }) => theme['dark-hover']};
                    &:focus{
                        color: ${({ theme }) => theme['dark-color']} !important;
                    }
                }
                figcaption{
                    padding: 25px 5px;
                    p{
                        font-size: 16px;
                    }
                }
            }
        }
    }

`;

export default ChartStyle;


