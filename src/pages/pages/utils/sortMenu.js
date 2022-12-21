export const sortMenuFunction = (menu_details) => {
	menu_details.sort((a, b) => {
		return a.menu_index - b.menu_index;
	});
	// alert(JSON.stringify(menu_details));
};
