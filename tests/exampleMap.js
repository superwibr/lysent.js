import lysent from "../src/lysent";

export default {
	resource: new lysent.Resource("./assembled.html", "a package"),
	require: {
		test:{
			resource: new lysent.Resource("./assembled.html", "Test document")
		},
		assembled:{
			resource: new lysent.Resource("./assembled.html", "Layer 1 down"),
		},
		newtpt:{resource: new lysent.Resource("./newtpt.png", "'newtpt.png' for top layer")}
	}
}