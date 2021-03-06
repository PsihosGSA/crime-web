const mockApiData_1 = {
    id: 1,
    name: 'global',
    markers: {
        41: {
            id: 41,
            lat: 50.005,
            lng: 36.229,
            description: 'что-то 1_1',
            event_type_id: 1
        },
        42: {
            id: 42,
            lat: 50.004,
            lng: 36.228,
            description: 'что-то 1_2',
            event_type_id: 1
        },
        43: {
            id: 43,
            lat: 50.006,
            lng: 36.227,
            description: 'что-то 1_3',
            event_type_id: 1
        }
    }
};

const mockApiData_2 = {
    id: 2,
    name: 'xyq',
    hide: true,
    markers: {
        44:{
            id: 44,
            lat: 50.004,
            lng: 36.229,
            description: 'что-то 2_1',
            event_type_id: 1
        },
        45:{
            id: 45,
            lat: 50.003,
            lng: 36.227,
            description: 'что-то 2_2',
            event_type_id: 1
        },
        46:{
            id: 46,
            lat: 50.002,
            lng: 36.226,
            description: 'что-то 2_3',
            event_type_id: 1
        }
    }
};

const mockApiData_3 = {
    id: 1,
    name: 'global',
    markers: {
        41: {
            id: 41,
            lat: 50.005,
            lng: 36.229,
            description: 'новый что-то 1_1',
            event_type_id: 2
        },
        42: {
            id: 42,
            lat: 50.004,
            lng: 36.228,
            description: 'новый что-то 1_2',
            event_type_id: 2
        },
        44: {
            id: 44,
            lat: 50.006,
            lng: 36.227,
            description: 'что-то 1_4',
            event_type_id: 1
        }
    }
};


const myInit = {
    method: 'POST',
    headers: {
        'Origin': 'http://localhost:3000',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: 'cors',
};

export const getLayerGroups = () => dispatch => {
    setTimeout(() => {
        dispatch({type: 'ADD_LAYER_GROUPS', payload: mockApiData_1});
    }, 2000);
    setTimeout(() => {
        dispatch({type: 'ADD_LAYER_GROUPS', payload: mockApiData_2});
    }, 4000);
    setTimeout(() => {
        dispatch({type: 'ADD_LAYER_GROUPS', payload: mockApiData_3});
    }, 6000);
};

export const getCivilEventsLayer = () => dispatch => {

    myInit.body = JSON.stringify({event_date_start: "2018-04-01", event_date_end:"2019-04-13"});
    return fetch('http://127.0.0.1:8000/api/civil_events/events', myInit)
        .then(res => res.json())
        .then(
            data => {
                if (data.exception){
                    dispatch({type: 'ERR_LAYER_GROUPS', payload: data});
                    return;
                }
                const civil_events = {
                    id: 3,
                    name: 'civil_events',
                    markers: data.reduce((obj, cur) =>{ return {...obj, [cur.id]: cur};},{}) //array to object
                                                                                             //index = marker.id
                };
                dispatch({type: 'ADD_LAYER_GROUPS', payload: civil_events});
            },
            err => dispatch({type: 'ERR_LAYER_GROUPS', payload: err})
        )
};