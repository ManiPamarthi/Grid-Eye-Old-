import { DATE_RANGE } from "../actions/types";
  
const initialState = {
	startDate: new Date(),
	endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
};
  
const dateReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
	  	case DATE_RANGE:
			const date = { ...state, dateRange: payload };
			return date.dateRange;
	  	default:
			return state;
	}
};
  
export default dateReducer;