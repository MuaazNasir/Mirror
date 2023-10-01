export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4500";

const AUTH_ROUTE = `${SERVER_URL}/api/auth`;
const MESSAGES_ROUTE = `${SERVER_URL}/api/messages`;
const CONTACTS_ROUTE = `${SERVER_URL}/api/contacts`;
const UPDATE_ROUTE = `${SERVER_URL}/api/update`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ON_BOARD_ROUTE = `${AUTH_ROUTE}/on-board-check`;
export const GET_CONTACTS = `${AUTH_ROUTE}/get-contacts`;
export const GENERATE_TOKEN = `${AUTH_ROUTE}/generate-token`;

export const ADD_MESSAGE = `${MESSAGES_ROUTE}/add-message`;
export const GET_MESSAGE = `${MESSAGES_ROUTE}/get-messages`;

export const GET_LIST_CONTACTS = `${CONTACTS_ROUTE}/get-list-contacts`;

export const UPDATE_USER = `${UPDATE_ROUTE}/update-user`