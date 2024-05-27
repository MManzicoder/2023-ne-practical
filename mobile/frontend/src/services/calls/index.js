import axios from "axios";
import API_URL from "../../config/api-url";

export const buyElectricity = async (data) => {
  return axios
    .post(`${API_URL}/`, data)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};

export const getTokensByMeter = async (meter_number) => {
  return axios
    .get(`${API_URL}/${meter_number}/tokens`)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};

export const getTokenValidDays = async (token) => {
  return axios
    .get(`${API_URL}/${token}`)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
