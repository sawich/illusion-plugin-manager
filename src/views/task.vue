<template>
  <section class="task">
    <!-- <div class="progress">
      <div class="total" :style="{ transform: `translate3d(${progress - 100}%, 0, 0)`}" />
    </div>
    <div class="title">
      <div class="icon" :style="{backgroundImage: `url(${fullIconPath(task.icon)})` }">
        <div class="process">{{ String(Math.trunc(progress)).padStart(3, '000') }}</div>
      </div>
      <div class="name">{{ task.name }}</div>
    </div>
    <div class="description">{{ task.description }}</div>-->
  </section>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from "vue-property-decorator";
// import { Task } from "@/store/modules/tasks-module";

// @Component({ components: {} })
// export default class Tasks extends Vue {
//   @Prop({ required: true, type: Number })
//   id!: number;

//   @Prop({ required: true, type: Object })
//   task!: Task;

//   async created() {
//     this.task.run(async (progress: number) => {
//       this.progress = progress;
//     });
//   }

//   fullIconPath(path: string) {
//     return `/icons/${path}.png`;
//   }

//   progress = 0;
// }
</script>

<style lang="scss" scoped>
.task {
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  max-width: 400px;
  overflow: hidden;

  .title {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    align-content: center;
    gap: 10px;

    .icon {
      width: 16px;
      height: 16px;
    }
  }

  .title,
  .description {
    margin: 10px;
  }

  .icon {
    position: relative;
  }

  .process {
    position: absolute;
    top: calc(100% + 2px);
    text-align: center;
    font-size: 1ch;
    left: 0;
    width: 16px;
    overflow: hidden;
  }

  .description {
    margin-left: 10px + 16px + 10px;
    font-size: 0.875rem;
    color: var(--task-description-color);
  }

  .progress {
    overflow: hidden;
    height: 1px;
    width: 100%;
    background-color: var(--border-color);

    .total {
      width: 100%;
      height: 100%;
      transform: translate3d(-10%, 0, 0);
      transition: transform var(--animation-short-time)
        var(--task-animation-function);
      background-color: var(--task-progress-color);
    }
  }
}
</style>
