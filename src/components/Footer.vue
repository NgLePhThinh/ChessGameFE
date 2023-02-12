<script setup>

</script>

<template>

    <div class="footer">
        <div class="row">
            <ul>
                <li>Home</li>
                <li>News</li>
                <li>Ratings</li>
                <li>Championships</li>
                <li>Calendar</li>
                <li>FIDE</li>
            </ul>
        </div>
        <div class="social">
            <ul class="social-list">
                <li><i class="fa-brands fa-instagram"></i></li>
                <li><i class="fa-brands fa-facebook"></i></li>
                <li><i class="fa-brands fa-twitter"></i></li>
            </ul>
        </div>
        <div class="copy-right">
            <p>&copy; 2022 FIDE International Chess Federation. All Rights Reserved. No part of this site may be reproduced, stored in a retrieval system or transmitted in any way or by any means (including photocopying, recording or storing it in any medium by electronic means), without the written permission of FIDE International Chess Federation.</p>
        </div>
    </div>



</template>

<style scoped>
.footer {
    display: block;
    padding: 1em 10% 0.5em 10%;

    background-color: #f5f4f9;
    color: #334166;
   
}
.footer ul li {
    cursor: pointer;
}
ul{
    display: flex;
    list-style: none;
    justify-content: space-between;
}
.social {
    margin: 1em 0px;
}
.social ul {
    justify-content: center;
}
.social ul li {
    margin: 0px 2em;
    font-size: 20px;
}
.copy-right p {
    font-size: 14px;
    text-align: justify;
}
</style>