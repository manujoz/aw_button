interface AwButton extends HTMLElement
{
	button: HTMLButtonElement;
	disabled: boolean;
	form: string;
	fullwidth: boolean;
	loading: boolean;
	noink: boolean;
	noregister: boolean;
	parentForm: AwForm;
	size: "big"|"small";
	toggle: boolean;
	toggleable: boolean;
	type: "button"|"submit";
	variant: "outlined";

	/** Simula un click sobre el botón */
	click(): void
}

declare var AwButton: {
	prototype: AwButton,
	new(): AwButton
}

interface HTMLElementTagNameMap {
	"aw-button": AwButton;
}