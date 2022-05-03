import { BUSINESSHOUR_REQUEST, BUSINESSHOUR_SUCCESS, BUSINESSHOUR_TEMPORARY_SUCCESS, BUSINESSHOUR_ERROR, BUSINESSHOUR_RESET_ERROR, BUSINESSHOUR_RESET_STATE } from './actions';


const initialState = {
  schedule: [],
  isTemporarilyClosed: false
};


const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESSHOUR_RESET_STATE:
      return {
        ...initialState
      };
    case BUSINESSHOUR_SUCCESS:
      return {
        schedule: action.businessHour,
        error: ''
      };
    case BUSINESSHOUR_TEMPORARY_SUCCESS:
      return {
        schedule: state.schedule,
        isTemporarilyClosed: action.isTemporarilyClosed
      }
    case BUSINESSHOUR_ERROR:
      return {
        schedule: '',
        error: action.error
      };
    case BUSINESSHOUR_REQUEST:
      return initialState;
    case BUSINESSHOUR_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getSchedule = state => state.scheduleReducer;
export const getScheduleError = state => state.scheduleReducer.error;
export default scheduleReducer;

