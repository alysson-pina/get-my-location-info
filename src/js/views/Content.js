import template from 'templates/content';

export default Mn.CompositeView.extend( {
    template,
    tagName: 'div',
    className: 'row small-12',

    modelEvents: {
        "change": "modelChanged"
    },

    ui: {
        form: '#form',
        number: '#number',
        street: '#street',
        complement: '#complement',
        city: '#city',
        state:  '#state',
        country: '#country',
        lat: '#lat',
        lng: '#lng'
    },

    events: {
        'click #geolocation': 'googleGeolocation',
        'click #submit': 'submitForm'
    },

    modelChanged: function() {
        if ( this.model.get('lat') && this.model.get('lng') && this.model.changed.status !== 'OK' ) {
            this.model.fetch();
        } else if ( this.model.changed.status === 'OK' ) {
            this.updateForm();
            this.model.set('status', false, { silent: true } );
        }
    },

    googleGeolocation: function() {
        if ( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition( (position) => {
                this.model.set('lat', position.coords.latitude, { silent: true } );
                this.model.set('lng', position.coords.longitude);
            } );
        } else {
            alert("I'm sorry, but geolocation services are not supported by your browser.");
        }
    },

    updateForm: function() {
        this.ui.number.val( this.model.get('number') );
        this.ui.street.val( this.model.get('street') );
        this.ui.city.val( this.model.get('city') );
        this.ui.state.val( this.model.get('state') );
        this.ui.country.val( this.model.get('country') );
        this.ui.lat.val( this.model.get('lat') );
        this.ui.lng.val( this.model.get('lng') );
    },

    submitForm: function() {
        this.ui.form.addClass('submitted');
    }
});