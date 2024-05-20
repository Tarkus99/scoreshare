import axios from "axios";
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const SPOTIFY_TOKEN = axios.create({
  baseURL: "https://accounts.spotify.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const SPOTIFY_SEARCH = axios.create({
  baseURL: "https://api.spotify.com/v1/search?limit=10&market=ES&q=",
});

export const register = (values) =>
  API.post("/api/user", values).then((res) => res.data);

export const verifyUser = (token) =>
  API.put("/auth/new-verification/api", token).then((res) => res.data);

export const createPasswordReset = (email) =>
  API.post("/auth/reset/api", email).then((res) => res.data);

export const resetPassword = (newPassword, token) =>
  API.put(
    "/auth/new-password/api",
    JSON.stringify({ newPassword, token })
  ).then((res) => res.data);

export const updateProfile = (user, data) =>
  API.put(`/api/user?id=${user}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);

export const createTrack = (data) =>
  API.post(`/api/track?`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);

export const getAvailableTracks = (query) =>{
 return API.get(`/api/track?query=${query}`).then((res) => res.data);}

export const getAccessTokenSpotify = () =>
  SPOTIFY_TOKEN.post("/api/token", {
    grant_type: "client_credentials",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  }).then((response) => response.data);

export const searchTracksInSpotify = (query, token) =>
  SPOTIFY_SEARCH.get(encodeURIComponent(query) + "&type=track", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

export const searchArtistsInSpotify = (query, token) =>
  SPOTIFY_SEARCH.get(encodeURIComponent(query) + "&type=artist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

export const downloadFile = async (name) =>
  API.get(`/api/file?fileName=${name}`, {
    responseType: "blob",
    timeout: 30000,
  }).then((res) => res.data);
