<template>
	<v-panel>
		<p id="score">Score: {{ score }}</p>
	</v-panel>
</template>
<script>
	export default {
		data: function() {
			return {
				score: 0
			}
		},
		mounted: function() {
			this.$root.$on("updateScore", (score) => {
				this.score += score;
			})
		}
	}
</script>
