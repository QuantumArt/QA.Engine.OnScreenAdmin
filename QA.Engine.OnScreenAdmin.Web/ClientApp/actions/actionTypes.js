// initial
export const APP_STARTED = 'APP_STARTED';


// sidebar
export const TOGGLE_OPEN_STATE = 'TOGGLE_OPEN_STATE';
export const TOGGLE_LEFT_POSITION = 'TOGGLE_LEFT_POSITION';
export const TOGGLE_RIGHT_POSITION = 'TOGGLE_RIGHT_POSITION';
export const TOGGLE_ALL_ZONES = 'TOGGLE_ALL_ZONES';
export const TOGGLE_ALL_WIDGETS = 'TOGGLE_ALL_WIDGETS';
export const SAVE_CORDS = 'SAVE_CORDS';


// tabs
export const TOGGLE_TAB = 'TOGGLE_TAB';

// available widgets
export const CHANGE_AVAILABLE_WIDGETS_SEARCH_TEXT = 'CHANGE_AVAILABLE_WIDGETS_SEARCH_TEXT';


// edit component tree
export const ONSCREEN_SELECT_COMPONENT = 'ONSCREEN_SELECT_COMPONENT';


// edit widget
export const EDIT_WIDGET_ACTIONS = {
  EDIT_WIDGET: 'EDIT_WIDGET/EDIT_WIDGET',
  SHOW_QP_FORM: 'EDIT_WIDGET/SHOW_QP_FORM',
  MOVE_WIDGET: 'EDIT_WIDGET/MOVE_WIDGET',
  FINISH_MOVING_WIDGET: 'EDIT_WIDGET/FINISH_MOVING_WIDGET',
  MOVING_WIDGET_SELECT_TARGET_ZONE: 'EDIT_WIDGET/MOVING_WIDGET_SELECT_TARGET_ZONE',
  MOVING_WIDGET_REQUESTED: 'EDIT_WIDGET/MOVING_WIDGET_REQUESTED',
  MOVING_WIDGET_SUCCEEDED: 'EDIT_WIDGET/MOVING_WIDGET_SUCCEEDED',
  MOVING_WIDGET_FAILED: 'EDIT_WIDGET/MOVING_WIDGET_FAILED',
  CANCEL_MOVING_WIDGET: 'EDIT_WIDGET/CANCEL_MOVING_WIDGET',
};

// add widget
export const ADD_WIDGET_ACTIONS = {
  ADD_WIDGET_TO_ZONE: 'ADD_WIDGET/ADD_WIDGET_TO_ZONE',
  SELECT_WIDGET_TO_ADD: 'ADD_WIDGET/SELECT_WIDGET_TO_ADD',
  SHOW_QP_FORM: 'ADD_WIDGET/SHOW_QP_FORM',

};

export const EDIT_ARTICLE_ACTIONS = {
  EDIT_ARTICLE: 'EDIT_ARTICLE/EDIT_ARTICLE',
  SHOW_QP_FORM: 'EDIT_ARTICLE/SHOW_QP_FORM',
};

// widgets screen mode
export const WIDGETS_SCREEN_MODE_ACTIONS = {
  SHOW_WIDGET_CREATION_WIZARD: 'SHOW_WIDGET_CREATION_WIZARD',
  HIDE_WIDGET_CREATION_WIZARD: 'HIDE_WIDGET_CREATION_WIZARD',
  SHOW_MOVE_WIDGET: 'SHOW_MOVE_WIDGET',
  HIDE_MOVE_WIDGET: 'HIDE_MOVE_WIDGET',
  AVAILABLE_WIDGETS_INFO_LOADED: 'WIDGETS_SCREEN/AVAILABLE_WIDGETS_INFO_LOADED',

};


// ab-tests
export const GET_AVALAIBLE_TESTS = 'GET_AVALAIBLE_TESTS';
export const API_GET_TESTS_DATA_SUCCESS = 'API_GET_TESTS_DATA_SUCCESS';
export const API_GET_TESTS_DATA_ERROR = 'API_GET_TESTS_DATA_ERROR';
export const SET_TEST_CASE = 'SET_TEST_CASE';
export const LAUNCH_TEST = 'LAUNCH_TEST';
export const LAUNCH_SESSION_TEST = 'LAUNCH_SESSION_TEST';
export const STOP_SESSION_TEST = 'STOP_SESSION_TEST';
export const STOP_TEST = 'STOP_TEST';


// qp integration
export const QP_FORM_ACTIONS = {
  NEED_RELOAD: 'QP_FORM_NEED_RELOAD',
  CLOSE_QP_FORM: 'QP_FORM_CLOSE',
};

// contents meta data
export const CONTENT_META_INFO_ACTION = {
  GET_ABSTRACT_ITEM_INFO_REQUESTED: 'ABSTRACT_ITEM_INFO_REQUESTED',
  GET_ABSTRACT_ITEM_INFO_SUCCESS: 'GET_ABSTRACT_ITEM_INFO_SUCCESS',
  GET_ABSTRACT_ITEM_INFO_FAIL: 'GET_ABSTRACT_ITEM_INFO_FAIL',
  GET_AVAILABLE_WIDGETS_REQUESTED: 'GET_AVAILABLE_WIDGETS_REQUESTED',
  GET_AVAILABLE_WIDGETS_SUCCESS: 'GET_AVAILABLE_WIDGETS_SUCCESS',
  GET_AVAILABLE_WIDGETS_FAIL: 'GET_AVAILABLE_WIDGETS_FAIL',
};

// edit page

export const EDIT_PAGE_ACTIONS = {
  EDIT_PAGE: 'EDIT_PAGE/EDIT_PAGE',
  SHOW_QP_FORM: 'EDIT_PAGE/SHOW_QP_FORM',
};

export const TREE_DATA_ACTIONS = {
  REBUILD_NEEDED: 'TREE_DATA/REBUILD_NEEDED',
};
