<template>
  <div
    :draggable="!disable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
    disable: {
      type: Boolean,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.dropEffect = "move";
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
      this.$emit("drag");
    },
  },
};
</script>
