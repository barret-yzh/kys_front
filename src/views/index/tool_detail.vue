<template>
    <div>
        <!--  植物识别-->
        <el-upload class="upload-demo" action="">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
        </el-upload>
        <el-input type="textarea" placeholder="植物识别结果" v-model="plant">
        </el-input>
        <br />
        <br />
        <br />
        <form action="http://localhost:8090/textTrans" method="post">
            <input type="text" name="q" placeholder="请输入需要翻译的英文文本" />
            <input type="submit" value="提交" />
        </form>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            words: '',
            idCard: '',
            driveLicense: '',
            trainTicket: '',
            medicalInvoice: '',
            office: '',
            faceDetect: '',
            animal: '',
            plant: '',
            logo: '',
            fruit: '',
            dish: '',
            redWine: '',
            money: '',
            landMark: ''
        };
    },
    methods: {
        methods: {
            handleSuccessImageToWord(result) {
                this.words = result;
            },
            handleSuccessIdCard(result) {
                this.idCard = result;
            },
            handleSuccessDriveLicense(result) {
                this.driveLicense = result;
            },
            handleSuccessTrainTicket(result) {
                this.trainTicket = result;
            },
            handleSuccessMedicalInvoice(result) {
                this.medicalInvoice = result;
            },
            handleSuccessOffice(result) {
                this.office = result;
            },
            handleSuccessFaceDetect(result) {
                this.faceDetect = result;
            },
            handleSuccessAnimal(result) {
                this.animal = result;
            },
            handleSuccessPlant(result) {
                this.plant = result;
            },
            handleSuccessLogo(result) {
                this.logo = result;
            },
            handleSuccessFruit(result) {
                this.fruit = result;
            },
            handleSuccessDish(result) {
                this.dish = result;
            },
            handleSuccessRedWine(result) {
                this.redWine = result;
            },
            handleSuccessMoney(result) {
                this.money = result;
            },
            handleSuccessLandMark(result) {
                this.landMark = result;
            }
        }
    },
};

</script>
