export enum Path {
  Home = "/",
  Detail = "/:linkKey",
}

export const today = 1641890000;

export const wrongImagePath =
  "https://storage-fe.fastraffic.io/homeworks/thumbnails/static/pdf.svg";

export const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

export const API_URL = `${PROXY}/homeworks/links`;

export const baseUrl = "http://localhost:3001/";
