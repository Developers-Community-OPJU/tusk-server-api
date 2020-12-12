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

NEW ADDED

[GET]           https://tusk-server-api.herokuapp.com/api/task/accept/:id      ID IS THE ID OF THE TASK


AUTH ROUTES
------------------------------------------------------------------
REQ TYPE        ENDPOINT                    DESCRIPTION
-------------------------------------------------------------------
[POST]           https://tusk-server-api.herokuapp.com/api/auth/login           LOGIN METHOD
[POST]           https://tusk-server-api.herokuapp.com/api/auth/register        REGISTER METHOD


MILESTONES ROUTES
------------------------------------------------------------------
REQ TYPE        ENDPOINT                    DESCRIPTION
-------------------------------------------------------------------
[PUT]           https://tusk-server-api.herokuapp.com/api/task/milestone/add/:id        ADDING NEW MILESTONE TO THE TASK