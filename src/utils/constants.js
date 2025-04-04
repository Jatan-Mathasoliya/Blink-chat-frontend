export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/auth'
export const SEARCH_CONTACTS = 'api/searchContact'
export const SEARCH_MESSAGES = 'api/searchMessages'


export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`
export const CONTACTS = `${SEARCH_CONTACTS}/searchContacts`
export const MESSAGES = `${SEARCH_MESSAGES}/searchMessages`
export const DELETEMESSAGES = `${SEARCH_MESSAGES}/deleteMessages`
export const GET_DM_CONTACTS_ROUTE = `${SEARCH_CONTACTS}/get-contacts-for-dm`
export const UPLOAD_FILE_ROUTE = `${SEARCH_MESSAGES}/upload-file`