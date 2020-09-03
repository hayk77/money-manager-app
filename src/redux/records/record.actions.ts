import axios from 'axios';
import {
  GET_RECORDS,
  POST_RECORD,
  PUT_RECORD,
  DELETE_RECORD,
  RECORDS_ERROR,
} from './record.types';
import { setAlert } from '../alerts/alert.actions';

export const getRecords = (y: string = '', m: string = '') => async (
  dispatch: any
) => {
  try {
    const date = new Date();
    let month = date.getMonth().toString();
    const year = date.getFullYear().toString();
    if (month.length === 1) month = `0${month}`;
    if (!m) m = month;
    if (!y) y = year;
    let nextMonth = (parseInt(m) + 1).toString();
    if (nextMonth.length === 1) nextMonth = `0${nextMonth}`;

    const query = `?date[gte]=${y}-${m}-01T00:00:00.000Z&date[lt]=${y}-${nextMonth}-01T00:00:00.000Z`;

    const res = await axios.get(`/records${query}`);

    dispatch({
      type: GET_RECORDS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postRecord = (
  type: string,
  account: string,
  category: string,
  date: Date,
  amount: number,
  note: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    type: type,
    accountId: account,
    categoryId: category,
    date: date,
    amount: amount,
    note: note,
  };

  try {
    const res = await axios.post(`/records`, body, config);

    dispatch({
      type: POST_RECORD,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putRecord = (
  id: string,
  type: string,
  account: string,
  category: string,
  date: Date,
  amount: number,
  note: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    type: type,
    accountId: account,
    categoryId: category,
    date: date,
    amount: amount,
    note: note,
  };

  try {
    const res = await axios.put(`/records/${id}`, body, config);

    console.log(res.data);

    return dispatch({
      type: PUT_RECORD,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteRecord = (id: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.delete(`/records/${id}`, config);

    dispatch({
      type: DELETE_RECORD,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};