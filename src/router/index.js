import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () =>
			import("../views/Login.vue"),
	},
	{
		path: "/sklad",
		name: "Sklad",
		component: () =>
			import("../views/Sklad.vue"),
		children: [
			{
				path: "register",
				name: "Register",
				component: () =>
					import("../views/skladViews/Register"),
			},
			{
				path: "show",
				name: "Show",
				component: () =>
					import("../views/skladViews/Show.vue"),
			},
			{
				path: "searching",
				name: "Searching",
				component: () =>
					import("../views/skladViews/Searching.vue"),
			},
			{
				path: "searchingMelt",
				name: "SearchingMelt",
				component: () =>
					import("../views/skladViews/SearchingMelt.vue"),
			},
			{
				path: "unite",
				name: "Unite",
				component: () =>
					import("../views/skladViews/Unite.vue"),
			},
			{
				path: "shipment",
				name: "Shipment",
				component: () =>
					import("../views/skladViews/Shipment.vue"),
			},
			{
				path: "shipmentHistory",
				name: "ShipmentHistory",
				component: () =>
					import("../views/skladViews/ShipmentHistory.vue"),
			},
			{
				path: "admission",
				name: "Admission",
				component: () =>
					import("../views/skladViews/Admission.vue"),
			},
			{
				path: "shipmentStore",
				name: "ShipmentStore",
				component: () =>
					import("../views/skladViews/ShipmentStore.vue"),
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
