import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwExternsFunctionsMixin } 		from '../aw_extern_functions/aw-extern-functions-mixin.js';

import "../aw_polymer_3/iron-icons/iron-icons.js";
import "../aw_polymer_3/paper-ripple/paper-ripple.js";

/**
 * Componente de botón
 * 
 * **Attrs**: [type], [disabled], [form], [toggles], [noink], [loading], [noregister]
 * 
 * @slot
 * @attr {String} clickfunc - Función que es llamada al hacer click
 * @cssprop --aw-button-iron-icon-size
 * @cssprop --aw-button-iron-icon-top
 * @cssprop --aw-button-iron-icon-margin
 * @cssprop --aw-button-iron-icon-fill
 * @cssprop --aw-button-padding
 * @cssprop --aw-button-font-family
 * @cssprop --aw-button-color
 * @cssprop --aw-button-color-hv
 * @cssprop --aw-button-font-weight
 * @cssprop --aw-button-bg-color
 * @cssprop --aw-button-bg-color-hv
 * @cssprop --aw-button-bg-image
 * @cssprop --aw-button-bg-image-hv
 * @cssprop --aw-button-border-color
 * @cssprop --aw-button-border-color-hv
 * @cssprop --aw-button-border-radius
 * @cssprop --aw-button-disabled-color
 * @cssprop --aw-button-disabled-bg-color
 * @cssprop --aw-button-disabled-border-color
 * @cssprop --aw-button-loadbar-position
 * @cssprop --aw-button-loadbar-left
 * @cssprop --aw-button-loadbar-bottom
 * @cssprop --aw-button-loadbar-height
 * @cssprop --aw-button-loadbar-color
 */
class AwButton extends AwExternsFunctionsMixin ( PolymerElement ) {
	static get template() {
		return html`
		<style>
            :host {
                position: relative;
                display: inline-block;
            }

            :host([unresolved]) {
                display: none;
            }
			:host([fullwidth]) {
				width: 100%;
			}
            ::slotted(iron-icon) {
                width: var(--aw-button-iron-icon-size,20px);
                height: var(--aw-button-iron-icon-size 20px);
                top: var(--aw-button-iron-icon-top,-2px);
                margin: var(--aw-button-iron-icon-margin,0px 7px 0px 0px);
				fill: var(--aw-button-iron-icon-fill,var(--aw-button-color,#FFFFFF));
            }
            button {
                background-color: var(--aw-button-bg-color,#1C7CDD);
				background-image: var(--aw-button-bg-image, none);
                border-radius: var(--aw-button-border-radius, 2px);
                border: solid 1px var(--aw-button-border-color,var(--aw-button-bg-color,#1C7CDD));
                box-sizing: border-box;
                color: var(--aw-button-color,white);
                cursor: pointer;
                font-family: var(--aw-button-font-family,"arial");
                font-size: var(--aw-button-font-size,14px);
                font-weight:  var(--aw-button-font-weight,normal);
                padding: var(--aw-button-padding,10px 15px);
                position: relative;
                transition: color .2s, background .2s, border .2s;
				width: 100%;
            }
            button:hover {
                color: var(--aw-button-color-hv,#FFFFFF);
                background-color: var(--aw-button-bg-color-hv,#4d9ceb);
				background-image: var(--aw-button-bg-image-hv, none);
                border-color: var(--aw-button-border-color-hv,var(--aw-button-bg-color-hv,#4d9ceb));
            }
            button:focus {
                outline: 0;
            }
            button.toggle {
                box-shadow: inset 0px 0px 30px #333333;
            }
			button[variant="outlined"] {
				background-color: transparent;
				color: var(--aw-button-bg-color,#1C7CDD);
			}
			button[variant="outlined"]:hover {
				background-color: var(--aw-button-bg-color,#1C7CDD);
				color: var(--aw-button-color,white);
			}
			button[size="small"] {
				font-size: 12px;
				padding: 5px 15px;
			}
			button[size="big"] {
				font-size: 16px;
				padding: 12px 15px;
			}
            button[disabled] {
                color: var(--aw-button-disabled-color,#999999);
                background-color: var(--aw-button-disabled-bg-color,#EAEAEA);
                border-color: var(--aw-button-disabled-border-color,var(--aw-button-disabled-bg-color,#EAEAEA));
            }
            #load_bar {
                position: var(--aw-button-loadbar-position,absolute);
                left: var(--aw-button-loadbar-left,0);
                bottom: var(--aw-button-loadbar-bottom,0);
                height: var(--aw-button-loadbar-height,3px);
                background-color: var(--aw-button-loadbar-color,#1C7CDD);
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                display: none;
            }
            #load_bar[loading] {
                display: block;
                -webkit-animation: loading 2s infinite;
                animation: loading 2s infinite;
            }
            @keyframes loading {
                0% {
                    left: 0%;
                    width: 0%;
                }
                50% {
                    left: 0%;
                    width: 100%;
                }
                100% {
                    left: 100%;
                    width: 0%;
                }
            }
		</style>
		<button
          	id="button"
            type$="[[type]]"
            disabled$=[[disabled]]
            variant$=[[variant]]
            size$=[[size]]
            on-click="_click"
            >
            <slot></slot>
            <template is="dom-if" if="{{!noink}}">
                <paper-ripple></paper-ripple>
            </template>
            <div id="load_bar"></div>
        </button>
		`;
	}

	static get properties() {
		return {
			/**
			 * Desactiva el botón
			 */
			disabled: { type: Boolean },
			/**
			 * Id del formulario al que pertenece el botón
			 */
			form: { type: String },
			/**
			 * Pone el botón en ancho completo
			 */
			fullwidth: { type: Boolean, reflectToAttribute: true },
			/**
			 * Pone el botón en estado de carga
			 */
			loading: { type: Boolean, observer: "_changue_loading" },
			/**
			 * Quita el efecto ripple al hacer click sobre el botón
			 */
			noink: { type: Boolean },
			/**
			 * Evita que el botón se registre en el formulario
			 */
			noregister: { type: Boolean },
			/**
			 * Tamaño del botón
			 * @type {"big"|"small"}
			 */
			size: { type: String },
			/**
			 * Indica si el botón debe cambiar a pulsado y viceversa cuando se hace click sobre el
			 */
			toggleable: { type: Boolean },
			/** 
			 * Tipo del botón
			 * @type {"submit"|"button"} 
			 */
			type: { type: String },
			/**
			 * Variante del botón
			 * @type {"outlined"|"filled"}
			 */
			variant: { type: String },
		}
	}

	constructor() {
		super();

		this.disabled = false;
		this.form = null;
		this.fullwidth = false;
		this.loading = false;
		this.noink = false;
		this.noregister = false;
		this.size = undefined;
		this.toggleable = false;
		this.type = "button";
		this.variant = "filled";

		/** @type {HTMLButtonElement} */
		this.button = undefined;
		/** @type {AwForm} */
		this.parentForm = undefined;
		this.toggle = false;
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando se conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el botón

		this.button = this.$.button;

		// Registramos el botón en el formulario

		this._register_in_form();

		// Si es tipo button form es null.

		if ( this.type === "button" ) {
			this.form = null;
		}

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar cuando se desconecta el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		// Desregistramos el botón del formlario

		if ( this.parentForm ) {
			this.parentForm.unregister_button_submit();
		}
	}

	/**
	 * @method	click
	 */
	click() {
		this.button.click();
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el elemento en el formulario.
	 */
	_register_in_form( cont = 1 ) {
		if ( this.type === "submit" && !this.form && !this.noregister ) {
			setTimeout(() => {
				this.dispatchEvent(new CustomEvent('aw-form-submit-register', { detail: this, bubbles: true, composed: true }));
			}, 10);
		}
	}

	/**
	 * @method	_changue_toggle
	 * 
	 * Esta función cambia el estado del botoón al hacer click dando o quitando
	 * a éste un efecto de estar pulsado o no alternativamente.
	 */
	_changue_toggle() {
		if( !this.toggleable ) {
			return false;
		}

		if ( !this.toggle && this.type === "button" ) {
			this.button.classList.add("toggle");
			this.toggle = true;
		} else if( this.toggle ) {
			this.button.classList.remove("toggle");
			this.toggle = false;
		}
	}

	/**
	 * @method	_changue_loading
	 * 
	 * Cambia el estado del botón a cargando o no cargando.
	 */
	_changue_loading() {
		if( !this.button ) {
			return false;
		}

		if( this.loading ) {
			this.button.setAttribute( "disabled", "" );
			this.$.load_bar.setAttribute( "loading", "" );
		} else {
			this.button.removeAttribute( "disabled" );
			this.$.load_bar.removeAttribute( "loading" );
		}
	}

	/**
	 * @method	_click
	 * 
	 * Acciones a realizar cuando se hace click sobre el botón.
	 */
	_click() {
		if ( this.disabled ) {
			return false;
		}

		// Ponemos el toggle

		this._changue_toggle();

		// Llamamos a la función externa en el click

		if( typeof this.clickfunc === "function" ) {
			this.clickfunc( this );
		}

		// Submitimos el formulario

		if ( this.parentForm ) {
			this.parentForm.submit();
		} else if( this.form ) {
			if( typeof this.submitfunc === "function" ) {
				this.submitfunc( this );
			} else {
				document.getElementById( this.form ).submit();
			}
		}
	}
}

window.customElements.define( "aw-button", AwButton );