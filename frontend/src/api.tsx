/* eslint-disable no-restricted-globals */
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:4000" : location.origin
})