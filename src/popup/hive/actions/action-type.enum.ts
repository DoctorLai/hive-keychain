export enum ActionType {
  TEST_MSG = 'TEST_MSG',
  SET_MK = 'SET_MK',

  // ACCOUNT ACTIONS
  GET_ACCOUNTS = 'GET_ACCOUNTS',
  ADD_ACCOUNT = 'ADD_ACCOUNT',
  SET_ACCOUNTS = 'SET_ACCOUNTS',
  RESET_ACCOUNT = 'RESET_ACCOUNT',

  // ACTIVE ACCOUNT ACTIONS
  SET_ACTIVE_ACCOUNT = 'ACTIVE_ACCOUNT',
  SET_ACTIVE_ACCOUNT_RC = 'ACTIVE_ACCOUNT_RC',
  FORGET_ACCOUNT = 'FORGET_ACCOUNT',
  FORGET_ACCOUNTS = 'FORGET_ACCOUNTS',
  RESET_ACTIVE_ACCOUNT = 'RESET_ACTIVE_ACCOUNT',

  // ERROR ACTIONS
  SET_MESSAGE = 'SET_MESSAGE',

  // NAVIGATION ACTIONS
  NAVIGATE_TO = 'NAVIGATE_TO',
  NAVIGATE_TO_WITH_PARAMS = 'NAVIGATE_TO_WITH_PARAMS',
  GO_BACK = 'GO_BACK',
  RESET_NAV = 'RESET_NAV',
  GO_BACK_TO_THEN_NAVIGATE = 'GO_BACK_TO_THEN_NAVIGATE',

  // ACTIVE RPC ACTIONS
  SET_ACTIVE_RPC = 'SET_ACTIVE_RPC',
  ADD_CUSTOM_RPC = 'ADD_CUSTOM_RPC',

  //PRICES
  LOAD_CURRENCY_PRICES = 'LOAD_CURRENCY_PRICES',

  //GLOBAL PROPERTIES
  LOAD_GLOBAL_PROPS = 'LOAD_GLOBAL_PROPS',

  // CONVERSION
  FETCH_CONVERSION_REQUESTS = 'FETCH_CONVERSION_REQUESTS',

  // DELEGATION
  FETCH_DELEGATEES = 'FETCH_DELEGATEES',
  FETCH_DELEGATORS = 'FETCH_DELEGATORS',
  FETCH_PENDING_OUTGOING_UNDELEGATION = 'FETCH_PENDING_OUTGOING_UNDELEGATION',

  // TOKEN HISTORY
  LOAD_TOKEN_HISTORY = 'LOAD_TOKEN_HISTORY',
  LOAD_TOKENS_MARKET = 'LOAD_TOKENS_MARKET',
  LOAD_TOKENS = 'LOAD_TOKENS',
  CLEAR_USER_TOKENS = 'CLEAR_USER_TOKENS',
  LOAD_USER_TOKENS = 'LOAD_USER_TOKENS',
  LOAD_PENDING_UNSTAKING = 'LOAD_PENDING_UNSTAKING',

  // PHISHING
  FETCH_PHISHING_ACCOUNTS = 'FETCH_PHISHING_ACCOUNTS',

  // TRANSACTION
  ADD_TRANSACTIONS = 'ADD_TRANSACTIONS',
  INIT_TRANSACTIONS = 'INIT_TRANSACTIONS',

  // LOADING
  SET_LOADING = 'SET_LOADING',
  ADD_TO_LOADING_LIST = 'ADD_TO_LOADING_LIST',
  REMOVE_FROM_LOADING_LIST = 'REMOVE_FROM_LOADING_LIST',
  ADD_CAPTION_TO_LOADING_PAGE = 'ADD_CAPTION_TO_LOADING_PAGE',

  // TITLE CONTAINER
  SET_TITLE_PROPERTIES = 'SET_TITLE_PROPERTIES',
  RESET_TITLE_PROPERTIES = 'RESET_ACTION_PROPERTIES',

  // HIVE ENGINE CONFIG
  HE_SET_ACTIVE_RPC = 'HE_SET_ACTIVE_RPC',
  HE_SET_ACTIVE_ACCOUNT_HISTORY_API = 'HE_SET_ACTIVE_ACCOUNT_HISTORY_API',
  HE_LOAD_CONFIG = 'HE_LOAD_CONFIG',

  // APP STATUS
  SET_APP_STATUS = 'SET_APP_STATUS',

  // RPC SWITCH
  SET_SWITCH_TO_RPC = 'SET_SWITCH_TO_RPC',
  SET_DISPLAY_SWITCH_RPC = 'SET_DISPLAY_SWITCH_RPC',
}