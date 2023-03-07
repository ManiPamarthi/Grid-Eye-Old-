import { DATE_RANGE } from "./types";

export const dateRangeAction = (rangeValue) => ({
	type: DATE_RANGE,
	payload: rangeValue
});