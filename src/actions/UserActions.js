export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_OUT = 'LOGIN_OUT';

export function handleLogin() {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });

    //eslint-disable-next-line no-undef
    VK.Auth.login(r => {
      if (r.session) {
        let username = r.session.user.first_name;
        let id = r.session.user.id;

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { name: username, id },
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error('Ошибка авторизации'),
        });
      }
    }, 4); // запрос прав на доступ к photo
  };
}

export function handleLogout() {
  return function(dispatch) {
    // eslint-disable-next-line no-undef
    VK.Auth.logout(r => {
      dispatch({ type: LOGIN_OUT });
    });
  };
}
