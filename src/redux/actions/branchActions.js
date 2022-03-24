import { ActionTypes } from '../constants/action-types';
export const addBranch = (branch) => {
  return {
    type: ActionTypes.ADD_BRANCH,
    payload: branch,
  };
};

export const selectedBranch = (branch) => {
  return {
    type: ActionTypes.SELECT_BRANCH,
    payload: branch,
  };
};
