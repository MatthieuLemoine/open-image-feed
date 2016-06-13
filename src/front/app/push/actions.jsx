import fetch from 'isomorphic-fetch';

export const REQUEST_NOTIFICATION = 'REQUEST_NOTIFICATION';
export const SUCCESS_NOTIFICATION = 'SUCCESS_NOTIFICATION';
export const ERROR_NOTIFICATION   = 'ERROR_NOTIFICATION';

function requestNotifications() {
  return {
    type : REQUEST_NOTIFICATION
  };
}

function successNotification() {
  return {
    type    : SUCCESS_NOTIFICATION
  };
}

function errorNotification() {
  return {
    type  : ERROR_NOTIFICATION,
    error : {
      status  : 400,
      message : 'ERROR'
    }
  };
}

function sendNotification(notification) {
  return dispatch => {
    dispatch(requestNotifications());
    return fetch('/push', {
      method : 'POST',
      body   : JSON.stringify(notification)
    })
      .then(() => dispatch(successNotification()))
      .catch(() => dispatch(errorNotification()));
  };
}

function shouldSendNotification(state) {
  const notification = state.notification;
  if (!notification) {
    return true;
  }
  if (notification.isFetching) {
    return false;
  }
  return true;
}

export function sendNotificationIfNeeded(notification) {
  return (dispatch, getState) => {
    if (shouldSendNotification(getState())) {
      return dispatch(sendNotification(notification));
    }
    return Promise.resolve();
  };
}
