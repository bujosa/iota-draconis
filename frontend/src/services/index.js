import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BACKEND_HOST ||
  `http://localhost:${process.env.REACT_APP_BACK_PORT}/api/v1/planets`;

const getPlanets = axios.get(BASE_URL);

const createPlanet = (newPlanet) => axios.post(BASE_URL, newPlanet);

const updatePlanet = (planetName, newPlanet) =>
  axios.put(`${BASE_URL}/${planetName}`, newPlanet, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getDetailPlanet = (planetName) => axios.get(`${BASE_URL}/${planetName}`);

const deletePlanet = (planetName) => axios.delete(`${BASE_URL}/${planetName}`);

export {
  getPlanets,
  getDetailPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet,
};
