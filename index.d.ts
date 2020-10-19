interface AwButton extends HTMLElement
{
	loading: boolean;
}

declare var AwButton: {
	prototype: AwButton,
	new(): AwButton
}

interface HTMLElementTagNameMap {
	"aw-button": AwButton;
}