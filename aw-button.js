import { PolymerElement, html } 		from "/node_modules/aw_polymer_3/polymer/polymer-element.js";
import { AwExternsFunctionsMixin } 		from '/node_modules/aw_extern_functions/aw-extern-functions-mixin.js';

import "/node_modules/aw_polymer_3/iron-icons/iron-icons.js";
import "/node_modules/aw_polymer_3/paper-ripple/paper-ripple.js";

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

            ::slotted(iron-icon) {
                width: var(--aw-button-iron-icon-size,20px);
                height: var(--aw-button-iron-icon-size 20px);
                top: var(--aw-button-iron-icon-top,-2px);
                margin: var(--aw-button-iron-icon-margin,0px 7px 0px 0px);
				fill: var(--aw-button-iron-icon-fill,var(--aw-button-color,#FFFFFF));
            }

            button {
                position: relative;
				width: 100%;
                padding: var(--aw-button-padding,10px 15px);
                font-family: var(--aw-button-font-family,"arial");
                font-size: var(--aw-button-font-size,14px);
                font-weight:  var(--aw-button-font-weight,normal);
                background-color: var(--aw-button-bg-color,#1C7CDD);
                border: solid 1px var(--aw-button-border-color,var(--aw-button-bg-color,#1C7CDD));
                border-radius: var(--aw-button-border-radius, 2px);
                color: var(--aw-button-color,white);
                cursor: pointer;
                transition: color .2s, background .2s, border .2s;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }

            button:hover {
                color: var(--aw-button-color-hv,#FFFFFF);
                background-color: var(--aw-button-bg-color-hv,#4d9ceb);
                border-color: var(--aw-button-border-color-hv,var(--aw-button-bg-color-hv,#4d9ceb));
            }
            button:focus {
                outline: 0;
            }
            button.toggle {
                box-shadow: inset 0px 0px 30px #333333;
            }
            button[disabled] {
                color: var(--aw-button-disabled-color,#999999);
                background-color: var(--aw-button-disabled-bg-color,#EAEAEA);
                border-color: var(--aw-button-disabled-border-color,var(--aw-button-disabled-bg-color,#EAEAEA));
            }

            #load_bar {
                position: var(--aw-button-loadbar-position,absolute);
                left: var(--aw-button-loadbar-left,0);;
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
			button: { type: Object },

			// Propiedades del botón

			type: { type: String, value: "button" },
			disabled: { type: Boolean, value: false },
			form: { type: String },
			toggles: { type: Boolean, value: false },
			noink: { type: Boolean, value: false },

			// Variable que indica el estado del botón en el toggle

			toggle: { type: Boolean, value: false },

			// Método que pone el botón a cargar

			loading: { type: Boolean, value: false, observer: "_changue_loading" },

			// Relación con el formulario

			parentForm: Object,
			noregister: { type: Boolean, value: false }
		}
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
		if( !this.toggles ) {
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