import React, { useState, useEffect } from 'react'
import './index.scoped.scss'

import { Row } from 'react-bootstrap'
import { Tabs } from 'antd'

import NoData from '../../common_components/NoData'
import moment from 'moment'

import imageCapon from '../chpr.png'

const { TabPane } = Tabs

function Coupon(props) {
  const [couponlist, setCouponlist] = useState([])

  console.log(props)
  // props.setTitle('折價卷')

  async function getUserCouponInfo() {
    const url = 'http://localhost:3001/members/getUserCouponInfo'
    const { user = {} } = JSON.parse(localStorage['reduxState'] || '{}')
    const { token, authToken } = user.users || {}

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })

    /**
      data: [{…}]
      msg: "會員折價券資料已傳送"
      success: true
     */
    const res = await response.json()

    console.log(111, res)
    if (res && res.data) {
      setCouponlist(res.data)
    }
  }

  // didmount拿所有資料
  useEffect(() => {
    getUserCouponInfo()
  }, [])

  return (
    <>
      <Tabs defaultActiveKey="1" type="card">
        {/* TabPane */}
        {[
          { tab: '已使用', key: '1' },
          { tab: '未使用', key: '2' },
          { tab: '已逾期', key: '3' },
        ].map((tabItem) => (
          <TabPane tab={tabItem.tab} key={tabItem.key} centered>
            <Row className="row_list">
              {couponlist.filter((i) => i.status === Number(tabItem.key))
                .length === 0 ? (
                <NoData tips="沒有可使用的優惠券"></NoData>
              ) : (
                couponlist.map(
                  (item, index) =>
                    item.status === Number(tabItem.key) && (
                      <section key={index} className="coupone_item">
                        <div className="detail_img">
                          <img src={imageCapon} alt="imageCapon" />
                        </div>
                        <ul className="detail_list">
                          <li>
                            使用期限：
                            {moment(item.coupon_end_time).format('YYYY-MM-DD')}
                          </li>
                          <li>優惠券編號：{item.coupon_id}</li>
                          <li>折扣金額：${item.coupon_money}</li>
                        </ul>
                        <div className="cou">
                          <div className={`cou_btn cou_btn_${tabItem.key}`}>
                            {tabItem.tab}
                          </div>
                        </div>
                      </section>
                    )
                )
              )}
            </Row>
          </TabPane>
        ))}

        {/* 抽象他 */}
        {/* <TabPane tab="已使用" key="1" centered>
          <Row>
            {couponlist.map(
              (item) =>
                item.status === Number(activeKey) && (
                  <>
                    <div>
                      <img src={imageCapon} alt="Capon" className="Capon_img" />
                    </div>
                    <ul className="detail_list">
                      <li>
                        使用期限：
                        {moment(item.coupon_end_time).format('YYYY-MM-DD')}
                      </li>
                      <li>優惠券編號：{item.coupon_id}</li>
                      <li>折扣金額：${item.coupon_money}</li>
                    </ul>
                    <div className="cou">
                      <div className="cou_btn">已使用</div>
                    </div>
                  </>
                )
            )}
          </Row>
        </TabPane>
        <TabPane tab="未使用" key="2">
          <Row>
            {couponlist.map(
              (item) =>
                item.status === Number(activeKey) && (
                  <>
                    <div>
                      <img src={imageCapon} alt="Capon" className="Capon_img" />
                    </div>
                    <ul className="detail_list">
                      <li>
                        使用期限：
                        {moment(item.coupon_end_time).format('YYYY-MM-DD')}
                      </li>
                      <li>優惠券編號：{item.coupon_id}</li>
                      <li>折扣金額：${item.coupon_money}</li>
                    </ul>
                    <div className="cou">
                      <div className="cou_btn">未使用</div>
                    </div>
                  </>
                )
            )}
          </Row>
        </TabPane>
        <TabPane tab="已逾期" key="3">
          <Row>
            {couponlist.map(
              (item) =>
                item.status === Number(activeKey) && (
                  <>
                    <div>
                      <img src={imageCapon} alt="Capon" className="Capon_img" />
                    </div>
                    <ul className="detail_list">
                      <li>
                        使用期限：
                        {moment(item.coupon_end_time).format('YYYY-MM-DD')}
                      </li>
                      <li>優惠券編號：{item.coupon_id}</li>
                      <li>折扣金額：${item.coupon_money}</li>
                    </ul>
                    <div className="cou">
                      <div className="cou_btn">已逾期</div>
                    </div>
                  </>
                )
            )}
          </Row>
        </TabPane> */}
      </Tabs>
    </>
  )
}

export default Coupon
