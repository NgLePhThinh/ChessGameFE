<template>
    <div class="header">
        <img src="../assets/logo.png" alt="" class="logo" @click="gotoHome">
        <h1>International Chess Federation</h1>
        <ul>
            <li><i class="fa-solid fa-user"></i></li>
            <li><i class="fa-brands fa-instagram"></i></li>
            <li><i class="fa-brands fa-facebook"></i></li>
            <li><i class="fa-brands fa-twitter"></i></li>
        </ul>
    </div>
    <div class="navbar">
        <ul>
            <li @click="gotoHome">Home</li>
            <li @click="gotoReporter">Reporter</li>
            <li @click="gotoAdddata">Add data</li>
            <li>Calendar</li>
            <li>Fide</li>
            <li>Diretory</li>
            <li>Contacts</li>
            <li>
                <div class="form-search">
                    <input type="text" placeholder="Search...">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </li>
        </ul>

    </div>
</template>
<script>
export default{
    methods:{
        gotoReporter(){
            this.$router.push({ name: "ChessGame" });
        },
        gotoHome(){
            this.$router.push({ name: "Home" });
        },
        gotoAdddata(){
            this.$router.push({ name: "AddData" });
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 10%;
    background-color: #334166;
    color: white;
}
.logo, .header h1{
    cursor: pointer;
}
.header ul {
    list-style: none;
    display: flex;
    align-items: center;
}

.header ul li {
    cursor: pointer;
    margin: 0 0.5em;
    font-size: 20px;
}
.header ul li:first-child {
    margin-right: 2em;
}

.header h1 {
    font-weight: bold;
    font-size: 2.5em;
}

img.logo {
    height: 5em;
}
.navbar {
    color: #334166;
    background-color: #f5f4f9;
    padding: 0px 10%;
}
.navbar ul{
    display: flex;
    list-style: none;
    justify-content: space-between;
}
.navbar ul li{
    text-align: center;
    padding: 1em 0px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.form-search {
    background-color: #dbdde8;
    padding: 0.3em 0.5em;
}
.form-search button,
.form-search input{
    border: none;
    background-color: transparent;
    outline: none;
}
.form-search button{
    cursor: pointer;
}
.form-search button i{
    color: #50618d;
    font-size: 1.5em;
}
</style>