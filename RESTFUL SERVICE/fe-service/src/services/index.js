import axios from "axios";

export const API_URL = "http://localhost:8080/api";

const auth = JSON.parse(localStorage.getItem("user"));
class AppServices {
  login(body) {
    return axios.post(`${API_URL}/users/` + "login", body);
  }

  updateUser(body, id) {
    return axios.put(`${API_URL}/users`, body);
  }

  getCurrentUser() {
    return axios.get(`${API_URL}/users/current`);
  }

  getEmployees(query = "page=1&limit=10") {
    return axios.get(`${API_URL}/employees/?${query}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
  }

  deleteEmployee(id) {
    return axios.delete(`${API_URL}/employees/` + id, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
  }

  updateEmployee(body, id) {
    return axios.put(`${API_URL}/employees/` + id, body, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
  }
  deleteEmployee(id) {
    return axios.delete(`${API_URL}/employees/` + id, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
  }

  registerEmployee(body) {
    return axios.post(`${API_URL}/employees/`, body, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    });
  }
}

export default new AppServices();
