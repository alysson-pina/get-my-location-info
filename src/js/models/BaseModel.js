import mock from 'util/mockResponse';
import key from 'util/key';

export default Bb.Model.extend( {

    url() {
        return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.get('lat')},${this.get('lng')}&key=${key}`;
    },

    parse(dataFromServer) {
        const data = dataFromServer.status === 'OK' ? dataFromServer : mock;

        if( data && data.status === 'OK' && data.results.length ) {
            this.set( 'number', data.results[0].address_components[0].short_name, { silent: true } );
            this.set( 'street', data.results[0].address_components[1].long_name, { silent: true } );
            this.set( 'city', data.results[0].address_components[3].long_name, { silent: true } );
            this.set( 'state', data.results[0].address_components[5].long_name, { silent: true } );
            this.set( 'country', data.results[0].address_components[6].long_name, { silent: true } );
        }

        this.set( 'status', data && data.status );
    }
} );
