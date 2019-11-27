import React from 'react';

function dataReducer(state, action) {
  switch (action.type) {
    case 'Success':
      return {
        data: action.data,
        error: null,
      };
    case 'Reset':
      return {
        data: null,
        error: null,
      };
    case 'Error':
      return {
        data: null,
        error: action.error,
      };
    default:
      throw new Error('Action not recognized');
  }
}

export default function useData() {
  const [state, dispatch] = React.useReducer(dataReducer, {
    data: null,
    error: null,
  });

  const { data, error } = state;

  const isLoading = () => data === null && error === null;

  return { state, dispatch, loading: isLoading() };
}
