import template from 'templates/root';
import HeaderView from 'views/Header';
import FooterView from 'views/Footer';
import ContentView from 'views/Content';

export default Mn.View.extend( {
    template,

    regions: {
        header: 'header',
        footer: 'footer',
        content: 'content'
    },

    onRender() {
        this.showChildView( 'header', new HeaderView() );
        this.showChildView( 'footer', new FooterView() );

        this.showChildView( 'content', new ContentView({
            model: this.model,
            parentView: this
        }) );
    }
} );
