import {
	GET_PROPERTY,
	GET_PROPERTY_DETAIL,
	CREATE_PROPERTY,
	ADD_USER,
	FILTERS,
	CLEAN_DETAIL,
	ERROR,
	USER_LOGIN,
	PROPERTY_EDITED,
} from "./actions_types";

const initialState = {
	error: "",
	user: "",
	properties: [],
	allproperties: [],
	propertyDetail: {},
	searchTerm: "",
	details: [],
};

const filterPropertyType = (state, payload) => {
	if (payload.type === "default") {
		return state.allproperties;
	} else {
		return state.allproperties.filter(
			(property) => property.type === payload.type
		);
	}
};

const orderPropertyPrice = (state, payload) => {
	let propertyOrdenated = [...state.properties];
	if (payload.orderPrice === "default") {
		return propertyOrdenated;
	} else if (payload.orderPrice === "-") {
		propertyOrdenated = propertyOrdenated
			.slice()
			.sort((a, b) => a.price - b.price);
	} else if (payload.orderPrice === "+") {
		propertyOrdenated = propertyOrdenated
			.slice()
			.sort((a, b) => b.price - a.price);
	}
	return propertyOrdenated;
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PROPERTY:
			return {
				...state,
				allproperties: [...payload],
				properties: [...payload],
				filteredData: [...payload],
			};

		case CREATE_PROPERTY:
			return {
				...state,
				allproperties: [...state.allproperties, payload],
				properties: [...state.properties, payload],
				user: {
					...state.user,
					properties: [...state.user.properties, payload._id],
				},
			};

		case GET_PROPERTY_DETAIL:
			return {
				...state,
				propertyDetail: payload,
			};

		case ERROR:
			return {
				...state,
				error: payload,
				userCreated: null,
			};

		case FILTERS:
			const filterPropertyForType = filterPropertyType(state, payload);
			const orderPropertyForPrice = orderPropertyPrice(
				{
					...state,
					properties: filterPropertyForType,
				},
				payload
			);
			return {
				...state,
				properties: orderPropertyForPrice,
			};

		case ADD_USER:
			return {
				...state,
				userCreated: payload,
				error: null,
			};

		case USER_LOGIN:
			return {
				...state,
				user: payload,
			};

		case PROPERTY_EDITED:
			const allproperties = state.allproperties;
			const properties = state.properties;
			const allpropertiesFiltered = allproperties.filter(
				(property) => property._id !== payload._id
			);
			const propertiesFiltered = properties.filter(
				(property) => property._id !== payload._id
			);
			return {
				...state,
				allproperties: [...allpropertiesFiltered, payload],
				properties: [...propertiesFiltered, payload],
			};

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
