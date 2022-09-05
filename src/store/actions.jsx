import {
  SET_PRICENAME_INPUT,
  SET_PRIORITY_INPUT,
  SET_STATUS_INPUT,
  SET_PRODUCT_INPUT,
  OPEN_PRODUCT_PICKER,
  CLOSE_PRODUCT_PICKER,
  DISPLAY_SELECTED_PRODUCTS,
  DELETE_SELECTED_PRODUCTS,
  DISPLAY_SELECTED_COLLECTIONS,
  SET_COLLECTION_DATA,
  UPDATE_COLLECTION_DATA,
  DISPLAY_SELECTED_TAGS,
  UPDATE_SELECTED_TAGS,
} from "./constants";

export const setPricenameInput = (payload) => ({
  type: SET_PRICENAME_INPUT,
  payload,
});

export const setPriorityInput = (payload) => ({
  type: SET_PRIORITY_INPUT,
  payload,
});

export const setStatusInput = (payload) => ({
  type: SET_STATUS_INPUT,
  payload,
});

export const setProductInput = (payload) => ({
  type: SET_PRODUCT_INPUT,
  payload,
});

export const openProductPicker = () => ({
  type: OPEN_PRODUCT_PICKER,
});

export const closeProductPicker = () => ({
  type: CLOSE_PRODUCT_PICKER,
});

export const displaySelectedProducts = (payload) => ({
  type: DISPLAY_SELECTED_PRODUCTS,
  payload,
});

export const deleteSelectedProducts = (payload) => ({
  type: DELETE_SELECTED_PRODUCTS,
  payload,
});

export const displaySelectedCollections = (payload) => ({
  type: DISPLAY_SELECTED_COLLECTIONS,
  payload,
});

export const setCollectionData = (payload) => ({
  type: SET_COLLECTION_DATA,
  payload,
});

export const updateCollectionData = (payload) => ({
  type: UPDATE_COLLECTION_DATA,
  payload,
});

export const displaySelectedTags = (payload) => ({
  type: DISPLAY_SELECTED_TAGS,
  payload,
});

export const updateSelectedTags = (payload) => ({
  type: UPDATE_SELECTED_TAGS,
  payload,
});
