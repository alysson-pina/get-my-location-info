import 'helpers';
import 'css/Application';
import RootView from 'views/Root';
import PackageInfo from 'package';
import Model from '../models/BaseModel';

export default Mn.Application.extend( {
    region: `#${PackageInfo.app.appMountId}`,
    template: $.noop,
    model: new Model({}),

    onStart() {
        this.showView( new RootView({
            model: this.model,
            parentView: this
        }) );
        this.historyStart();
    },

    historyStart() {
        if ( !Bb.History.started ) {
            Bb.history.start( {
                pushState: true,
                silent: false,
            } );
        }
    }
} );
