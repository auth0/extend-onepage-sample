const app = new Vue({
	el:'#app',
	data:{
		customerName:'',
		leadValue:0,
		result:''
	},
	methods:{
		saveLead() {
			this.result = '';
			fetch('/saveCustomer', { 
				method:'POST',
				body: JSON.stringify({
					customerName:this.customerName,
					leadValue:this.leadValue
				}),
				headers:new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(res => res.json())
			.then(res => {
				this.result = res;
			})
			.catch(e => {
				console.log('Error calling api');
				console.error(e);
			});

		}
	}
});