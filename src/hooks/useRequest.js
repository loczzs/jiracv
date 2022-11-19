import { useReducer, useEffect } from "react";

const initialState = {
  date: null,
  isLoading: false,
  error: null,
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case "REQUEST_PENDING":
          return { ...state, isLoading: true, error: null };
        case "REQUEST_FULFILLED":
          return { ...state, data: payload };
        case "REQUEST_REJECTED":
          return { ...state, error: payload };
        default:
          return state;
      }
};

const useRequest = (fn, deps = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const request = async () => {
      try {
        dispatch({ type: "REQUEST_PENDING" });
        const data = await fn()
        dispatch({ type: "REQUEST_FULFILLED", payload: data });
      } catch (error) {
        dispatch({ type: "REQUEST_REJECTED", payload: error });
      }
    };
    request();
  }, deps);
  return state;
};
export default useRequest;
