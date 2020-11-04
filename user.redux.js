import axios from "axios";

const ERGISTER_SUCESS = 'ERGISTER_SUCESS';
const ERROR_MSG = 'ERROR_MSG';


const initState = {
  isAuth: false, //用户是否登录
  msg: '', // 
  user: '', // 用户名
  pwd: '', // 密码
  type: '', // 类型
}


// reducer
export const user = (state = initState, action) => {

  switch (action.type) {
    case ERGISTER_SUCESS:

      return { ...state, msg: '', isAuth: true, ...action.data }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}
function registerScuess(data) {
  return { data, type: ERGISTER_SUCESS }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次输入的密码不相同，请重新输入')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerScuess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}