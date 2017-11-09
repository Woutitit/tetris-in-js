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
			this.$root.$on("updateScore", () => {
				this.score += 10;
			})
		}
	}
</script>
