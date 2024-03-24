<template>
  <div :class="progress == null ? 'pa-3' : ''">
    <div v-if="progress !== null">
      <h5>{{ processedJob }}/{{ totalJobs }}</h5>
      <ProgressBar :value="progress" style="height: .2em" :showValue="false" />
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  props : {
    updateStockPrice:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      progress: null,
      intervalId: null,
      batchId:null,
      totalJobs:null,
      processedJob:null,

    };
  },
  mounted() {
    this.findBatchID();

  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchProgress() {
      try {
        const response = await this.$entegraApi.$get('/products-price-update-to-n11-quee').then(res=>{
          this.batchId = res.id;
          this.intervalId = setInterval(this.checkProgress, 1000);
        });


      } catch (error) {
        console.error('Error fetching progress:', error)
      }
    },
    async checkProgress () {
      const progressResponse = await this.$entegraApi.$get('/batches/'+this.batchId).then(res=>{
        this.progress = parseInt(res.progress);
        this.processedJob = res.processedJobs;
        this.totalJobs = res.totalJobs;

        if (res.pendingJobs == 0) {
          this.progress=null;
          clearInterval(this.intervalId);
        }
    });
    },
    async findBatchID(){
      const findBatchID = await this.$entegraApi.$get('/findBatchIdByName/n11pricestockupdate').then(res=>{
        if (res.id){
        this.batchId = res.id;
        this.intervalId = setInterval(this.checkProgress, 1000);
       }

      });
    }
  }
};
</script>

<style>
.progress-bar {
  width: 100%;
  background-color: #f0f0f0;
  height: 20px;
  border-radius: 4px;
}

.progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
}

.progress-label {
  margin-top: 5px;
}
</style>
