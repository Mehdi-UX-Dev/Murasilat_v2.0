"use client";

const Token_key = "TOKENS";
import decode from "jwt-decode";

const getTokens: any = () => {
  if (window) {
    const tokens_unparsed = window.localStorage.getItem(Token_key);
    const tokens = JSON.parse(tokens_unparsed || "");

    return tokens ? tokens : null;
  }
};

const getUser: any = () => {
  const tokens = getTokens();

  return tokens?.access ? decode(tokens?.access) : null;
};

const setToken: any = (tokens: {}) => {
  localStorage.setItem(Token_key, JSON.stringify(tokens));
};

const clearSession: any = () => {
  localStorage.removeItem(Token_key);
};

export { getTokens, getUser, setToken };
