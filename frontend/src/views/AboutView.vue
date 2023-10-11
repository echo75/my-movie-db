<script></script>
<template lang="pug">
div.container
    div.bs-docs-section
        div.row
            div.col-md-12.mt-5
                h2.mb-3 About this page
                p
                    |You can sign up with your own email and password, or you can use this provided account to save some time:
                    br
                    strong User: johan@hedman.de
                    br
                    strong PWD: 123456
                    br
                    br
                    |Use the login tab at the top right to log in.
                    br
                    br
                    |The My Movie DB has a Vue.js frontend with a Node.js backend. The backend is using Express.js and MongoDB.
                    br
                    br
                    br
                    br
    //- p(v-if="user") You are logged in as {{ user?.data?.email }} p(v-if="user") Logged in as:
    //- {{ user?.email }}

</template>
