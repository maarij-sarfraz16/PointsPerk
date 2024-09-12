import Styled from 'vue3-styled-components';
const TableWrapper = Styled.div`
    .ant-pagination-prev, .ant-pagination-next {
        line-height: 28px !important;
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table table{
        text-align: left;
    }
    .ant-table-thead > tr > th{
        text-align: left;
				&:before{
					content: none !important;
				}
    }
    span.anticon.anticon-right{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    span.anticon.anticon-left{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table{
        border-radius:10px 10px 0 0;
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
    }
    &.table-order,
    &.table-seller,
    &.table-data-view{
        .ant-table-selection{
            .ant-checkbox-indeterminate{
                .ant-checkbox-inner{
                    background: ${({ theme }) => theme['primary-color']};
                    border-color: ${({ theme }) => theme['primary-color']};
                    &:after{

                        height: 2px;
                        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
                    }
                }
            }
        }
        .ant-table-container{
            padding-bottom: 25px;
            border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme[theme.mainContent]['main-background']};
                    }
                }
                td{
                    .product-id{
                        max-width: 60px;
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                }
            }
        }
        .ant-pagination{
            margin-top: 25px !important;
        }
    }
    &.table-order{
        .ant-table-pagination{
            justify-content: flex-end;
        }
    }
    &.table-data-view{
        .ant-table-container{
            padding-bottom: 15px;
        }
        table{
            thead{
                th{
                    padding: 16px 25px;
                }
            }
            tbody{
                td{
                    padding: 16px 25px;
                    .record-img{
                        img{
                            max-width: 38px;
                            border-radius: 50%;
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        }
                    }
                    .record-location{
                        display: block;
                        font-size: 12px;
                        font-weight: 400;
                        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    }
                    .status{
                        font-weight: 500;
                        text-transform: capitalize;
                        &.active{
                            color: ${({ theme }) => theme['success-color']};
                            background: ${({ theme }) => theme['success-color']}10;
                        }
                        &.deactivated{
                            color: ${({ theme }) => theme['warning-color']};
                            background: ${({ theme }) => theme['warning-color']}10;
                        }
                        &.blocked{
                            color: ${({ theme }) => theme['danger-color']};
                            background: ${({ theme }) => theme['danger-color']}10;
                        }
                    }
                    .table-actions{
                        a {
                            svg, i{
                                width: 16px;
                                fill: ${({ theme }) => theme[theme.mainContent]['extra-light-text']} !important;
                            }
                            &.view{
                                &:hover{
                                  svg,
                                  i{
                                      fill: ${({ theme }) => theme['primary-color']};
                                  }
                                }
                            }
                            &.edit{
                              &:hover{
                                svg,
                                i{
                                    fill: ${({ theme }) => theme['info-color']};
                                }
                              }
                            }
                            &.delete{
                              &:hover{
                                svg,
                                i{
                                    fill: ${({ theme }) => theme['danger-color']};
                                }
                              }
                            }
                        }
                    }
                }
            }
        }
    }
    &.table-responsive{
        table{
            tbody{
                tr{
                    &:hover{
                        td{
                            background: ${({ theme }) => theme[theme.mainContent]['white-background']};
                        }
                    }
                }
            }
        }
    }
    table{
    
        thead{
            tr{
                border-radius: 10px;
                th{
                    border-bottom: 0 none;
                    &:first-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                        text-align:left;
                    }
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    background: ${({ theme }) => theme[theme.mainContent]['main-background-light']};
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
                    }
                }
                &.ant-table-row-selected{
                    &:hover{
                        td{
                            background: ${({ theme }) => theme[theme.mainContent]['white-background']};
                        }
                    }
                    td{
                        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
                    }
                }
                td{
                    border: 0 none;
                    font-weight: 500;
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    &:first-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                    span{
                        display: block;
                    }
                    .order-id{
                        min-width: 128px;
                    }
                    .customer-name{
                        min-width: 174px;
                    }
                    .status{
                        min-width: 175px;
                    }
                    .ordered-amount{
                        min-width: 175px;
                    }
                    .ordered-date{
                        min-width: 165px;
                    }
                    .table-actions{
                        min-width: 60px;
                    }
                }
            }
        }
        .table-actions{
            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
            min-width: 150px !important;
            button{
                height: 40px;
                padding: 0 11px;
                background: transparent;
                border: 0 none;
                svg {
                    fill: ${({ theme }) => theme[theme.mainContent]['extra-light-text']} !important;
                }
                &:hover{
                    &.ant-btn-primary{
                        background: ${({ theme }) => theme['primary-color']}10;
												svg{
													fill: ${({ theme }) => theme['primary-color']};
												}
                    }
                    &.ant-btn-info{
                        background: ${({ theme }) => theme['info-color']}10;
												svg{
													fill: ${({ theme }) => theme['info-color']};
												}
                    }
                    &.ant-btn-danger{
                        background: ${({ theme }) => theme['danger-color']}10;
												svg{
													fill: ${({ theme }) => theme['danger-color']};
												}
                    }
                }
            }
        }
        .seller-info{
            img{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
            }
        }
        .user-info{
            display: flex;
            align-items: center;
						color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
            figure{
                margin: 0 8px 0;
            }
            .user-name{
                margin-bottom: 4px;
                font-weight: 500;
            }
            .user-designation{
                font-size: 12px;
                font-weight: 400;
                color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
            }
        }
    }
    .table-actions{
        margin: -8px;
        a{
            display: inline-block;
            margin: 8px;
        }
    }
    .ninjadash-status{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        text-transform: capitalize;
        font-weight: 500;
        padding: 0 8px;
        min-height: 24px;
        border-radius: 15px;
        &.ninjadash-status-active{
            color: ${({ theme }) => theme['success-color']};
            background-color: ${({ theme }) => theme['success-color']}15;
        }
        &.ninjadash-status-deactiveted{
            color: ${({ theme }) => theme['warning-color']};
            background-color: ${({ theme }) => theme['warning-color']}15;
        }
        &.ninjadash-status-inactive{
            color: ${({ theme }) => theme['warning-color']};
            background-color: ${({ theme }) => theme['warning-color']}15;
        }
        &.ninjadash-status-blocked{
            color: ${({ theme }) => theme['danger-color']};
            background-color: ${({ theme }) => theme['danger-color']}15;
        }
    }
`;

const DragDropStyle = Styled.div`
    .ant-card-body{
        padding: 15px !important;
    }
    table{
        thead{
            display: none;
        }
        tbody{
            >tr{
                &:not(:last-child){
                    td{
                         border-bottom: 1px solid ${({ theme }) =>
                           theme[theme.mainContent]['border-color-default']} !important;
                    }
                 }
                 &:hover{
                     td{
                         background-color: transparent !important;
                     }
                 }
                >td{
                    font-size: 14px;
                    &:first-child,
                    &:last-child{
                        border-radius: 0 !important;
                    }

                    &.ninjadash-drag-arrows {
                        svg {
                            fill: ${({ theme }) => theme[theme.mainContent]['light-text']};
                        }
                    }
                }
            }
        }
        tr{
            td{
                &.drag-visible{
                    svg,
                    img{
                        width: 20px;
                    }
                    svg{
                        fill: ${({ theme }) => theme['extra-light-color']} !important;
                    }
                }
            }
        }
        .user-info{
            .user-name{
                font-size: 14px;
                ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            }
        }
    }
`;

const DataTableStyleWrap = Styled.div`
    .ninjadash-datatable-filter{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 20px 0 25px 0;
        @media only screen and (max-width: 575px){
            flex-wrap: wrap;
        }
        .ninjadash-datatable-filter__left{
            display: inline-flex;
            width: 100%;
            align-items: center;
            .ant-form{
                display: inline-flex;
                width: 100%;
                align-items: center;
            }
            span.label{
                margin-right: 8px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
            }
            .ninjadash-datatable-filter__input{
                display: flex;
                align-items: center;
                padding-right: 20px;
                .ant-input{
                    height: 40px;
                }
            }
        }
        .ninjadash-datatable-filter__right{
            min-width: 280px;
            @media only screen and (max-width: 575px){
                margin-top: 15px;
            }
            .ant-input-affix-wrapper{
                padding: 7.22px 20px;
                border-radius: 6px;
                .ant-input-prefix{
                    svg{
                        width: 16px;
                        height: 16px;
                        fill: ${({ theme }) => theme[theme.mainContent]['light-text']};
                    }
                }
            }
        }
    }
`;

export { DataTableStyleWrap, TableWrapper, DragDropStyle };
