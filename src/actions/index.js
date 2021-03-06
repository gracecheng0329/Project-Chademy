import { GET_DATA, INIT_ACT } from './actionTypes'

// action creator 動作建立器
export const getData = (data) => {
  return {
    type: GET_DATA,
    data,
  }
}

export const getBidData = (data) => {
  return async function getTotalFromServer(dispatch) {
    const url = 'http://localhost:3009/product/api/bid'

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // data會是一個物件值
    console.log(data)

    //setTotal(data.total)
    // 最後得到資料，然後發送動作到reducer
    dispatch(getData(data))
  }
}
//     // 開啟載入的指示圖示
//     //setDataLoading(true)

//     // https://redux.js.org/api/store#getstate
//     console.log(getState())

//     // const newTotal = { total: getState().counter + value }

//     const url = 'http://localhost:5555/product/api/list'

//     const request = new Request(url, {
//       method: 'GET',
//       // body: JSON.stringify(newTotal),
//       headers: new Headers({
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       }),
//     })

//     try {
//       const response = await fetch(request)
//       const data = await response.json()
//       // data會是一個物件值
//       console.log(data)

//       // 驗証成功後再設定…
//       //setTotal(total + value)
//       dispatch((GET_DATA))
//     } catch (error) {
//       //setError(error)
//     }
//   }
// }

// 初始化值的動作建立器
export const initAct = (data) => {
  return { type: INIT_ACT, data }
}

// 對應初始化值，向伺服器get資料的動作建立器
export const initActAsync = (data) => {
  return async function getTotalFromServer(dispatch) {
    const url = 'http://localhost:3009/product/api/list'

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // data會是一個物件值
    console.log(data)
    console.log('delay initValueAsync')

    //setTotal(data.total)
    // 最後得到資料，然後發送動作到reducer
    dispatch(initAct(data))
  }
}
