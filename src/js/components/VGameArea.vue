<style>
.game-area {
	border: 1px solid #000;
	width: 100%;
}

.canvas-container {
	margin: 0 auto;
	max-width: 320px;
    position: relative;
}

</style>
<template>
	<div class="canvas-container">
		<canvas id="gameArea" :class="classes" :width="width" :height="height"></canvas>
	</div>
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
				}	
			}
		}
	}

</script>