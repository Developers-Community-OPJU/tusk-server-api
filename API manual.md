=========================================================================================
=                                        TASK API ENDPOINTS                             =
=========================================================================================
BASE URL : https://tusk-server-api.herokuapp.com/
-------------------------------------------------------------------
REQ TYPE        ENDPOINT                    DESCRIPTION
-------------------------------------------------------------------
[GET]           https://tusk-server-api.herokuapp.com/api/task/find/all        LISTING ALL TASKS
[GET]           https://tusk-server-api.herokuapp.com/api/task/find/:id        FINDING TASK WITH ID
[POST]          https://tusk-server-api.herokuapp.com/api/task/push            CREATING NEW TASK
[DELETE]        https://tusk-server-api.herokuapp.com/api/task/pull/:id        DELETING TASK WITH ID
[PUT]           https://tusk-server-api.herokuapp.com/api/task/update/:id      UPDATING TASK WITH ID


AUTH ROUTES
------------------------------------------------------------------
REQ TYPE        ENDPOINT                    DESCRIPTION
-------------------------------------------------------------------
[GET]           https://tusk-server-api.herokuapp.com/api/auth/login           LOGIN METHOD
[GET]           https://tusk-server-api.herokuapp.com/api/auth/register        REGISTER METHOD
