<template>
    <Form @submit="submitPlayer" >
        <div class="display-flex">
            <div class="form-group">
                <label for="firstname">Firstname</label>
                <input type="text" name="firstname"  v-model="playerLocal.firstName" >
            </div>
            <div class="form-group">
                <label for="blackplayer">Lastname</label>
                <input type="text" name="blackplayer" id="" v-model="playerLocal.lastName">
            </div>
        </div>
        <div class="display-flex">
            <div class="form-group">
                <label for="byear">B_Year</label>
                <input type="text" name="byear"  v-model="playerLocal.B_Year" >
            </div>
            <div class="form-group">
                <label for="avatarImg">Avatar Img</label>
                <input type="text" name="avatarImg" id="" v-model="playerLocal.avatar">
            </div>
        </div>
        <div class="display-flex">
            <div class="form-group">
                <label for="federation">Federation</label>
                <input type="text" name="federation"  v-model="playerLocal.federation">
            </div>
            <div class="form-group">
                <label for="federationImg">Federation Image</label>
                <input class="display-flex" type="text" name="federationImg"  v-model="playerLocal.fedImg">
            </div>
        </div>
        <div class="display-flex">
            <div class="form-group">
                <label for="FIDEtitle">FIDEtitle</label>
                <input type="text" name="FIDEtitle"  v-model="playerLocal.FIDETitle">
            </div>
            <div class="form-group">
                <label for="sex">Sex</label>
                <input class="display-flex" type="text" name="sex"  v-model="playerLocal.Sex">
            </div>
        </div>
        <div class="display-flex elo">
            <div class="form-group">
                <label for="WolrdRank">WolrdRank</label>
                <input type="text" name="WolrdRank"  v-model="playerLocal.WorldRank">
            </div>
            <div class="form-group">
                <label for="std">STD</label>
                <input class="display-flex" type="" name="std"  v-model="playerLocal.std">
            </div>
            <div class="form-group">
                <label for="rapid">Rapid</label>
                <input class="display-flex" type="text" name="rapid"  v-model="playerLocal.rapid">
            </div>
            <div class="form-group">
                <label for="blitz">Blitz</label>
                <input class="display-flex" type="text" name="blitz"  v-model="playerLocal.blitz">
            </div>
        </div>
        <div>
            <button>Add</button>
        </div>
    </Form>
</template>


<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:player"],
    data() {
        return {
            playerLocal:{
                firstName: '',
                lastName: '',
                federation: '',
                Sex: '',
                FIDETitle: '',
                WorldRank: '',
                std: '',
                rapid: '',
                blitz: '',
                avatar: '',
                B_Year: '',
                fedImg: '',
            }
        }
    },
    methods: {
        submitPlayer() {
            this.$emit("submit:player", this.playerLocal);
        },
    },
};
</script>
<style scoped>
.formreporter{
    width: 100%;
}
.formreporter > div{
    width: 100%;
}
.display-flex {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
}
.display-flex > div{
    width: calc(100% /2 - 10px);
}
label{
    font-weight: bold;
    margin-bottom: 5px;
}
textarea{
    width: 100%;
    outline: none;
}
input{
    width: 100%;
    height: 30px;
    font-size: 1em;
    outline: none;
}
.listPlayer:hover{
    background-color: rgb(163, 176, 176);
}
.listPlayer{
    width: 100%;
    padding-left: 5px;
    margin-bottom: 2px;
    box-sizing: border-box;
}
.listPlayer:nth-child(2n){
    background-color: aqua;
}

.elo > div{
    margin-right: 10px;
}
.elo > div:last-child{
    margin-right: 0px;
}

button{
    margin-top: 10px;
    padding: 0.3em 0.5em;
    border: none;
    outline: none;
    background-color: #334166;
    color: white;
    font-size: 1em;
    height: 50px;
    width: 100px;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer; 
}
</style>