import lysent from "../src/lysent";

export default {
	resource: lysent.Resource("./assembled.html", "a package"),
	require: [
		{
			name: "test",
			resource: lysent.Resource("./test.html", "Test document")
		},
		{
			name: "newtpt",
			resource: lysent.Resource("./test.html", "Test document")
		}
	]
}