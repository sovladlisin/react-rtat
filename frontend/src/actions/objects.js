import axios from 'axios';
import qs from 'qs';

import { CREATE_MARKUP, GET_MARKUP_ENTITES, GET_MARKUPS_TEXT, GET_OBJECT, GET_OBJECTS, GET_ENTITIES_TEXT, GET_ENTITIES_OBJECT, ADD_ENTITY, DELETE_ENTITY, UPDATE_OBJECT, CREATE_OBJECT, DELETE_OBJECT, DELETE_MARKUP, CREATE_RELATION, GET_RELATIONS_FROM_OBJECT, DELETE_RELATION, GET_RELATIONS_FROM_TEXT } from './types';
import { tokenConfig } from './auth'
import { returnErrors, createMessage } from './messages';

const action_name = "Объект"



//GET OBJECTS
export const getObjects = () => (dispatch, getState) => {
    axios.get('/api/object/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECTS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}


//GET OBJECT
export const getObject = id => (dispatch, getState) => {
    axios.get(`/api/object/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECT,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE ENTITY
export const addEntity = entity => (dispatch, getState) => {
    const body = JSON.stringify(entity)
    axios.post(`/api/entity/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_ENTITY,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//DELETE ENTITY
export const deleteEntity = id => (dispatch, getState) => {
    axios.delete(`/api/entity/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ENTITY,
            payload: id
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE MARKUP
export const createMarkup = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.post(`/api/markup/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_MARKUP,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET MARKUPS FROM TEXT
export const getMarkupsFromText = text_id => (dispatch, getState) => {
    axios.get(`api/markup/`, tokenConfig(getState)).then(res => {
        const markups = res.data.filter(item => item.text == text_id)
        dispatch({
            type: GET_MARKUPS_TEXT,
            payload: markups
        });
    })
}

//GET MARKUP ENTITIES
export const getMarkupEntites = id => (dispatch, getState) => {
    axios.get(`/api/entity/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.markup == id)
        dispatch({
            type: GET_MARKUP_ENTITES,
            payload: result
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });

}


//GET ENTITIES FROM OBJECT
export const getEntitiesFromObject = object_id => (dispatch, getState) => {
    axios.get(`/api/entity/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.obj == object_id)
        dispatch({
            type: GET_ENTITIES_OBJECT,
            payload: result
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//UPDATE OBJECT
export const updateObject = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/object/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_OBJECT,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE OBJECT
export const createObject = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/object/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_OBJECT,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE RELATION
export const createRelation = (obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/relation/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_RELATION,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET RELATIONS FROM OBJECT
export const getObjectRelations = (id) => (dispatch, getState) => {
    axios.get(`/api/relation/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.parent == id | item.child == id)
        dispatch({
            type: GET_RELATIONS_FROM_OBJECT,
            payload: result
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));
    });
}

//GET RELATIONS FROM TEXT
export const getTextRelations = (objects) => (dispatch, getState) => {
    axios.get(`/api/relation/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => objects.includes(item.parent) & objects.includes(item.child))
        dispatch({
            type: GET_RELATIONS_FROM_TEXT,
            payload: result
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));
    });
}

//DELETE RELATION
export const deleteRelation = (obj) => (dispatch, getState) => {
    axios.get(`/api/relation/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.parent == obj.parent && item.child == obj.child && item.name == obj.name)[0]
        axios.delete(`/api/relation/${result.id}/`, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: DELETE_RELATION,
                    payload: result.id,
                });
            })
            .catch((err) => {
                dispatch(returnErrors(err.response.data, err.response.status, action_name));
            });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));
    });
}



//DELETE OBJECT
export const deleteObject = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/object/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: action_name + " #" + id }));
            dispatch({
                type: DELETE_OBJECT,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

//DELETE MARKUP
export const deleteMarkup = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/markup/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: "Разметка" + " #" + id }));
            dispatch({
                type: DELETE_MARKUP,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

