# AW-BUTTON

El aw-button es un botón de formulario de los componentes de Arisman Webs. Estos botones sirven para usarse por separado o también con los formularios de Arisman Webs Components.

#### Instalar el componente

```
$ npm i aw_button
```

También es posible instalar todo lo necesario para manejar los formularios de `aw` instalnado:

```
$ npm i aw_form_elements_df
```
Esto instalará todo los campos y componentes necesarios para usar los `aw-form` incluido el `aw-button`.

- <a href="https://www.npmjs.com/package/aw_form" target="_blank">aw-form</a>
- <a href="https://www.npmjs.com/package/aw_form_elements_common" target="_blank">aw-form-elements-common</a>
- <a href="https://www.npmjs.com/package/aw_form_elements_df" target="_blank">aw-form-elements-df</a>

Para incluir este y todos los componentes de formularios disponibles, así como los `aw_form`, `aw_form_elements_df` y los `aw_form_elements_df`, bastará con añadir:

```html
<script src="/node_modules/aw_form_elements_df/aw-form-elements-df.js"></script>
```
___

Incluir el botón en la web:

```html
<script src="/node_modules/aw_button/aw-button.js"></script>
<aw-button unresolved>MY BUTTON</aw-button>
```

Los parámetros que admite este botón son:

- `type`: El tipo del botón (button,submit).
- `disabled`: Un input desactivado.
- `noregister`: Evita que el botón se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente hacemos click sobre él.
- `unresolved`: No muestra el botón hasta que haya cargo el componente.

#### Ejemplos:

```html
<aw-button unresolved clickfunc="myFunc">MY BUTTON</aw-button>
```
```javascript
function myFunc( button )
{
	// The button is loading
	button.loading = true;
	console.log( button );

	setTimeout(() => {
		// The button is not loading.
		button.loading = false;
	}, 3000 )
}
```

Como puede verse en el ejemplo anterior, el botón puede pasar de un estado normal al estado cargando a través de la propiedad `loading` que es un booleano. Ten en cuenta que mientras el botón está en estado de carga, la `clickfunc` estará anulada.

La propiedad `loading` es inherente al componente por lo que también puede ser controlada a través de javascript de la siguiente forma:

```html
<aw-button unresolved>MY BUTTON</aw-button>
```
```javascript
/** @type {AwButton} */
let button = document.querySelector( "aw-button" );
button.loading = true;
```

El botón obviamente está preparado para ser usado dentro de un `aw-form` para enviar formularios de manera sencilla, puedes verlo en <a href="https://www.npmjs.com/package/aw_form" target="_blank">aw-form</a>

