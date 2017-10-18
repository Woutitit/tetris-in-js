<style>
	.game-area {
		border: 1px solid #000;
	}

	.game-area--size-normal {
		width: 200px;
		height: 200px;
	}
	
</style>
<template>
	<canvas :class="classes" :width="width" :height="height"></canvas>
</template>
<script>
	export default {

		props: {
			size: {
				type: String
			},
			width: {
				type: Number
			},
			height: {
				type: Number
			}
		},

		computed: {
			classes: function() {
				return {
					"game-area": true,
					"game-area--size-normal": this.size == "normal"
				}	
			}
		}
	}

</script>