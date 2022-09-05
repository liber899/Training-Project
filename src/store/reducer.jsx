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

const initState = {
  priceName: "",
  priority: "",
  status: "Enable",
  productRule: "All products",
  productPicker: false,
  selectedProducts: [],
  selectedCollections: [],
  allCollections: [],
  collectionData: [],
  allTags: [],
  selectedTags: [],
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PRICENAME_INPUT:
      return {
        ...state,
        priceName: action.payload,
      };
    case SET_PRIORITY_INPUT:
      return {
        ...state,
        priority: action.payload,
      };
    case SET_STATUS_INPUT:
      return {
        ...state,
        status: action.payload,
      };
    case SET_PRODUCT_INPUT:
      return {
        ...state,
        productRule: action.payload,
      };
    case OPEN_PRODUCT_PICKER:
      return {
        ...state,
        productPicker: true,
      };
    case CLOSE_PRODUCT_PICKER:
      return {
        ...state,
        productPicker: false,
      };
    case DISPLAY_SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: [...action.payload],
      };
    case DELETE_SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: [...action.payload],
      };
    case DISPLAY_SELECTED_COLLECTIONS:
      return {
        ...state,
        selectedCollections: [...state.selectedCollections, ...action.payload],
      };
    case SET_COLLECTION_DATA:
      return {
        ...state,
        allCollections: [...action.payload],
      };
    case UPDATE_COLLECTION_DATA:
      return {
        ...state,
        collectionData: [...action.payload],
      };
    case DISPLAY_SELECTED_TAGS:
      return {
        ...state,
        allTags: [...action.payload],
      };
    case UPDATE_SELECTED_TAGS:
      return {
        ...state,
        selectedTags: [...action.payload],
      };
    default:
      throw new Error("Invalid action");
  }
}

export { initState };
export default reducer;
