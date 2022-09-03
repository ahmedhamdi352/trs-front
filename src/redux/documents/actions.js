import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';

const actions = {
  // Get documents
  GET_DOCS: 'GET_DOCS',
  GET_DOCS_ERROR: 'GET_DOCS_ERROR',
  // Submit Docs
  SUBMIT_DOCS: 'SUBMIT_DOCS',
  SUBMIT_DOCS_ERROR: 'SUBMIT_DOCS_ERROR',
  // Get document by id
  GET_DOC_BY_ID: 'GET_DOC_BY_ID',
  GET_DOC_BY_ID_ERROR: 'GET_DOC_BY_ID_ERROR',
  // flush selected document
  FLUSH_DOC: 'FLUSH_DOC',
  // update document status
  SOCKETS_UPDATE_DOC_STATUS: 'SOCKETS_UPDATE_DOC_STATUS',

  // update doc status
  UPDATE_DOC_STATUS: 'UPDATE_DOC_STATUS',
  UPDATE_DOC_STATUS_ERROR: 'UPDATE_DOC_STATUS_ERROR',

  // update doc status
  GET_DOC_JSON: 'GET_DOC_JSON',
  GET_DOC_JSON_ERROR: 'GET_DOC_JSON_ERROR',

  getDocuments: (type) => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/docs?type=${type}`)
      .then((res) => {
        dispatch({ type: actions.GET_DOCS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOCS_ERROR });
      });
  },
  getDocumentById: (documentId) => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/docs/${documentId}`)
      .then((res) => {
        dispatch({ type: actions.GET_DOC_BY_ID, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOC_BY_ID_ERROR, error: err.response?.data?.error });
      });
  },
  flushDocument: () => (dispatch) => {
    dispatch({ type: actions.FLUSH_DOC });
  },
  submitDocuments: (docsIds) => (dispatch) => {
    dispatch(toaster.triggerSuccess('Document(s) under processing, this may take some time.'));
    axios
      .post(`${ROOT_URL}/api/docs/submit`, { docsIds })
      .then((res) => {
        dispatch({ type: actions.SUBMIT_DOCS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch(toaster.triggerError(err.response?.data?.error));
        dispatch({ type: actions.SUBMIT_DOCS_ERROR });
      });
  },
  updateDocumentStatus: (docId, status) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/docs`, { docId, status })
      .then((res) => {
        dispatch({ type: actions.UPDATE_DOC_STATUS, payload: { docId, status } });
        dispatch(toaster.triggerSuccess('Status changed.'));
      })
      .catch((err) => {
        dispatch({ type: actions.UPDATE_DOC_STATUS_ERROR });
        dispatch(toaster.triggerError());
      });
  },
  getDocumentJson: (docId) => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/docs/json/${docId}`)
      .then((res) => {
        dispatch({ type: actions.GET_DOC_JSON, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOC_JSON_ERROR });
      });
  },
};
export default actions;
