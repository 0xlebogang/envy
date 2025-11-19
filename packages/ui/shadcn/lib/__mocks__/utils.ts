export const cn = (...inputs: string[]) => {
	return inputs.filter(Boolean).join(" ");
};
