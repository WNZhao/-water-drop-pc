import { LOCAL_CURRENT_ORG } from "./constants";

export const currentOrg = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
  } catch (error) {
    return undefined;
  }
};